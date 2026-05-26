/* Mature anime visual-novel portrait overrides. */

function vnAdvisor(cfg) {
  const {
    id,
    name,
    title,
    color,
    accent,
    hair,
    outfit,
    eye,
    skin = ['#f3c59c', '#d98f62'],
    expression = 'calm',
    prop = '',
    accessory = ''
  } = cfg;

  const mouth = {
    calm: '<path d="M108,177 Q120,181 132,177" fill="none" stroke="#7d4248" stroke-width="2.2" stroke-linecap="round"/>',
    firm: '<path d="M107,178 Q120,176 133,178" fill="none" stroke="#713b40" stroke-width="2.5" stroke-linecap="round"/>',
    speak: '<path d="M109,174 Q120,168 131,174 Q130,187 120,190 Q110,187 109,174 Z" fill="#5a2230" stroke="#3b1821" stroke-width="2"/><path d="M113,173 Q120,170 127,173" fill="none" stroke="#fff0e4" stroke-width="2" stroke-linecap="round"/>',
    smile: '<path d="M106,175 Q120,185 135,175" fill="none" stroke="#82474c" stroke-width="2.4" stroke-linecap="round"/>',
    concerned: '<path d="M108,182 Q120,176 132,182" fill="none" stroke="#7d4248" stroke-width="2.3" stroke-linecap="round"/>'
  }[expression] || '';

  return {
    name,
    title,
    color,
    svg: `<svg class="anime-portrait vn-portrait" viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${id}-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${skin[0]}"/>
          <stop offset="100%" stop-color="${skin[1]}"/>
        </linearGradient>
        <linearGradient id="${id}-outfit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${outfit[0]}"/>
          <stop offset="100%" stop-color="${outfit[1]}"/>
        </linearGradient>
        <radialGradient id="${id}-rim" cx="50%" cy="36%" r="60%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.25"/>
          <stop offset="70%" stop-color="${accent}" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        <filter id="${id}-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="1.2" flood-color="rgba(7,8,18,0.64)"/>
        </filter>
      </defs>

      <ellipse cx="128" cy="250" rx="112" ry="148" fill="url(#${id}-rim)"/>
      <ellipse cx="128" cy="397" rx="88" ry="13" fill="rgba(0,0,0,0.32)"/>
      ${prop}

      <g filter="url(#${id}-shadow)">
        <path d="M30,420 L30,284 Q45,246 82,235 L100,228 L120,250 L141,228 L162,235 Q200,246 215,284 L215,420 Z"
          fill="url(#${id}-outfit)" stroke="#151521" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M77,255 C92,276 104,338 97,420 H148 C139,338 151,276 166,255 L141,228 L120,250 L100,228 Z"
          fill="rgba(255,255,255,0.14)"/>
        <path d="M101,229 Q120,250 140,229 L132,268 L120,288 L108,268 Z" fill="#fff0df" stroke="rgba(24,18,30,0.22)" stroke-width="1.3"/>
        <path d="M113,248 L127,248 L131,318 L120,340 L109,318 Z" fill="${color}" stroke="rgba(24,18,30,0.28)" stroke-width="1.2"/>
        <path d="M70,282 Q120,317 172,282" fill="none" stroke="${accent}" stroke-width="2.2" stroke-opacity="0.28"/>
      </g>

      <g filter="url(#${id}-shadow)">
        <rect x="103" y="190" width="34" height="42" rx="12" fill="url(#${id}-skin)" stroke="#5a3338" stroke-width="1.8"/>
        <path d="M103,207 Q120,219 137,207 L137,226 Q120,238 103,226 Z" fill="rgba(120,60,54,0.12)"/>
        <path d="${hair.back}" fill="${hair.base}" stroke="#15111b" stroke-width="3" stroke-linejoin="round"/>
        <ellipse cx="77" cy="151" rx="10" ry="17" fill="url(#${id}-skin)" stroke="#5a3338" stroke-width="1.8"/>
        <ellipse cx="163" cy="151" rx="10" ry="17" fill="url(#${id}-skin)" stroke="#5a3338" stroke-width="1.8"/>
        <path d="M76,132 C80,85 111,65 139,72 C166,79 177,107 169,148 C162,189 140,207 120,207 C98,207 79,187 76,132 Z"
          fill="url(#${id}-skin)" stroke="#5a3338" stroke-width="2.8"/>
        <path d="M80,149 Q82,178 105,195 Q93,191 86,180 Q80,165 80,149 Z" fill="rgba(110,55,50,0.12)"/>
        <path d="${hair.front}" fill="${hair.base}" stroke="#15111b" stroke-width="2.8" stroke-linejoin="round"/>
        ${hair.highlight ? `<path d="${hair.highlight}" fill="none" stroke="rgba(255,255,255,0.34)" stroke-width="3.1" stroke-linecap="round"/>` : ''}

        <path d="M85,132 Q100,123 116,128" fill="none" stroke="${hair.shadow || hair.base}" stroke-width="4.2" stroke-linecap="round"/>
        <path d="M124,128 Q142,122 158,132" fill="none" stroke="${hair.shadow || hair.base}" stroke-width="4.2" stroke-linecap="round"/>

        <path d="M85,145 C92,136 105,133 118,143 C110,153 96,154 85,145 Z" fill="#fff7ec" stroke="#2a2332" stroke-width="2.5"/>
        <path d="M122,143 C136,133 151,136 160,146 C149,155 134,154 122,143 Z" fill="#fff7ec" stroke="#2a2332" stroke-width="2.5"/>
        <ellipse cx="101" cy="144" rx="7.4" ry="9.4" fill="${eye}"/>
        <ellipse cx="141" cy="144" rx="7.4" ry="9.4" fill="${eye}"/>
        <circle cx="101" cy="145" r="3.3" fill="#111827" opacity="0.72"/>
        <circle cx="141" cy="145" r="3.3" fill="#111827" opacity="0.72"/>
        <circle cx="104" cy="139" r="2.8" fill="#fff"/>
        <circle cx="144" cy="139" r="2.8" fill="#fff"/>
        <path d="M86,145 C96,151 107,151 117,143" fill="none" stroke="rgba(30,24,34,0.38)" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M123,143 C134,151 148,152 159,146" fill="none" stroke="rgba(30,24,34,0.38)" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M120,153 Q116,164 123,168" fill="none" stroke="rgba(122,66,60,0.58)" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="95" cy="166" rx="10" ry="5" fill="rgba(255,109,130,0.13)"/>
        <ellipse cx="146" cy="166" rx="10" ry="5" fill="rgba(255,109,130,0.1)"/>
        ${mouth}
      </g>
    </svg>`
  };
}

const HAIR = {
  minister: {
    base: '#202034',
    shadow: '#111320',
    back: 'M68,142 Q67,98 94,76 L83,55 L113,68 L127,45 L139,69 L171,60 L161,91 Q178,112 169,151 Q163,114 145,96 Q123,78 96,91 Q78,106 68,142 Z',
    front: 'M70,122 Q82,79 119,66 L128,45 L139,72 L164,66 L153,96 Q140,91 129,93 Q122,109 106,121 Q108,101 91,101 Q80,108 70,122 Z',
    highlight: 'M93,82 Q120,66 151,78'
  },
  policy: {
    base: '#3b1620',
    shadow: '#25101a',
    back: 'M68,134 Q66,78 119,60 Q172,78 171,136 Q178,190 153,230 Q150,182 149,134 Q137,94 119,85 Q97,94 90,134 Q89,184 82,229 Q60,190 68,134 Z',
    front: 'M74,117 Q88,69 123,61 Q153,66 168,113 Q149,96 128,92 Q122,113 102,128 Q103,102 87,103 Q80,110 74,117 Z',
    highlight: 'M98,78 Q122,64 151,84'
  },
  general: {
    base: '#626a78',
    shadow: '#39414c',
    back: 'M70,129 Q76,82 121,66 Q166,80 170,129 Q156,98 120,93 Q88,98 70,129 Z',
    front: 'M72,109 Q92,71 122,65 Q154,72 169,109 Q151,98 130,95 Q118,113 101,120 Q101,101 87,102 Z',
    highlight: 'M93,82 Q124,71 150,82'
  },
  press: {
    base: '#121a30',
    shadow: '#080e1d',
    back: 'M70,131 Q69,78 122,60 Q168,75 170,131 Q159,105 139,93 Q112,82 89,98 Q76,110 70,131 Z',
    front: 'M72,114 Q94,66 126,61 Q160,70 171,115 Q149,95 130,91 Q123,104 108,120 Q105,100 89,98 Q80,105 72,114 Z',
    highlight: 'M101,75 Q126,64 151,77'
  },
  environment: {
    base: '#2a2119',
    shadow: '#18120e',
    back: 'M68,132 Q65,78 119,60 Q173,78 171,136 Q176,184 153,222 Q150,177 150,134 Q138,94 120,85 Q97,94 89,134 Q88,178 82,221 Q61,183 68,132 Z',
    front: 'M73,116 Q88,69 121,61 Q153,65 169,111 Q151,96 132,93 Q124,111 104,126 Q105,102 88,101 Q80,108 73,116 Z',
    highlight: 'M96,77 Q121,64 150,80'
  },
  mountain: {
    base: '#30221c',
    shadow: '#1c1410',
    back: 'M70,130 Q75,82 119,67 Q165,81 170,130 Q156,99 120,94 Q88,99 70,130 Z',
    front: 'M73,113 Q93,72 121,65 Q154,70 169,111 Q151,97 134,94 Q123,114 102,122 Q102,103 87,103 Q80,109 73,113 Z',
    highlight: 'M95,82 Q122,72 150,83'
  }
};

function glasses() {
  return `<rect x="80" y="135" width="38" height="21" rx="8" fill="none" stroke="#1e2234" stroke-width="2.6"/>
    <rect x="122" y="135" width="38" height="21" rx="8" fill="none" stroke="#1e2234" stroke-width="2.6"/>
    <line x1="118" y1="145" x2="122" y2="145" stroke="#1e2234" stroke-width="2.2"/>
    <path d="M86,138 Q100,134 114,138 M128,138 Q142,134 156,138" fill="none" stroke="rgba(255,255,255,0.42)" stroke-width="1.2"/>`;
}

function paperProp(accent) {
  return `<g filter="url(#paperShadow)">
    <defs><filter id="paperShadow"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="rgba(0,0,0,0.45)"/></filter></defs>
    <path d="M196,206 L268,230 L238,326 L166,302 Z" fill="#fff0c7" stroke="#3d2e24" stroke-width="3"/>
    <path d="M190,230 H248 M184,254 H240 M179,278 H232" stroke="${accent}" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
  </g>`;
}

function phoneProp() {
  return `<g filter="url(#phoneShadow)">
    <defs><filter id="phoneShadow"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="rgba(0,0,0,0.45)"/></filter></defs>
    <rect x="206" y="230" width="42" height="66" rx="8" fill="#132642" stroke="#5fb6ff" stroke-width="2.5"/>
    <rect x="214" y="244" width="26" height="28" rx="3" fill="#5fb6ff" opacity="0.36"/>
  </g>`;
}

function ribbon() {
  return '<path d="M157,84 C174,68 190,78 182,96 C174,111 159,101 157,84 Z" fill="#4aa3ff" stroke="#1f4978" stroke-width="2"/><path d="M158,86 C141,66 124,77 132,97 C141,112 156,101 158,86 Z" fill="#4aa3ff" stroke="#1f4978" stroke-width="2"/>';
}

function capAndMedals() {
  return `<path d="M70,98 Q82,64 120,62 Q158,64 170,98 L170,106 Q120,96 70,106 Z" fill="#273a28" stroke="#111b14" stroke-width="2.4"/>
    <path d="M68,105 Q120,94 172,105" fill="none" stroke="#e8c04a" stroke-width="3"/>
    <polygon points="120,72 124,82 134,82 126,88 129,99 120,93 111,99 114,88 106,82 116,82" fill="#e8c04a"/>
    <rect x="62" y="254" width="15" height="10" fill="#e8c04a"/><rect x="82" y="254" width="15" height="10" fill="#e74c3c"/><rect x="102" y="254" width="15" height="10" fill="#3498db"/>`;
}

function leafPin() {
  return '<path d="M62,258 C82,240 99,252 82,276 C68,277 59,269 62,258 Z" fill="#6ee89a" stroke="#1d6b42" stroke-width="1.6"/><path d="M66,259 Q76,264 83,274" fill="none" stroke="rgba(255,255,255,0.72)" stroke-width="1.2"/>';
}

function mountainBand() {
  return `<path d="M81,96 L160,96" stroke="#e8c04a" stroke-width="5" stroke-linecap="round"/>
    <path d="M90,95 L98,84 L106,95 M116,95 L124,81 L132,95 M143,95 L151,84 L159,95" fill="none" stroke="#e74c3c" stroke-width="2.1" stroke-linecap="round"/>
    <path d="M76,254 H165" stroke="#e8c04a" stroke-width="3.6"/><path d="M82,270 H158" stroke="#e74c3c" stroke-width="3.6"/><path d="M88,286 H152" stroke="#6ee89a" stroke-width="3.6"/>`;
}

CHARS.minh = {
  name: 'Nguyễn Văn Minh',
  title: 'Bộ Trưởng Tài Chính',
  color: '#d49a19',
  svg: `
    <img src="assets/minh_green.png" crossorigin="anonymous" onload="removeBg(this)" style="width: 280px; height: auto; object-fit: cover; display: block; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5)); opacity: 0; transition: opacity 0.3s;" />
  `
};

CHARS.lan = {
  name: 'Trần Thị Lan',
  title: 'Giám Đốc Chính Sách Xã Hội',
  color: '#c42d54',
  svg: `
    <img src="assets/lan_green.png" crossorigin="anonymous" onload="removeBg(this)" style="width: 280px; height: auto; object-fit: cover; display: block; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5)); opacity: 0; transition: opacity 0.3s;" />
  `
};

CHARS.cuong = {
  name: 'Thiếu Tướng Phạm Đức Cường',
  title: 'Cố Vấn An Ninh Quốc Gia',
  color: '#4f6d36',
  svg: `
    <img src="assets/cuong_green.png" crossorigin="anonymous" onload="removeBg(this)" style="width: 280px; height: auto; object-fit: cover; display: block; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5)); opacity: 0; transition: opacity 0.3s;" />
  `
};

CHARS.huy = {
  name: 'Lê Quang Huy',
  title: 'Thư Ký Báo Chí',
  color: '#2980d9',
  svg: `
    <img src="assets/huy_green.png" crossorigin="anonymous" onload="removeBg(this)" style="width: 280px; height: auto; object-fit: cover; display: block; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5)); opacity: 0; transition: opacity 0.3s;" />
  `
};

CHARS.mai = {
  name: 'Đỗ Mai Anh',
  title: 'Bộ Trưởng Nông Nghiệp & Môi Trường',
  color: '#2ecc71',
  svg: `
    <img src="assets/mai_green.png" crossorigin="anonymous" onload="removeBg(this)" style="width: 280px; height: auto; object-fit: cover; display: block; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5)); opacity: 0; transition: opacity 0.3s;" />
  `
};

CHARS.son = {
  name: 'A Sơ Sơn',
  title: 'Đặc Phái Viên Vùng Dân Tộc',
  color: '#9b59b6',
  svg: `
    <img src="assets/son_green.png" crossorigin="anonymous" onload="removeBg(this)" style="width: 280px; height: auto; object-fit: cover; display: block; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5)); opacity: 0; transition: opacity 0.3s;" />
  `
};
