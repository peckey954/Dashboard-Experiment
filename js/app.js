/**
 * @fileoverview Parich Dealer Dashboard - main application script.
 */

'use strict';

/** @const {!Array<!Object>} Zone definitions with crop and dealer data. */
const ZONES = [
  // ── เหนือ (North) ──────────────────────────────────────────────────────
  {id:'N1', name:'เหนือ 1',       color:'#1e40af', dealers:8,
   provinces:['เชียงใหม่','เชียงราย','แม่ฮ่องสอน','ลำปาง','ลำพูน','พะเยา'],
   crops:[['ข้าวโพดเลี้ยงสัตว์','#f59e0b',65],['ข้าวนาปี','#3b82f6',45],['ลำไย','#8b5cf6',25]]},
  {id:'N2', name:'เหนือ 2',       color:'#2563eb', dealers:9,
   provinces:['พิษณุโลก','เพชรบูรณ์','สุโขทัย','อุตรดิตถ์','แพร่','น่าน'],
   crops:[['ข้าวนาปี','#3b82f6',78],['ข้าวโพดเลี้ยงสัตว์','#f59e0b',50],['มันสำปะหลัง','#ef4444',20]]},
  {id:'N3', name:'เหนือ 3',       color:'#60a5fa', dealers:7,
   provinces:['ตาก','กำแพงเพชร','นครสวรรค์','พิจิตร','อุทัยธานี'],
   crops:[['ข้าวโพดเลี้ยงสัตว์','#f59e0b',60],['ข้าวนาปี','#3b82f6',48],['อ้อยโรงงาน','#10b981',30]]},
  // ── อีสาน (Northeast) ──────────────────────────────────────────────────
  {id:'NE1', name:'อีสาน 1',      color:'#65a30d', dealers:12,
   provinces:['ขอนแก่น','มหาสารคาม','กาฬสินธุ์','ร้อยเอ็ด','ยโสธร'],
   crops:[['ข้าวนาปี','#3b82f6',85],['อ้อยโรงงาน','#10b981',35],['มันสำปะหลัง','#ef4444',15]]},
  {id:'NE2', name:'อีสาน 2',      color:'#16a34a', dealers:14,
   provinces:['นครราชสีมา','บุรีรัมย์','สุรินทร์','ชัยภูมิ','ศรีสะเกษ','อุบลราชธานี'],
   crops:[['ข้าวนาปี','#3b82f6',88],['ยางพารา','#22c55e',28],['มันสำปะหลัง','#ef4444',18]]},
  {id:'NE3', name:'อีสาน 3',      color:'#15803d', dealers:11,
   provinces:['อุดรธานี','หนองคาย','เลย','สกลนคร','หนองบัวลำภู','นครพนม','มุกดาหาร','อำนาจเจริญ','บึงกาฬ'],
   crops:[['ข้าวนาปี','#3b82f6',80],['ยางพารา','#22c55e',25],['อ้อยโรงงาน','#10b981',15]]},
  // ── กลาง (Central) ─────────────────────────────────────────────────────
  {id:'C1', name:'กลาง 1',        color:'#7c3aed', dealers:9,
   provinces:['อยุธยา','อ่างทอง','สิงห์บุรี','ชัยนาท','ลพบุรี','สระบุรี'],
   crops:[['ข้าวนาปรัง','#2563eb',88],['ข้าวนาปี','#3b82f6',65],['อ้อยโรงงาน','#f59e0b',22]]},
  {id:'C2', name:'กลาง 2',        color:'#8b5cf6', dealers:8,
   provinces:['กรุงเทพมหานคร','นนทบุรี','ปทุมธานี','สมุทรปราการ','นครนายก'],
   crops:[['ข้าวนาปรัง','#2563eb',72],['ข้าวโพดเลี้ยงสัตว์','#f59e0b',38],['มันสำปะหลัง','#ef4444',22]]},
  {id:'C3', name:'กลาง 3',        color:'#a78bfa', dealers:7,
   provinces:['สุพรรณบุรี','นครปฐม'],
   crops:[['ข้าวนาปรัง','#2563eb',75],['อ้อยโรงงาน','#f59e0b',50],['ข้าวโพดเลี้ยงสัตว์','#f59e0b',18]]},
  // ── ตะวันออก (East) ────────────────────────────────────────────────────
  {id:'E1', name:'ตะวันออก 1',    color:'#ea580c', dealers:8,
   provinces:['ชลบุรี','ระยอง','ฉะเชิงเทรา'],
   crops:[['มันสำปะหลัง','#ef4444',58],['ข้าวนาปี','#3b82f6',30],['ยางพารา','#22c55e',20]]},
  {id:'E2', name:'ตะวันออก 2',    color:'#f97316', dealers:6,
   provinces:['จันทบุรี','ตราด','สระแก้ว'],
   crops:[['ผลไม้','#f43f5e',52],['ยางพารา','#22c55e',35],['มันสำปะหลัง','#ef4444',20]]},
  {id:'E3', name:'ตะวันออก 3',    color:'#fb923c', dealers:5,
   provinces:['ปราจีนบุรี'],
   crops:[['ข้าวนาปรัง','#2563eb',62],['มันสำปะหลัง','#ef4444',42],['อ้อยโรงงาน','#10b981',22]]},
  // ── ตะวันตก (West) ─────────────────────────────────────────────────────
  {id:'W1', name:'ตะวันตก 1',     color:'#0f766e', dealers:7,
   provinces:['กาญจนบุรี','ราชบุรี'],
   crops:[['อ้อยโรงงาน','#10b981',68],['ข้าวนาปรัง','#2563eb',48],['ข้าวโพดเลี้ยงสัตว์','#f59e0b',25]]},
  {id:'W2', name:'ตะวันตก 2',     color:'#0d9488', dealers:5,
   provinces:['เพชรบุรี','ประจวบคีรีขันธ์'],
   crops:[['สับปะรด','#f59e0b',55],['ข้าวนาปี','#3b82f6',38],['มะพร้าว','#78716c',25]]},
  {id:'W3', name:'ตะวันตก 3',     color:'#14b8a6', dealers:4,
   provinces:['สมุทรสาคร','สมุทรสงคราม'],
   crops:[['ข้าวนาปรัง','#2563eb',78],['มะพร้าว','#78716c',40],['ผักสวนครัว','#22c55e',28]]},
  // ── ใต้ (South) ────────────────────────────────────────────────────────
  {id:'S1', name:'ใต้ 1',          color:'#dc2626', dealers:8,
   provinces:['ชุมพร','สุราษฎร์ธานี','นครศรีธรรมราช','พัทลุง'],
   crops:[['ปาล์มน้ำมัน','#f59e0b',80],['ยางพารา','#22c55e',65],['ข้าวนาปี','#3b82f6',14]]},
  {id:'S2', name:'ใต้ 2',          color:'#ef4444', dealers:6,
   provinces:['สงขลา','ตรัง','สตูล'],
   crops:[['ยางพารา','#22c55e',85],['ปาล์มน้ำมัน','#f59e0b',52],['ข้าวนาปี','#3b82f6',18]]},
  {id:'S3', name:'ใต้ 3',          color:'#f43f5e', dealers:5,
   provinces:['กระบี่','พังงา','ภูเก็ต','ปัตตานี','ยะลา','นราธิวาส'],
   crops:[['ยางพารา','#22c55e',88],['ปาล์มน้ำมัน','#f59e0b',58],['ผลไม้','#f43f5e',18]]},
];

/** @const {!Array<!Object>} Dealer records. */
const DEALERS = [
  // N1
  {name: 'รุ่งเจริญการเกษตร',           zone: 'N1',  province: 'เชียงใหม่',     district: 'สันทราย',       crop: 'ข้าวโพด',     active: true},
  {name: 'ศรีสุวรรณเกษตร',              zone: 'N1',  province: 'เชียงราย',      district: 'เมือง',         crop: 'ข้าวนาปี',    active: true},
  {name: 'แม่ฮ่องสอนอะกริ',             zone: 'N1',  province: 'แม่ฮ่องสอน',   district: 'เมือง',         crop: 'ข้าวโพด',     active: false},
  // N2
  {name: 'บ้านทุ่งเกษตร',               zone: 'N2',  province: 'พิษณุโลก',      district: 'เมือง',         crop: 'ข้าวนาปี',    active: true},
  {name: 'เพชรบูรณ์การเกษตร',           zone: 'N2',  province: 'เพชรบูรณ์',    district: 'หล่มสัก',       crop: 'ข้าวโพด',     active: true},
  // N3
  {name: 'นครสวรรค์การเกษตร',           zone: 'N3',  province: 'นครสวรรค์',    district: 'เมือง',         crop: 'อ้อย',        active: true},
  {name: 'ตากอะกริซัพพลาย',             zone: 'N3',  province: 'ตาก',           district: 'แม่สอด',        crop: 'ข้าวโพด',     active: true},
  // NE1
  {name: 'ขอนแก่นเกษตรกร',              zone: 'NE1', province: 'ขอนแก่น',      district: 'เมือง',         crop: 'ข้าวนาปี',    active: true},
  {name: 'กาฬสินธุ์เกษตร',              zone: 'NE1', province: 'กาฬสินธุ์',    district: 'กมลาไสย',       crop: 'ข้าวนาปี',    active: true},
  // NE2
  {name: 'สุรินทร์เซลล์',               zone: 'NE2', province: 'สุรินทร์',      district: 'ท่าตูม',         crop: 'ข้าวนาปี',    active: false},
  {name: 'โคราชเกษตร',                   zone: 'NE2', province: 'นครราชสีมา',   district: 'เมือง',         crop: 'มันสำปะหลัง', active: true},
  // NE3
  {name: 'บริษัท เดลแอนด์ปี รุ่งเรือง', zone: 'NE3', province: 'อุดรธานี',     district: 'เมือง',         crop: 'ข้าวนาปี',    active: true},
  {name: 'หนองคายเกษตรกร',              zone: 'NE3', province: 'หนองคาย',      district: 'เมือง',         crop: 'ยางพารา',     active: true},
  // C1
  {name: 'ไทยเกษตรพัฒนา',               zone: 'C1',  province: 'อยุธยา',        district: 'บางปะหัน',      crop: 'ข้าวนาปรัง',  active: true},
  {name: 'ชัยนาทอะกริ',                  zone: 'C1',  province: 'ชัยนาท',        district: 'เมือง',         crop: 'ข้าวนาปรัง',  active: true},
  {name: 'ลพบุรีอะกริ',                  zone: 'C1',  province: 'ลพบุรี',        district: 'โคกสำโรง',      crop: 'ข้าวโพด',     active: true},
  // C2
  {name: 'กรุงเทพเกษตรพาณิชย์',         zone: 'C2',  province: 'กรุงเทพมหานคร', district: 'ลาดกระบัง',    crop: 'ข้าวนาปรัง',  active: true},
  {name: 'ปทุมธานีการเกษตร',             zone: 'C2',  province: 'ปทุมธานี',      district: 'ธัญบุรี',       crop: 'ข้าวนาปรัง',  active: true},
  // C3
  {name: 'สุพรรณบุรีเกษตร',             zone: 'C3',  province: 'สุพรรณบุรี',   district: 'เดิมบางนางบวช', crop: 'อ้อย',        active: true},
  {name: 'นครปฐมอะกริ',                  zone: 'C3',  province: 'นครปฐม',       district: 'เมือง',         crop: 'ข้าวนาปรัง',  active: true},
  // E1
  {name: 'ชลบุรีอะกริซัพพลาย',          zone: 'E1',  province: 'ชลบุรี',        district: 'พนัสนิคม',      crop: 'มันสำปะหลัง', active: true},
  {name: 'ระยองเกษตรพัฒนา',             zone: 'E1',  province: 'ระยอง',         district: 'เมือง',         crop: 'มันสำปะหลัง', active: true},
  {name: 'ฉะเชิงเทราอะกริ',             zone: 'E1',  province: 'ฉะเชิงเทรา',   district: 'บางคล้า',       crop: 'ข้าวนาปี',    active: false},
  // E2
  {name: 'จันทบุรีผลไม้เกษตร',          zone: 'E2',  province: 'จันทบุรี',      district: 'เมือง',         crop: 'ผลไม้',       active: true},
  {name: 'ตราดยางพารา',                  zone: 'E2',  province: 'ตราด',          district: 'เกาะช้าง',      crop: 'ยางพารา',     active: true},
  // E3
  {name: 'ปราจีนบุรีอะกริ',             zone: 'E3',  province: 'ปราจีนบุรี',   district: 'กบินทร์บุรี',   crop: 'มันสำปะหลัง', active: true},
  {name: 'บ้านสะอาดเกษตร',              zone: 'E3',  province: 'ปราจีนบุรี',   district: 'เมือง',         crop: 'อ้อย',        active: false},
  // W1
  {name: 'กาญจนบุรีเกษตร',              zone: 'W1',  province: 'กาญจนบุรี',    district: 'ท่ามะกา',       crop: 'อ้อย',        active: true},
  {name: 'ราชบุรีการเกษตร',             zone: 'W1',  province: 'ราชบุรี',       district: 'โพธาราม',       crop: 'ข้าวนาปรัง',  active: true},
  // W2
  {name: 'เพชรบุรีอะกริ',               zone: 'W2',  province: 'เพชรบุรี',      district: 'เขาย้อย',       crop: 'สับปะรด',     active: true},
  {name: 'ประจวบคีรีขันธ์เกษตร',        zone: 'W2',  province: 'ประจวบคีรีขันธ์', district: 'ปราณบุรี',   crop: 'มะพร้าว',     active: false},
  // W3
  {name: 'สมุทรสาครเกษตรกร',            zone: 'W3',  province: 'สมุทรสาคร',    district: 'เมือง',         crop: 'ผักสวนครัว',  active: true},
  {name: 'สมุทรสงครามอะกริ',            zone: 'W3',  province: 'สมุทรสงคราม',  district: 'เมือง',         crop: 'มะพร้าว',     active: true},
  // S1
  {name: 'สุราษฎร์เกษตรกร',             zone: 'S1',  province: 'สุราษฎร์ธานี', district: 'พุนพิน',         crop: 'ปาล์มน้ำมัน', active: true},
  {name: 'ชุมพรปาล์มเกษตร',             zone: 'S1',  province: 'ชุมพร',         district: 'ท่าแซะ',         crop: 'ปาล์มน้ำมัน', active: true},
  {name: 'นครศรีเกษตรกร',               zone: 'S1',  province: 'นครศรีธรรมราช', district: 'ทุ่งสง',        crop: 'ยางพารา',     active: true},
  // S2
  {name: 'สงขลายางพารา',                zone: 'S2',  province: 'สงขลา',         district: 'หาดใหญ่',       crop: 'ยางพารา',     active: true},
  {name: 'ตรังเกษตรพัฒนา',              zone: 'S2',  province: 'ตรัง',           district: 'เมือง',         crop: 'ยางพารา',     active: false},
  // S3
  {name: 'ยางพาราใต้',                   zone: 'S3',  province: 'กระบี่',        district: 'เมือง',         crop: 'ยางพารา',     active: false},
  {name: 'กระบี่เกษตรกร',               zone: 'S3',  province: 'กระบี่',        district: 'อ่าวลึก',        crop: 'ยางพารา',     active: true},
  {name: 'ภูเก็ตอะกริ',                  zone: 'S3',  province: 'ภูเก็ต',        district: 'เมือง',         crop: 'ปาล์มน้ำมัน', active: true},
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
  'สิงห์บุรี': 'C1', 'ชัยนาท': 'C1', 'สระบุรี': 'C1', 'ลพบุรี': 'C1',
  // C2
  'กรุงเทพมหานคร': 'C2', 'นนทบุรี': 'C2', 'ปทุมธานี': 'C2',
  'สมุทรปราการ': 'C2', 'นครนายก': 'C2',
  // C3
  'สุพรรณบุรี': 'C3', 'นครปฐม': 'C3',
  // E1
  'ชลบุรี': 'E1', 'ระยอง': 'E1', 'ฉะเชิงเทรา': 'E1',
  // E2
  'จันทบุรี': 'E2', 'ตราด': 'E2', 'สระแก้ว': 'E2',
  // E3
  'ปราจีนบุรี': 'E3',
  // W1
  'กาญจนบุรี': 'W1', 'ราชบุรี': 'W1',
  // W2
  'เพชรบุรี': 'W2', 'ประจวบคีรีขันธ์': 'W2',
  // W3
  'สมุทรสาคร': 'W3', 'สมุทรสงคราม': 'W3',
  // S1
  'ชุมพร': 'S1', 'ระนอง': 'S1', 'สุราษฎร์ธานี': 'S1', 'นครศรีธรรมราช': 'S1', 'พัทลุง': 'S1',
  // S2
  'สงขลา': 'S2', 'ตรัง': 'S2', 'สตูล': 'S2',
  // S3
  'กระบี่': 'S3', 'พังงา': 'S3', 'ภูเก็ต': 'S3',
  'ปัตตานี': 'S3', 'ยะลา': 'S3', 'นราธิวาส': 'S3',
};

/**
 * Translates GeoJSON English province names to Thai for zone/dealer matching.
 * @const {!Object<string, string>}
 */
const EN_TO_TH_PROVINCE = {
  'Amnat Charoen': 'อำนาจเจริญ', 'Ang Thong': 'อ่างทอง',
  'Bangkok Metropolis': 'กรุงเทพมหานคร', 'Bueng Kan': 'บึงกาฬ',
  'Buri Ram': 'บุรีรัมย์', 'Chachoengsao': 'ฉะเชิงเทรา',
  'Chai Nat': 'ชัยนาท', 'Chaiyaphum': 'ชัยภูมิ',
  'Chanthaburi': 'จันทบุรี', 'Chiang Mai': 'เชียงใหม่',
  'Chiang Rai': 'เชียงราย', 'Chon Buri': 'ชลบุรี',
  'Chumphon': 'ชุมพร', 'Kalasin': 'กาฬสินธุ์',
  'Kamphaeng Phet': 'กำแพงเพชร', 'Kanchanaburi': 'กาญจนบุรี',
  'Khon Kaen': 'ขอนแก่น', 'Krabi': 'กระบี่',
  'Lampang': 'ลำปาง', 'Lamphun': 'ลำพูน',
  'Loei': 'เลย', 'Lop Buri': 'ลพบุรี',
  'Mae Hong Son': 'แม่ฮ่องสอน', 'Maha Sarakham': 'มหาสารคาม',
  'Mukdahan': 'มุกดาหาร', 'Nakhon Nayok': 'นครนายก',
  'Nakhon Pathom': 'นครปฐม', 'Nakhon Phanom': 'นครพนม',
  'Nakhon Ratchasima': 'นครราชสีมา', 'Nakhon Sawan': 'นครสวรรค์',
  'Nakhon Si Thammarat': 'นครศรีธรรมราช', 'Nan': 'น่าน',
  'Narathiwat': 'นราธิวาส', 'Nong Bua Lam Phu': 'หนองบัวลำภู',
  'Nong Khai': 'หนองคาย', 'Nonthaburi': 'นนทบุรี',
  'Pathum Thani': 'ปทุมธานี', 'Pattani': 'ปัตตานี',
  'Phangnga': 'พังงา', 'Phatthalung': 'พัทลุง',
  'Phayao': 'พะเยา', 'Phetchabun': 'เพชรบูรณ์',
  'Phetchaburi': 'เพชรบุรี', 'Phichit': 'พิจิตร',
  'Phitsanulok': 'พิษณุโลก', 'Phra Nakhon Si Ayutthaya': 'พระนครศรีอยุธยา',
  'Phrae': 'แพร่', 'Phuket': 'ภูเก็ต',
  'Prachin Buri': 'ปราจีนบุรี', 'Prachuap Khiri Khan': 'ประจวบคีรีขันธ์',
  'Ranong': 'ระนอง', 'Ratchaburi': 'ราชบุรี',
  'Rayong': 'ระยอง', 'Roi Et': 'ร้อยเอ็ด',
  'Sa Kaeo': 'สระแก้ว', 'Sakon Nakhon': 'สกลนคร',
  'Samut Prakan': 'สมุทรปราการ', 'Samut Sakhon': 'สมุทรสาคร',
  'Samut Songkhram': 'สมุทรสงคราม', 'Saraburi': 'สระบุรี',
  'Satun': 'สตูล', 'Si Sa Ket': 'ศรีสะเกษ',
  'Sing Buri': 'สิงห์บุรี', 'Songkhla': 'สงขลา',
  'Sukhothai': 'สุโขทัย', 'Suphan Buri': 'สุพรรณบุรี',
  'Surat Thani': 'สุราษฎร์ธานี', 'Surin': 'สุรินทร์',
  'Tak': 'ตาก', 'Trang': 'ตรัง',
  'Trat': 'ตราด', 'Ubon Ratchathani': 'อุบลราชธานี',
  'Udon Thani': 'อุดรธานี', 'Uthai Thani': 'อุทัยธานี',
  'Uttaradit': 'อุตรดิตถ์', 'Yala': 'ยะลา',
  'Yasothon': 'ยโสธร',
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

// ── State ─────────────────────────────────────────────────────────────────

/** @type {string} Currently active zone filter. */
let currentZone = 'all';

/** @type {boolean} Whether zone sort is ascending (by dealer count). */
let zoneSortAsc = false;

/** @type {number} Index of the selected dealer row (-1 = none). */
let selectedDealerIdx = -1;

/** @type {boolean} Whether the filter sidebar is open. */
let filterSidebarOpen = true;

/** @type {?string} Active coverage overlay: 'dealer' | 'gap' | null. */
let coverageMode = null;

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
 * Returns the zone ID for a province name (Thai or English).
 * GeoJSON uses English names; DEALERS use Thai names.
 * @param {string} provName Province name (Thai or English).
 * @return {?string} Zone ID or null if not found.
 */
function getZoneForProvince(provName) {
  if (!provName) return null;
  // Direct Thai match
  if (PROVINCE_ZONE_MAP[provName]) return PROVINCE_ZONE_MAP[provName];
  // Translate English → Thai then match
  const thai = EN_TO_TH_PROVINCE[provName];
  if (thai && PROVINCE_ZONE_MAP[thai]) return PROVINCE_ZONE_MAP[thai];
  // Partial match fallback (handles slight name variations)
  const keys = Object.keys(PROVINCE_ZONE_MAP);
  const match = keys.find((k) => provName.includes(k) || k.includes(provName));
  return match ? PROVINCE_ZONE_MAP[match] : null;
}

// ── Filter Sidebar ────────────────────────────────────────────────────────

/**
 * Builds zone rows in the filter sidebar from ZONES data.
 */
function buildFsZoneRows() {
  const container = document.getElementById('fsZoneRows');
  if (!container) return;

  const zoneCounts = {};
  DEALERS.forEach((d) => { zoneCounts[d.zone] = (zoneCounts[d.zone] || 0) + 1; });
  const total = DEALERS.length;
  const maxCount = Math.max(...Object.values(zoneCounts), 1);

  const el = document.getElementById('fsAllCount');
  if (el) el.textContent = `${total}/${total}`;

  container.innerHTML = ZONES.map((z) => {
    const count = zoneCounts[z.id] || 0;
    const pct = total ? Math.round(count / total * 100) : 0;
    const barW = maxCount ? Math.round(count / maxCount * 100) : 0;
    return `
      <div class="fs-zone-row" id="zone-row-${z.id}" onclick="filterZone('${z.id}')">
        <div class="fs-zone-dot" style="background:${z.color};border-radius:2px"></div>
        <span class="fs-zone-name" style="color:${z.color}">${z.id} ${z.name}</span>
        <div class="fs-zone-bar-wrap">
          <div class="fs-zone-bar" style="width:${barW}%;background:${z.color}"></div>
        </div>
        <span class="fs-zone-count">${count}/${total}</span>
        <span class="fs-zone-pct">${pct}%</span>
      </div>
    `;
  }).join('');
}

/**
 * Filters the map and detail panel to a zone or all zones.
 * @param {string} id Zone ID or 'all'.
 */
function filterZone(id) {
  currentZone = id;

  // Reset all rows to neutral
  document.querySelectorAll('.fs-zone-row').forEach((r) => {
    r.classList.remove('fs-zone-row--active');
    r.style.background = '';
    r.style.borderColor = '';
  });

  // Apply this zone's own color to the active row
  const color = id === 'all' ? 'var(--primary)' : zoneColor(id);
  const activeRow = document.getElementById(id === 'all' ? 'zone-row-all' : `zone-row-${id}`);
  if (activeRow) {
    activeRow.classList.add('fs-zone-row--active');
    if (id !== 'all') {
      const hex = zoneColor(id);
      activeRow.style.background  = hex + '22';
      activeRow.style.borderColor = hex + '88';
    }
  }

  if (id !== 'all') {
    const zone = ZONES.find((z) => z.id === id);
    if (zone) setDetailZone(zone);
  } else {
    setDetailAll();
  }

  if (mapInitialized) {
    if (provinceLayer) provinceLayer.setStyle(styleProvince);
    renderDealerMarkers();
  }
}

/**
 * Filters zone rows in the sidebar by the search input.
 */
function filterZoneList() {
  const q = (document.getElementById('zoneSearchInput') || {}).value.toLowerCase();
  document.querySelectorAll('#fsZoneRows .fs-zone-row').forEach((row) => {
    const name = row.querySelector('.fs-zone-name').textContent.toLowerCase();
    row.style.display = name.includes(q) ? '' : 'none';
  });
}

/**
 * Toggles zone sort order by dealer count.
 */
function sortZoneList() {
  zoneSortAsc = !zoneSortAsc;
  const container = document.getElementById('fsZoneRows');
  if (!container) return;
  const rows = Array.from(container.querySelectorAll('.fs-zone-row'));
  rows.sort((a, b) => {
    const ca = parseInt(a.querySelector('.fs-zone-count').textContent) || 0;
    const cb = parseInt(b.querySelector('.fs-zone-count').textContent) || 0;
    return zoneSortAsc ? ca - cb : cb - ca;
  });
  rows.forEach((r) => container.appendChild(r));
}

/**
 * Resets all filters to the default (all zones).
 */
function clearFilters() {
  filterZone('all');
  const input = document.getElementById('zoneSearchInput');
  if (input) input.value = '';
  filterZoneList();
}

/**
 * Toggles the filter sidebar open/closed.
 */
function toggleFilterSidebar() {
  filterSidebarOpen = !filterSidebarOpen;
  const sb = document.getElementById('filterSidebar');
  const btn = document.getElementById('sbPanelBtn');
  if (sb) sb.classList.toggle('fs-collapsed', !filterSidebarOpen);
  if (btn) btn.classList.toggle('active', !filterSidebarOpen);
  if (mapInitialized && leafletMap) setTimeout(() => leafletMap.invalidateSize(), 250);
}

// ── Page tabs ─────────────────────────────────────────────────────────────

/**
 * Switches the active top-level page tab.
 * @param {string} tab Tab name ('dealer', 'crop', 'ops', 'farmer').
 * @param {!Element} btn The clicked button element.
 */
function switchPageTab(tab, btn) {
  document.querySelectorAll('.page-tab').forEach((t) => t.classList.remove('page-tab--active'));
  if (btn) btn.classList.add('page-tab--active');
}

// ── Right Detail Sidebar ──────────────────────────────────────────────────

/**
 * Switches right-sidebar tab between SKU and Ops.
 * @param {string} tab 'sku' or 'ops'.
 */
function switchDsTab(tab) {
  const skuBtn  = document.getElementById('dsTabSku');
  const opsBtn  = document.getElementById('dsTabOps');
  const skuPane = document.getElementById('dsSkuPane');
  const opsPane = document.getElementById('dsOpsPane');
  if (!skuPane || !opsPane) return;

  const isSku = tab === 'sku';
  skuBtn.classList.toggle('ds-tab--active', isSku);
  opsBtn.classList.toggle('ds-tab--active', !isSku);
  skuPane.classList.toggle('ds-tab-pane--hidden', !isSku);
  opsPane.classList.toggle('ds-tab-pane--hidden', isSku);
}

/**
 * Populates the right sidebar with dealer-level information.
 * @param {number} idx Dealer index in the DEALERS array.
 */
function selectDealer(idx) {
  selectedDealerIdx = idx;
  const d = DEALERS[idx];
  const color = zoneColor(d.zone);

  const badge = document.getElementById('dsZoneBadge');
  if (badge) { badge.textContent = d.zone; badge.style.background = color; }

  const nameEl = document.getElementById('dsDealerName');
  if (nameEl) nameEl.textContent = d.name;

  const salesEl = document.getElementById('dsDealerSales');
  if (salesEl) salesEl.textContent = '฿12.5M · เป้า ฿14M';

  const dealersEl = document.getElementById('dsStatDealers');
  if (dealersEl) dealersEl.textContent = DEALERS.filter((x) => x.zone === d.zone).length;

  const zonesEl = document.getElementById('dsStatZones');
  if (zonesEl) zonesEl.textContent = '1';

  const provEl = document.getElementById('dsProvince');
  if (provEl) provEl.textContent = d.province;

  const distEl = document.getElementById('dsDistrict');
  if (distEl) distEl.textContent = d.district;

  const oppEl = document.getElementById('dsOpp');
  if (oppEl) oppEl.textContent = '2 รายการ';

  const farmEl = document.getElementById('dsFarmers');
  if (farmEl) farmEl.textContent = '45,200 ราย';

  const areaEl = document.getElementById('dsArea');
  if (areaEl) areaEl.textContent = '120,000 ไร่';

  const zone = ZONES.find((z) => z.id === d.zone);
  if (zone) {
    renderDsDonut(zone.crops);
    renderDsSkuList(zone);
    renderDsOpsContent(zone);
  }
}

/**
 * Populates the right sidebar with zone-level information.
 * @param {!Object} zone Zone data object.
 */
/** Shows aggregate stats for all zones in the right sidebar. */
function setDetailAll() {
  const badge = document.getElementById('dsZoneBadge');
  if (badge) { badge.textContent = 'ALL'; badge.style.background = 'var(--primary)'; }

  const nameEl = document.getElementById('dsDealerName');
  if (nameEl) nameEl.textContent = 'ภาพรวมทุกเขต';

  const salesEl = document.getElementById('dsDealerSales');
  if (salesEl) salesEl.textContent = `${DEALERS.length} ดีลเลอร์ · ${ZONES.length} เขต`;

  const stats = computeZoneStats('all');

  const dealersEl = document.getElementById('dsStatDealers');
  if (dealersEl) dealersEl.textContent = stats.dealerCount;

  const noDealerEl = document.getElementById('dsStatNoDealer');
  if (noDealerEl) noDealerEl.textContent = stats.noDealerCount;

  const overlapEl = document.getElementById('dsStatOverlap');
  if (overlapEl) overlapEl.textContent = stats.overlapCount;

  const coverageEl = document.getElementById('dsStatCoverage');
  if (coverageEl) coverageEl.textContent = stats.coverageRate + '%';

  const allProvinces = [...new Set(ZONES.flatMap((z) => z.provinces))];
  const provEl = document.getElementById('dsProvince');
  if (provEl) provEl.textContent = `${allProvinces.length} จังหวัด`;

  const distEl = document.getElementById('dsDistrict');
  if (distEl) distEl.textContent = `${ZONES.length} เขต`;

  const oppEl = document.getElementById('dsOpp');
  if (oppEl) oppEl.textContent = `${Math.floor(DEALERS.length / 3)} โอกาส`;

  const farmEl = document.getElementById('dsFarmers');
  if (farmEl) farmEl.textContent = `${(DEALERS.length * 2800).toLocaleString()} ราย`;

  const areaEl = document.getElementById('dsArea');
  if (areaEl) areaEl.textContent = `${(DEALERS.length * 8500).toLocaleString()} ไร่`;

  const allCrops = {};
  ZONES.forEach((z) => z.crops.forEach(([name, color, pct]) => {
    if (!allCrops[name]) allCrops[name] = {color, pct: 0};
    allCrops[name].pct = Math.max(allCrops[name].pct, pct);
  }));
  const topCrops = Object.entries(allCrops)
    .sort((a, b) => b[1].pct - a[1].pct).slice(0, 3)
    .map(([name, {color, pct}]) => [name, color, pct]);
  renderDsDonut(topCrops);
  renderDsSkuList(ZONES[0]);
  renderDsOpsContent(ZONES[0]);
}

/**
 * Computes coverage statistics for a zone (or 'all').
 * @param {string} zoneId Zone ID or 'all'.
 * @return {{dealerCount:number, noDealerCount:number, overlapCount:number, coverageRate:number}}
 */
function computeZoneStats(zoneId) {
  const zones = zoneId === 'all' ? ZONES : ZONES.filter((z) => z.id === zoneId);
  const allProvinces = zones.flatMap((z) => z.provinces);
  const uniqueProvinces = [...new Set(allProvinces)];

  const dealers = zoneId === 'all' ? DEALERS : DEALERS.filter((d) => d.zone === zoneId);

  const countByProvince = {};
  dealers.forEach((d) => {
    countByProvince[d.province] = (countByProvince[d.province] || 0) + 1;
  });

  const dealerCount    = dealers.length;
  const noDealerCount  = uniqueProvinces.filter((p) => !countByProvince[p]).length;
  const overlapCount   = uniqueProvinces.filter((p) => (countByProvince[p] || 0) >= 2).length;
  const withDealer     = uniqueProvinces.filter((p) => countByProvince[p]).length;
  const coverageRate   = Math.round((withDealer / (uniqueProvinces.length || 1)) * 100);

  return {dealerCount, noDealerCount, overlapCount, coverageRate};
}

function setDetailZone(zone) {
  const badge = document.getElementById('dsZoneBadge');
  if (badge) { badge.textContent = zone.id; badge.style.background = zone.color; }

  const nameEl = document.getElementById('dsDealerName');
  if (nameEl) nameEl.textContent = `เขต ${zone.id} – ${zone.name}`;

  const salesEl = document.getElementById('dsDealerSales');
  if (salesEl) salesEl.textContent = `${zone.dealers} ดีลเลอร์`;

  const stats = computeZoneStats(zone.id);

  const dealersEl = document.getElementById('dsStatDealers');
  if (dealersEl) dealersEl.textContent = stats.dealerCount;

  const noDealerEl = document.getElementById('dsStatNoDealer');
  if (noDealerEl) noDealerEl.textContent = stats.noDealerCount;

  const overlapEl = document.getElementById('dsStatOverlap');
  if (overlapEl) overlapEl.textContent = stats.overlapCount;

  const coverageEl = document.getElementById('dsStatCoverage');
  if (coverageEl) coverageEl.textContent = stats.coverageRate + '%';

  const provEl = document.getElementById('dsProvince');
  if (provEl) provEl.textContent = zone.provinces[0];

  const distEl = document.getElementById('dsDistrict');
  if (distEl) distEl.textContent = `${zone.provinces.length} จังหวัด`;

  const oppEl = document.getElementById('dsOpp');
  if (oppEl) oppEl.textContent = `${Math.floor(zone.dealers / 3)} โอกาส`;

  const farmEl = document.getElementById('dsFarmers');
  if (farmEl) farmEl.textContent = `${(zone.dealers * 2800).toLocaleString()} ราย`;

  const areaEl = document.getElementById('dsArea');
  if (areaEl) areaEl.textContent = `${(zone.dealers * 8500).toLocaleString()} ไร่`;

  renderDsDonut(zone.crops);
  renderDsSkuList(zone);
  renderDsOpsContent(zone);
}

/**
 * Renders a donut SVG chart for the given crops array.
 * @param {!Array<!Array>} crops Array of [name, color, percent] tuples.
 */
function renderDsDonut(crops) {
  const svg = document.getElementById('dsDonutSvg');
  const legend = document.getElementById('dsDonutLegend');
  if (!svg || !legend) return;

  const R = 32;
  const C = 2 * Math.PI * R;
  const total = crops.reduce((s, c) => s + c[2], 0) || 1;
  let cumulative = 0;

  const arcs = crops.map(([, color, pct]) => {
    const seg = (pct / total) * C;
    const offset = -cumulative;
    cumulative += seg;
    return `<circle cx="50" cy="50" r="${R}" fill="none" stroke="${color}" stroke-width="12"
      stroke-dasharray="${seg.toFixed(1)} ${C.toFixed(1)}"
      stroke-dashoffset="${offset.toFixed(1)}"
      transform="rotate(-90 50 50)"/>`;
  }).join('');

  svg.innerHTML = arcs + `<circle cx="50" cy="50" r="20" fill="var(--card)"/>`;

  legend.innerHTML = crops.map(([name, color, pct]) => `
    <div class="ds-donut-legend-item">
      <div class="ds-donut-legend-dot" style="background:${color}"></div>
      <span class="ds-donut-legend-label">${name}</span>
      <span class="ds-donut-legend-pct">${pct}%</span>
    </div>
  `).join('');
}

/**
 * Renders the SKU recommendation list for a zone.
 * @param {!Object} zone Zone data object.
 */
function renderDsSkuList(zone) {
  const el = document.getElementById('dsSkuList');
  if (!el) return;

  const skus = [
    {formula: '15-5-20', pct: 85, color: '#22c55e', match: true},
    {formula: '16-8-8',  pct: 72, color: '#22c55e', match: true},
    {formula: '14-7-35', pct: 45, color: '#f97316', match: false},
    {formula: '28-3-3',  pct: 63, color: '#22c55e', match: true},
    {formula: '25-7-7',  pct: 28, color: '#ef4444', match: false},
  ];

  const checkSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
  const xSvg    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`;

  el.innerHTML = skus.map((s) => `
    <div class="ds-sku-row">
      <div class="ds-sku-formula">${s.formula}</div>
      <div class="ds-sku-bar-wrap">
        <div class="ds-sku-bar" style="width:${s.pct}%;background:${s.color}"></div>
      </div>
      <span class="ds-sku-pct">${s.pct}%</span>
      <span class="ds-sku-icon" style="color:${s.color}">${s.match ? checkSvg : xSvg}</span>
    </div>
  `).join('');
}

/**
 * Renders the Ops tab content (formulas to sell and reduce).
 * @param {!Object} zone Zone data object.
 */
function renderDsOpsContent(zone) {
  const sellEl   = document.getElementById('dsOpsSell');
  const reduceEl = document.getElementById('dsOpsReduce');
  if (!sellEl || !reduceEl) return;

  const sellData = [
    {crop: zone.crops[0] ? zone.crops[0][0] : 'ข้าวโพด', formulas: ['15-5-20', '16-8-8'], opp: '28 รายการ'},
    {crop: zone.crops[1] ? zone.crops[1][0] : 'ข้าวนาปี', formulas: ['14-7-35'],            opp: '15 รายการ'},
  ];

  const reduceData = [
    {crop: zone.crops[0] ? zone.crops[0][0] : 'ข้าวโพด', formulas: ['28-3-3', '25-7-7'], note: 'ลดได้ 35%'},
    {crop: zone.crops[1] ? zone.crops[1][0] : 'ข้าวนาปี', formulas: ['16-4-16'],           note: 'ลดได้ 22%'},
  ];

  const renderGroups = (data, type) => data.map((item) => `
    <div class="ds-ops-group">
      <div class="ds-ops-crop-label">${item.crop}</div>
      <div class="ds-ops-formulas">
        ${item.formulas.map((f) => `
          <div class="ds-ops-formula-box ds-ops-formula-box--${type}">
            <span class="ds-ops-formula">${f}</span>
            <span class="ds-ops-opp">${item.opp || item.note}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  sellEl.innerHTML   = renderGroups(sellData,   'sell');
  reduceEl.innerHTML = renderGroups(reduceData, 'reduce');
}

// ── Coverage overlay ──────────────────────────────────────────────────────

/**
 * Returns true if any dealer exists in the given province (respecting zone filter).
 * GeoJSON province names are English; dealer records use Thai.
 * @param {string} provName Province name from GeoJSON (English).
 * @return {boolean}
 */
function provinceHasDealer(provName) {
  const thai = EN_TO_TH_PROVINCE[provName] || provName;
  return DEALERS.some((d) => {
    if (currentZone !== 'all' && d.zone !== currentZone) return false;
    return d.province === thai || d.province === provName ||
           thai.includes(d.province) || d.province.includes(thai);
  });
}

/**
 * Toggles coverage overlay mode on the map.
 * @param {string} mode 'dealer' | 'gap' | 'overlap'.
 */
function toggleCoverage(mode) {
  coverageMode = coverageMode === mode ? null : mode;

  ['dealer', 'gap', 'overlap'].forEach((m) => {
    const cardId = {dealer: 'scDealers', gap: 'scNoDealer', overlap: 'scOverlap'}[m];
    const card = document.getElementById(cardId);
    if (card) card.classList.toggle('ds-stat-card--active', coverageMode === m);
  });

  if (mapInitialized && provinceLayer) provinceLayer.setStyle(styleProvince);
}

// ── Map ────────────────────────────────────────────────────────────────────

/**
 * Returns Leaflet GeoJSON style for a province feature.
 * @param {!Object} feature GeoJSON feature.
 * @return {!Object} Leaflet PathOptions.
 */
function styleProvince(feature) {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const provName = feature.properties.name || '';
  const zoneId = getZoneForProvince(provName);
  const zone = zoneId ? ZONES.find((z) => z.id === zoneId) : null;
  const dimmed = currentZone !== 'all' && zoneId !== currentZone;

  // ── Coverage overlay modes ──────────────────────────────────────────────
  if (coverageMode) {
    const inScope = currentZone === 'all' || zoneId === currentZone;
    const hasDealer = inScope && provinceHasDealer(provName);

    if (coverageMode === 'dealer') {
      if (!inScope) {
        return {fillColor: isDark ? '#27272a' : '#e5e7eb', fillOpacity: 0.3,
                color: isDark ? '#3f3f46' : '#d1d5db', weight: 0.5, opacity: 0.4};
      }
      return hasDealer
        ? {fillColor: zone ? zone.color : '#3b82f6', fillOpacity: 0.9,
           color: zone ? zone.color : '#3b82f6', weight: 1.5, opacity: 1}
        : {fillColor: '#94a3b8', fillOpacity: 0.35,
           color: '#cbd5e1', weight: 0.6, opacity: 0.6};
    }

    if (coverageMode === 'gap') {
      if (!inScope) {
        return {fillColor: isDark ? '#27272a' : '#e5e7eb', fillOpacity: 0.3,
                color: isDark ? '#3f3f46' : '#d1d5db', weight: 0.5, opacity: 0.4};
      }
      return hasDealer
        ? {fillColor: zone ? zone.color : '#3b82f6', fillOpacity: 0.3,
           color: isDark ? '#3f3f46' : '#cbd5e1', weight: 0.6, opacity: 0.5}
        : {fillColor: isDark ? '#94a3b8' : '#475569', fillOpacity: isDark ? 0.7 : 0.78,
           color: isDark ? '#cbd5e1' : '#334155', weight: 1.2, opacity: 0.9};
    }

    if (coverageMode === 'overlap') {
      if (!inScope) {
        return {fillColor: isDark ? '#27272a' : '#e5e7eb', fillOpacity: 0.3,
                color: isDark ? '#3f3f46' : '#d1d5db', weight: 0.5, opacity: 0.4};
      }
      const thai = EN_TO_TH_PROVINCE[provName] || provName;
      const dealerCount = DEALERS.filter((d) => {
        if (currentZone !== 'all' && d.zone !== currentZone) return false;
        return d.province === thai || d.province === provName;
      }).length;
      if (dealerCount >= 2) {
        return {fillColor: '#dc2626', fillOpacity: 0.9, color: '#b91c1c', weight: 1.5, opacity: 1};
      }
      if (dealerCount === 1) {
        return {fillColor: zone ? zone.color : '#3b82f6', fillOpacity: 0.35,
                color: isDark ? '#3f3f46' : '#cbd5e1', weight: 0.6, opacity: 0.5};
      }
      return {fillColor: '#94a3b8', fillOpacity: 0.2,
              color: isDark ? '#3f3f46' : '#cbd5e1', weight: 0.5, opacity: 0.4};
    }
  }

  // ── Normal mode ──────────────────────────────────────────────────────────
  if (!isDark) {
    return {
      fillColor: zone ? zone.color : '#e8e2da',
      fillOpacity: dimmed ? 0.15 : 0.85,
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
  const engName = feature.properties.name || '';
  const thaiName = EN_TO_TH_PROVINCE[engName] || engName;
  const zoneId = getZoneForProvince(engName);
  const zone = zoneId ? ZONES.find((z) => z.id === zoneId) : null;

  layer.on({
    mouseover(e) {
      const color = zone ? zone.color : '#f97316';
      e.target.setStyle({fillOpacity: 0.95, weight: 2, color});
      e.target.bringToFront();
    },
    mouseout() {
      provinceLayer.resetStyle(layer);
    },
    click() {
      if (zoneId) filterZone(zoneId);
    },
  });

  if (thaiName) {
    layer.bindTooltip(thaiName, {
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

/** Initializes the Leaflet map on page load. */
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

  leafletMap.createPane('labelsPane');
  leafletMap.getPane('labelsPane').style.zIndex = 300;
  leafletMap.getPane('labelsPane').style.pointerEvents = 'none';

  const isInitLight = document.documentElement.dataset.theme !== 'dark';
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
  const isLight = document.documentElement.dataset.theme !== 'dark';
  worldOverlayLayer = L.rectangle([[-85.05, -180], [85.05, 180]], {
    fillColor: '#64748b',
    fillOpacity: isLight ? 0.42 : 0,
    color: 'transparent',
    weight: 0,
    interactive: false,
  }).addTo(leafletMap);

  fetch('./thailand.json')
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
  const isLight = document.documentElement.dataset.theme !== 'dark';
  worldOverlayLayer.setStyle({fillOpacity: isLight ? 0.42 : 0});
}

// ── Theme ──────────────────────────────────────────────────────────────────

/** Toggles between dark and light theme and updates map tiles. */
function toggleTheme() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const goingDark = !isDark;

  document.documentElement.dataset.theme = goingDark ? 'dark' : '';

  const btn = document.getElementById('themeBtn');
  if (btn) {
    const moonSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    const sunSvg  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
    btn.innerHTML = goingDark ? `${sunSvg} Light` : `${moonSvg} Dark`;
  }

  const nextTheme = goingDark ? 'dark' : 'light';
  if (leafletMap && tileLayer) {
    leafletMap.removeLayer(tileLayer);
    tileLayer = L.tileLayer(TILE_URLS[nextTheme], {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 18,
    }).addTo(leafletMap);
    tileLayer.bringToBack();

    if (!goingDark) {
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

// ── Modal ──────────────────────────────────────────────────────────────────

/** Opens the add-dealer modal. */
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
 * Closes the modal when the backdrop is clicked.
 * @param {!Event} e Click event.
 */
function closeModalOnBackdrop(e) {
  if (e.target === document.getElementById('addModal')) closeModal();
}

/**
 * Toggles the active/inactive status selector.
 * @param {boolean} active True for active.
 */
function setStatus(active) {
  newDealerActive = active;
  document.getElementById('opt-active').className =
      active ? 'status-opt active-opt' : 'status-opt';
  document.getElementById('opt-inactive').className =
      !active ? 'status-opt inactive-opt' : 'status-opt';
}

/** Validates and submits the add-dealer form. */
function submitDealer() {
  const name     = document.getElementById('f-name').value.trim();
  const zone     = document.getElementById('f-zone').value;
  const crop     = document.getElementById('f-crop').value;
  const province = document.getElementById('f-province').value.trim();
  const district = document.getElementById('f-district').value.trim();
  const errEl    = document.getElementById('form-error');

  if (!name || !zone || !crop || !province) {
    errEl.textContent = 'กรุณากรอกข้อมูลที่จำเป็น (ชื่อ, เขต, พืชหลัก, จังหวัด)';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  DEALERS.push({name, zone, province, district: district || 'เมือง', crop, active: newDealerActive});

  const matchedZone = ZONES.find((z) => z.id === zone);
  if (matchedZone) matchedZone.dealers++;

  buildFsZoneRows();
  closeModal();
  selectDealer(DEALERS.length - 1);
  if (mapInitialized) renderDealerMarkers();
}

// ── Init ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  buildFsZoneRows();
  filterZone('all');
  initMap();
});
