/* ═══════════════════════════════════════════════════════
   CONFIG — Game Constants
   ═══════════════════════════════════════════════════════ */

const GROUP_NAMES = {
  tuban:    'Tư Bản',
  congnhan: 'Công Nhân',
  nongdan:  'Nông Dân',
  triThuc:  'Trí Thức',
  danToc:   'Dân Tộc'
};

const GROUP_COLORS = {
  tuban:    '#e8c04a',
  congnhan: '#e74c3c',
  nongdan:  '#2ecc71',
  triThuc:  '#3498db',
  danToc:   '#9b59b6'
};

const GROUP_ICONS = {
  tuban:    '🏦',
  congnhan: '⚒️',
  nongdan:  '🌾',
  triThuc:  '🎓',
  danToc:   '🏔️'
};

const RESOURCE_NAMES = {
  nganSach:   'Ngân Sách',
  onDinhCT:   'Ổn Định',
  tangTruong: 'Tăng Trưởng'
};

const INITIAL_STATE = {
  year: 1,
  quarter: 1,
  approval: {
    tuban:    65,
    congnhan: 40,
    nongdan:  55,
    triThuc:  70,
    danToc:   50,
  },
  resources: {
    nganSach:   100,
    onDinhCT:   80,
    tangTruong: 3.2,
  }
};

const TOTAL_QUARTERS = 16;
