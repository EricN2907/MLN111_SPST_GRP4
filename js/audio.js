/* ═══════════════════════════════════════════════════════
   ADVANCED AUDIO SCAPE — Ghế Quyền Lực
   Procedural Sound Synthesizer & Orchestral Stream
   ═══════════════════════════════════════════════════════ */

const GameAudio = (() => {
  let ctx = null;
  let enabled = false;
  let currentScene = 'title';
  let currentMood = 'title';

  // Gain Routing Nodes
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;
  let analyser = null;

  // Sound settings (persisted or defaults)
  let musicVolume = 0.5; // 0.0 to 1.0
  let sfxVolume = 0.7;   // 0.0 to 1.0
  let soundMode = 'procedural'; // 'procedural' | 'orchestral'

  // Noise Buffer (for typing click and sweeps)
  let noiseBuffer = null;

  // BGM Orchestral elements
  let streamAudio = null;

  // BGM Procedural Sequencer elements
  let sequencerTimer = null;
  let nextNoteTime = 0.0;
  let stepIndex = 0;
  const stepDuration = 0.22; // BPM ~ 136, halved duration
  let activeChords = null;
  let activeBaseFreqs = null;
  let activePads = [];

  // Frequencies corresponding to notes
  const FREQS = {
    C2: 65.41, Db2: 69.30, D2: 73.42, Eb2: 77.78, E2: 82.41, F2: 87.31, Fs2: 92.50, G2: 98.00, Ab2: 103.83, A2: 110.00, Bb2: 116.54, B2: 123.47,
    C3: 130.81, Csh3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, Fsh3: 185.00, G3: 196.00, Gsh3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
    C4: 261.63, Csh4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fsh4: 369.99, G4: 392.00, Gsh4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00
  };

  // Streaming MP3 direct links from Wikimedia Commons
  const ORCHESTRAL_TRACKS = {
    title: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/JOHN_MICHEL_CELLO-BEETHOVEN_SYMPHONY_7_Allegretto.ogg',
    office: 'https://upload.wikimedia.org/wikipedia/commons/6/67/John_Michel_-_Bach_Cello_Suite_1_in_G_Major_-_1_Prelude.ogg',
    parliament: 'https://upload.wikimedia.org/wikipedia/commons/6/67/John_Michel_-_Bach_Cello_Suite_1_in_G_Major_-_1_Prelude.ogg',
    diplomacy: 'https://upload.wikimedia.org/wikipedia/commons/6/67/John_Michel_-_Bach_Cello_Suite_1_in_G_Major_-_1_Prelude.ogg',
    crisis: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Vivaldi_-_Summer_Presto_-_John_Harrison_With_The_Wichita_State_University_Chamber_Players.ogg',
    protest: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Vivaldi_-_Summer_Presto_-_John_Harrison_With_The_Wichita_State_University_Chamber_Players.ogg',
    cyber: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Vivaldi_-_Summer_Presto_-_John_Harrison_With_The_Wichita_State_University_Chamber_Players.ogg',
    victory: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Beethoven_Symphony_9_movement_4_extract.ogg',
    gameover: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Chopin_Funeral_March_performed_by_Andreas_Xanthos.ogg',
    factory: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Vivaldi_-_Summer_Presto_-_John_Harrison_With_The_Wichita_State_University_Chamber_Players.ogg',
    village: 'https://upload.wikimedia.org/wikipedia/commons/6/67/John_Michel_-_Bach_Cello_Suite_1_in_G_Major_-_1_Prelude.ogg',
    hospital: 'https://upload.wikimedia.org/wikipedia/commons/6/67/John_Michel_-_Bach_Cello_Suite_1_in_G_Major_-_1_Prelude.ogg',
    classroom: 'https://upload.wikimedia.org/wikipedia/commons/6/67/John_Michel_-_Bach_Cello_Suite_1_in_G_Major_-_1_Prelude.ogg'
  };

  // Load sound configurations from localStorage if they exist
  try {
    const savedMusic = localStorage.getItem('game_audio_music_vol');
    const savedSfx = localStorage.getItem('game_audio_sfx_vol');
    const savedMode = localStorage.getItem('game_audio_mode');
    const savedEnabled = localStorage.getItem('game_audio_enabled');

    if (savedMusic !== null) musicVolume = parseFloat(savedMusic);
    if (savedSfx !== null) sfxVolume = parseFloat(savedSfx);
    if (savedMode !== null) soundMode = savedMode;
    if (savedEnabled !== null) enabled = savedEnabled === 'true';
  } catch (e) {
    console.error("Could not load audio settings:", e);
  }

  function unlock() {
    if (!ctx) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return false;
      ctx = new AudioCtor();
      setupAudioRouting();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }

  function setupAudioRouting() {
    masterGain = ctx.createGain();
    musicGain = ctx.createGain();
    sfxGain = ctx.createGain();
    
    analyser = ctx.createAnalyser();
    analyser.fftSize = 64; // High frequency resolution not needed for small UI visualizer

    // Connections
    musicGain.connect(masterGain);
    sfxGain.connect(masterGain);
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    // Apply initial volumes
    musicGain.gain.setValueAtTime(enabled ? musicVolume : 0, ctx.currentTime);
    sfxGain.gain.setValueAtTime(enabled ? 1 : 0, ctx.currentTime); // Handle individual sfx volumes in play()
    masterGain.gain.setValueAtTime(1.0, ctx.currentTime);

    // Generate White Noise Buffer
    const bufferSize = ctx.sampleRate * 2;
    noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }

  function getNoiseBuffer() {
    if (!noiseBuffer && ctx) {
      const bufferSize = ctx.sampleRate * 2;
      noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    return noiseBuffer;
  }

  function isEnabled() {
    return enabled;
  }

  function toggle() {
    unlock();
    enabled = !enabled;
    
    try {
      localStorage.setItem('game_audio_enabled', enabled);
    } catch(e){}

    if (!enabled) {
      stopBgm();
      if (musicGain) musicGain.gain.setValueAtTime(0, ctx.currentTime);
    } else {
      if (musicGain) musicGain.gain.setValueAtTime(musicVolume, ctx.currentTime);
      startBgm(currentScene);
      play('click');
    }
    return enabled;
  }

  function setMusicVolume(vol) {
    musicVolume = vol / 100;
    try {
      localStorage.setItem('game_audio_music_vol', musicVolume);
    } catch(e){}

    if (enabled && musicGain && ctx) {
      musicGain.gain.setValueAtTime(musicVolume, ctx.currentTime);
    }
    
    if (streamAudio) {
      streamAudio.volume = enabled ? musicVolume : 0.0;
    }
  }

  function setSfxVolume(vol) {
    sfxVolume = vol / 100;
    try {
      localStorage.setItem('game_audio_sfx_vol', sfxVolume);
    } catch(e){}
  }

  function setAudioMode(mode) {
    if (soundMode === mode) return;
    soundMode = mode;
    try {
      localStorage.setItem('game_audio_mode', soundMode);
    } catch(e){}

    if (enabled) {
      stopBgm();
      startBgm(currentScene);
    }
  }

  function getVolumes() {
    return {
      musicVolume: Math.round(musicVolume * 100),
      sfxVolume: Math.round(sfxVolume * 100)
    };
  }

  function getAudioMode() {
    return soundMode;
  }

  function getAnalyser() {
    return analyser;
  }

  /* ── PLAY SFX (Procedural Web Audio Synths) ── */
  function play(type) {
    if (!enabled || !unlock()) return;
    const now = ctx.currentTime;

    if (type === 'hover') {
      const carrier = ctx.createOscillator();
      const g = ctx.createGain();
      carrier.type = 'sine';
      carrier.frequency.setValueAtTime(500, now);
      g.gain.setValueAtTime(sfxVolume * 0.1, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      carrier.connect(g);
      g.connect(sfxGain);
      carrier.start(now);
      carrier.stop(now + 0.06);
      return;
    }

    if (type === 'crisis') {
      const carrier = ctx.createOscillator();
      const g = ctx.createGain();
      carrier.type = 'square';
      carrier.frequency.setValueAtTime(110, now);
      g.gain.setValueAtTime(sfxVolume * 0.4, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      carrier.connect(g);
      g.connect(sfxGain);
      carrier.start(now);
      carrier.stop(now + 0.5);
      return;
    }

    // 1. Sleek Interface Click
    if (type === 'click') {
      const carrier = ctx.createOscillator();
      const g = ctx.createGain();
      carrier.type = 'sine';
      carrier.frequency.setValueAtTime(450, now);
      carrier.frequency.exponentialRampToValueAtTime(150, now + 0.06);

      g.gain.setValueAtTime(sfxVolume * 0.35, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      carrier.connect(g);
      g.connect(sfxGain);
      carrier.start(now);
      carrier.stop(now + 0.07);
      return;
    }

    // 2. Typewriter click (White noise going through bandpass filter)
    if (type === 'type') {
      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer();
      if (!noise.buffer) return;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950 + Math.random() * 250, now);
      filter.Q.setValueAtTime(5, now);

      const g = ctx.createGain();
      g.gain.setValueAtTime(sfxVolume * 0.22, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

      noise.connect(filter);
      filter.connect(g);
      g.connect(sfxGain);

      noise.start(now);
      noise.stop(now + 0.02);
      return;
    }

    // 3. Card swipe (White noise + dynamic filter sweep)
    if (type === 'card') {
      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer();
      if (!noise.buffer) return;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.5, now);
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(1700, now + 0.24);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(sfxVolume * 0.42, now + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      noise.connect(filter);
      filter.connect(g);
      g.connect(sfxGain);

      noise.start(now);
      noise.stop(now + 0.26);
      return;
    }

    // 4. Acoustic pluck for Option Select
    if (type === 'select') {
      const carrier = ctx.createOscillator();
      const modulator = ctx.createOscillator();
      const modGain = ctx.createGain();
      const mainGain = ctx.createGain();

      carrier.type = 'sine';
      modulator.type = 'sine';
      
      carrier.frequency.setValueAtTime(329.63, now); // E4
      modulator.frequency.setValueAtTime(659.25, now); // 2:1 harmonic

      modGain.gain.setValueAtTime(180, now);
      modGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      mainGain.gain.setValueAtTime(sfxVolume * 0.38, now);
      mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      modulator.connect(modGain);
      modGain.connect(carrier.frequency);
      carrier.connect(mainGain);
      mainGain.connect(sfxGain);

      carrier.start(now);
      modulator.start(now);
      carrier.stop(now + 0.14);
      modulator.stop(now + 0.14);
      return;
    }

    // 5. Positive Chiming Arpeggio
    if (type === 'positive') {
      const notes = [FREQS.C4, FREQS.E4, FREQS.G4, FREQS.C5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        g.gain.setValueAtTime(0.0001, now + idx * 0.05);
        g.gain.linearRampToValueAtTime(sfxVolume * 0.25, now + idx * 0.05 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.32);

        osc.connect(g);
        g.connect(sfxGain);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.35);
      });
      return;
    }

    // 6. Tense Cinematic Sub-Bass Boom & String Screech
    if (type === 'negative') {
      // Sub boom
      const boom = ctx.createOscillator();
      const boomGain = ctx.createGain();
      boom.type = 'triangle';
      boom.frequency.setValueAtTime(70, now);
      boom.frequency.exponentialRampToValueAtTime(22, now + 1.3);

      boomGain.gain.setValueAtTime(sfxVolume * 0.95, now);
      boomGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      boom.connect(boomGain);
      boomGain.connect(sfxGain);
      boom.start(now);
      boom.stop(now + 1.5);

      // Tension screech
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const sFilter = ctx.createBiquadFilter();
      const sGain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(840, now);
      osc2.frequency.setValueAtTime(854, now); // detuned

      sFilter.type = 'bandpass';
      sFilter.frequency.setValueAtTime(1400, now);

      sGain.gain.setValueAtTime(0.0001, now);
      sGain.gain.linearRampToValueAtTime(sfxVolume * 0.13, now + 0.06);
      sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc1.connect(sFilter);
      osc2.connect(sFilter);
      sFilter.connect(sGain);
      sGain.connect(sfxGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.75);
      osc2.stop(now + 0.75);
      return;
    }

    // 7. Victory brass fanfare
    if (type === 'ending') {
      const notes = [FREQS.C3, FREQS.E3, FREQS.G3, FREQS.C4, FREQS.E4, FREQS.G4, FREQS.C5];
      notes.forEach((freq, idx) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const g = ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(freq, now + idx * 0.045);
        osc2.frequency.setValueAtTime(freq + 2, now + idx * 0.045);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now + idx * 0.045);
        filter.frequency.exponentialRampToValueAtTime(1600, now + idx * 0.045 + 0.5);

        g.gain.setValueAtTime(0.0001, now + idx * 0.045);
        g.gain.linearRampToValueAtTime(sfxVolume * 0.16, now + idx * 0.045 + 0.15);
        g.gain.linearRampToValueAtTime(sfxVolume * 0.11, now + 1.2);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 2.1);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(g);
        g.connect(sfxGain);

        osc1.start(now + idx * 0.045);
        osc2.start(now + idx * 0.045);
        osc1.stop(now + 2.2);
        osc2.stop(now + 2.2);
      });
      return;
    }

    // 8. Tragic gameover pitch collapse
    if (type === 'gameover') {
      const notes = [FREQS.A2, FREQS.C3, FREQS.E3, FREQS.A3];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const g = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.linearRampToValueAtTime(freq * 0.55, now + 2.0); // pitch slide down

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, now);
        filter.frequency.exponentialRampToValueAtTime(50, now + 1.8);

        g.gain.setValueAtTime(sfxVolume * 0.22, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc.connect(filter);
        filter.connect(g);
        g.connect(sfxGain);

        osc.start(now);
        osc.stop(now + 2.3);
      });
      return;
    }

    // Fallback: simple sine beep
    const freq = type === 'type' ? 620 : 430;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(sfxVolume * 0.1, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    osc.connect(g);
    g.connect(sfxGain);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  function getMoodForScene(scene) {
    if (scene === 'title') return 'title';
    if (scene === 'victory') return 'victory';
    if (scene === 'gameover') return 'gameover';
    if (['crisis', 'protest', 'cyber', 'factory'].includes(scene)) return 'crisis';
    return 'office'; // Default mood for office, parliament, diplomacy, village, hospital, classroom
  }

  /* ── PLAY BACKGROUND MUSIC (BGM) ── */
  function startBgm(scene) {
    if (!enabled || !unlock()) return;

    const newMood = getMoodForScene(scene);

    if (soundMode === 'orchestral') {
      playOrchestralBgm(scene);
    } else {
      if (sequencerTimer && currentMood === newMood) {
        // Mood is the same, keep running! Just update chord presets,
        // but do NOT restart the sequencer timer or step index!
        activeChords = getSceneChords(scene);
        activeBaseFreqs = getSceneBaseFreqs(scene);
        return;
      }
      currentMood = newMood;
      playProceduralBgm(scene);
    }
  }

  function stopBgm() {
    stopOrchestralBgm();
    stopProceduralBgm();
  }

  function setScene(scene) {
    currentScene = scene || 'office';
    if (!enabled) return;

    let bgmScene = currentScene;
    if (typeof GameState !== 'undefined' && GameState.get) {
      const state = GameState.get();
      if (state) {
        const approvals = Object.values(state.approval || {});
        const hasApprovalDanger = approvals.length > 0 && approvals.some(v => v <= 25);
        const hasStabilityDanger = state.resources && state.resources.onDinhCT < 35;
        const hasBudgetDanger = state.resources && state.resources.nganSach < -20;

        if (hasApprovalDanger || hasStabilityDanger || hasBudgetDanger) {
          if (currentScene !== 'victory' && currentScene !== 'gameover') {
            bgmScene = 'crisis';
          }
        }
      }
    }
    startBgm(bgmScene);
  }

  /* ── BGM SUB-ENGINE: ORCHESTRAL STREAM ── */
  function playOrchestralBgm(scene) {
    const trackUrl = ORCHESTRAL_TRACKS[scene] || ORCHESTRAL_TRACKS.office;
    if (!trackUrl) return;

    // Check if same track is already playing
    if (streamAudio && streamAudio.dataset.url === trackUrl) {
      if (streamAudio.paused) {
        streamAudio.play().catch(e => console.warn(e));
      }
      return;
    }

    // Crossfade old track out
    const oldAudio = streamAudio;
    if (oldAudio) {
      let fadeOutInterval = setInterval(() => {
        if (oldAudio.volume > 0.05) {
          oldAudio.volume -= 0.05;
        } else {
          clearInterval(fadeOutInterval);
          oldAudio.pause();
          oldAudio.src = '';
          try {
            oldAudio.remove();
          } catch(e){}
        }
      }, 50);
    }

    // Play new track natively to bypass strict CORS blocks (silent mutes in Web Audio)
    streamAudio = new Audio(trackUrl);
    streamAudio.loop = true;
    streamAudio.dataset.url = trackUrl;
    
    // Smooth volume fade-in
    const targetVol = enabled ? musicVolume : 0.0;
    streamAudio.volume = 0.0;

    streamAudio.play().then(() => {
      let fadeInInterval = setInterval(() => {
        if (!streamAudio) {
          clearInterval(fadeInInterval);
          return;
        }
        if (streamAudio.volume < targetVol - 0.05) {
          streamAudio.volume += 0.05;
        } else {
          streamAudio.volume = targetVol;
          clearInterval(fadeInInterval);
        }
      }, 50);
    }).catch(e => {
      console.warn("Audio play failed. User interaction probably required:", e);
    });
  }

  function stopOrchestralBgm() {
    if (streamAudio) {
      streamAudio.pause();
      streamAudio.src = '';
      try {
        streamAudio.remove();
      } catch(e){}
      streamAudio = null;
    }
  }

  /* ── BGM SUB-ENGINE: PROCEDURAL SYNTHESIZER ── */
  function getSceneChords(scene) {
    // Return lush chord frequencies [chord1, chord2, chord3, chord4]
    // where each chord is an array of notes
    const dict = {
      title: [
        [FREQS.C3, FREQS.Eb3, FREQS.G3, FREQS.C4],
        [FREQS.Ab2, FREQS.C3, FREQS.Eb3, FREQS.Ab3],
        [FREQS.F2, FREQS.Ab2, FREQS.C3, FREQS.F3],
        [FREQS.G2, FREQS.B2, FREQS.D3, FREQS.G3]
      ],
      office: [
        [FREQS.D3, FREQS.F3, FREQS.A3, FREQS.C4, FREQS.E4], // Dm9
        [FREQS.G2, FREQS.B3, FREQS.D4, FREQS.F4],          // G7
        [FREQS.C3, FREQS.E3, FREQS.G3, FREQS.B3],          // Cmaj7
        [FREQS.F2, FREQS.A3, FREQS.C4, FREQS.E4]           // Fmaj7
      ],
      parliament: [
        [FREQS.D3, FREQS.F3, FREQS.A3, FREQS.C4, FREQS.E4],
        [FREQS.G2, FREQS.B3, FREQS.D4, FREQS.F4],
        [FREQS.C3, FREQS.E3, FREQS.G3, FREQS.B3],
        [FREQS.F2, FREQS.A3, FREQS.C4, FREQS.E4]
      ],
      diplomacy: [
        [FREQS.D3, FREQS.F3, FREQS.A3, FREQS.C4, FREQS.E4],
        [FREQS.G2, FREQS.B3, FREQS.D4, FREQS.F4],
        [FREQS.C3, FREQS.E3, FREQS.G3, FREQS.B3],
        [FREQS.F2, FREQS.A3, FREQS.C4, FREQS.E4]
      ],
      crisis: [
        [FREQS.E3, FREQS.G3, FREQS.B3, FREQS.E4], // Em
        [FREQS.C3, FREQS.E3, FREQS.G3, FREQS.C4], // C
        [FREQS.A2, FREQS.C3, FREQS.E3, FREQS.A3], // Am
        [FREQS.B2, FREQS.Eb3, FREQS.Fs3, FREQS.A3] // B7
      ],
      protest: [
        [FREQS.Fs3, FREQS.A3, FREQS.Csh4, FREQS.Fs4], // F#m
        [FREQS.D3, FREQS.Fsh3, FREQS.A3, FREQS.D4],   // D
        [FREQS.B2, FREQS.D3, FREQS.Fsh3, FREQS.B3],   // Bm
        [FREQS.Csh3, FREQS.F3, FREQS.Gsh3, FREQS.Csh4] // C#
      ],
      cyber: [
        [FREQS.A2, FREQS.C3, FREQS.E3, FREQS.A3],
        [FREQS.F2, FREQS.A3, FREQS.C4],
        [FREQS.D2, FREQS.F3, FREQS.A3],
        [FREQS.E2, FREQS.Gsh3, FREQS.B3]
      ],
      factory: [
        [FREQS.A2, FREQS.C3, FREQS.E3, FREQS.A3],
        [FREQS.F2, FREQS.A3, FREQS.C4],
        [FREQS.D2, FREQS.F3, FREQS.A3],
        [FREQS.E2, FREQS.Gsh3, FREQS.B3]
      ],
      victory: [
        [FREQS.C3, FREQS.E3, FREQS.G3, FREQS.C4], // C
        [FREQS.G2, FREQS.B3, FREQS.D4],          // G
        [FREQS.A2, FREQS.C3, FREQS.E3, FREQS.A3], // Am
        [FREQS.F2, FREQS.A3, FREQS.C4]           // F
      ],
      gameover: [
        [FREQS.A2, FREQS.C3, FREQS.E3, FREQS.A3], // Am
        [FREQS.F2, FREQS.Ab3, FREQS.C4],          // Fm
        [FREQS.Csh3, FREQS.E3, FREQS.Gsh3],       // C#m
        [FREQS.E2, FREQS.Gsh3, FREQS.C4]          // Eaug
      ]
    };
    return dict[scene] || dict.office;
  }

  function getSceneBaseFreqs(scene) {
    const dict = {
      title: [FREQS.C2, FREQS.Ab2, FREQS.F2, FREQS.G2],
      office: [FREQS.D2, FREQS.G2, FREQS.C2, FREQS.F2],
      parliament: [FREQS.D2, FREQS.G2, FREQS.C2, FREQS.F2],
      diplomacy: [FREQS.D2, FREQS.G2, FREQS.C2, FREQS.F2],
      crisis: [FREQS.E2, FREQS.C2, FREQS.A2, FREQS.B2],
      protest: [FREQS.Fs2, FREQS.D2, FREQS.B2, FREQS.Csh2],
      cyber: [FREQS.A2, FREQS.F2, FREQS.D2, FREQS.E2],
      factory: [FREQS.A2, FREQS.F2, FREQS.D2, FREQS.E2],
      victory: [FREQS.C2, FREQS.G2, FREQS.A2, FREQS.F2],
      gameover: [FREQS.A2, FREQS.F2, FREQS.Csh2, FREQS.E2]
    };
    return dict[scene] || dict.office;
  }

  function playProceduralBgm(scene) {
    stopProceduralBgm();
    
    activeChords = getSceneChords(scene);
    activeBaseFreqs = getSceneBaseFreqs(scene);
    
    nextNoteTime = ctx.currentTime + 0.1;
    stepIndex = 0;

    sequencerTimer = setInterval(() => {
      if (!ctx || ctx.state === 'suspended' || !enabled) return;
      const lookahead = 0.3; // schedule ahead window
      while (nextNoteTime < ctx.currentTime + lookahead) {
        scheduleProceduralNote(stepIndex, nextNoteTime, scene);
        nextNoteTime += stepDuration;
        stepIndex = (stepIndex + 1) % 32;
      }
    }, 80);
  }

  function stopProceduralBgm() {
    if (sequencerTimer) {
      clearInterval(sequencerTimer);
      sequencerTimer = null;
    }
    
    // Stop any active oscillator pads
    activePads.forEach(node => {
      try {
        node.gainNode.gain.cancelScheduledValues(ctx.currentTime);
        node.gainNode.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
        node.oscNode.stop(ctx.currentTime + 0.4);
      } catch(e){}
    });
    activePads = [];
  }

  function scheduleProceduralNote(step, time, scene) {
    const chordIdx = Math.floor(step / 8) % 4;
    const currentChord = activeChords[chordIdx];
    const baseFreq = activeBaseFreqs[chordIdx];

    const isCrisis = scene === 'crisis' || scene === 'protest';

    // 1. BACKING LUSH MODERN STRINGS (Juno-style detuned warm saw pads)
    if (step === 0 || step === 16) {
      // Clear old pads
      activePads.forEach((node) => {
        try {
          node.gainNode.gain.cancelScheduledValues(time);
          node.gainNode.gain.linearRampToValueAtTime(0.0001, time + 1.2);
          node.oscNode.stop(time + 1.3);
        } catch(e){}
      });
      activePads = [];

      // Create new chord pad layers (2 detuned saw oscillators per note, filtered low)
      currentChord.slice(0, 3).forEach((freq, idx) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gNode = ctx.createGain();
        
        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        
        osc1.frequency.setValueAtTime(freq, time);
        osc2.frequency.setValueAtTime(freq + (isCrisis ? 2.5 : 1.2), time); // Detuned chorus

        // Modern lowpass filter to make it lush, wide and warm
        const padFilter = ctx.createBiquadFilter();
        padFilter.type = 'lowpass';
        padFilter.frequency.setValueAtTime(isCrisis ? 680 : 480, time);
        padFilter.Q.setValueAtTime(1.5, time);

        // Lush slow envelope
        gNode.gain.setValueAtTime(0.0001, time);
        gNode.gain.linearRampToValueAtTime(isCrisis ? 0.045 : 0.065, time + 1.0);
        gNode.gain.setValueAtTime(isCrisis ? 0.045 : 0.065, time + 2.8);
        gNode.gain.linearRampToValueAtTime(0.0001, time + 3.8);

        osc1.connect(padFilter);
        osc2.connect(padFilter);
        padFilter.connect(gNode);
        gNode.connect(musicGain);

        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + 4.0);
        osc2.stop(time + 4.0);

        activePads.push({ oscNode: osc1, gainNode: gNode });
        activePads.push({ oscNode: osc2, gainNode: gNode });
      });
    }

    // 2. SYNTH BASS (Deep sub triangle + punchy Moog-style saw bite)
    const isBassStep = [0, 3, 6, 8, 11, 14, 16, 19, 22, 24, 27, 30].includes(step);
    if (isBassStep) {
      const subOsc = ctx.createOscillator();
      const midOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      const bassFilter = ctx.createBiquadFilter();

      subOsc.type = 'triangle'; // Sub weight
      midOsc.type = 'sawtooth';  // Modern bite
      
      const isFifth = [3, 11, 19, 27].includes(step);
      const noteFreq = isFifth ? baseFreq * 1.5 : baseFreq;
      
      subOsc.frequency.setValueAtTime(noteFreq, time);
      midOsc.frequency.setValueAtTime(noteFreq, time);

      // Filter Moog style low at 160Hz
      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(isCrisis ? 220 : 160, time);
      bassFilter.Q.setValueAtTime(2.0, time);

      bassGain.gain.setValueAtTime(0.0001, time);
      bassGain.gain.linearRampToValueAtTime(isCrisis ? 0.20 : 0.16, time + 0.02);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.32);

      subOsc.connect(bassFilter);
      midOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(musicGain);

      subOsc.start(time);
      midOsc.start(time);
      subOsc.stop(time + 0.35);
      midOsc.stop(time + 0.35);
    }

    // 3. MODERN CRISP CLOCK TICKING / HIGH-HAT
    const isTickStep = isCrisis ? true : (step % 2 === 0);
    if (isTickStep) {
      const tickNoise = ctx.createBufferSource();
      tickNoise.buffer = getNoiseBuffer();
      if (tickNoise.buffer) {
        const tickFilter = ctx.createBiquadFilter();
        const tickGain = ctx.createGain();

        // Highpass filter for modern high-end crispness!
        tickFilter.type = 'highpass';
        tickFilter.frequency.setValueAtTime(isCrisis ? 10200 : 9200, time);

        const isStrongBeat = step % 4 === 0;
        const tickVol = isStrongBeat ? 0.038 : 0.018;

        tickGain.gain.setValueAtTime(tickVol, time);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.007);

        tickNoise.connect(tickFilter);
        tickFilter.connect(tickGain);
        tickGain.connect(musicGain);

        tickNoise.start(time);
        tickNoise.stop(time + 0.012);
      }
    }

    // 4. SNAPPY MODERN SYNTH PLUCK ARPEGGIATION
    const isMelodyStep = [2, 4, 6, 10, 12, 14, 18, 20, 22, 26, 28, 30].includes(step);
    if (isMelodyStep && Math.random() < (isCrisis ? 0.58 : 0.38)) {
      const melOsc1 = ctx.createOscillator();
      const melOsc2 = ctx.createOscillator();
      const melFilter = ctx.createBiquadFilter();
      const melGain = ctx.createGain();

      melOsc1.type = 'triangle';
      melOsc2.type = 'sawtooth';
      
      const chordNotes = currentChord.slice(isCrisis ? 1 : 2);
      const randomNote = chordNotes[Math.floor(Math.random() * chordNotes.length)];
      
      const pitchMultiplier = scene === 'victory' ? 2.0 : scene === 'gameover' ? 0.5 : 1.0;
      const noteFreq = randomNote * pitchMultiplier;
      melOsc1.frequency.setValueAtTime(noteFreq, time);
      melOsc2.frequency.setValueAtTime(noteFreq + 2, time);

      // Fast Pluck Snappy Lowpass Filter Sweep!
      melFilter.type = 'lowpass';
      melFilter.frequency.setValueAtTime(3200, time);
      melFilter.frequency.exponentialRampToValueAtTime(250, time + 0.14);
      melFilter.Q.setValueAtTime(3.5, time);

      melGain.gain.setValueAtTime(0.0001, time);
      melGain.gain.linearRampToValueAtTime(isCrisis ? 0.045 : 0.065, time + 0.01);
      melGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.45);

      melOsc1.connect(melFilter);
      melOsc2.connect(melFilter);
      melFilter.connect(melGain);
      melGain.connect(musicGain);

      melOsc1.start(time);
      melOsc2.start(time);
      melOsc1.stop(time + 0.5);
      melOsc2.stop(time + 0.5);
    }
  }

  return {
    unlock,
    toggle,
    isEnabled,
    setMusicVolume,
    setSfxVolume,
    setAudioMode,
    getVolumes,
    getAudioMode,
    getAnalyser,
    play,
    setScene,
    stopBgm
  };
})();
