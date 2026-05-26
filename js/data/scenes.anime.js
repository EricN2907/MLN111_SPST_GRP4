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
  <svg class="anime-scene scene-factory" width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="factoryDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a33148"/><stop offset="48%" stop-color="#6e3d60"/><stop offset="100%" stop-color="#1d1d2c"/></linearGradient>
      <linearGradient id="factorySteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9aa4a6"/><stop offset="100%" stop-color="#4b535b"/></linearGradient>
      <radialGradient id="duskGlow" cx="70%" cy="18%" r="52%"><stop offset="0%" stop-color="#ffb15e" stop-opacity="0.35"/><stop offset="100%" stop-color="#ffb15e" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="900" height="620" fill="url(#factoryDusk)"/>
    <rect width="900" height="320" fill="url(#duskGlow)"/>
    ${speedClouds(7, 'rgba(255,155,115,0.22)')}
    ${[30,145,266,590,715,835].map((x, i) => `<rect x="${x}" y="${190 - i % 2 * 35}" width="${92 + i % 3 * 34}" height="${230 + i % 2 * 50}" fill="#30313b" stroke="#161722" stroke-width="3"/>${animeWindowGrid(x+12, 220 - i % 2 * 35, 62, 102, 3, 4, 'rgba(255,210,108,0.2)')}`).join('')}
    <rect x="642" y="88" width="32" height="248" fill="#454b55" stroke="#171922" stroke-width="4"/>
    <rect x="706" y="118" width="26" height="218" fill="#3b414c" stroke="#171922" stroke-width="4"/>
    <ellipse class="scene-anim-slow" cx="658" cy="84" rx="70" ry="22" fill="rgba(220,220,230,0.13)"/>
    <ellipse class="scene-anim-slow" cx="720" cy="113" rx="58" ry="18" fill="rgba(220,220,230,0.1)"/>
    <path d="M0,438 C230,405 662,405 900,438 V620 H0 Z" fill="#23202a"/>
    <rect x="84" y="356" width="230" height="118" fill="#6b665d" stroke="#272425" stroke-width="4"/>
    <rect x="565" y="344" width="245" height="126" fill="#69615a" stroke="#272425" stroke-width="4"/>
    <path d="M62,330 C220,290 404,292 548,326 L540,356 C390,328 228,330 72,366 Z" fill="url(#factorySteel)" stroke="#202730" stroke-width="4"/>
    <path d="M78,354 L530,344" stroke="#2a3039" stroke-width="8" stroke-linecap="round"/>
    ${[100,170,240,310,380,450,520].map((x) => `<path d="M${x},348 L${x+44},310" stroke="#2b313a" stroke-width="4"/><circle cx="${x+42}" cy="311" r="5" fill="#d3d0bd" opacity="0.55"/>`).join('')}
    <path d="M210,488 C340,454 520,456 676,488" fill="none" stroke="#f0c35a" stroke-opacity="0.26" stroke-width="8"/>
    <path d="M205,502 C345,470 520,473 684,503" fill="none" stroke="#11141d" stroke-width="7"/>
    ${[104,160,216,620,680,740].map((x) => `<rect x="${x}" y="382" width="38" height="50" rx="4" fill="#f0c35a" opacity="0.28" stroke="#201b1b" stroke-width="2"/>`).join('')}
    <path d="M0,515 C160,492 260,526 420,502 C585,478 690,515 900,492 V620 H0 Z" fill="#2f251d" opacity="0.9"/>
  </svg>`;

SCENE_RENDERERS.protest = () => `
  <svg class="anime-scene scene-protest" width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="protestSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9b1f3b"/><stop offset="52%" stop-color="#3f1d3a"/><stop offset="100%" stop-color="#120c18"/></linearGradient>
      <radialGradient id="fireGlow" cx="48%" cy="45%" r="55%"><stop offset="0%" stop-color="#ff8d3d" stop-opacity="0.4"/><stop offset="100%" stop-color="#ff8d3d" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="900" height="620" fill="url(#protestSky)"/>
    <rect width="900" height="460" fill="url(#fireGlow)" class="scene-fire"/>
    ${speedClouds(8, 'rgba(255,130,90,0.22)')}
    ${[0,132,286,640,770].map((x, i) => `<rect x="${x}" y="${74 + (i % 2) * 42}" width="${128 + i % 3 * 34}" height="${340 - i % 2 * 24}" fill="#191621" stroke="#0b0a10" stroke-width="3"/>${animeWindowGrid(x+15, 116+(i%2)*42, 78, 160, 3, 5, 'rgba(255,178,90,0.13)')}`).join('')}
    <path d="M318,232 C406,197 498,197 586,232 L565,284 C489,262 417,262 342,284 Z" fill="#847e74" stroke="#2d2d32" stroke-width="5"/>
    ${chain([[340,268,-20],[388,250,-10],[438,245,0],[488,250,8],[536,267,20]], 0.76)}
    ${[[142,382,104,'#ff5555'],[405,366,112,'#5aa8ff'],[667,356,120,'#ffad42']].map(([x,y,w,c]) => `<rect x="${x}" y="${y}" width="7" height="136" fill="#d6aa55"/><rect x="${x-48}" y="${y-15}" width="${w}" height="42" rx="5" fill="${c}" opacity="0.34" stroke="${c}" stroke-width="3"/>`).join('')}
    ${crowd(39)}
    <path d="M0,545 Q180,510 355,534 T700,520 T900,535 V620 H0 Z" fill="#111019"/>
  </svg>`;

SCENE_RENDERERS.village = () => `
  <svg class="anime-scene scene-village" width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="villageSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#73bdff"/><stop offset="58%" stop-color="#c8ecff"/><stop offset="100%" stop-color="#65a962"/></linearGradient>
      <linearGradient id="field" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8ee06e"/><stop offset="100%" stop-color="#2f8f4d"/></linearGradient>
    </defs>
    <rect width="900" height="620" fill="url(#villageSky)"/>
    <circle cx="704" cy="90" r="54" fill="#ffe48b" opacity="0.92"/>
    ${speedClouds(5, 'rgba(255,255,255,0.45)')}
    <polygon points="0,322 205,106 430,238 650,82 900,228 900,352" fill="#4c915a" stroke="#27623c" stroke-width="4"/>
    <polygon points="0,350 150,190 390,280 615,145 900,270 900,370" fill="#66b066" stroke="#347345" stroke-width="3"/>
    ${[397,435,475].map((y, i) => `<path d="M0,${y} Q210,${y-34} 450,${y-12} Q680,${y+10} 900,${y-22} V${y+42} Q675,${y+68} 450,${y+46} Q220,${y+26} 0,${y+56} Z" fill="url(#field)" opacity="${0.76 - i * 0.08}" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>`).join('')}
    ${[[112,304],[735,282],[182,332]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="56" fill="#319957" stroke="#1e623d" stroke-width="4"/><circle cx="${x+38}" cy="${y-12}" r="42" fill="#41b766"/><rect x="${x-5}" y="${y+42}" width="10" height="78" fill="#69422b"/>`).join('')}
    <rect x="360" y="326" width="178" height="112" rx="4" fill="#7a4f30" stroke="#3a2319" stroke-width="4"/>
    <polygon points="334,326 564,326 449,246" fill="#c45a3f" stroke="#5a231d" stroke-width="4"/>
  </svg>`;

SCENE_RENDERERS.parliament = () => `
  <svg class="anime-scene scene-parliament" width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="hall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2d365d"/><stop offset="100%" stop-color="#121424"/></linearGradient></defs>
    <rect width="900" height="620" fill="url(#hall)"/>
    <ellipse cx="450" cy="28" rx="365" ry="98" fill="none" stroke="#e8c04a" stroke-opacity="0.25" stroke-width="4"/>
    <ellipse cx="450" cy="32" rx="238" ry="62" fill="none" stroke="#e8c04a" stroke-opacity="0.18" stroke-width="3"/>
    ${columns()}
    <circle cx="450" cy="92" r="42" fill="#e8c04a" opacity="0.14" stroke="#ffe48b" stroke-opacity="0.28" stroke-width="3"/>
    ${Array.from({ length: 16 }, (_, i) => {
      const a = i * Math.PI * 2 / 16;
      return `<line x1="450" y1="92" x2="${450 + 46 * Math.cos(a)}" y2="${92 + 46 * Math.sin(a)}" stroke="#ffe48b" stroke-opacity="0.2"/>`;
    }).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${112+i*19},${382+i*24} Q450,${356+i*24} ${788-i*19},${382+i*24} L${810-i*19},${405+i*24} Q450,${382+i*24} ${90+i*19},${405+i*24} Z" fill="#1b2442" stroke="#e8c04a" stroke-opacity="0.08"/>`).join('')}
    <rect x="380" y="342" width="140" height="72" rx="7" fill="#80522d" stroke="#e8c04a" stroke-opacity="0.26" stroke-width="2"/>
  </svg>`;

SCENE_RENDERERS.hospital = () => `
  <svg class="anime-scene scene-hospital" width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="hospitalSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#89d7ff"/><stop offset="100%" stop-color="#d7f8ff"/></linearGradient></defs>
    <rect width="900" height="620" fill="url(#hospitalSky)"/>
    <rect x="86" y="98" width="728" height="380" rx="14" fill="#f7fbff" opacity="0.42" stroke="#ffffff" stroke-width="4"/>
    ${[155,275,395,515,635].map((x) => `<rect x="${x}" y="148" width="74" height="62" rx="6" fill="#6ecbff" opacity="0.32" stroke="#ffffff" stroke-opacity="0.34"/>`).join('')}
    <rect x="382" y="246" width="136" height="162" rx="8" fill="#2a4a6f" opacity="0.45" stroke="#ffffff" stroke-opacity="0.24"/>
    <path class="scene-warning" d="M450,286 L450,362 M412,324 L488,324" stroke="#ff5964" stroke-width="17" stroke-linecap="round"/>
    <rect x="140" y="438" width="240" height="34" rx="9" fill="#dff7ff" opacity="0.4"/>
    <rect x="520" y="438" width="240" height="34" rx="9" fill="#dff7ff" opacity="0.4"/>
    <path d="M0,560 Q210,525 450,548 T900,540 V620 H0 Z" fill="#b9e7f2" opacity="0.55"/>
  </svg>`;

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
