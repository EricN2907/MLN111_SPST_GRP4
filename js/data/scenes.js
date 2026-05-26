/* SVG scene renderer. These are code-native visual assets for the game. */

function renderSceneDetails(sceneName) {
  const el = document.getElementById('scene-detail');
  if (!el) return;
  const renderer = SCENE_RENDERERS[sceneName] || SCENE_RENDERERS.office;
  el.innerHTML = `<div class="scene-layer">${renderer()}</div>`;
}

const SCENE_RENDERERS = {
  office: () => `
    <svg width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="officeWindow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(90,130,180,0.2)"/>
          <stop offset="100%" stop-color="rgba(20,40,70,0.05)"/>
        </linearGradient>
      </defs>
      <rect x="280" y="50" width="340" height="230" rx="5" fill="url(#officeWindow)" stroke="rgba(201,150,26,0.18)" stroke-width="2"/>
      <line x1="450" y1="50" x2="450" y2="280" stroke="rgba(201,150,26,0.12)" stroke-width="2"/>
      <line x1="280" y1="165" x2="620" y2="165" stroke="rgba(201,150,26,0.1)" stroke-width="2"/>
      <path d="M120,48 L120,255" stroke="rgba(201,150,26,0.25)" stroke-width="5"/>
      <path d="M125,48 L198,48 L198,92 L125,92 Z" fill="rgba(180,20,20,0.28)" stroke="rgba(201,150,26,0.12)"/>
      <path d="M780,48 L780,255" stroke="rgba(201,150,26,0.25)" stroke-width="5"/>
      <path d="M707,48 L780,48 L780,92 L707,92 Z" fill="rgba(180,20,20,0.28)" stroke="rgba(201,150,26,0.12)"/>
      <rect x="90" y="375" width="720" height="25" rx="4" fill="rgba(80,42,16,0.48)" stroke="rgba(201,150,26,0.12)"/>
      <rect x="640" y="340" width="130" height="32" rx="3" fill="rgba(240,230,200,0.08)"/>
      <rect x="660" y="327" width="92" height="23" rx="3" fill="rgba(240,230,200,0.06)"/>
      <rect x="730" y="115" width="120" height="260" fill="rgba(35,20,10,0.38)" stroke="rgba(201,150,26,0.08)"/>
      ${[0,1,2,3,4].map((n) => `<rect x="${744+n*19}" y="130" width="13" height="${72+n%2*18}" rx="1" fill="rgba(${80+n*20},${40+n*16},${90+n*12},0.2)"/>`).join('')}
      <path d="M0,584 L900,584" stroke="rgba(201,150,26,0.08)"/>
      <ellipse cx="450" cy="586" rx="315" ry="28" fill="rgba(0,0,0,0.22)"/>
    </svg>`,

  factory: () => `
    <svg width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="factorySmoke" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="rgba(120,120,120,0.08)"/>
          <stop offset="100%" stop-color="rgba(180,180,180,0.01)"/>
        </linearGradient>
      </defs>
      <rect x="60" y="300" width="260" height="190" rx="4" fill="rgba(50,45,35,0.34)" stroke="rgba(255,255,255,0.05)"/>
      <rect x="110" y="255" width="110" height="45" rx="2" fill="rgba(50,45,35,0.28)"/>
      <rect x="600" y="312" width="230" height="178" rx="4" fill="rgba(50,45,35,0.34)" stroke="rgba(255,255,255,0.05)"/>
      <rect x="690" y="25" width="28" height="190" fill="rgba(120,120,120,0.11)"/>
      <rect x="740" y="55" width="24" height="160" fill="rgba(120,120,120,0.09)"/>
      <ellipse class="scene-anim-slow" cx="704" cy="22" rx="50" ry="18" fill="url(#factorySmoke)"/>
      <ellipse class="scene-anim-slow" cx="756" cy="50" rx="42" ry="15" fill="url(#factorySmoke)"/>
      ${[70,205,340,585,720,820].map((x) => `<rect x="${x}" y="95" width="105" height="92" rx="2" fill="rgba(255,120,40,0.045)" stroke="rgba(255,255,255,0.065)"/>`).join('')}
      <line class="scene-warning" x1="0" y1="505" x2="900" y2="505" stroke="rgba(255,190,40,0.72)" stroke-width="2"/>
      <line x1="0" y1="150" x2="360" y2="150" stroke="rgba(120,105,80,0.18)" stroke-width="9"/>
      <line x1="540" y1="150" x2="900" y2="150" stroke="rgba(120,105,80,0.18)" stroke-width="9"/>
      ${[735,780,825].map((x) => `<path d="M${x},90 L${x},405 M${x-22},130 L${x+22},130 M${x-22},175 L${x+22},175 M${x-22},220 L${x+22},220" stroke="rgba(150,130,100,0.1)" stroke-width="2"/>`).join('')}
    </svg>`,

  protest: () => {
    const crowd = Array.from({ length: 36 }, (_, i) => {
      const x = 18 + i * 25;
      const h = 46 + (i % 5) * 7;
      return `<ellipse cx="${x}" cy="${525 - h / 2}" rx="${9 + i % 3}" ry="${h / 2}" fill="rgba(22,12,10,0.42)"/>
        <circle cx="${x}" cy="${512 - h}" r="${7 + i % 3}" fill="rgba(24,13,10,0.42)"/>`;
    }).join('');
    return `
      <svg width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="protGlow" cx="52%" cy="34%" r="54%">
            <stop offset="0%" stop-color="rgba(230,90,30,0.15)"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="900" height="430" fill="url(#protGlow)" class="scene-fire"/>
        ${[0,170,350,650,760].map((x, i) => `<rect x="${x}" y="${55 + i % 2 * 35}" width="${140 + i % 3 * 25}" height="${350 - i % 2 * 25}" fill="rgba(20,18,15,0.26)"/>`).join('')}
        ${crowd}
        ${[[135,390,76,34,'200,50,50'],[390,374,78,29,'50,100,200'],[645,360,86,32,'220,110,25']].map(([x,y,w,h,c]) => `<rect x="${x}" y="${y}" width="5" height="118" fill="rgba(220,170,60,0.18)"/><rect x="${x-34}" y="${y-2}" width="${w}" height="${h}" rx="3" fill="rgba(${c},0.14)" stroke="rgba(${c},0.26)"/>`).join('')}
        <path d="M0,520 Q170,500 320,520 T650,515 T900,528" fill="none" stroke="rgba(255,150,70,0.06)" stroke-width="8"/>
      </svg>`;
  },

  village: () => `
    <svg width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vilSky" cx="48%" cy="18%" r="65%">
          <stop offset="0%" stop-color="rgba(70,130,190,0.11)"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="900" height="360" fill="url(#vilSky)"/>
      <polygon points="0,315 210,120 430,225 645,85 900,218 900,330" fill="rgba(22,68,42,0.22)"/>
      <polygon points="0,328 165,175 390,262 610,135 900,248 900,340" fill="rgba(25,90,48,0.17)"/>
      <path d="M0,412 Q210,382 450,402 Q690,422 900,390 L900,445 Q680,470 450,452 Q220,438 0,462 Z" fill="rgba(34,105,36,0.2)"/>
      <path d="M0,455 Q210,427 450,444 Q690,462 900,434 L900,492 Q680,512 450,492 Q220,478 0,505 Z" fill="rgba(34,112,42,0.16)"/>
      ${[[110,310],[725,288],[175,333]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="54" fill="rgba(26,92,38,0.2)"/><circle cx="${x+38}" cy="${y-10}" r="42" fill="rgba(32,110,45,0.16)"/><rect x="${x-4}" y="${y+38}" width="9" height="72" fill="rgba(70,42,20,0.18)"/>`).join('')}
      <rect x="355" y="323" width="185" height="112" fill="rgba(32,22,12,0.24)"/>
      <polygon points="330,323 565,323 448,245" fill="rgba(130,45,26,0.17)"/>
      <rect x="415" y="370" width="48" height="65" fill="rgba(75,50,26,0.22)"/>
      <path d="M105,445 Q450,425 795,445" fill="none" stroke="rgba(100,170,210,0.1)" stroke-width="2"/>
      <ellipse class="scene-anim-slow" cx="250" cy="95" rx="80" ry="18" fill="rgba(255,255,255,0.035)"/>
      <ellipse class="scene-anim-slow" cx="575" cy="120" rx="95" ry="20" fill="rgba(255,255,255,0.03)"/>
    </svg>`,

  parliament: () => `
    <svg width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="450" cy="24" rx="340" ry="88" fill="none" stroke="rgba(201,150,26,0.1)" stroke-width="2"/>
      <ellipse cx="450" cy="24" rx="235" ry="58" fill="none" stroke="rgba(201,150,26,0.07)" stroke-width="1.5"/>
      ${[90,205,320,580,695,810].map((x) => `<rect x="${x-14}" y="58" width="28" height="390" fill="rgba(210,185,150,0.07)" rx="2"/><rect x="${x-19}" y="52" width="38" height="13" rx="2" fill="rgba(210,185,150,0.09)"/><rect x="${x-17}" y="438" width="34" height="13" rx="2" fill="rgba(210,185,150,0.09)"/>`).join('')}
      <circle cx="450" cy="83" r="33" fill="none" stroke="rgba(201,150,26,0.14)"/>
      ${Array.from({ length: 14 }, (_, i) => {
        const a = i * Math.PI * 2 / 14;
        return `<line x1="450" y1="83" x2="${450 + 33 * Math.cos(a)}" y2="${83 + 33 * Math.sin(a)}" stroke="rgba(201,150,26,0.07)"/><circle cx="${450 + 39 * Math.cos(a)}" cy="${83 + 39 * Math.sin(a)}" r="2" fill="rgba(255,210,80,0.2)"/>`;
      }).join('')}
      ${Array.from({ length: 7 }, (_, i) => `<path d="M${120 + i * 18},${382 + i * 23} Q450,${357 + i * 23} ${780 - i * 18},${382 + i * 23} L${800 - i * 18},${405 + i * 23} Q450,${382 + i * 23} ${100 + i * 18},${405 + i * 23} Z" fill="rgba(20,30,55,0.17)"/>`).join('')}
      <rect x="382" y="342" width="136" height="70" rx="4" fill="rgba(70,45,15,0.24)" stroke="rgba(201,150,26,0.1)"/>
      <line x1="450" y1="342" x2="450" y2="312" stroke="rgba(220,200,170,0.13)" stroke-width="2"/>
      <circle cx="450" cy="309" r="6" fill="rgba(220,200,170,0.15)"/>
    </svg>`,

  hospital: () => `
    <svg width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="90" y="105" width="720" height="365" rx="6" fill="rgba(220,240,255,0.055)" stroke="rgba(180,220,255,0.09)"/>
      ${[155,275,395,515,635].map((x) => `<rect x="${x}" y="145" width="72" height="58" rx="3" fill="rgba(80,150,190,0.08)" stroke="rgba(210,240,255,0.06)"/>`).join('')}
      <rect x="385" y="245" width="130" height="155" rx="4" fill="rgba(10,20,32,0.28)" stroke="rgba(210,240,255,0.08)"/>
      <path class="scene-warning" d="M450,285 L450,360 M412,322 L488,322" stroke="rgba(231,76,60,0.72)" stroke-width="14" stroke-linecap="round"/>
      <rect x="150" y="430" width="230" height="30" rx="6" fill="rgba(210,230,240,0.08)"/>
      <rect x="520" y="430" width="230" height="30" rx="6" fill="rgba(210,230,240,0.08)"/>
      <path d="M120,530 C250,500 355,535 470,512 C580,492 680,522 800,504" fill="none" stroke="rgba(70,180,210,0.08)" stroke-width="3"/>
    </svg>`,

  cyber: () => `
    <svg width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      ${Array.from({ length: 12 }, (_, i) => `<line class="scene-data-line" x1="${i * 85}" y1="0" x2="${i * 85 - 120}" y2="620" stroke="rgba(52,152,219,0.11)" stroke-width="1.4"/>`).join('')}
      <rect x="120" y="118" width="660" height="318" rx="9" fill="rgba(10,28,48,0.32)" stroke="rgba(52,152,219,0.2)"/>
      <rect x="145" y="145" width="610" height="36" rx="4" fill="rgba(52,152,219,0.08)"/>
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${165 + i * 72}" y="210" width="46" height="${70 + (i % 3) * 24}" rx="3" fill="rgba(${i % 2 ? '46,204,113' : '52,152,219'},0.12)" stroke="rgba(255,255,255,0.05)"/>`).join('')}
      <circle class="scene-warning" cx="705" cy="163" r="8" fill="rgba(231,76,60,0.7)"/>
      <path d="M160,385 C250,345 310,405 400,365 C520,312 585,425 735,354" fill="none" stroke="rgba(46,204,113,0.26)" stroke-width="3"/>
      <path d="M160,405 C250,390 315,430 410,410 C525,386 600,440 735,420" fill="none" stroke="rgba(231,76,60,0.22)" stroke-width="2"/>
    </svg>`,

  classroom: () => `
    <svg width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="130" y="95" width="640" height="220" rx="5" fill="rgba(30,95,65,0.2)" stroke="rgba(220,240,210,0.08)"/>
      <path d="M175,155 H725 M175,205 H630 M175,255 H690" stroke="rgba(220,240,210,0.09)" stroke-width="4" stroke-linecap="round"/>
      <rect x="100" y="392" width="175" height="42" rx="4" fill="rgba(95,55,24,0.26)"/>
      <rect x="355" y="392" width="190" height="42" rx="4" fill="rgba(95,55,24,0.26)"/>
      <rect x="625" y="392" width="175" height="42" rx="4" fill="rgba(95,55,24,0.26)"/>
      ${[150,215,405,480,675,740].map((x) => `<circle cx="${x}" cy="372" r="18" fill="rgba(25,18,12,0.25)"/><rect x="${x-16}" y="390" width="32" height="48" rx="12" fill="rgba(25,18,12,0.22)"/>`).join('')}
      <rect x="390" y="330" width="120" height="35" rx="3" fill="rgba(240,220,170,0.08)" stroke="rgba(240,220,170,0.1)"/>
      <path class="scene-warning" d="M420,346 H480" stroke="rgba(231,76,60,0.58)" stroke-width="4"/>
    </svg>`,

  diplomacy: () => `
    <svg width="100%" height="100%" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="155" y="130" width="590" height="250" rx="8" fill="rgba(25,35,65,0.32)" stroke="rgba(201,150,26,0.12)"/>
      <ellipse cx="450" cy="396" rx="305" ry="58" fill="rgba(50,35,18,0.28)" stroke="rgba(201,150,26,0.1)"/>
      <rect x="215" y="198" width="95" height="72" rx="3" fill="rgba(200,30,40,0.14)" stroke="rgba(201,150,26,0.13)"/>
      <rect x="590" y="198" width="95" height="72" rx="3" fill="rgba(40,90,180,0.14)" stroke="rgba(201,150,26,0.13)"/>
      <path d="M262,198 V150 M637,198 V150" stroke="rgba(201,150,26,0.25)" stroke-width="4"/>
      <rect x="340" y="260" width="220" height="60" rx="5" fill="rgba(240,230,200,0.06)" stroke="rgba(240,230,200,0.08)"/>
      <path class="scene-data-line" d="M310,360 C390,318 500,408 590,354" fill="none" stroke="rgba(231,76,60,0.2)" stroke-width="3"/>
      <path d="M120,500 Q450,470 780,500" fill="none" stroke="rgba(201,150,26,0.08)" stroke-width="2"/>
    </svg>`
};
