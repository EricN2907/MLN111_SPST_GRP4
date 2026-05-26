/* Dramatic VN/courtroom-anime scene overrides. */

function animeWindowGrid(x, y, w, h, cols, rows, fill = 'rgba(255,222,134,0.24)') {
  const cells = [];
  const gap = 7;
  const cw = (w - gap * (cols - 1)) / cols;
  const ch = (h - gap * (rows - 1)) / rows;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      cells.push(`<rect x="${x + c * (cw + gap)}" y="${y + r * (ch + gap)}" width="${cw}" height="${ch}" rx="2" fill="${fill}" opacity="${0.46 + ((r + c) % 3) * 0.14}"/>`);
    }
  }
  return cells.join('');
}

function speedClouds(count, color = 'rgba(255,255,255,0.28)') {
  return Array.from({ length: count }, (_, i) => {
    const x = 40 + (i * 137) % 850;
    const y = 48 + (i * 57) % 210;
    return `<ellipse class="scene-anim-slow" cx="${x}" cy="${y}" rx="${54 + i % 4 * 18}" ry="${12 + i % 3 * 5}" fill="${color}" opacity="${0.22 + i % 4 * 0.08}"/>`;
  }).join('');
}

function crowd(count) {
  return Array.from({ length: count }, (_, i) => {
    const x = 14 + i * 24;
    const y = 506 + (i % 5) * 7;
    const body = ['#23304a', '#3c2234', '#273d2e', '#49311f'][i % 4];
    return `<path d="M${x - 9},${y + 43} Q${x},${y + 9} ${x + 9},${y + 43} Z" fill="${body}" stroke="#111019" stroke-width="1.4"/>
      <circle cx="${x}" cy="${y + 8}" r="7" fill="#30221f" stroke="#111019" stroke-width="1"/>`;
  }).join('');
}

function chain(points, scale = 1) {
  return points.map(([x, y, rot], i) => `
    <g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale})">
      <rect x="-18" y="-8" width="36" height="16" rx="8" fill="none" stroke="#8d9690" stroke-width="5"/>
      <rect x="-10" y="-4" width="20" height="8" rx="4" fill="#59625f" opacity="0.38"/>
    </g>
  `).join('');
}

function columns() {
  return [86, 206, 694, 814].map((x) => `
    <g>
      <rect x="${x - 19}" y="72" width="38" height="372" rx="4" fill="#d8d0b5" opacity="0.28" stroke="#fff2c8" stroke-opacity="0.2" stroke-width="2"/>
      <rect x="${x - 30}" y="58" width="60" height="18" rx="3" fill="#f2d98d" opacity="0.28"/>
      <rect x="${x - 28}" y="438" width="56" height="18" rx="3" fill="#f2d98d" opacity="0.22"/>
      <path d="M${x-10},88 V425 M${x+10},88 V425" stroke="#423b42" stroke-opacity="0.18" stroke-width="2"/>
    </g>
  `).join('');
}

SCENE_RENDERERS.office = () => `
  <img src="assets/office.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.factory = () => `
  <img src="assets/factory.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.protest = () => `
  <img src="assets/protest.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.village = () => `
  <img src="assets/village.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.parliament = () => `
  <img src="assets/parliament.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.hospital = () => `
  <img src="assets/hospital.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.cyber = () => `
  <svg class="anime-scene scene-cyber" width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="cyberGlow" cx="50%" cy="38%" r="64%"><stop offset="0%" stop-color="#45e6ff" stop-opacity="0.34"/><stop offset="100%" stop-color="#070b18" stop-opacity="0"/></radialGradient></defs>
    <rect width="900" height="620" fill="#070b18"/>
    <rect width="900" height="620" fill="url(#cyberGlow)"/>
    ${Array.from({ length: 16 }, (_, i) => `<line class="scene-data-line" x1="${i*68}" y1="0" x2="${i*68-130}" y2="620" stroke="#48d7ff" stroke-opacity="0.24" stroke-width="2"/>`).join('')}
    <rect x="116" y="112" width="668" height="334" rx="16" fill="rgba(10,30,58,0.62)" stroke="#45e6ff" stroke-opacity="0.45" stroke-width="3"/>
    <rect x="146" y="146" width="608" height="42" rx="7" fill="#48d7ff" opacity="0.15"/>
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${165+i*72}" y="226" width="48" height="${72+(i%3)*28}" rx="5" fill="${i%2?'#6ee89a':'#5fb6ff'}" opacity="0.24" stroke="rgba(255,255,255,0.16)"/>`).join('')}
    <circle class="scene-warning" cx="706" cy="168" r="10" fill="#ff5964"/>
    <path d="M160,390 C250,342 313,410 403,364 C522,304 585,432 738,350" fill="none" stroke="#6ee89a" stroke-width="4"/>
    <path d="M160,414 C250,393 316,435 410,412 C526,386 600,446 738,422" fill="none" stroke="#ff5964" stroke-width="3"/>
  </svg>`;

SCENE_RENDERERS.classroom = () => `
  <svg class="anime-scene scene-classroom" width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="900" height="620" fill="#f1c987"/>
    <rect x="126" y="92" width="648" height="224" rx="9" fill="#2c9867" stroke="#155036" stroke-width="4"/>
    <path d="M176,154 H726 M176,206 H635 M176,256 H692" stroke="rgba(255,255,255,0.36)" stroke-width="5" stroke-linecap="round"/>
    ${[95,350,620].map((x) => `<rect x="${x}" y="392" width="188" height="46" rx="7" fill="#9a6136" stroke="#4c2f20" stroke-width="3"/>`).join('')}
    ${[150,216,405,480,675,742].map((x) => `<circle cx="${x}" cy="371" r="19" fill="#332126"/><rect x="${x-18}" y="390" width="36" height="52" rx="14" fill="#27304a"/>`).join('')}
    <rect x="386" y="330" width="128" height="38" rx="5" fill="#fff0c0" opacity="0.42" stroke="#5d3a24"/>
    <path class="scene-warning" d="M418,349 H482" stroke="#ff5964" stroke-width="5"/>
  </svg>`;

SCENE_RENDERERS.diplomacy = () => `
  <svg class="anime-scene scene-diplomacy" width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="diplomacyHall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#273c73"/><stop offset="100%" stop-color="#13162c"/></linearGradient></defs>
    <rect width="900" height="620" fill="url(#diplomacyHall)"/>
    ${speedClouds(4, 'rgba(232,192,74,0.18)')}
    <rect x="148" y="128" width="604" height="260" rx="13" fill="rgba(255,255,255,0.08)" stroke="#e8c04a" stroke-opacity="0.26" stroke-width="3"/>
    <ellipse cx="450" cy="402" rx="316" ry="62" fill="#4f3422" opacity="0.72" stroke="#e8c04a" stroke-opacity="0.2" stroke-width="2"/>
    <rect x="214" y="198" width="98" height="74" rx="5" fill="#d84242" opacity="0.32" stroke="#ffd56a" stroke-opacity="0.3"/>
    <rect x="588" y="198" width="98" height="74" rx="5" fill="#3b7ddd" opacity="0.32" stroke="#ffd56a" stroke-opacity="0.3"/>
    <path d="M263,198 V150 M637,198 V150" stroke="#e8c04a" stroke-width="5"/>
    <rect x="338" y="262" width="224" height="64" rx="8" fill="#fff1c9" opacity="0.12" stroke="#ffffff" stroke-opacity="0.12"/>
    <path class="scene-data-line" d="M310,362 C390,318 500,410 590,354" fill="none" stroke="#ff5964" stroke-width="4"/>
  </svg>`;
