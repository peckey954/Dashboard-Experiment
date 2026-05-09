/**
 * @fileoverview Parich Dealer Dashboard - main application script.
 */

'use strict';

/** @const {!Array<!Object>} Zone definitions with crop and dealer data. */
const ZONES = [
  {
    id: 'N1',
    name: 'เหนือ 1',
    color: '#1a6fa5',
    dealers: 8,
    provinces: ['เชียงใหม่', 'เชียงราย', 'แม่ฮ่องสอน', 'ลำปาง'],
    crops: [
      ['ข้าวโพดเลี้ยงสัตว์', '#f39c12', 75],
      ['ข้าวนาปี', '#3498db', 48],
      ['ลำไย', '#8e44ad', 28],
    ],
  },
  {
    id: 'N2',
    name: 'เหนือ 2',
    color: '#1e8bc3',
    dealers: 11,
    provinces: ['พิษณุโลก', 'เพชรบูรณ์', 'สุโขทัย', 'อุตรดิตถ์'],
    crops: [
      ['ข้าวนาปี', '#3498db', 82],
      ['ข้าวโพดเลี้ยงสัตว์', '#f39c12', 54],
      ['มันสำปะหลัง', '#e74c3c', 22],
    ],
  },
  {
    id: 'N3',
    name: 'เหนือ 3',
    color: '#4db8e8',
    dealers: 9,
    provinces: ['ตาก', 'กำแพงเพชร', 'นครสวรรค์', 'พิจิตร'],
    crops: [
      ['ข้าวโพดเลี้ยงสัตว์', '#f39c12', 68],
      ['ข้าวนาปี', '#3498db', 52],
      ['อ้อยโรงงาน', '#1abc9c', 33],
    ],
  },
  {
    id: 'NE1',
    name: 'อีสาน 1',
    color: '#e6a817',
    dealers: 14,
    provinces: ['ขอนแก่น', 'มหาสารคาม', 'กาฬสินธุ์', 'ร้อยเอ็ด'],
    crops: [
      ['ข้าวนาปี', '#3498db', 88],
      ['อ้อยโรงงาน', '#1abc9c', 38],
      ['มันสำปะหลัง', '#e74c3c', 18],
    ],
  },
  {
    id: 'NE2',
    name: 'อีสาน 2',
    color: '#c0392b',
    dealers: 12,
    provinces: ['นครราชสีมา', 'บุรีรัมย์', 'สุรินทร์', 'ชัยภูมิ'],
    crops: [
      ['ข้าวนาปี', '#3498db', 89],
      ['ยางพารา', '#27ae60', 30],
      ['มันสำปะหลัง', '#e74c3c', 21],
    ],
  },
  {
    id: 'NE3',
    name: 'อีสาน 3',
    color: '#e74c3c',
    dealers: 10,
    provinces: ['อุดรธานี', 'หนองคาย', 'เลย', 'สกลนคร'],
    crops: [
      ['ข้าวนาปี', '#3498db', 83],
      ['ยางพารา', '#27ae60', 27],
      ['อ้อยโรงงาน', '#1abc9c', 17],
    ],
  },
  {
    id: 'C1',
    name: 'กลาง 1',
    color: '#16a085',
    dealers: 9,
    provinces: ['อยุธยา', 'อ่างทอง', 'สิงห์บุรี', 'ชัยนาท'],
    crops: [
      ['ข้าวนาปรัง', '#2980b9', 90],
      ['ข้าวนาปี', '#27ae60', 68],
      ['อ้อยโรงงาน', '#f39c12', 24],
    ],
  },
  {
    id: 'C2',
    name: 'กลาง 2',
    color: '#8e44ad',
    dealers: 11,
    provinces: ['ลพบุรี', 'สระบุรี', 'นครนายก', 'ปราจีนบุรี'],
    crops: [
      ['ข้าวนาปรัง', '#2980b9', 76],
      ['ข้าวโพดเลี้ยงสัตว์', '#f39c12', 44],
      ['มันสำปะหลัง', '#e74c3c', 29],
    ],
  },
  {
    id: 'C3',
    name: 'กลาง 3',
    color: '#27ae60',
    dealers: 8,
    provinces: ['ราชบุรี', 'กาญจนบุรี', 'สุพรรณบุรี', 'นครปฐม'],
    crops: [
      ['ข้าวนาปรัง', '#2980b9', 79],
      ['อ้อยโรงงาน', '#f39c12', 54],
      ['ข้าวโพดเลี้ยงสัตว์', '#e67e22', 19],
    ],
  },
  {
    id: 'S1',
    name: 'ใต้ 1',
    color: '#c0392b',
    dealers: 6,
    provinces: ['ชุมพร', 'สุราษฎร์ธานี', 'นครศรีธรรมราช', 'พัทลุง'],
    crops: [
      ['ปาล์มน้ำมัน', '#f39c12', 84],
      ['ยางพารา', '#27ae60', 72],
      ['ข้าวนาปี', '#3498db', 14],
    ],
  },
  {
    id: 'S2',
    name: 'ใต้ 2',
    color: '#e74c3c',
    dealers: 4,
    provinces: ['กระบี่', 'พังงา', 'ภูเก็ต', 'ตรัง'],
    crops: [
      ['ยางพารา', '#27ae60', 91],
      ['ปาล์มน้ำมัน', '#f39c12', 63],
      ['ผลไม้', '#e91e63', 18],
    ],
  },
];

/** @const {!Array<!Object>} Dealer records. */
const DEALERS = [
  {name: 'รุ่งเจริญการเกษตร',           zone: 'N1',  province: 'ตาก',           district: 'พบพระ',         crop: 'ข้าวโพด',     active: true},
  {name: 'ศรีสุวรรณเกษตร',              zone: 'N1',  province: 'เชียงใหม่',     district: 'สันทราย',       crop: 'ข้าวนาปี',    active: true},
  {name: 'แม่ฮ่องสอนอะกริ',             zone: 'N1',  province: 'แม่ฮ่องสอน',   district: 'เมือง',         crop: 'ข้าวโพด',     active: false},
  {name: 'บ้านทุ่งเกษตร',               zone: 'N2',  province: 'พิษณุโลก',     district: 'เมือง',         crop: 'ข้าวนาปี',    active: true},
  {name: 'เพชรบูรณ์การเกษตร',           zone: 'N2',  province: 'เพชรบูรณ์',    district: 'หล่มสัก',       crop: 'ข้าวโพด',     active: true},
  {name: 'นครสวรรค์การเกษตร',           zone: 'N3',  province: 'นครสวรรค์',    district: 'เมือง',         crop: 'อ้อย',        active: true},
  {name: 'ตากอะกริซัพพลาย',             zone: 'N3',  province: 'ตาก',           district: 'แม่สอด',        crop: 'ข้าวโพด',     active: true},
  {name: 'ขอนแก่นเกษตรกร',              zone: 'NE1', province: 'ขอนแก่น',      district: 'เมือง',         crop: 'ข้าวนาปี',    active: true},
  {name: 'กาฬสินธุ์เกษตร',              zone: 'NE1', province: 'กาฬสินธุ์',    district: 'กมลาไสย',       crop: 'ข้าวนาปี',    active: true},
  {name: 'สุรินทร์เซลล์',               zone: 'NE2', province: 'สุรินทร์',      district: 'ท่าตูม',         crop: 'ข้าวนาปี',    active: false},
  {name: 'บริษัท เดลแอนด์ปี รุ่งเรือง', zone: 'NE3', province: 'อุดรธานี',     district: 'เมือง',         crop: 'ข้าวนาปี',    active: true},
  {name: 'ไทยเกษตรพัฒนา',               zone: 'C1',  province: 'อยุธยา',        district: 'บางปะหัน',      crop: 'ข้าวนาปรัง',  active: true},
  {name: 'ชัยนาทอะกริ',                  zone: 'C1',  province: 'ชัยนาท',        district: 'เมือง',         crop: 'ข้าวนาปรัง',  active: true},
  {name: 'ลพบุรีอะกริ',                  zone: 'C2',  province: 'ลพบุรี',        district: 'โคกสำโรง',      crop: 'ข้าวโพด',     active: true},
  {name: 'สุพรรณบุรีเกษตร',             zone: 'C3',  province: 'สุพรรณบุรี',   district: 'เดิมบางนางบวช', crop: 'อ้อย',        active: true},
  {name: 'สุราษฎร์เกษตรกร',             zone: 'S1',  province: 'สุราษฎร์ธานี', district: 'พุนพิน',         crop: 'ปาล์มน้ำมัน', active: true},
  {name: 'ชุมพรปาล์มเกษตร',             zone: 'S1',  province: 'ชุมพร',         district: 'ท่าแซะ',         crop: 'ปาล์มน้ำมัน', active: true},
  {name: 'ยางพาราใต้',                   zone: 'S2',  province: 'กระบี่',        district: 'เมือง',         crop: 'ยางพารา',     active: false},
  {name: 'กระบี่เกษตรกร',               zone: 'S2',  province: 'กระบี่',        district: 'อ่าวลึก',        crop: 'ยางพารา',     active: true},
];

/**
 * Maps Thai province name to zone ID for map coloring.
 * @const {!Object<string, string>}
 */
const PROVINCE_ZONE_MAP = {
  // N1
  'เชียงใหม่': 'N1', 'เชียงราย': 'N1', 'แม่ฮ่องสอน': 'N1',
  'ลำปาง': 'N1', 'ลำพูน': 'N1', 'พะเยา': 'N1', 'แพร่': 'N1', 'น่าน': 'N1',
  // N2
  'พิษณุโลก': 'N2', 'เพชรบูรณ์': 'N2', 'สุโขทัย': 'N2', 'อุตรดิตถ์': 'N2',
  // N3
  'ตาก': 'N3', 'กำแพงเพชร': 'N3', 'นครสวรรค์': 'N3', 'พิจิตร': 'N3', 'อุทัยธานี': 'N3',
  // NE1
  'ขอนแก่น': 'NE1', 'มหาสารคาม': 'NE1', 'กาฬสินธุ์': 'NE1', 'ร้อยเอ็ด': 'NE1', 'ยโสธร': 'NE1',
  // NE2
  'นครราชสีมา': 'NE2', 'บุรีรัมย์': 'NE2', 'สุรินทร์': 'NE2', 'ชัยภูมิ': 'NE2',
  'ศรีสะเกษ': 'NE2', 'อุบลราชธานี': 'NE2',
  // NE3
  'อุดรธานี': 'NE3', 'หนองคาย': 'NE3', 'เลย': 'NE3', 'สกลนคร': 'NE3',
  'หนองบัวลำภู': 'NE3', 'นครพนม': 'NE3', 'มุกดาหาร': 'NE3', 'อำนาจเจริญ': 'NE3', 'บึงกาฬ': 'NE3',
  // C1
  'อยุธยา': 'C1', 'พระนครศรีอยุธยา': 'C1', 'อ่างทอง': 'C1',
  'สิงห์บุรี': 'C1', 'ชัยนาท': 'C1', 'สระบุรี': 'C1',
  'กรุงเทพมหานคร': 'C1', 'นนทบุรี': 'C1', 'ปทุมธานี': 'C1', 'สมุทรปราการ': 'C1',
  // C2
  'ลพบุรี': 'C2', 'นครนายก': 'C2', 'ปราจีนบุรี': 'C2',
  'ฉะเชิงเทรา': 'C2', 'สระแก้ว': 'C2', 'ชลบุรี': 'C2', 'ระยอง': 'C2',
  'จันทบุรี': 'C2', 'ตราด': 'C2',
  // C3
  'ราชบุรี': 'C3', 'กาญจนบุรี': 'C3', 'สุพรรณบุรี': 'C3', 'นครปฐม': 'C3',
  'สมุทรสาคร': 'C3', 'สมุทรสงคราม': 'C3', 'เพชรบุรี': 'C3', 'ประจวบคีรีขันธ์': 'C3',
  // S1
  'ชุมพร': 'S1', 'สุราษฎร์ธานี': 'S1', 'นครศรีธรรมราช': 'S1', 'พัทลุง': 'S1',
  // S2
  'กระบี่': 'S2', 'พังงา': 'S2', 'ภูเก็ต': 'S2', 'ตรัง': 'S2',
  'สตูล': 'S2', 'สงขลา': 'S2', 'ปัตตานี': 'S2', 'ยะลา': 'S2', 'นราธิวาส': 'S2',
};

/**
 * Approximate center coordinates [lat, lng] per province for dealer markers.
 * @const {!Object<string, !Array<number>>}
 */
const PROVINCE_COORDS = {
  'เชียงใหม่': [18.789, 98.985], 'เชียงราย': [19.910, 99.840],
  'แม่ฮ่องสอน': [19.302, 97.965], 'ลำปาง': [18.289, 99.492],
  'ลำพูน': [18.574, 99.009], 'พะเยา': [19.166, 99.904],
  'แพร่': [18.145, 100.140], 'น่าน': [18.776, 100.773],
  'พิษณุโลก': [16.821, 100.266], 'เพชรบูรณ์': [16.419, 101.157],
  'สุโขทัย': [17.005, 99.827], 'อุตรดิตถ์': [17.620, 100.099],
  'ตาก': [16.884, 99.126], 'กำแพงเพชร': [16.483, 99.523],
  'นครสวรรค์': [15.703, 100.137], 'พิจิตร': [16.442, 100.349],
  'อุทัยธานี': [15.384, 100.026],
  'ขอนแก่น': [16.442, 102.836], 'มหาสารคาม': [16.185, 103.301],
  'กาฬสินธุ์': [16.431, 103.506], 'ร้อยเอ็ด': [16.053, 103.652],
  'ยโสธร': [15.793, 104.146],
  'นครราชสีมา': [14.980, 102.098], 'บุรีรัมย์': [14.995, 103.112],
  'สุรินทร์': [14.882, 103.493], 'ชัยภูมิ': [15.807, 102.031],
  'ศรีสะเกษ': [15.119, 104.322], 'อุบลราชธานี': [15.245, 104.847],
  'อุดรธานี': [17.414, 102.787], 'หนองคาย': [17.878, 102.742],
  'เลย': [17.486, 101.722], 'สกลนคร': [17.166, 104.149],
  'หนองบัวลำภู': [17.200, 102.440], 'นครพนม': [17.391, 104.769],
  'มุกดาหาร': [16.543, 104.724], 'อำนาจเจริญ': [15.866, 104.626],
  'บึงกาฬ': [18.361, 103.652],
  'อยุธยา': [14.369, 100.588], 'พระนครศรีอยุธยา': [14.369, 100.588],
  'อ่างทอง': [14.590, 100.455], 'สิงห์บุรี': [14.890, 100.397],
  'ชัยนาท': [15.185, 100.125], 'สระบุรี': [14.529, 100.911],
  'กรุงเทพมหานคร': [13.756, 100.502], 'นนทบุรี': [13.862, 100.513],
  'ปทุมธานี': [14.021, 100.525], 'สมุทรปราการ': [13.599, 100.600],
  'ลพบุรี': [14.800, 100.653], 'นครนายก': [14.207, 101.213],
  'ปราจีนบุรี': [14.051, 101.368], 'ฉะเชิงเทรา': [13.691, 101.078],
  'สระแก้ว': [13.824, 102.065], 'ชลบุรี': [13.362, 100.985],
  'ระยอง': [12.681, 101.282], 'จันทบุรี': [12.611, 102.104],
  'ตราด': [12.243, 102.518],
  'ราชบุรี': [13.528, 99.813], 'กาญจนบุรี': [14.002, 99.533],
  'สุพรรณบุรี': [14.475, 100.118], 'นครปฐม': [13.820, 100.062],
  'สมุทรสาคร': [13.548, 100.274], 'สมุทรสงคราม': [13.410, 100.002],
  'เพชรบุรี': [13.112, 99.940], 'ประจวบคีรีขันธ์': [11.813, 99.798],
  'ชุมพร': [10.493, 99.180], 'สุราษฎร์ธานี': [9.138, 99.322],
  'นครศรีธรรมราช': [8.430, 99.963], 'พัทลุง': [7.616, 100.075],
  'กระบี่': [8.086, 98.906], 'พังงา': [8.451, 98.525],
  'ภูเก็ต': [7.880, 98.392], 'ตรัง': [7.559, 99.612],
  'สตูล': [6.624, 100.068], 'สงขลา': [7.190, 100.595],
  'ปัตตานี': [6.869, 101.250], 'ยะลา': [6.541, 101.280],
  'นราธิวาส': [6.425, 101.825],
};

/**
 * Mini-map grid layout. Each row is an array of zone IDs or null for empty cells.
 * @const {!Array<!Array<?string>>}
 */
const MINI_LAYOUT = [
  [null, 'N1',  'N2',  'N3',  null],
  [null, 'NE1', 'NE2', 'NE3', null],
  ['C1', 'C2',  'C3',  null,  null],
  [null, 'S1',  'S2',  null,  null],
];

/** @type {string} Currently active zone filter. */
let currentZone = 'all';

/** @type {number} Index of the selected dealer row (-1 = none). */
let selectedDealerIdx = -1;

/** @type {boolean} Active status for the new dealer modal form. */
let newDealerActive = true;

/** @type {?Object} Leaflet map instance. */
let leafletMap = null;

/** @type {?Object} Leaflet GeoJSON province layer. */
let provinceLayer = null;

/** @type {?Object} Leaflet dealer markers layer group. */
let dealerMarkersLayer = null;

/** @type {?Object} Current Leaflet tile layer. */
let tileLayer = null;

/** @type {?Object} Labels-only tile layer rendered below province fills (light mode). */
let labelsLayer = null;

/** @type {?Object} Gray world overlay layer (covers non-Thailand in light mode). */
let worldOverlayLayer = null;

/** @type {boolean} Whether the Leaflet map has been initialized. */
let mapInitialized = false;

/** @const {!Object<string, string>} Tile URLs by theme. */
const TILE_URLS = {
  dark:  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
};

/**
 * Returns the color for a given zone ID.
 * @param {string} id Zone ID.
 * @return {string} Hex color string.
 */
const zoneColor = (id) => (ZONES.find((z) => z.id === id) || {}).color || '#555';

/**
 * Returns the zone ID for a given Thai province name using partial matching.
 * @param {string} provName Province name in Thai.
 * @return {?string} Zone ID or null if not found.
 */
function getZoneForProvince(provName) {
  if (!provName) return null;
  if (PROVINCE_ZONE_MAP[provName]) return PROVINCE_ZONE_MAP[provName];
  const keys = Object.keys(PROVINCE_ZONE_MAP);
  const match = keys.find((k) => provName.includes(k) || k.includes(provName));
  return match ? PROVINCE_ZONE_MAP[match] : null;
}

/**
 * Builds the mini map grid in the sidebar.
 */
function buildMiniMap() {
  const el = document.getElementById('miniMap');
  el.innerHTML = '';
  MINI_LAYOUT.forEach((row) => {
    row.forEach((id) => {
      const cell = document.createElement('div');
      if (!id) {
        cell.style.aspectRatio = '1';
        el.appendChild(cell);
        return;
      }
      const zone = ZONES.find((z) => z.id === id);
      cell.className = 'mini-cell';
      cell.style.background = zone.color;
      cell.title = zone.name;
      cell.innerHTML = `${id}<span class="badge">${zone.dealers}</span>`;
      cell.onclick = () => filterZone(id);
      el.appendChild(cell);
    });
  });
}

/**
 * Builds the zone filter chips in the sidebar.
 */
function buildZoneChips() {
  const el = document.getElementById('zoneChips');
  el.innerHTML = ZONES.map((z) => `
    <div class="zone-chip" id="chip-${z.id}" onclick="filterZone('${z.id}')" style="color:${z.color}">
      <div class="zone-dot" style="background:${z.color}"></div>${z.id}
    </div>
  `).join('');
}

/**
 * Filters the dashboard to a specific zone or all zones.
 * @param {string} id Zone ID or 'all'.
 */
function filterZone(id) {
  currentZone = id;
  document.querySelectorAll('.zone-chip').forEach((c) => c.classList.remove('active'));
  if (id !== 'all') {
    const chip = document.getElementById(`chip-${id}`);
    if (chip) chip.classList.add('active');
    const zone = ZONES.find((z) => z.id === id);
    if (zone) setDetailZone(zone);
  }
  renderZoneCards();
  renderTable();
  updateContentHeader();
  if (mapInitialized) {
    if (provinceLayer) provinceLayer.setStyle(styleProvince);
    renderDealerMarkers();
  }
}

/**
 * Updates the content area title and subtitle based on the current filter.
 */
function updateContentHeader() {
  const filtered = currentZone === 'all' ? ZONES : ZONES.filter((z) => z.id === currentZone);
  const totalDealers = filtered.reduce((sum, z) => sum + z.dealers, 0);
  const zone = currentZone === 'all' ? null : ZONES.find((z) => z.id === currentZone);
  document.getElementById('contentTitle').textContent =
      zone ? `เขต ${zone.id} – ${zone.name}` : 'ดีลเลอร์ทั้งหมด';
  document.getElementById('contentSub').textContent =
      `${totalDealers} ราย ใน ${filtered.length} เขตพื้นที่`;
}

/**
 * Renders the zone cards grid.
 */
function renderZoneCards() {
  const container = document.getElementById('zoneCardsGrid');
  const list = currentZone === 'all' ? ZONES : ZONES.filter((z) => z.id === currentZone);
  container.innerHTML = list.map((z) => `
    <div class="zone-card" onclick="selectZone('${z.id}')" id="zcard-${z.id}">
      <div class="zone-card-header">
        <div class="zone-card-name">
          <div class="zone-badge-lg" style="background:${z.color}">${z.id}</div>
          ${z.name}
        </div>
        <div class="zone-card-count">
          <div class="zone-card-count-num" style="color:${z.color}">${z.dealers}</div>
          <div class="zone-card-count-label">ดีลเลอร์</div>
        </div>
      </div>
      <div class="zone-card-body">
        <div class="zone-provinces">
          ${z.provinces.slice(0, 4).map((p) => `<span class="province-tag">${p}</span>`).join('')}
        </div>
        <div class="crop-label">พืชหลัก</div>
        ${z.crops.map(([name, color, pct]) => `
          <div class="crop-row">
            <div class="crop-name">${name}</div>
            <div class="crop-bar-bg">
              <div class="crop-bar-fill" style="background:${color};width:${pct}%"></div>
            </div>
            <div class="crop-pct" style="color:${color}">${pct}%</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/**
 * Renders the dealer table, filtered by current zone and search query.
 */
function renderTable() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  let list = DEALERS;
  if (currentZone !== 'all') list = list.filter((d) => d.zone === currentZone);
  if (search) {
    list = list.filter(
        (d) => d.name.toLowerCase().includes(search) || d.province.includes(search));
  }
  document.getElementById('dealerTbody').innerHTML = list.map((d, i) => `
    <tr onclick="selectDealer(${i})" id="drow-${i}" ${selectedDealerIdx === i ? 'class="selected"' : ''}>
      <td>
        <div class="d-name-cell">
          <div class="d-avatar" style="background:${zoneColor(d.zone)}">${d.name.charAt(0)}</div>
          ${d.name}
        </div>
      </td>
      <td>
        <span class="zone-pill" style="background:${zoneColor(d.zone)}22;color:${zoneColor(d.zone)}">
          ${d.zone}
        </span>
      </td>
      <td>${d.province}</td>
      <td>${d.district}</td>
      <td>${d.crop}</td>
      <td>
        <span class="status-dot" style="background:${d.active ? '#3fb950' : '#f85149'}"></span>
        ${d.active ? 'Active' : 'Inactive'}
      </td>
    </tr>
  `).join('');
}

/**
 * Selects a dealer by index and updates the detail panel.
 * @param {number} idx Dealer index in the DEALERS array.
 */
function selectDealer(idx) {
  selectedDealerIdx = idx;
  const d = DEALERS[idx];
  document.getElementById('dpTitle').textContent = 'ข้อมูลดีลเลอร์';
  document.getElementById('dpAvatar').style.background = zoneColor(d.zone);
  document.getElementById('dpAvatar').textContent = d.zone;
  document.getElementById('dpName').textContent = d.name;
  document.getElementById('dpSub').textContent = `Zone: ${d.zone}`;
  document.getElementById('dpProvince').textContent = d.province;
  document.getElementById('dpDistrict').textContent = d.district;
  document.getElementById('dpSku').textContent = '6 สูตร';
  const oppEl = document.getElementById('dpOpp');
  oppEl.textContent = '2 รายการ';
  oppEl.style.color = '#f97316';

  const zone = ZONES.find((z) => z.id === d.zone);
  if (zone) renderDpCrops(zone.crops);

  renderTable();
}

/**
 * Selects a zone and shows its info in the detail panel.
 * @param {string} id Zone ID.
 */
function selectZone(id) {
  const zone = ZONES.find((z) => z.id === id);
  if (zone) setDetailZone(zone);
}

/**
 * Populates the detail panel with zone-level information.
 * @param {!Object} zone Zone data object.
 */
function setDetailZone(zone) {
  document.getElementById('dpTitle').textContent = 'ข้อมูลเขตพื้นที่';
  document.getElementById('dpAvatar').style.background = zone.color;
  document.getElementById('dpAvatar').textContent = zone.id;
  document.getElementById('dpName').textContent = `เขต ${zone.id} – ${zone.name}`;
  document.getElementById('dpSub').textContent = `${zone.dealers} ดีลเลอร์`;
  document.getElementById('dpProvince').textContent = zone.provinces[0];
  document.getElementById('dpDistrict').textContent = `${zone.provinces.length} จังหวัด`;
  document.getElementById('dpSku').textContent = `${zone.crops.length * 3} สูตร`;
  const zoneOppEl = document.getElementById('dpOpp');
  zoneOppEl.textContent = `${Math.floor(zone.dealers / 3)} รายการ`;
  zoneOppEl.style.color = '#f97316';
  renderDpCrops(zone.crops);
}

/**
 * Renders crop bars in the detail panel.
 * @param {!Array<!Array>} crops Array of [name, color, percent] tuples.
 */
function renderDpCrops(crops) {
  document.getElementById('dpCrops').innerHTML = crops.map(([name, color, pct]) => `
    <div class="dp-crop-row">
      <div class="dp-crop-header">
        <span><span class="ci" style="background:${color}"></span>${name}</span>
        <span style="font-weight:700">${pct}%</span>
      </div>
      <div class="dp-crop-bar-bg">
        <div class="dp-crop-bar" style="background:${color};width:${pct}%"></div>
      </div>
    </div>
  `).join('');
}

/** Handles search input changes. */
function onSearch() {
  renderTable();
}

/**
 * Switches between grid, table, and map views.
 * @param {string} view 'grid', 'table', or 'map'.
 */
function switchView(view) {
  document.getElementById('grid-view').style.display = view === 'grid' ? '' : 'none';
  document.getElementById('table-view').style.display = view === 'table' ? '' : 'none';
  document.getElementById('map-view').style.display = view === 'map' ? '' : 'none';

  const body = document.getElementById('contentBody');
  if (body) body.classList.toggle('no-pad', view === 'map');

  document.querySelectorAll('.view-tab').forEach((tab, i) => {
    tab.classList.toggle('active',
        (view === 'grid' && i === 0) ||
        (view === 'table' && i === 1) ||
        (view === 'map' && i === 2));
  });

  if (view === 'map') initMap();
}

// ── Modal ──────────────────────────────────────────────────────────────────

/** Opens the add-dealer modal and resets the form. */
function openModal() {
  const sel = document.getElementById('f-zone');
  sel.innerHTML = '<option value="">-- เลือกเขต --</option>' +
      ZONES.map((z) => `<option value="${z.id}">${z.id} – ${z.name}</option>`).join('');

  ['f-name', 'f-province', 'f-district'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f-crop').value = '';
  document.getElementById('f-zone').value = '';
  document.getElementById('form-error').style.display = 'none';

  newDealerActive = true;
  document.getElementById('opt-active').className = 'status-opt active-opt';
  document.getElementById('opt-inactive').className = 'status-opt';
  document.getElementById('addModal').classList.add('open');
}

/** Closes the add-dealer modal. */
function closeModal() {
  document.getElementById('addModal').classList.remove('open');
}

/**
 * Closes the modal when the backdrop (outside the dialog) is clicked.
 * @param {!Event} e Click event.
 */
function closeModalOnBackdrop(e) {
  if (e.target === document.getElementById('addModal')) closeModal();
}

/**
 * Toggles the active/inactive status selector in the modal.
 * @param {boolean} active True for active, false for inactive.
 */
function setStatus(active) {
  newDealerActive = active;
  document.getElementById('opt-active').className =
      active ? 'status-opt active-opt' : 'status-opt';
  document.getElementById('opt-inactive').className =
      !active ? 'status-opt inactive-opt' : 'status-opt';
}

/** Validates the modal form and adds a new dealer on success. */
function submitDealer() {
  const name = document.getElementById('f-name').value.trim();
  const zone = document.getElementById('f-zone').value;
  const crop = document.getElementById('f-crop').value;
  const province = document.getElementById('f-province').value.trim();
  const district = document.getElementById('f-district').value.trim();
  const errEl = document.getElementById('form-error');

  if (!name || !zone || !crop || !province) {
    errEl.textContent = 'กรุณากรอกข้อมูลที่จำเป็น (ชื่อ, เขต, พืชหลัก, จังหวัด)';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  DEALERS.push({name, zone, province, district: district || 'เมือง', crop, active: newDealerActive});

  const matchedZone = ZONES.find((z) => z.id === zone);
  if (matchedZone) matchedZone.dealers++;

  const totalEl = document.querySelector('.stat-card .stat-value');
  if (totalEl) totalEl.textContent = DEALERS.length;

  closeModal();
  renderZoneCards();
  renderTable();
  updateContentHeader();
  selectDealer(DEALERS.length - 1);
}

// ── Map ────────────────────────────────────────────────────────────────────

/**
 * Returns Leaflet GeoJSON style for a province feature.
 * @param {!Object} feature GeoJSON feature.
 * @return {!Object} Leaflet PathOptions.
 */
function styleProvince(feature) {
  const isLight = document.documentElement.dataset.theme === 'light';
  const provName = feature.properties.PROV_NAM_T ||
                   feature.properties.name ||
                   feature.properties.NAME_TH || '';
  const zoneId = getZoneForProvince(provName);
  const zone = zoneId ? ZONES.find((z) => z.id === zoneId) : null;
  const dimmed = currentZone !== 'all' && zoneId !== currentZone;

  if (isLight) {
    return {
      fillColor: zone ? zone.color : '#e8e2da',
      fillOpacity: dimmed ? 0.15 : 1.0,
      color: '#b8b0a5',
      weight: 0.8,
      opacity: 0.9,
    };
  }

  return {
    fillColor: zone ? zone.color : '#27272a',
    fillOpacity: dimmed ? 0.1 : 0.6,
    color: '#09090b',
    weight: 0.8,
    opacity: 0.8,
  };
}

/**
 * Attaches hover, click, and tooltip interactions to each province layer.
 * @param {!Object} feature GeoJSON feature.
 * @param {!Object} layer Leaflet layer.
 */
function onEachProvince(feature, layer) {
  const provName = feature.properties.PROV_NAM_T ||
                   feature.properties.name ||
                   feature.properties.NAME_TH || '';
  const zoneId = getZoneForProvince(provName);
  const zone = zoneId ? ZONES.find((z) => z.id === zoneId) : null;

  layer.on({
    mouseover(e) {
      e.target.setStyle({fillOpacity: 0.85, weight: 2, color: '#f97316'});
      e.target.bringToFront();
    },
    mouseout() {
      provinceLayer.resetStyle(layer);
    },
    click() {
      if (zoneId) filterZone(zoneId);
    },
  });

  if (provName) {
    // Permanent label (always visible, hidden in dark mode via CSS)
    layer.bindTooltip(provName, {
      permanent: true,
      direction: 'center',
      className: 'province-label',
    });
  }
}

/** Adds or refreshes dealer circle markers on the map. */
function renderDealerMarkers() {
  if (!leafletMap) return;
  if (dealerMarkersLayer) dealerMarkersLayer.clearLayers();
  else {
    dealerMarkersLayer = L.layerGroup().addTo(leafletMap);
  }

  const list = currentZone === 'all'
      ? DEALERS.map((d, i) => ({...d, _idx: i}))
      : DEALERS.map((d, i) => ({...d, _idx: i})).filter((d) => d.zone === currentZone);

  list.forEach((dealer) => {
    const coords = PROVINCE_COORDS[dealer.province];
    if (!coords) return;

    // Stable per-dealer offset so markers in same province don't stack
    const seed = dealer.name.charCodeAt(0) + (dealer.name.charCodeAt(1) || 0);
    const lat = coords[0] + ((seed % 9) - 4) * 0.018;
    const lng = coords[1] + ((seed % 7) - 3) * 0.018;

    const color = zoneColor(dealer.zone);
    const marker = L.circleMarker([lat, lng], {
      radius: 7,
      fillColor: color,
      color: '#fff',
      weight: 1.5,
      fillOpacity: 0.92,
    });

    marker.bindPopup(`
      <div style="font-family:'Sarabun',sans-serif;min-width:170px">
        <div class="map-popup-name">${dealer.name}</div>
        <div class="map-popup-row">
          เขต: <span class="map-popup-zone" style="color:${color}">${dealer.zone}</span>
        </div>
        <div class="map-popup-row">${dealer.province} · ${dealer.district}</div>
        <div class="map-popup-row">พืชหลัก: ${dealer.crop}</div>
        <div class="map-popup-row" style="margin-top:6px">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;
            background:${dealer.active ? '#3fb950' : '#f85149'};margin-right:4px"></span>
          ${dealer.active ? 'Active' : 'Inactive'}
        </div>
      </div>
    `);

    marker.on('click', () => selectDealer(dealer._idx));
    dealerMarkersLayer.addLayer(marker);
  });
}

/** Initializes the Leaflet map (called once on first map tab open). */
function initMap() {
  if (mapInitialized) {
    if (provinceLayer) provinceLayer.setStyle(styleProvince);
    renderDealerMarkers();
    return;
  }
  mapInitialized = true;

  leafletMap = L.map('thailand-map', {
    center: [13.2, 101.2],
    zoom: 5.8,
    zoomControl: true,
  });

  // Custom pane sits between base tile (z:200) and GeoJSON overlay (z:400).
  // voyager_only_labels renders here so province fills hide Thailand's tile labels
  // while surrounding-country labels remain visible (not covered by any fill).
  leafletMap.createPane('labelsPane');
  leafletMap.getPane('labelsPane').style.zIndex = 300;
  leafletMap.getPane('labelsPane').style.pointerEvents = 'none';

  const isInitLight = document.documentElement.dataset.theme === 'light';
  const theme = isInitLight ? 'light' : 'dark';
  tileLayer = L.tileLayer(TILE_URLS[theme], {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18,
  }).addTo(leafletMap);

  if (isInitLight) {
    labelsLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
        {pane: 'labelsPane', maxZoom: 18, opacity: 0.8},
    ).addTo(leafletMap);
  }

  leafletMap.on('zoomend', updateLabelVisibility);

  // Gray overlay covers surrounding countries — provinces are added on top so Thailand stays clear
  const isLight = document.documentElement.dataset.theme === 'light';
  worldOverlayLayer = L.rectangle([[-85.05, -180], [85.05, 180]], {
    fillColor: '#64748b',
    fillOpacity: isLight ? 0.42 : 0,
    color: 'transparent',
    weight: 0,
    interactive: false,
  }).addTo(leafletMap);

  fetch('https://cdn.jsdelivr.net/gh/apisit/thailand.json@master/thailand.json')
      .then((r) => r.json())
      .then((data) => {
        provinceLayer = L.geoJSON(data, {
          style: styleProvince,
          onEachFeature: onEachProvince,
        }).addTo(leafletMap);
        renderDealerMarkers();
        updateLabelVisibility();
      })
      .catch((err) => console.error('Failed to load Thailand GeoJSON:', err));
}

/** Shows/hides province labels based on current zoom level (threshold: 6.8). */
function updateLabelVisibility() {
  if (!leafletMap) return;
  const visible = leafletMap.getZoom() >= 8;
  document.getElementById('thailand-map').classList.toggle('labels-visible', visible);
}

/** Updates the gray world overlay opacity based on current theme. */
function updateWorldOverlay() {
  if (!worldOverlayLayer) return;
  const isLight = document.documentElement.dataset.theme === 'light';
  worldOverlayLayer.setStyle({fillOpacity: isLight ? 0.42 : 0});
}

// ── Theme ──────────────────────────────────────────────────────────────────

/** Toggles between dark and light theme and swaps map tiles accordingly. */
function toggleTheme() {
  const isLight = document.documentElement.dataset.theme === 'light';
  const nextTheme = isLight ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  document.getElementById('themeBtn').textContent = isLight ? '☀️ Light' : '🌙 Dark';

  if (leafletMap && tileLayer) {
    leafletMap.removeLayer(tileLayer);
    tileLayer = L.tileLayer(TILE_URLS[nextTheme], {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 18,
    }).addTo(leafletMap);
    tileLayer.bringToBack();

    if (nextTheme === 'light') {
      if (!labelsLayer) {
        labelsLayer = L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
            {pane: 'labelsPane', maxZoom: 18, opacity: 0.8},
        ).addTo(leafletMap);
      }
    } else {
      if (labelsLayer) {
        leafletMap.removeLayer(labelsLayer);
        labelsLayer = null;
      }
    }

    updateWorldOverlay();
    if (provinceLayer) provinceLayer.setStyle(styleProvince);
  }
}

// ── Init ───────────────────────────────────────────────────────────────────

buildMiniMap();
buildZoneChips();
renderZoneCards();
renderTable();
setDetailZone(ZONES[0]);
