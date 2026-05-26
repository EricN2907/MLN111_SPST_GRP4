/* Central state and save/load layer. */

const GameState = (() => {
  const STORAGE_KEY = 'ghe-quyen-luc:v2';
  let state = createFreshState();

  function createFreshState() {
    return {
      version: 2,
      year: INITIAL_STATE.year,
      quarter: INITIAL_STATE.quarter,
      turn: 0,
      approval: { ...INITIAL_STATE.approval },
      resources: { ...INITIAL_STATE.resources },
      history: [],
      cardQueue: [],
      currentCardId: null,
      phase: 'title'
    };
  }

  function get() {
    return state;
  }

  function newRun(cardIds) {
    state = createFreshState();
    state.cardQueue = [...cardIds];
    state.phase = 'reveal';
    save();
    return state;
  }

  function setPhase(phase) {
    state.phase = phase;
  }

  function drawCard() {
    if (state.turn >= TOTAL_QUARTERS || state.cardQueue.length === 0) return null;
    state.currentCardId = state.cardQueue.shift();
    state.phase = 'reveal';
    save();
    return currentCard();
  }

  function currentCard() {
    return CARDS.find((card) => card.id === state.currentCardId) || null;
  }

  function advanceQuarter() {
    state.turn += 1;
    state.year = Math.floor(state.turn / 4) + 1;
    state.quarter = state.turn % 4 + 1;
    state.currentCardId = null;
    state.phase = state.turn >= TOTAL_QUARTERS ? 'victory' : 'reveal';
    save();
  }

  function addHistory(entry) {
    state.history.push(entry);
    save();
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (err) {
      console.warn('Save failed', err);
      return false;
    }
  }

  function hasSave() {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 2) return null;
      state = {
        ...createFreshState(),
        ...parsed,
        approval: { ...INITIAL_STATE.approval, ...parsed.approval },
        resources: { ...INITIAL_STATE.resources, ...parsed.resources },
        history: Array.isArray(parsed.history) ? parsed.history : [],
        cardQueue: Array.isArray(parsed.cardQueue) ? parsed.cardQueue : []
      };
      return state;
    } catch (err) {
      console.warn('Load failed', err);
      return null;
    }
  }

  function clearSave() {
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    get,
    newRun,
    setPhase,
    drawCard,
    currentCard,
    advanceQuarter,
    addHistory,
    save,
    hasSave,
    load,
    clearSave
  };
})();
