/* ═══════════════════════════════════════════════════════
   CHARACTER SVG DEFINITIONS — Enhanced Art
   4 advisors with detailed semi-realistic SVG portraits
   ═══════════════════════════════════════════════════════ */

const CHARS = {
  minh: {
    name: 'Nguyễn Văn Minh',
    title: 'Bộ Trưởng Tài Chính',
    color: '#c9961a',
    svg: `<svg viewBox="0 0 240 360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="minh-suit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e2d52"/>
          <stop offset="100%" stop-color="#141f38"/>
        </linearGradient>
        <linearGradient id="minh-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#d4a06a"/>
          <stop offset="100%" stop-color="#c08858"/>
        </linearGradient>
        <radialGradient id="minh-cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(200,120,80,0.2)"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
        <filter id="minh-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <!-- Body / Suit -->
      <path d="M35,360 L35,210 Q48,192 68,186 L90,180 L100,198 L120,198 L140,198 L150,180 L172,186 Q192,192 205,210 L205,360 Z" fill="url(#minh-suit)"/>
      <!-- Shirt collar -->
      <path d="M100,198 L92,195 Q95,210 105,230 L120,220 Z" fill="#e8e0d0"/>
      <path d="M140,198 L148,195 Q145,210 135,230 L120,220 Z" fill="#e8e0d0"/>
      <!-- Tie -->
      <path d="M115,198 L125,198 L127,260 L120,275 L113,260 Z" fill="#8b1a1a"/>
      <polygon points="115,198 125,198 123,210 117,210" fill="#a01e1e"/>
      <!-- Tie knot highlight -->
      <ellipse cx="120" cy="204" rx="4" ry="3" fill="rgba(180,40,40,0.6)"/>
      <!-- Neck -->
      <rect x="105" y="170" width="30" height="28" fill="url(#minh-skin)" rx="4"/>
      <!-- Head -->
      <ellipse cx="120" cy="128" rx="48" ry="54" fill="url(#minh-skin)"/>
      <!-- Jaw shadow -->
      <ellipse cx="120" cy="165" rx="30" ry="10" fill="rgba(0,0,0,0.06)"/>
      <!-- Hair -->
      <path d="M72,110 Q76,76 120,72 Q164,76 168,110 Q165,90 120,86 Q75,90 72,110 Z" fill="#3a3030"/>
      <path d="M72,110 Q74,100 78,94 Q80,108 73,116 Z" fill="#2a2020"/>
      <path d="M168,110 Q166,100 162,94 Q160,108 167,116 Z" fill="#2a2020"/>
      <!-- Hair highlights -->
      <path d="M90,80 Q120,74 150,80" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
      <!-- Ears -->
      <ellipse cx="72" cy="130" rx="9" ry="13" fill="url(#minh-skin)"/>
      <ellipse cx="72" cy="130" rx="5.5" ry="8" fill="#b07850"/>
      <ellipse cx="168" cy="130" rx="9" ry="13" fill="url(#minh-skin)"/>
      <ellipse cx="168" cy="130" rx="5.5" ry="8" fill="#b07850"/>
      <!-- Eye sockets -->
      <ellipse cx="102" cy="125" rx="14" ry="9" fill="rgba(0,0,0,0.05)"/>
      <ellipse cx="138" cy="125" rx="14" ry="9" fill="rgba(0,0,0,0.05)"/>
      <!-- Eye whites -->
      <ellipse cx="102" cy="124" rx="10" ry="7" fill="white"/>
      <ellipse cx="138" cy="124" rx="10" ry="7" fill="white"/>
      <!-- Iris -->
      <circle cx="103" cy="124" r="4.5" fill="#3a2a18"/>
      <circle cx="139" cy="124" r="4.5" fill="#3a2a18"/>
      <!-- Pupil -->
      <circle cx="103" cy="124" r="2.2" fill="#111"/>
      <circle cx="139" cy="124" r="2.2" fill="#111"/>
      <!-- Eye highlights -->
      <circle cx="105" cy="122" r="1.2" fill="rgba(255,255,255,0.7)"/>
      <circle cx="141" cy="122" r="1.2" fill="rgba(255,255,255,0.7)"/>
      <!-- Glasses -->
      <rect x="89" y="118" width="24" height="14" rx="4" fill="none" stroke="#2a2020" stroke-width="2"/>
      <rect x="127" y="118" width="24" height="14" rx="4" fill="none" stroke="#2a2020" stroke-width="2"/>
      <line x1="113" y1="125" x2="127" y2="125" stroke="#2a2020" stroke-width="1.6"/>
      <line x1="89" y1="124" x2="80" y2="128" stroke="#2a2020" stroke-width="1.4"/>
      <line x1="151" y1="124" x2="160" y2="128" stroke="#2a2020" stroke-width="1.4"/>
      <!-- Glasses lens reflection -->
      <path d="M92,120 Q100,118 110,120" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <path d="M130,120 Q138,118 148,120" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <!-- Eyebrows -->
      <path d="M90,115 Q102,111 114,114" fill="none" stroke="#4a3a28" stroke-width="2" stroke-linecap="round"/>
      <path d="M126,114 Q138,111 150,115" fill="none" stroke="#4a3a28" stroke-width="2" stroke-linecap="round"/>
      <!-- Nose -->
      <path d="M118,130 L118,148 Q120,154 122,148 L122,130" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="1.2"/>
      <!-- Nostrils -->
      <ellipse cx="114" cy="150" rx="4" ry="2.5" fill="#b07850"/>
      <ellipse cx="126" cy="150" rx="4" ry="2.5" fill="#b07850"/>
      <!-- Cheek blush -->
      <circle cx="92" cy="140" r="10" fill="url(#minh-cheek)"/>
      <circle cx="148" cy="140" r="10" fill="url(#minh-cheek)"/>
      <!-- Mouth -->
      <path d="M108,162 Q120,165 132,162" fill="none" stroke="#9a6844" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Chin shadow -->
      <ellipse cx="120" cy="176" rx="22" ry="6" fill="rgba(0,0,0,0.05)"/>
      <!-- Lapel pin -->
      <circle cx="52" cy="208" r="4" fill="#c9961a"/>
      <circle cx="52" cy="208" r="2" fill="#a07810"/>
      <!-- Pocket square -->
      <polygon points="50,220 62,220 62,232 50,232" fill="rgba(201,150,26,0.6)" rx="1"/>
    </svg>`
  },

  lan: {
    name: 'Trần Thị Lan',
    title: 'Giám Đốc Chính Sách Xã Hội',
    color: '#9b2335',
    svg: `<svg viewBox="0 0 240 360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lan-dress" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8a1a2c"/>
          <stop offset="100%" stop-color="#6a1020"/>
        </linearGradient>
        <linearGradient id="lan-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#d4a878"/>
          <stop offset="100%" stop-color="#c09060"/>
        </linearGradient>
        <radialGradient id="lan-cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(210,100,100,0.22)"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <!-- Body / Áo dài style -->
      <path d="M38,360 L38,205 Q50,188 68,182 L92,176 L102,196 L120,196 L138,196 L148,176 L172,182 Q190,188 202,205 L202,360 Z" fill="url(#lan-dress)"/>
      <!-- Áo dài collar -->
      <path d="M102,196 L88,200 L102,232 Z" fill="#9b2030"/>
      <path d="M138,196 L152,200 L138,232 Z" fill="#9b2030"/>
      <!-- Collar gold trim -->
      <path d="M106,196 Q120,210 134,196" fill="none" stroke="#c9961a" stroke-width="1.5" opacity="0.7"/>
      <!-- Áo dài front panel -->
      <rect x="102" y="190" width="36" height="170" fill="#f0e8d8" rx="2" opacity="0.15"/>
      <!-- Necklace -->
      <path d="M100,192 Q120,202 140,192" fill="none" stroke="#c9961a" stroke-width="1.2"/>
      <circle cx="120" cy="200" r="3" fill="#c9961a"/>
      <!-- Neck -->
      <rect x="106" y="168" width="28" height="26" fill="url(#lan-skin)" rx="4"/>
      <!-- Head -->
      <ellipse cx="120" cy="126" rx="46" ry="52" fill="url(#lan-skin)"/>
      <!-- Hair -->
      <path d="M76,106 Q78,72 120,68 Q162,72 164,106 Q160,86 120,82 Q80,86 76,106 Z" fill="#1a0f0a"/>
      <path d="M76,106 Q74,122 76,140 Q72,118 78,110 Z" fill="#1a0f0a"/>
      <path d="M164,106 Q166,122 164,140 Q168,118 162,110 Z" fill="#1a0f0a"/>
      <!-- Hair highlights -->
      <path d="M95,75 Q120,70 145,75" fill="none" stroke="rgba(60,30,15,0.4)" stroke-width="3"/>
      <!-- Hair pin / ornament -->
      <circle cx="162" cy="90" r="6" fill="#c9961a"/>
      <circle cx="162" cy="90" r="3" fill="#a07810"/>
      <circle cx="156" cy="96" r="3" fill="#c9961a" opacity="0.6"/>
      <!-- Parting -->
      <path d="M120,68 Q120,84 124,98" fill="none" stroke="#0a0808" stroke-width="3"/>
      <!-- Ears -->
      <ellipse cx="76" cy="128" rx="7" ry="11" fill="url(#lan-skin)"/>
      <ellipse cx="164" cy="128" rx="7" ry="11" fill="url(#lan-skin)"/>
      <!-- Earrings -->
      <circle cx="76" cy="120" r="2.5" fill="#c9961a"/>
      <line x1="76" y1="122" x2="76" y2="128" stroke="#c9961a" stroke-width="0.8"/>
      <circle cx="76" cy="129" r="2" fill="#c9961a"/>
      <circle cx="164" cy="120" r="2.5" fill="#c9961a"/>
      <line x1="164" y1="122" x2="164" y2="128" stroke="#c9961a" stroke-width="0.8"/>
      <circle cx="164" cy="129" r="2" fill="#c9961a"/>
      <!-- Eye sockets -->
      <ellipse cx="103" cy="123" rx="13" ry="8" fill="rgba(0,0,0,0.04)"/>
      <ellipse cx="137" cy="123" rx="13" ry="8" fill="rgba(0,0,0,0.04)"/>
      <!-- Eye whites -->
      <ellipse cx="103" cy="122" rx="9" ry="6" fill="white"/>
      <ellipse cx="137" cy="122" rx="9" ry="6" fill="white"/>
      <!-- Iris -->
      <circle cx="104" cy="122" r="4.2" fill="#2a1808"/>
      <circle cx="138" cy="122" r="4.2" fill="#2a1808"/>
      <!-- Pupil -->
      <circle cx="104" cy="122" r="2" fill="#050302"/>
      <circle cx="138" cy="122" r="2" fill="#050302"/>
      <!-- Eye highlights -->
      <circle cx="106" cy="120" r="1.2" fill="rgba(255,255,255,0.7)"/>
      <circle cx="140" cy="120" r="1.2" fill="rgba(255,255,255,0.7)"/>
      <!-- Eyelashes -->
      <path d="M92,118 Q103,114 114,117" fill="none" stroke="#1a0f0a" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M126,117 Q137,114 148,118" fill="none" stroke="#1a0f0a" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Lower eyelid -->
      <path d="M95,126 Q103,128 111,126" fill="none" stroke="#1a0f0a" stroke-width="0.8"/>
      <path d="M129,126 Q137,128 145,126" fill="none" stroke="#1a0f0a" stroke-width="0.8"/>
      <!-- Nose -->
      <path d="M118,128 Q120,140 122,128" fill="none" stroke="#a07040" stroke-width="1.5"/>
      <!-- Nostrils -->
      <ellipse cx="114" cy="142" rx="3.5" ry="2" fill="#b07848"/>
      <ellipse cx="126" cy="142" rx="3.5" ry="2" fill="#b07848"/>
      <!-- Cheek blush -->
      <circle cx="92" cy="136" r="10" fill="url(#lan-cheek)"/>
      <circle cx="148" cy="136" r="10" fill="url(#lan-cheek)"/>
      <!-- Mouth (slight smile) -->
      <path d="M108,152 L120,155 L132,152" fill="none" stroke="#8a5030" stroke-width="2" stroke-linecap="round"/>
      <path d="M108,152 Q120,158 132,152" fill="#c08060" opacity="0.4"/>
      <!-- Beauty mark -->
      <circle cx="140" cy="148" r="1.2" fill="#5a3a20"/>
    </svg>`
  },

  cuong: {
    name: 'Thiếu Tướng Phạm Đức Cường',
    title: 'Cố Vấn An Ninh Quốc Gia',
    color: '#4a6e3a',
    svg: `<svg viewBox="0 0 240 360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cuong-uniform" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3e5530"/>
          <stop offset="100%" stop-color="#2a3d20"/>
        </linearGradient>
        <linearGradient id="cuong-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c0885a"/>
          <stop offset="100%" stop-color="#a87042"/>
        </linearGradient>
      </defs>
      <!-- Body / Military Uniform -->
      <path d="M32,360 L32,206 Q44,188 64,182 L90,175 L102,194 L120,194 L138,194 L150,175 L176,182 Q196,188 208,206 L208,360 Z" fill="url(#cuong-uniform)"/>
      <!-- Shoulder boards -->
      <path d="M102,194 L90,190 L92,180 L102,184 Z" fill="#2a3d20"/>
      <path d="M138,194 L150,190 L148,180 L138,184 Z" fill="#2a3d20"/>
      <!-- Epaulettes gold -->
      <rect x="84" y="178" width="16" height="4" fill="#c9961a" rx="1"/>
      <rect x="140" y="178" width="16" height="4" fill="#c9961a" rx="1"/>
      <!-- Medals -->
      <circle cx="48" cy="196" r="5" fill="#c9961a"/>
      <text x="48" y="199" text-anchor="middle" fill="#8a6010" font-size="6" font-family="serif">★</text>
      <circle cx="198" cy="196" r="5" fill="#c9961a"/>
      <text x="198" y="199" text-anchor="middle" fill="#8a6010" font-size="6" font-family="serif">★</text>
      <!-- Medal ribbons -->
      <rect x="56" y="218" width="12" height="8" fill="#c9961a" rx="1"/>
      <rect x="70" y="218" width="12" height="8" fill="#2980b9" rx="1"/>
      <rect x="84" y="218" width="12" height="8" fill="#c0392b" rx="1"/>
      <rect x="56" y="228" width="12" height="8" fill="#27ae60" rx="1"/>
      <rect x="70" y="228" width="12" height="8" fill="#e8c04a" rx="1"/>
      <!-- Buttons -->
      <circle cx="120" cy="210" r="2.5" fill="#c9961a"/>
      <circle cx="120" cy="230" r="2.5" fill="#c9961a"/>
      <circle cx="120" cy="250" r="2.5" fill="#c9961a"/>
      <!-- Neck -->
      <rect x="106" y="168" width="28" height="26" fill="url(#cuong-skin)" rx="4"/>
      <!-- Head -->
      <ellipse cx="120" cy="124" rx="49" ry="54" fill="url(#cuong-skin)"/>
      <!-- Face lines (weathered) -->
      <path d="M90,115 Q95,112 100,115" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="0.6"/>
      <path d="M140,115 Q145,112 150,115" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="0.6"/>
      <!-- Jaw line -->
      <path d="M76,150 Q120,172 164,150" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="1"/>
      <!-- Hair (military cut) -->
      <path d="M72,100 Q75,76 120,72 Q165,76 168,100 Q164,84 120,80 Q76,84 72,100 Z" fill="#585050"/>
      <path d="M72,100 L72,112 Q70,104 74,96 Z" fill="#585050"/>
      <path d="M168,100 L168,112 Q170,104 166,96 Z" fill="#585050"/>
      <!-- Buzz cut texture -->
      <path d="M85,78 Q120,74 155,78" fill="none" stroke="rgba(80,80,80,0.3)" stroke-width="1"/>
      <path d="M80,84 Q120,79 160,84" fill="none" stroke="rgba(80,80,80,0.2)" stroke-width="1"/>
      <!-- Military beret -->
      <path d="M68,98 L68,92 Q74,68 120,64 Q166,68 172,92 L172,98 Z" fill="#2a3d20"/>
      <path d="M64,98 L176,98" stroke="#c9961a" stroke-width="2"/>
      <!-- Beret star -->
      <polygon points="120,72 123,80 131,82 125,88 127,96 120,92 113,96 115,88 109,82 117,80" fill="#c9961a" opacity="0.9"/>
      <!-- Ears -->
      <ellipse cx="72" cy="126" rx="9" ry="14" fill="url(#cuong-skin)"/>
      <ellipse cx="72" cy="126" rx="5.5" ry="9" fill="#a06838"/>
      <ellipse cx="168" cy="126" rx="9" ry="14" fill="url(#cuong-skin)"/>
      <ellipse cx="168" cy="126" rx="5.5" ry="9" fill="#a06838"/>
      <!-- Eye sockets -->
      <ellipse cx="101" cy="122" rx="14" ry="9" fill="rgba(0,0,0,0.08)"/>
      <ellipse cx="139" cy="122" rx="14" ry="9" fill="rgba(0,0,0,0.08)"/>
      <!-- Eye whites -->
      <ellipse cx="101" cy="122" rx="10" ry="6.5" fill="#f0e8e0"/>
      <ellipse cx="139" cy="122" rx="10" ry="6.5" fill="#f0e8e0"/>
      <!-- Iris -->
      <circle cx="102" cy="122" r="4.2" fill="#4a3c28"/>
      <circle cx="140" cy="122" r="4.2" fill="#4a3c28"/>
      <!-- Pupil -->
      <circle cx="102" cy="122" r="2" fill="#1a1008"/>
      <circle cx="140" cy="122" r="2" fill="#1a1008"/>
      <!-- Eye highlights -->
      <circle cx="104" cy="120" r="1" fill="rgba(255,255,255,0.6)"/>
      <circle cx="142" cy="120" r="1" fill="rgba(255,255,255,0.6)"/>
      <!-- Eyebrows (thick, stern) -->
      <path d="M86,113 Q101,108 114,112" fill="none" stroke="#484040" stroke-width="3" stroke-linecap="round"/>
      <path d="M126,112 Q139,108 154,113" fill="none" stroke="#484040" stroke-width="3" stroke-linecap="round"/>
      <!-- Scar on right cheek -->
      <path d="M148,134 L156,142" fill="none" stroke="rgba(180,140,120,0.5)" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Nose -->
      <path d="M116,128 L116,148 Q120,155 124,148 L124,128" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1.5"/>
      <!-- Nostrils -->
      <ellipse cx="112" cy="148" rx="5" ry="3" fill="#a06838"/>
      <ellipse cx="128" cy="148" rx="5" ry="3" fill="#a06838"/>
      <!-- Mouth (stern, straight) -->
      <path d="M104,160 L120,162 L136,160" fill="none" stroke="#8a5838" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  huy: {
    name: 'Lê Quang Huy',
    title: 'Thư Ký Báo Chí',
    color: '#2980b9',
    svg: `<svg viewBox="0 0 240 360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="huy-suit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2d6090"/>
          <stop offset="100%" stop-color="#1e4a70"/>
        </linearGradient>
        <linearGradient id="huy-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#d0a878"/>
          <stop offset="100%" stop-color="#b89060"/>
        </linearGradient>
      </defs>
      <!-- Body / Modern Suit -->
      <path d="M40,360 L40,210 Q52,194 70,188 L94,182 L104,200 L120,200 L136,200 L146,182 L170,188 Q188,194 200,210 L200,360 Z" fill="url(#huy-suit)"/>
      <!-- Shirt & collar -->
      <path d="M104,200 L94,196 Q98,212 108,232 L120,222 Z" fill="#e8e4e0"/>
      <path d="M136,200 L146,196 Q142,212 132,232 L120,222 Z" fill="#e8e4e0"/>
      <!-- Modern tie (slim) -->
      <rect x="117" y="198" width="6" height="160" fill="rgba(255,255,255,0.08)" rx="2"/>
      <!-- Button row -->
      <circle cx="120" cy="215" r="1.5" fill="rgba(255,255,255,0.12)"/>
      <circle cx="120" cy="235" r="1.5" fill="rgba(255,255,255,0.12)"/>
      <!-- Neck -->
      <rect x="106" y="172" width="28" height="24" fill="url(#huy-skin)" rx="4"/>
      <!-- Head -->
      <ellipse cx="120" cy="128" rx="46" ry="52" fill="url(#huy-skin)"/>
      <!-- Hair (modern, styled) -->
      <path d="M76,106 Q78,72 120,68 Q162,72 164,106 Q160,84 120,80 Q80,84 76,106 Z" fill="#1a1008"/>
      <path d="M76,106 Q74,98 78,90 L84,102 Z" fill="#1a1008"/>
      <!-- Styled top -->
      <path d="M92,72 Q120,66 148,72" fill="none" stroke="#0a0808" stroke-width="3.5"/>
      <path d="M88,76 Q120,70 152,76" fill="none" stroke="#0a0808" stroke-width="2.5"/>
      <!-- Hair shine -->
      <path d="M100,72 Q120,68 140,72" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
      <!-- Ears -->
      <ellipse cx="76" cy="130" rx="7.5" ry="11" fill="url(#huy-skin)"/>
      <ellipse cx="76" cy="130" rx="4.5" ry="7" fill="#b08060"/>
      <ellipse cx="164" cy="130" rx="7.5" ry="11" fill="url(#huy-skin)"/>
      <ellipse cx="164" cy="130" rx="4.5" ry="7" fill="#b08060"/>
      <!-- Eye sockets -->
      <ellipse cx="102" cy="125" rx="13" ry="8" fill="rgba(0,0,0,0.04)"/>
      <ellipse cx="138" cy="125" rx="13" ry="8" fill="rgba(0,0,0,0.04)"/>
      <!-- Eye whites -->
      <ellipse cx="102" cy="124" rx="9.5" ry="6" fill="white"/>
      <ellipse cx="138" cy="124" rx="9.5" ry="6" fill="white"/>
      <!-- Iris -->
      <circle cx="103" cy="124" r="4.2" fill="#2a1808"/>
      <circle cx="139" cy="124" r="4.2" fill="#2a1808"/>
      <!-- Pupil -->
      <circle cx="103" cy="124" r="2" fill="#050302"/>
      <circle cx="139" cy="124" r="2" fill="#050302"/>
      <!-- Eye highlights -->
      <circle cx="105" cy="122" r="1.2" fill="rgba(255,255,255,0.7)"/>
      <circle cx="141" cy="122" r="1.2" fill="rgba(255,255,255,0.7)"/>
      <!-- Eyebrows (friendly) -->
      <path d="M90,117 Q102,113 114,116" fill="none" stroke="#1a1008" stroke-width="2" stroke-linecap="round"/>
      <path d="M126,116 Q138,113 150,117" fill="none" stroke="#1a1008" stroke-width="2" stroke-linecap="round"/>
      <!-- Nose -->
      <path d="M117,130 Q120,142 123,130" fill="none" stroke="#a07848" stroke-width="1.4"/>
      <!-- Nostrils -->
      <ellipse cx="114" cy="144" rx="3.5" ry="2" fill="#b08858"/>
      <ellipse cx="126" cy="144" rx="3.5" ry="2" fill="#b08858"/>
      <!-- Smile -->
      <path d="M106,156 Q120,164 134,156" fill="none" stroke="#906040" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Dimples -->
      <path d="M104,152 Q100,158 102,164" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="0.8"/>
      <path d="M136,152 Q140,158 138,164" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="0.8"/>
      <!-- Tablet/Phone in hand hint -->
      <rect x="164" y="270" width="26" height="38" rx="3" fill="#1a2540" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <rect x="167" y="275" width="20" height="14" rx="1" fill="#2a3a58" opacity="0.7"/>
      <!-- Press badge -->
      <rect x="170" y="190" width="18" height="22" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
      <rect x="173" y="194" width="12" height="3" rx="1" fill="rgba(41,128,185,0.5)"/>
      <rect x="173" y="199" width="8" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>
    </svg>`
  }
};
