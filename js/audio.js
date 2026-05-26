/* Lightweight Web Audio soundscape. No external sound files required. */

const GameAudio = (() => {
  let ctx = null;
  let enabled = false;
  let ambientNodes = [];

  function unlock() {
    if (!ctx) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return false;
      ctx = new AudioCtor();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }

  function isEnabled() {
    return enabled;
  }

  function toggle() {
    unlock();
    enabled = !enabled;
    if (!enabled) stopAmbient();
    else play('click');
    return enabled;
  }

  function play(type) {
    if (!enabled || !unlock()) return;
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, now);

    if (type === 'negative') {
      tone(96, 0.32, 'sawtooth', gain, 0.12);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);
      return;
    }

    if (type === 'positive') {
      chord([392, 494, 587], 0.36, gain, 0.055);
      return;
    }

    if (type === 'card') {
      tone(140, 0.16, 'triangle', gain, 0.08);
      setTimeout(() => tone(220, 0.2, 'triangle', gain, 0.055), 90);
      return;
    }

    if (type === 'ending') {
      chord([196, 247, 294, 392], 0.9, gain, 0.055);
      return;
    }

    if (type === 'hover') {
      tone(500, 0.04, 'sine', gain, 0.015);
      return;
    }

    if (type === 'crisis') {
      tone(110, 0.4, 'square', gain, 0.15);
      setTimeout(() => tone(70, 0.9, 'sawtooth', gain, 0.2), 80);
      return;
    }

    const freq = type === 'type' ? 620 : type === 'select' ? 280 : 430;
    tone(freq, type === 'type' ? 0.025 : 0.08, 'sine', gain, type === 'type' ? 0.018 : 0.045);
  }

  function tone(freq, duration, wave, output, volume) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(g);
    g.connect(output);
    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  function chord(freqs, duration, output, volume) {
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.connect(output);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(volume, now + 0.03);
    master.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.035);
      osc.connect(master);
      osc.start(now + index * 0.035);
      osc.stop(now + duration + 0.05);
    });
  }

  function setScene(scene) {
    if (!enabled || !unlock()) return;
    stopAmbient();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.linearRampToValueAtTime(0.035, now + 0.8);
    master.connect(ctx.destination);
    ambientNodes.push(master);

    const profiles = {
      office: [68, 137],
      factory: [55, 92, 184],
      protest: [74, 148],
      village: [110, 220],
      parliament: [82, 164],
      hospital: [88, 176, 704],
      cyber: [105, 210, 420],
      classroom: [96, 192],
      diplomacy: [72, 144]
    };

    (profiles[scene] || profiles.office).forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = index % 2 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(index === 2 ? 0.018 : 0.035, now);
      osc.connect(g);
      g.connect(master);
      osc.start(now);
      ambientNodes.push(osc, g);
    });
  }

  function stopAmbient() {
    if (!ctx) return;
    ambientNodes.forEach((node) => {
      try {
        if (node.gain) node.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        if (node.stop) node.stop(ctx.currentTime + 0.3);
      } catch (err) {
        // Node may already be stopped.
      }
    });
    ambientNodes = [];
  }

  return {
    unlock,
    toggle,
    isEnabled,
    play,
    setScene
  };
})();
