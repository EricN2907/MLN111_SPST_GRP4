/* Game flow orchestration. */

const Game = (() => {
  let pendingEnding = null;

  function init() {
    UI.init({
      onStart: startNewRun,
      onContinue: continueRun,
      onSave: saveRun,
      onNewGame: confirmNewRun,
      onToggleAudio: toggleAudio
    });
    UI.setContinueEnabled(GameState.hasSave());
    UI.setAudioEnabled(GameAudio.isEnabled());
    GameAudio.setScene('title');
  }

  function startNewRun() {
    GameAudio.unlock();
    GameAudio.play('click');
    GameState.newRun(CARDS.map((card) => card.id)); // NO SHUFFLE FOR DEMO
    UI.enterGameScreen();
    nextQuarter();
  }

  function continueRun() {
    GameAudio.unlock();
    GameAudio.play('click');
    const loaded = GameState.load();
    if (!loaded) {
      UI.toast('Không tìm thấy bản lưu hợp lệ.');
      UI.setContinueEnabled(false);
      return;
    }
    UI.enterGameScreen();
    UI.renderDashboard(loaded);
    UI.renderHUD(loaded);

    const ending = checkGameOver();
    if (ending) {
      showGameOver(ending);
      return;
    }

    const card = GameState.currentCard();
    if (loaded.turn >= TOTAL_QUARTERS) {
      showVictory();
      return;
    }
    if (card) {
      revealCurrentCard(card);
      return;
    }
    nextQuarter();
  }

  function saveRun() {
    const ok = GameState.save();
    UI.setContinueEnabled(GameState.hasSave());
    UI.toast(ok ? 'Đã lưu nhiệm kỳ.' : 'Không thể lưu nhiệm kỳ.');
    GameAudio.play(ok ? 'positive' : 'negative');
  }

  function confirmNewRun() {
    GameState.clearSave();
    window.location.reload();
  }

  function toggleAudio() {
    const enabled = GameAudio.toggle();
    UI.setAudioEnabled(enabled);
    const card = GameState.currentCard();
    if (enabled) GameAudio.setScene(card?.bg || 'office');
  }

  function nextQuarter() {
    pendingEnding = null;
    const state = GameState.get();
    if (state.turn >= TOTAL_QUARTERS) {
      showVictory();
      return;
    }

    const card = GameState.drawCard();
    applyQuarterDrift();
    UI.renderDashboard(GameState.get());
    UI.renderHUD(GameState.get());

    const ending = checkGameOver();
    if (ending) {
      showGameOver(ending);
      return;
    }

    if (card) revealCurrentCard(card);
  }

  function revealCurrentCard(card) {
    GameState.setPhase('reveal');
    UI.changeScene(card.bg || 'office');
    UI.hideCharacter();
    UI.hide('consequence-panel');
    UI.hide('options-panel');
    UI.setSpeaker('Văn phòng Thủ tướng', 'Phòng tình huống');
    UI.$('dialogue-text').textContent = '';
    UI.revealCrisis(card, quarterLabel(), startAdviserScene);
    GameAudio.play('card');
    GameState.save();
  }

  function startAdviserScene() {
    const card = GameState.currentCard();
    if (!card) return;
    GameState.setPhase('adviser');
    UI.hideCrisis();
    UI.hideOptions();
    UI.showCharacter(card.advisor);
    const advisor = CHARS[card.advisor] || CHARS.huy;
    UI.setSpeaker(advisor.name, advisor.title);
    UI.typewrite(card.advisorLine, () => {
      UI.waitForDialogueClick(() => showOptions(card));
    });
    GameState.save();
  }

  function showOptions(card) {
    GameState.setPhase('options');
    UI.showOptions(card, chooseOption);
    GameState.save();
  }

  function chooseOption(index) {
    const state = GameState.get();
    const card = GameState.currentCard();
    const choice = card?.options[index];
    if (!card || !choice) return;

    GameAudio.play('select');
    UI.hideOptions();

    const deltas = applyEffects(choice.effects);
    GameState.addHistory({
      label: quarterLabel(),
      cardId: card.id,
      title: card.title,
      choice: choice.label,
      option: choice.title,
      effects: deltas
    });

    UI.renderDashboard(state);
    UI.renderHUD(state);
    UI.applyDeltaAnimations(deltas, state);
    reactToDeltas(deltas);
    GameAudio.setScene(card.bg || 'office');

    pendingEnding = checkGameOver();
    GameState.setPhase('consequence');
    UI.showConsequence(
      choice,
      deltas,
      pendingEnding,
      advanceTime,
      () => showGameOver(pendingEnding)
    );
  }

  function applyQuarterDrift() {
    const state = GameState.get();
    Object.keys(state.approval).forEach((key) => {
      const target = 52;
      const current = state.approval[key];
      const drift = (target - current) * 0.015 + (Math.random() - 0.5) * 1.2;
      state.approval[key] = clamp(current + drift, 0, 100);
    });
  }

  function applyEffects(effects) {
    const state = GameState.get();
    const deltas = {};
    Object.entries(effects).forEach(([key, delta]) => {
      deltas[key] = delta;
      if (key in state.approval) {
        state.approval[key] = clamp(state.approval[key] + delta, 0, 100);
      } else if (key === 'onDinhCT') {
        state.resources[key] = clamp(state.resources[key] + delta, 0, 100);
      } else if (key === 'nganSach') {
        state.resources[key] = clamp(state.resources[key] + delta, -100, 180);
      } else if (key === 'tangTruong') {
        state.resources[key] = clamp(state.resources[key] + delta, -6, 10);
      }
    });
    return deltas;
  }

  function reactToDeltas(deltas) {
    const values = Object.values(deltas);
    const worst = Math.min(...values);
    const best = Math.max(...values);
    if (worst <= -20) {
      UI.shake();
      UI.flash('bad');
      GameAudio.play('negative');
    } else if (best >= 15) {
      UI.flash('good');
      GameAudio.play('positive');
    }
  }

  function advanceTime() {
    if (pendingEnding) {
      showGameOver(pendingEnding);
      return;
    }
    UI.hide('consequence-panel');
    UI.hideCharacter();
    GameState.advanceQuarter();
    if (GameState.get().turn >= TOTAL_QUARTERS) showVictory();
    else nextQuarter();
  }

  function checkGameOver() {
    const state = GameState.get();
    for (const [key, value] of Object.entries(state.approval)) {
      if (value <= 0) {
        return {
          type: 'approval',
          group: GROUP_NAMES[key],
          reason: `Nhóm ${GROUP_NAMES[key]} đã hoàn toàn mất niềm tin vào Chính phủ. Liên minh phản kháng hình thành đủ rộng để kết thúc nhiệm kỳ.`
        };
      }
    }
    if (state.resources.nganSach < -50) {
      return {
        type: 'budget',
        reason: 'Ngân sách quốc gia cạn kiệt. Thị trường trái phiếu đóng băng, đồng tiền mất giá và chính phủ không còn khả năng tài trợ chính sách.'
      };
    }
    if (state.resources.onDinhCT < 20) {
      return {
        type: 'stability',
        reason: 'Ổn định chính trị rơi dưới ngưỡng kiểm soát. Các trung tâm quyền lực quay lưng và bộ máy hành chính tê liệt.'
      };
    }
    return null;
  }

  function calcScore() {
    const state = GameState.get();
    const appScore = average(Object.values(state.approval));
    const budgetScore = clamp((state.resources.nganSach + 60) / 1.6, 0, 100);
    const stabilityScore = clamp(state.resources.onDinhCT, 0, 100);
    const growthScore = clamp((state.resources.tangTruong + 2) / 7 * 100, 0, 100);
    return Math.round(appScore * 0.48 + budgetScore * 0.18 + stabilityScore * 0.22 + growthScore * 0.12);
  }

  function showGameOver(reason) {
    GameState.setPhase('gameover');
    GameState.save();
    GameAudio.play('negative');
    GameAudio.setScene('gameover');
    UI.showGameOver(reason, GameState.get(), calcScore());
  }

  function showVictory() {
    GameState.setPhase('victory');
    GameState.save();
    GameAudio.play('ending');
    GameAudio.setScene('victory');
    UI.showVictory(GameState.get(), calcScore());
  }

  function quarterLabel() {
    const state = GameState.get();
    return `NĂM ${state.year} - QUÝ ${state.quarter}`;
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function average(values) {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  return { init };
})();
