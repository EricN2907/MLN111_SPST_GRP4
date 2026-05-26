/* DOM rendering and presentation helpers. */

const UI = (() => {
  window.removeBg = function(img) {
    if (img.dataset.processed) return;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Green Screen Chroma Key
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      // If the pixel is predominantly green
      if (g > r + 30 && g > b + 30 && g > 80) {
        data[i+3] = 0; // Make transparent
      } else if (g > r + 15 && g > b + 15 && g > 60) {
        // Semi-transparent for softer edges
        data[i+3] = 120;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    img.src = canvas.toDataURL();
    img.dataset.processed = "true";
    img.style.opacity = "1";
  };
  const $ = (id) => document.getElementById(id);
  let typeTimer = null;

  function show(id) {
    const el = $(id);
    if (el) el.classList.remove('hidden');
  }

  function hide(id) {
    const el = $(id);
    if (el) el.classList.add('hidden');
  }

  let visualizerActive = false;
  let visualizerAnimFrame = null;

  function init(callbacks) {
    $('start-game').addEventListener('click', callbacks.onStart);
    $('continue-game').addEventListener('click', callbacks.onContinue);
    $('howto-open').addEventListener('click', () => show('howto'));
    $('howto-close').addEventListener('click', () => hide('howto'));
    $('save-game').addEventListener('click', callbacks.onSave);
    $('new-game').addEventListener('click', callbacks.onNewGame);

    // Audio Buttons - Open Settings Modal instead of simple toggle
    $('audio-toggle').addEventListener('click', () => openAudioSettings());
    $('title-audio-toggle').addEventListener('click', () => openAudioSettings());
    $('audio-settings-close').addEventListener('click', () => closeAudioSettings());

    // Volume Sliders & BGM Selector
    const musicSlider = $('music-volume');
    const sfxSlider = $('sfx-volume');
    const audioModeSelect = $('audio-mode');

    musicSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      $('music-val').textContent = `${val}%`;
      GameAudio.setMusicVolume(val);
    });

    sfxSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      $('sfx-val').textContent = `${val}%`;
      GameAudio.setSfxVolume(val);
    });

    audioModeSelect.addEventListener('change', (e) => {
      GameAudio.setAudioMode(e.target.value);
    });

    // Sound Test Buttons
    document.querySelectorAll('.btn-test').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sfx = btn.dataset.sfx;
        GameAudio.play(sfx);
      });
    });

    // Sync initial state
    syncAudioSettingsUI();
  }

  function syncAudioSettingsUI() {
    const volumes = GameAudio.getVolumes();
    const mode = GameAudio.getAudioMode();
    const enabled = GameAudio.isEnabled();

    $('music-volume').value = volumes.musicVolume;
    $('music-val').textContent = `${volumes.musicVolume}%`;

    $('sfx-volume').value = volumes.sfxVolume;
    $('sfx-val').textContent = `${volumes.sfxVolume}%`;

    $('audio-mode').value = mode;

    $('audio-toggle').classList.toggle('active', enabled);
    $('title-audio-toggle').classList.toggle('active', enabled);
  }

  function openAudioSettings() {
    GameAudio.unlock();
    if (!GameAudio.isEnabled()) {
      GameAudio.toggle(); // Turn on by default when clicking setting
    }
    syncAudioSettingsUI();
    show('audio-settings-modal');
    startVisualizer();
  }

  function closeAudioSettings() {
    hide('audio-settings-modal');
    stopVisualizer();
  }

  function startVisualizer() {
    visualizerActive = true;
    const canvas = $('audio-visualizer');
    const canvasCtx = canvas.getContext('2d');
    const analyser = GameAudio.getAnalyser();
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
      if (!visualizerActive) return;
      visualizerAnimFrame = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      // Ink dark translucent bg
      canvasCtx.fillStyle = 'rgba(12, 14, 20, 0.45)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 1.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.95;

        // Custom golden gradient (from dark gold to brilliant light yellow)
        const red = 201;
        const green = 150 + Math.floor(barHeight * 1.25);
        const blue = 26;

        canvasCtx.fillStyle = `rgb(${red}, ${Math.min(255, green)}, ${blue})`;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

        x += barWidth;
      }
    }
    draw();
  }

  function stopVisualizer() {
    visualizerActive = false;
    if (visualizerAnimFrame) cancelAnimationFrame(visualizerAnimFrame);
  }

  function setAudioEnabled(enabled) {
    ['audio-toggle', 'title-audio-toggle'].forEach((id) => {
      const el = $(id);
      if (el) el.classList.toggle('active', enabled);
    });
  }

  function setContinueEnabled(enabled) {
    $('continue-game').disabled = !enabled;
  }

  function enterGameScreen() {
    hide('title-screen');
    show('hud');
    show('game-area');
  }

  function changeScene(scene) {
    const bg = $('bg');
    bg.className = `bg-${scene || 'office'}`;
    renderSceneDetails(scene || 'office');
    ParticleLayer.setScene(scene || 'office');
    GameAudio.setScene(scene || 'office');
  }

  function renderHUD(state) {
    const done = Math.min(state.turn, TOTAL_QUARTERS);
    $('hud-time').textContent = `NĂM ${state.year} - QUÝ ${state.quarter} / ${TOTAL_QUARTERS}`;
    $('hud-prog').style.width = `${done / TOTAL_QUARTERS * 100}%`;
    $('hud-stats').innerHTML = Object.entries(state.approval).map(([key, value]) => `
      <div class="hud-stat" title="${GROUP_NAMES[key]}">
        <span class="hud-stat-val" style="color:${valueColor(value)}">${formatValue(value)}</span>
        <span class="hud-stat-label">${GROUP_NAMES[key].split(' ')[0]}</span>
      </div>
    `).join('');
  }

  function renderDashboard(state) {
    $('approval-bars').innerHTML = Object.entries(state.approval).map(([key, value]) => `
      <div class="stat-row" data-key="${key}">
        <div class="stat-header">
          <span class="stat-name">${GROUP_ICONS[key] || ''} ${GROUP_NAMES[key]}</span>
          <span><span class="stat-val" style="color:${valueColor(value)}">${formatValue(value)}</span><span class="stat-delta"></span></span>
        </div>
        <div class="stat-bar"><div class="stat-fill" style="width:${clamp(value, 0, 100)}%;background:${barColor(value)}"></div></div>
      </div>
    `).join('');

    const ns = state.resources.nganSach;
    const od = state.resources.onDinhCT;
    const tg = state.resources.tangTruong;
    $('resource-bars').innerHTML = `
      ${resourceRow('nganSach', 'Ngân Sách Quốc Gia', ns, '💰', clamp((ns + 100) / 2, 0, 100), ns > 20 ? '#3498db' : '#c0392b', Math.round(ns))}
      ${resourceRow('onDinhCT', 'Ổn Định Chính Trị', od, '⚖', clamp(od, 0, 100), od > 40 ? '#9b59b6' : '#c0392b', Math.round(od))}
      ${resourceRow('tangTruong', 'Tăng Trưởng GDP (%)', tg, '↗', clamp(tg * 15, 0, 100), tg > 2 ? '#27ae60' : tg > 0 ? '#f39c12' : '#c0392b', tg.toFixed(1))}
    `;

    $('risk-list').innerHTML = `
      <div class="risk-row"><span>Nhóm xã hội bất kỳ</span><strong>0</strong></div>
      <div class="risk-row"><span>Ngân sách</span><strong>&lt; -50</strong></div>
      <div class="risk-row"><span>Ổn định CT</span><strong>&lt; 20</strong></div>
    `;

    updateHistory(state.history);
  }

  function resourceRow(key, label, rawValue, icon, pct, color, displayValue) {
    return `
      <div class="resource-item" data-key="${key}">
        <div class="resource-icon">${icon}</div>
        <div class="resource-body">
          <div class="resource-name">${label}</div>
          <div class="resource-bar-wrap"><div class="resource-bar-fill" style="width:${pct}%;background:${color}"></div></div>
        </div>
        <div class="resource-val" style="color:${resourceColor(key, rawValue)}"><span class="stat-val">${displayValue}</span><span class="stat-delta"></span></div>
      </div>
    `;
  }

  function revealCrisis(card, label, onStartReport) {
    const el = $('crisis-reveal');
    el.innerHTML = `
      <div class="crisis-card">
        <div class="crisis-q-badge">${label}</div>
        <div class="crisis-meta">
          <span class="meta-pill">${card.category}</span>
          <span class="meta-pill">${sceneLabel(card.bg)}</span>
        </div>
        <div class="crisis-title">${card.title}</div>
        <div class="crisis-desc">${card.desc}</div>
        <button class="btn-pres" id="start-report">Nghe báo cáo</button>
      </div>
    `;
    $('start-report').addEventListener('click', onStartReport);
    GameAudio.play('crisis');
    show('crisis-reveal');
  }

  function hideCrisis() {
    hide('crisis-reveal');
  }

  function showCharacter(key) {
    const ch = CHARS[key] || CHARS.huy;
    $('char-svg').innerHTML = ch.svg;
    const wrapper = $('char-wrapper');
    wrapper.className = 'char-hidden';
    requestAnimationFrame(() => {
      wrapper.className = 'char-visible';
    });
  }

  function hideCharacter() {
    $('char-wrapper').className = 'char-hidden';
  }

  function setSpeaker(name, title) {
    $('speaker-name').textContent = name;
    $('speaker-title-tag').textContent = title;
  }

  function typewrite(text, onDone) {
    clearTypewriter();
    const el = $('dialogue-text');
    el.textContent = '';
    el.classList.add('type-cursor');
    let i = 0;
    typeTimer = setInterval(() => {
      if (i < text.length) {
        const char = text[i];
        el.textContent += text[i++];
        if (char !== ' ' && i % 2 === 0) GameAudio.play('type');
      } else {
        clearTypewriter();
        el.classList.remove('type-cursor');
        onDone?.();
      }
    }, 18);
  }

  function clearTypewriter() {
    if (typeTimer) clearInterval(typeTimer);
    typeTimer = null;
  }

  function waitForDialogueClick(callback) {
    const box = $('dialogue-box');
    const hint = $('continue-hint');
    hint.classList.remove('hidden');
    const handler = () => {
      hint.classList.add('hidden');
      box.removeEventListener('click', handler);
      callback();
    };
    box.addEventListener('click', handler, { once: true });
  }

  function showOptions(card, onSelect) {
    const panel = $('options-panel');
    panel.innerHTML = card.options.map((option, index) => `
      <button class="opt-card" data-option-index="${index}" type="button">
        <div class="opt-label">PHƯƠNG ÁN ${option.label}</div>
        <div class="opt-title">${option.title}</div>
        <div class="opt-desc">${option.desc}</div>
        <div class="opt-effects">${effectTags(option.effects)}</div>
      </button>
    `).join('');
    panel.querySelectorAll('.opt-card').forEach((button) => {
      button.addEventListener('mouseenter', () => GameAudio.play('hover'));
      button.addEventListener('click', () => onSelect(Number(button.dataset.optionIndex)));
    });
    $('dialogue-text').textContent = 'Thưa Thủ tướng, đây là các phương án chính sách:';
    $('dialogue-box').classList.add('options-mode');
    show('options-panel');
    hide('consequence-panel');
  }

  function hideOptions() {
    hide('options-panel');
    $('dialogue-box').classList.remove('options-mode');
  }

  function showConsequence(choice, deltas, ending, onNext, onEnding) {
    const panel = $('consequence-panel');
    const buttonText = ending ? 'Xem kết cục' : 'Quý tiếp theo';
    panel.innerHTML = `
      <div class="consequence-title">${choice.title}</div>
      <div class="consequence-text">${choice.consequence}</div>
      <div class="consequence-deltas">${deltaTags(deltas)}</div>
      <div class="modal-actions"><button class="btn-pres ${ending ? 'danger' : ''}" id="continue-quarter">${buttonText}</button></div>
    `;
    $('continue-quarter').addEventListener('click', ending ? onEnding : onNext);
    $('dialogue-text').textContent = '';
    setSpeaker('Kết Quả Chính Sách', ending ? 'Ngưỡng nguy hiểm đã bị phá vỡ' : 'Báo cáo tác động tức thời');
    show('consequence-panel');
  }

  function applyDeltaAnimations(deltas, state) {
    Object.entries(deltas).forEach(([key, delta]) => {
      const value = key in state.approval ? state.approval[key] : state.resources[key];
      document.querySelectorAll(`[data-key="${key}"]`).forEach((row) => {
        row.querySelectorAll('.stat-delta').forEach((el) => {
          el.textContent = formatDelta(delta);
          el.className = `stat-delta show ${delta > 0 ? 'delta-up' : delta < 0 ? 'delta-dn' : ''}`;
          setTimeout(() => el.classList.remove('show'), 2200);
        });
        row.querySelectorAll('.stat-val').forEach((el) => {
          el.textContent = key === 'tangTruong' ? Number(value).toFixed(1) : formatValue(value);
          el.style.color = key in state.approval ? valueColor(value) : resourceColor(key, value);
        });
      });
      spawnFloatingNumber(key, delta);
    });
  }

  function updateHistory(history) {
    if (!history.length) {
      $('history-section').style.display = 'none';
      return;
    }
    $('history-section').style.display = 'block';
    $('history-list').innerHTML = history.slice(-7).reverse().map((item) => `
      <div>[${item.label}] ${item.choice} - ${truncate(item.title, 34)}</div>
    `).join('');
  }

  function showGameOver(reason, state, score) {
    hideCharacter();
    const typeText = {
      approval: `CÁCH MẠNG - ${reason.group} Nổi Dậy`,
      budget: 'KHỦNG HOẢNG TÀI CHÍNH',
      stability: 'ĐẢO CHÍNH - MẤT KIỂM SOÁT'
    }[reason.type] || 'KẾT THÚC NHIỆM KỲ';

    const el = $('endscreen');
    el.className = 'endscreen-bg-fail';
    el.innerHTML = `
      <div class="end-title" style="color:var(--red2)">GÃY GHẾ</div>
      <div class="end-subtitle" style="color:var(--red2)">${typeText}</div>
      <div class="end-reason">${reason.reason}<br><br>Nhiệm kỳ kết thúc sớm vào <strong>Năm ${state.year}, Quý ${state.quarter}</strong>.</div>
      <div class="end-score">${scoreRows(state)}<div class="end-score-row total"><span>Điểm lãnh đạo cuối</span><span style="color:var(--gold2)">${score} / 100</span></div></div>
      <div class="end-buttons"><button class="btn-pres danger" id="restart-end">Thử lại</button></div>
    `;
    $('restart-end').addEventListener('click', () => window.location.reload());
    show('endscreen');
  }

  function showVictory(state, score) {
    hideCharacter();
    const grade = score >= 78 ? 'XUẤT SẮC' : score >= 60 ? 'TỐT' : score >= 45 ? 'TRUNG BÌNH' : 'TRỤ ĐƯỢC NHƯNG RẠN NỨT';
    const el = $('endscreen');
    el.className = 'endscreen-bg-win';
    el.innerHTML = `
      <div class="end-title" style="color:var(--gold2)">HOÀN THÀNH NHIỆM KỲ</div>
      <div class="end-subtitle" style="color:var(--gold)">${grade}</div>
      <div class="end-reason">Bạn đã đi qua 4 năm đầy va chạm. Lịch sử không chỉ ghi nhớ ai còn ngồi trên ghế, mà còn ghi nhớ ai đã phải trả giá cho chiếc ghế đó.</div>
      <div class="end-score"><div class="end-score-label">Bảng cân bằng cuối nhiệm kỳ</div>${scoreRows(state)}<div class="end-score-row total"><span>Điểm tổng hòa</span><span style="color:var(--gold2)">${score} / 100</span></div></div>
      <div class="end-buttons"><button class="btn-pres" id="restart-end">Chơi lại</button></div>
    `;
    $('restart-end').addEventListener('click', () => window.location.reload());
    show('endscreen');
  }

  function toast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    $('toast-root').appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }

  function flash(kind) {
    const el = $('screen-flash');
    el.className = kind === 'good' ? 'flash-good' : 'flash-bad';
    setTimeout(() => { el.className = ''; }, 520);
  }

  function shake() {
    document.body.classList.remove('screen-shake');
    void document.body.offsetWidth;
    document.body.classList.add('screen-shake');
  }

  function scoreRows(state) {
    return `
      ${Object.entries(state.approval).map(([key, value]) => `<div class="end-score-row"><span>${GROUP_NAMES[key]}</span><span style="color:${valueColor(value)}">${Math.round(value)}%</span></div>`).join('')}
      <div class="end-score-row"><span>Ngân sách</span><span style="color:${resourceColor('nganSach', state.resources.nganSach)}">${Math.round(state.resources.nganSach)}</span></div>
      <div class="end-score-row"><span>Ổn định CT</span><span style="color:${resourceColor('onDinhCT', state.resources.onDinhCT)}">${Math.round(state.resources.onDinhCT)}</span></div>
      <div class="end-score-row"><span>Tăng trưởng</span><span style="color:${resourceColor('tangTruong', state.resources.tangTruong)}">${state.resources.tangTruong.toFixed(1)}%</span></div>
    `;
  }

  function effectTags(effects) {
    return Object.entries(effects).map(([key, delta]) => {
      const name = GROUP_NAMES[key] || RESOURCE_NAMES[key] || key;
      const cls = delta > 0 ? 'eff-pos' : delta < 0 ? 'eff-neg' : 'neutral';
      return `<span class="eff-tag ${cls}">${name} ${formatDelta(delta)}</span>`;
    }).join('');
  }

  function deltaTags(deltas) {
    return Object.entries(deltas).map(([key, delta], index) => {
      const name = GROUP_NAMES[key] || RESOURCE_NAMES[key] || key;
      const cls = delta > 0 ? 'delta-up' : delta < 0 ? 'delta-dn' : 'neutral';
      return `<span class="cdelta ${cls}" style="animation-delay:${index * 0.06}s">${name}: ${formatDelta(delta)}</span>`;
    }).join('');
  }

  function spawnFloatingNumber(key, delta) {
    if (!delta) return;
    const targetEl = document.querySelector(`[data-key="${key}"]`);
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const floater = document.createElement('div');
    floater.className = `floating-number ${delta > 0 ? 'float-up' : 'float-down'}`;
    floater.textContent = formatDelta(delta);
    floater.style.left = `${rect.right - 52 + (Math.random() - 0.5) * 42}px`;
    floater.style.top = `${rect.top - 10}px`;
    document.body.appendChild(floater);
    setTimeout(() => floater.remove(), 1500);
  }

  function sceneLabel(scene) {
    const labels = {
      office: 'Văn phòng',
      factory: 'Khu công nghiệp',
      protest: 'Đường phố',
      village: 'Vùng nông thôn',
      parliament: 'Quốc hội',
      hospital: 'Bệnh viện',
      cyber: 'Không gian số',
      classroom: 'Giáo dục',
      diplomacy: 'Ngoại giao'
    };
    return labels[scene] || 'Phòng tình huống';
  }

  function valueColor(value) {
    if (value > 60) return '#6ee89a';
    if (value > 30) return '#f39c12';
    return '#ff6b5b';
  }

  function resourceColor(key, value) {
    if (key === 'nganSach') return value > 20 ? '#6ab8e8' : '#ff6b5b';
    if (key === 'onDinhCT') return value > 40 ? '#c39bd3' : '#ff6b5b';
    return value > 2 ? '#6ee89a' : value > 0 ? '#f5cba7' : '#ff6b5b';
  }

  function barColor(value) {
    if (value > 60) return '#27ae60';
    if (value > 30) return '#f39c12';
    return '#c0392b';
  }

  function formatValue(value) {
    return Number.isInteger(value) ? String(Math.round(value)) : value.toFixed(1);
  }

  function formatDelta(delta) {
    const value = Number.isInteger(delta) ? Math.round(delta) : delta.toFixed(1);
    return `${delta > 0 ? '+' : ''}${value}`;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function truncate(text, length) {
    return text.length > length ? `${text.slice(0, length - 1)}...` : text;
  }

  return {
    $,
    init,
    show,
    hide,
    setAudioEnabled,
    setContinueEnabled,
    enterGameScreen,
    changeScene,
    renderHUD,
    renderDashboard,
    revealCrisis,
    hideCrisis,
    showCharacter,
    hideCharacter,
    setSpeaker,
    typewrite,
    waitForDialogueClick,
    showOptions,
    hideOptions,
    showConsequence,
    applyDeltaAnimations,
    showGameOver,
    showVictory,
    toast,
    flash,
    shake
  };
})();
