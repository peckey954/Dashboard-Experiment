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
 * Market potential data per province: estimated market value and actual sales
 * in ล้านบาท (million THB), plus leading crops in the province.
 * @const {!Object<string, {market:number, sales:number, crops:!Array<string>}>}
 */
const PROVINCE_POTENTIAL = {
  // N1  — ~30% of provinces hit ≥600M (orange-500); rest spread lighter
  'เชียงใหม่':          {market:850,  sales:188, crops:['ลำไย','ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  'เชียงราย':           {market:580,  sales:128, crops:['ข้าวนาปี','ลำไย','ข้าวโพดเลี้ยงสัตว์']},
  'แม่ฮ่องสอน':        {market:null, sales:0,   crops:['ข้าวนาปี']},
  'ลำปาง':              {market:420,  sales:93,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์','ลำไย']},
  'ลำพูน':              {market:290,  sales:64,  crops:['ลำไย','ข้าวนาปี']},
  'พะเยา':              {market:265,  sales:58,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  // N2
  'พิษณุโลก':           {market:602,  sales:133, crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์','มันสำปะหลัง']},
  'เพชรบูรณ์':         {market:610,  sales:135, crops:['ข้าวโพดเลี้ยงสัตว์','ข้าวนาปี','มันสำปะหลัง']},
  'สุโขทัย':           {market:85,   sales:19,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  'อุตรดิตถ์':         {market:185,  sales:41,  crops:['ข้าวนาปี','ลำไย']},
  'แพร่':               {market:175,  sales:38,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  'น่าน':               {market:168,  sales:37,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  // N3
  'ตาก':                {market:190,  sales:42,  crops:['ข้าวโพดเลี้ยงสัตว์','ข้าวนาปี','อ้อยโรงงาน']},
  'กำแพงเพชร':         {market:405,  sales:89,  crops:['ข้าวนาปี','อ้อยโรงงาน','มันสำปะหลัง']},
  'นครสวรรค์':         {market:600,  sales:132, crops:['ข้าวนาปี','อ้อยโรงงาน','ข้าวโพดเลี้ยงสัตว์']},
  'พิจิตร':             {market:175,  sales:38,  crops:['ข้าวนาปี','ข้าวนาปรัง']},
  'อุทัยธานี':         {market:110,  sales:24,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  // NE1
  'ขอนแก่น':           {market:1050, sales:231, crops:['ข้าวนาปี','อ้อยโรงงาน','มันสำปะหลัง']},
  'มหาสารคาม':         {market:605,  sales:133, crops:['ข้าวนาปี','อ้อยโรงงาน']},
  'กาฬสินธุ์':         {market:620,  sales:136, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'ร้อยเอ็ด':          {market:670,  sales:147, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'ยโสธร':              {market:295,  sales:65,  crops:['ข้าวนาปี']},
  // NE2
  'นครราชสีมา':        {market:1200, sales:264, crops:['ข้าวนาปี','อ้อยโรงงาน','มันสำปะหลัง']},
  'บุรีรัมย์':         {market:695,  sales:153, crops:['ข้าวนาปี','มันสำปะหลัง','ยางพารา']},
  'สุรินทร์':          {market:480,  sales:106, crops:['ข้าวนาปี','ยางพารา']},
  'ชัยภูมิ':           {market:435,  sales:96,  crops:['ข้าวนาปี','อ้อยโรงงาน','มันสำปะหลัง']},
  'ศรีสะเกษ':          {market:630,  sales:139, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'อุบลราชธานี':      {market:920,  sales:202, crops:['ข้าวนาปี','ยางพารา','มันสำปะหลัง']},
  // NE3
  'อุดรธานี':          {market:720,  sales:158, crops:['ข้าวนาปี','ยางพารา','อ้อยโรงงาน']},
  'หนองคาย':           {market:310,  sales:68,  crops:['ข้าวนาปี','ยางพารา']},
  'เลย':                {market:165,  sales:36,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  'สกลนคร':            {market:620,  sales:136, crops:['ข้าวนาปี','ยางพารา']},
  'หนองบัวลำภู':      {market:155,  sales:34,  crops:['ข้าวนาปี']},
  'นครพนม':            {market:250,  sales:55,  crops:['ข้าวนาปี','ยางพารา']},
  'มุกดาหาร':          {market:140,  sales:31,  crops:['ข้าวนาปี','ยางพารา']},
  'อำนาจเจริญ':       {market:150,  sales:33,  crops:['ข้าวนาปี']},
  'บึงกาฬ':            {market:120,  sales:26,  crops:['ข้าวนาปี','ยางพารา']},
  // C1
  'อยุธยา':            {market:610,  sales:134, crops:['ข้าวนาปรัง','ข้าวนาปี','อ้อยโรงงาน']},
  'อ่างทอง':           {market:100,  sales:22,  crops:['ข้าวนาปรัง','ข้าวนาปี']},
  'สิงห์บุรี':        {market:85,   sales:19,  crops:['ข้าวนาปรัง','ข้าวนาปี']},
  'ชัยนาท':            {market:195,  sales:43,  crops:['ข้าวนาปรัง','ข้าวนาปี','อ้อยโรงงาน']},
  'ลพบุรี':            {market:608,  sales:134, crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์','อ้อยโรงงาน']},
  'สระบุรี':           {market:225,  sales:50,  crops:['ข้าวนาปรัง','อ้อยโรงงาน']},
  // C2
  'กรุงเทพมหานคร':   {market:120,  sales:26,  crops:['ข้าวนาปรัง','ข้าวโพดเลี้ยงสัตว์']},
  'นนทบุรี':           {market:45,   sales:10,  crops:['ข้าวนาปรัง']},
  'ปทุมธานี':         {market:40,   sales:9,   crops:['ข้าวนาปรัง','ข้าวนาปี']},
  'สมุทรปราการ':      {market:32,   sales:7,   crops:['ข้าวนาปรัง']},
  'นครนายก':          {market:115,  sales:25,  crops:['ข้าวนาปรัง','มันสำปะหลัง']},
  // C3
  'สุพรรณบุรี':       {market:640,  sales:141, crops:['ข้าวนาปรัง','อ้อยโรงงาน','ข้าวโพดเลี้ยงสัตว์']},
  'นครปฐม':           {market:null, sales:0,   crops:['ข้าวนาปรัง','มะพร้าว']},
  // E1
  'ชลบุรี':            {market:null, sales:0,   crops:['มันสำปะหลัง','ข้าวนาปี']},
  'ระยอง':             {market:1100, sales:242, crops:['มันสำปะหลัง','ยางพารา','ข้าวนาปี']},
  'ฉะเชิงเทรา':      {market:360,  sales:79,  crops:['ข้าวนาปี','มันสำปะหลัง']},
  // E2
  'จันทบุรี':         {market:1300, sales:286, crops:['ทุเรียน','ยางพารา']},
  'ตราด':              {market:856,  sales:188, crops:['ทุเรียน','ยางพารา']},
  'สระแก้ว':          {market:445,  sales:98,  crops:['ยางพารา','มันสำปะหลัง']},
  // E3
  'ปราจีนบุรี':       {market:330,  sales:73,  crops:['ข้าวนาปรัง','มันสำปะหลัง','อ้อยโรงงาน']},
  // W1
  'กาญจนบุรี':        {market:650,  sales:143, crops:['อ้อยโรงงาน','ข้าวนาปรัง','ข้าวโพดเลี้ยงสัตว์']},
  'ราชบุรี':           {market:390,  sales:86,  crops:['อ้อยโรงงาน','ข้าวนาปรัง','มะพร้าว']},
  // W2
  'เพชรบุรี':         {market:115,  sales:25,  crops:['สับปะรด','ข้าวนาปี','มะพร้าว']},
  'ประจวบคีรีขันธ์':  {market:110,  sales:24,  crops:['สับปะรด','ข้าวนาปี','มะพร้าว']},
  // W3
  'สมุทรสาคร':        {market:125,  sales:28,  crops:['ข้าวนาปรัง','มะพร้าว']},
  'สมุทรสงคราม':     {market:30,   sales:7,   crops:['ข้าวนาปรัง','มะพร้าว']},
  // S1
  'ชุมพร':             {market:455,  sales:100, crops:['ปาล์มน้ำมัน','ยางพารา','ทุเรียน']},
  'สุราษฎร์ธานี':   {market:820,  sales:180, crops:['ปาล์มน้ำมัน','ยางพารา']},
  'นครศรีธรรมราช':  {market:745,  sales:164, crops:['ปาล์มน้ำมัน','ยางพารา','ข้าวนาปี']},
  'พัทลุง':           {market:375,  sales:82,  crops:['ปาล์มน้ำมัน','ยางพารา','ข้าวนาปี']},
  // S2
  'สงขลา':            {market:780,  sales:172, crops:['ยางพารา','ปาล์มน้ำมัน']},
  'ตรัง':              {market:455,  sales:100, crops:['ยางพารา','ปาล์มน้ำมัน']},
  'สตูล':              {market:245,  sales:54,  crops:['ยางพารา','ปาล์มน้ำมัน']},
  // S3
  'กระบี่':            {market:450,  sales:99,  crops:['ปาล์มน้ำมัน','ยางพารา']},
  'พังงา':             {market:230,  sales:51,  crops:['ยางพารา','ปาล์มน้ำมัน']},
  'ภูเก็ต':            {market:25,   sales:6,   crops:['มะพร้าว']},
  'ปัตตานี':          {market:210,  sales:46,  crops:['ยางพารา','ปาล์มน้ำมัน']},
  'ยะลา':              {market:195,  sales:43,  crops:['ยางพารา','ปาล์มน้ำมัน']},
  'นราธิวาส':         {market:185,  sales:41,  crops:['ยางพารา','ปาล์มน้ำมัน']},
  'ระนอง':             {market:70,   sales:15,  crops:['ยางพารา','ปาล์มน้ำมัน']},
};

/**
 * Crop types shown in the Potential filter sidebar.
 * @const {!Array<{id:string, name:string, color:string, pct:number}>}
 */
const PT_CROPS = [
  {id:'all',                 name:'ทั้งหมด',               color:'#f97316', pct:100},
  {id:'ข้าวนาปี',            name:'ข้าวนาปี',              color:'#3b82f6', pct:85},
  {id:'ยางพารา',             name:'ยางพารา',               color:'#22c55e', pct:78},
  {id:'มันสำปะหลัง',         name:'มันสำปะหลัง',           color:'#ef4444', pct:62},
  {id:'ข้าวโพดเลี้ยงสัตว์', name:'ข้าวโพดเลี้ยงสัตว์',    color:'#f59e0b', pct:58},
  {id:'ปาล์มน้ำมัน',         name:'ปาล์มน้ำมัน',           color:'#84cc16', pct:52},
  {id:'อ้อยโรงงาน',          name:'อ้อยโรงงาน',            color:'#10b981', pct:48},
  {id:'ข้าวนาปรัง',          name:'ข้าวนาปรัง',            color:'#2563eb', pct:42},
  {id:'ทุเรียน',              name:'ทุเรียน',               color:'#d97706', pct:38},
  {id:'ลำไย',                name:'ลำไย',                 color:'#8b5cf6', pct:32},
];

/**
 * Province-level farmer statistics for the Farmer heatmap mode.
 * farmers = total farmer headcount, users = using our fertilizer,
 * area = total farmland in rai.
 * @const {!Object<string,{farmers:number,users:number,area:number,crops:!Array<string>}>}
 */
const PROVINCE_FARMER_STATS = {
  'เชียงใหม่':   {farmers:82000, users:47000, area:2850000, crops:['ข้าวโพดเลี้ยงสัตว์','ลำไย','ข้าวนาปี']},
  'เชียงราย':    {farmers:71000, users:35500, area:2380000, crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์','ลำไย']},
  'แม่ฮ่องสอน': {farmers:18000, users:7200,  area:560000,  crops:['ข้าวโพดเลี้ยงสัตว์','ข้าวนาปี']},
  'ลำปาง':      {farmers:46000, users:25000, area:1420000, crops:['ข้าวโพดเลี้ยงสัตว์','ข้าวนาปี']},
  'ลำพูน':      {farmers:38000, users:19000, area:980000,  crops:['ลำไย','ข้าวนาปี']},
  'พะเยา':      {farmers:35000, users:17500, area:910000,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  'แพร่':       {farmers:28000, users:12000, area:720000,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  'น่าน':       {farmers:41000, users:18000, area:1150000, crops:['ข้าวโพดเลี้ยงสัตว์','ข้าวนาปี']},
  'พิษณุโลก':  {farmers:55000, users:30000, area:1650000, crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  'เพชรบูรณ์': {farmers:72000, users:40000, area:2200000, crops:['ข้าวโพดเลี้ยงสัตว์','ข้าวนาปี','มันสำปะหลัง']},
  'สุโขทัย':   {farmers:44000, users:24000, area:1320000, crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  'อุตรดิตถ์': {farmers:32000, users:15000, area:890000,  crops:['ข้าวนาปี','ข้าวโพดเลี้ยงสัตว์']},
  'ตาก':        {farmers:38000, users:18000, area:1100000, crops:['ข้าวโพดเลี้ยงสัตว์','มันสำปะหลัง']},
  'กำแพงเพชร': {farmers:60000, users:33000, area:1850000, crops:['ข้าวโพดเลี้ยงสัตว์','มันสำปะหลัง','อ้อยโรงงาน']},
  'นครสวรรค์': {farmers:85000, users:51000, area:2600000, crops:['ข้าวนาปี','อ้อยโรงงาน','ข้าวโพดเลี้ยงสัตว์']},
  'พิจิตร':    {farmers:42000, users:23000, area:1250000, crops:['ข้าวนาปี','ข้าวนาปรัง']},
  'อุทัยธานี': {farmers:28000, users:14000, area:810000,  crops:['ข้าวนาปี','อ้อยโรงงาน']},
  'ขอนแก่น':   {farmers:120000, users:72000, area:3600000, crops:['ข้าวนาปี','อ้อยโรงงาน','มันสำปะหลัง']},
  'มหาสารคาม': {farmers:95000, users:57000, area:2850000, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'กาฬสินธุ์': {farmers:88000, users:50000, area:2640000, crops:['ข้าวนาปี','มันสำปะหลัง','อ้อยโรงงาน']},
  'ร้อยเอ็ด':  {farmers:105000, users:65000, area:3150000, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'ยโสธร':     {farmers:70000, users:42000, area:2100000, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'นครราชสีมา': {farmers:140000, users:80000, area:4200000, crops:['ข้าวนาปี','มันสำปะหลัง','ข้าวโพดเลี้ยงสัตว์']},
  'บุรีรัมย์':  {farmers:100000, users:60000, area:3000000, crops:['ข้าวนาปี','มันสำปะหลัง','อ้อยโรงงาน']},
  'สุรินทร์':  {farmers:95000, users:52000, area:2850000, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'ชัยภูมิ':   {farmers:78000, users:42000, area:2340000, crops:['ข้าวโพดเลี้ยงสัตว์','มันสำปะหลัง','ข้าวนาปี']},
  'ศรีสะเกษ':  {farmers:92000, users:55000, area:2760000, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'อุบลราชธานี': {farmers:110000, users:62000, area:3300000, crops:['ข้าวนาปี','ยางพารา','มันสำปะหลัง']},
  'อุดรธานี':   {farmers:98000, users:58000, area:2940000, crops:['ข้าวนาปี','อ้อยโรงงาน']},
  'หนองคาย':   {farmers:45000, users:24000, area:1350000, crops:['ข้าวนาปี','ยางพารา']},
  'เลย':        {farmers:52000, users:26000, area:1560000, crops:['ข้าวโพดเลี้ยงสัตว์','ข้าวนาปี']},
  'สกลนคร':    {farmers:72000, users:40000, area:2160000, crops:['ข้าวนาปี','ยางพารา']},
  'หนองบัวลำภู': {farmers:42000, users:23000, area:1260000, crops:['ข้าวนาปี','อ้อยโรงงาน']},
  'นครพนม':    {farmers:55000, users:29000, area:1650000, crops:['ข้าวนาปี','ยางพารา']},
  'มุกดาหาร':  {farmers:38000, users:19000, area:1140000, crops:['ข้าวนาปี','ยางพารา']},
  'อำนาจเจริญ': {farmers:45000, users:24000, area:1350000, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'บึงกาฬ':    {farmers:32000, users:15000, area:960000,  crops:['ข้าวนาปี','ยางพารา']},
  'พระนครศรีอยุธยา': {farmers:58000, users:35000, area:1740000, crops:['ข้าวนาปรัง','ข้าวนาปี']},
  'อ่างทอง':   {farmers:32000, users:19000, area:960000,  crops:['ข้าวนาปรัง','ข้าวนาปี']},
  'สิงห์บุรี': {farmers:25000, users:15000, area:750000,  crops:['ข้าวนาปรัง','ข้าวนาปี']},
  'ชัยนาท':    {farmers:38000, users:22000, area:1140000, crops:['ข้าวนาปรัง','ข้าวนาปี','อ้อยโรงงาน']},
  'ลพบุรี':    {farmers:55000, users:32000, area:1650000, crops:['ข้าวนาปรัง','อ้อยโรงงาน','ข้าวโพดเลี้ยงสัตว์']},
  'สระบุรี':   {farmers:35000, users:20000, area:1050000, crops:['อ้อยโรงงาน','ข้าวนาปรัง']},
  'กรุงเทพมหานคร': {farmers:8000, users:5000, area:200000, crops:['ข้าวนาปรัง']},
  'นนทบุรี':   {farmers:12000, users:7500,  area:360000,  crops:['ข้าวนาปรัง','ผักสวนครัว']},
  'ปทุมธานี':  {farmers:25000, users:15000, area:750000,  crops:['ข้าวนาปรัง','ข้าวโพดเลี้ยงสัตว์']},
  'สมุทรปราการ': {farmers:15000, users:9000, area:450000, crops:['ข้าวนาปรัง']},
  'นครนายก':   {farmers:22000, users:12000, area:660000,  crops:['ข้าวนาปรัง','มันสำปะหลัง']},
  'สุพรรณบุรี': {farmers:62000, users:37000, area:1860000, crops:['ข้าวนาปรัง','อ้อยโรงงาน']},
  'นครปฐม':    {farmers:28000, users:16000, area:840000,  crops:['ข้าวนาปรัง','มะพร้าว']},
  'ชลบุรี':    {farmers:22000, users:12000, area:660000,  crops:['มันสำปะหลัง','ข้าวนาปี']},
  'ระยอง':     {farmers:35000, users:19000, area:1050000, crops:['มันสำปะหลัง','ยางพารา']},
  'ฉะเชิงเทรา': {farmers:42000, users:23000, area:1260000, crops:['ข้าวนาปี','มันสำปะหลัง']},
  'จันทบุรี':  {farmers:48000, users:25000, area:1440000, crops:['ทุเรียน','ยางพารา']},
  'ตราด':      {farmers:28000, users:14000, area:840000,  crops:['ทุเรียน','ยางพารา']},
  'สระแก้ว':   {farmers:38000, users:19000, area:1140000, crops:['ยางพารา','มันสำปะหลัง']},
  'ปราจีนบุรี': {farmers:30000, users:16000, area:900000, crops:['ข้าวนาปรัง','มันสำปะหลัง','อ้อยโรงงาน']},
  'กาญจนบุรี': {farmers:45000, users:24000, area:1350000, crops:['อ้อยโรงงาน','ข้าวนาปรัง','ข้าวโพดเลี้ยงสัตว์']},
  'ราชบุรี':   {farmers:48000, users:27000, area:1440000, crops:['อ้อยโรงงาน','ข้าวนาปรัง']},
  'เพชรบุรี':  {farmers:32000, users:16000, area:960000,  crops:['สับปะรด','ข้าวนาปี','มะพร้าว']},
  'ประจวบคีรีขันธ์': {farmers:28000, users:13000, area:840000, crops:['สับปะรด','ข้าวนาปี']},
  'สมุทรสาคร': {farmers:15000, users:8000,  area:450000,  crops:['ข้าวนาปรัง','มะพร้าว']},
  'สมุทรสงคราม': {farmers:10000, users:5500, area:300000, crops:['ข้าวนาปรัง','มะพร้าว']},
  'ชุมพร':     {farmers:52000, users:28000, area:1560000, crops:['ปาล์มน้ำมัน','ยางพารา','ทุเรียน']},
  'สุราษฎร์ธานี': {farmers:85000, users:44000, area:2550000, crops:['ปาล์มน้ำมัน','ยางพารา']},
  'นครศรีธรรมราช': {farmers:78000, users:40000, area:2340000, crops:['ปาล์มน้ำมัน','ยางพารา','ข้าวนาปี']},
  'พัทลุง':    {farmers:45000, users:24000, area:1350000, crops:['ปาล์มน้ำมัน','ยางพารา','ข้าวนาปี']},
  'ระนอง':     {farmers:22000, users:11000, area:660000,  crops:['ยางพารา','ปาล์มน้ำมัน']},
  'สงขลา':     {farmers:68000, users:35000, area:2040000, crops:['ยางพารา','ปาล์มน้ำมัน']},
  'ตรัง':      {farmers:52000, users:27000, area:1560000, crops:['ยางพารา','ปาล์มน้ำมัน']},
  'สตูล':      {farmers:28000, users:14000, area:840000,  crops:['ยางพารา','ปาล์มน้ำมัน']},
  'กระบี่':    {farmers:48000, users:24000, area:1440000, crops:['ปาล์มน้ำมัน','ยางพารา']},
  'พังงา':     {farmers:28000, users:13000, area:840000,  crops:['ยางพารา','ปาล์มน้ำมัน']},
  'ภูเก็ต':    {farmers:8000,  users:4000,  area:200000,  crops:['มะพร้าว']},
  'ปัตตานี':   {farmers:45000, users:21000, area:1350000, crops:['ยางพารา','ปาล์มน้ำมัน']},
  'ยะลา':      {farmers:38000, users:17000, area:1140000, crops:['ยางพารา','ปาล์มน้ำมัน']},
  'นราธิวาส':  {farmers:35000, users:15000, area:1050000, crops:['ยางพารา','ปาล์มน้ำมัน']},
};

/**
 * Individual farmer records for map markers and analytics.
 * area = farmland in rai (determines marker size).
 * @const {!Array<!Object>}
 */
const FARMERS = [
  {name:'ประสิทธิ์ ใจกล้า',    province:'นครราชสีมา', zone:'NE2', crop:'มันสำปะหลัง',         area:4800, usesOurFertilizer:true},
  {name:'วิรัตน์ โชคดี',       province:'ขอนแก่น',    zone:'NE1', crop:'ข้าวนาปี',             area:3200, usesOurFertilizer:true},
  {name:'สุรชาติ มีชัย',       province:'ชัยภูมิ',    zone:'NE2', crop:'ข้าวโพดเลี้ยงสัตว์',  area:2900, usesOurFertilizer:false},
  {name:'ทองดี ปัญญาดี',       province:'นครสวรรค์',  zone:'N3',  crop:'ข้าวนาปี',             area:2600, usesOurFertilizer:true},
  {name:'อัมพร ลำดวน',         province:'สุราษฎร์ธานี',zone:'S1', crop:'ปาล์มน้ำมัน',          area:2400, usesOurFertilizer:true},
  {name:'กิตติ วงศ์ประชา',     province:'บุรีรัมย์',  zone:'NE2', crop:'ข้าวนาปี',             area:2200, usesOurFertilizer:false},
  {name:'รัตนา สายทอง',        province:'อุบลราชธานี',zone:'NE2', crop:'ข้าวนาปี',             area:2100, usesOurFertilizer:true},
  {name:'สมศักดิ์ นาคา',       province:'เชียงใหม่',  zone:'N1',  crop:'ข้าวโพดเลี้ยงสัตว์',  area:1950, usesOurFertilizer:true},
  {name:'ปราณี ดีจริง',        province:'กำแพงเพชร',  zone:'N3',  crop:'มันสำปะหลัง',         area:1850, usesOurFertilizer:false},
  {name:'วันชัย หาญใจ',        province:'จันทบุรี',   zone:'E2',  crop:'ทุเรียน',              area:1800, usesOurFertilizer:true},
  {name:'บัวลอย ชำนาญ',        province:'กาญจนบุรี',  zone:'W1',  crop:'อ้อยโรงงาน',           area:1700, usesOurFertilizer:true},
  {name:'ศิริวรรณ ทองแท้',     province:'สงขลา',      zone:'S2',  crop:'ยางพารา',              area:1650, usesOurFertilizer:false},
  {name:'ไพโรจน์ ผาสุข',       province:'ขอนแก่น',    zone:'NE1', crop:'อ้อยโรงงาน',           area:1600, usesOurFertilizer:true},
  {name:'มาลี ชูเกียรติ',      province:'ร้อยเอ็ด',   zone:'NE1', crop:'ข้าวนาปี',             area:1550, usesOurFertilizer:true},
  {name:'ธนกร สีดา',           province:'ลพบุรี',     zone:'C1',  crop:'อ้อยโรงงาน',           area:1500, usesOurFertilizer:false},
  {name:'อนันต์ บุญมา',        province:'นครราชสีมา', zone:'NE2', crop:'ข้าวนาปี',             area:1450, usesOurFertilizer:true},
  {name:'สาคร ศรีสวัสดิ์',     province:'สุรินทร์',   zone:'NE2', crop:'ข้าวนาปี',             area:1400, usesOurFertilizer:false},
  {name:'เกษม แสงวิเชียร',     province:'เชียงราย',   zone:'N1',  crop:'ข้าวโพดเลี้ยงสัตว์',  area:1350, usesOurFertilizer:true},
  {name:'ลัดดา พิมพ์ใจ',       province:'อุดรธานี',   zone:'NE3', crop:'ข้าวนาปี',             area:1300, usesOurFertilizer:false},
  {name:'สุพจน์ บัวงาม',       province:'สุพรรณบุรี', zone:'C3',  crop:'ข้าวนาปรัง',           area:1250, usesOurFertilizer:true},
  {name:'วนิดา ชมชื่น',        province:'ตรัง',       zone:'S2',  crop:'ยางพารา',              area:1200, usesOurFertilizer:true},
  {name:'ชัยวัฒน์ แก้วใจ',     province:'เพชรบูรณ์',  zone:'N2',  crop:'ข้าวโพดเลี้ยงสัตว์',  area:1150, usesOurFertilizer:true},
  {name:'นงนุช สร้อยทอง',      province:'นครศรีธรรมราช',zone:'S1',crop:'ปาล์มน้ำมัน',          area:1100, usesOurFertilizer:false},
  {name:'สมบูรณ์ ทรัพย์มาก',   province:'ระยอง',      zone:'E1',  crop:'มันสำปะหลัง',         area:1050, usesOurFertilizer:true},
  {name:'ปิยะ รักษ์ดี',        province:'ศรีสะเกษ',   zone:'NE2', crop:'ข้าวนาปี',             area:1000, usesOurFertilizer:false},
  {name:'สาวิตรี เจริญผล',     province:'กาฬสินธุ์',  zone:'NE1', crop:'ข้าวนาปี',             area:950,  usesOurFertilizer:true},
  {name:'ณรงค์ ซื่อสัตย์',     province:'สกลนคร',     zone:'NE3', crop:'ยางพารา',              area:900,  usesOurFertilizer:false},
  {name:'รัชนี ใจงาม',         province:'อุบลราชธานี',zone:'NE2', crop:'ยางพารา',              area:850,  usesOurFertilizer:true},
  {name:'กมล วีระชน',          province:'ขอนแก่น',    zone:'NE1', crop:'มันสำปะหลัง',         area:800,  usesOurFertilizer:true},
  {name:'ศักดิ์ชาย นิลเพชร',   province:'นครราชสีมา', zone:'NE2', crop:'มันสำปะหลัง',         area:750,  usesOurFertilizer:false},
  {name:'อัญชลี ดาวทอง',       province:'บุรีรัมย์',  zone:'NE2', crop:'อ้อยโรงงาน',           area:700,  usesOurFertilizer:true},
  {name:'วิชัย คงทน',          province:'ชัยนาท',     zone:'C1',  crop:'ข้าวนาปรัง',           area:650,  usesOurFertilizer:false},
  {name:'ประไพ สุขสม',         province:'สงขลา',      zone:'S2',  crop:'ยางพารา',              area:600,  usesOurFertilizer:true},
  {name:'ชาลี แสนดี',          province:'กระบี่',     zone:'S3',  crop:'ปาล์มน้ำมัน',          area:550,  usesOurFertilizer:false},
  {name:'มนัส วิไล',           province:'พิษณุโลก',   zone:'N2',  crop:'ข้าวนาปี',             area:500,  usesOurFertilizer:true},
  {name:'กัญญา ทองสุก',        province:'พระนครศรีอยุธยา',zone:'C1',crop:'ข้าวนาปรัง',        area:480,  usesOurFertilizer:true},
  {name:'สุชาติ พึ่งบุญ',       province:'สุราษฎร์ธานี',zone:'S1', crop:'ยางพารา',              area:450,  usesOurFertilizer:false},
  {name:'อำพล โตใจ',           province:'ราชบุรี',    zone:'W1',  crop:'อ้อยโรงงาน',           area:420,  usesOurFertilizer:true},
  {name:'บุญจันทร์ ศรีดี',     province:'ร้อยเอ็ด',   zone:'NE1', crop:'มันสำปะหลัง',         area:400,  usesOurFertilizer:false},
  {name:'พิมล อ่อนหวาน',       province:'ตราด',       zone:'E2',  crop:'ทุเรียน',              area:380,  usesOurFertilizer:true},
  {name:'ทวี คำหอม',           province:'เชียงใหม่',  zone:'N1',  crop:'ลำไย',                area:350,  usesOurFertilizer:true},
  {name:'จิรา โฉมงาม',         province:'อุทัยธานี',  zone:'N3',  crop:'ข้าวนาปี',             area:320,  usesOurFertilizer:false},
  {name:'พงษ์ศักดิ์ เต็มใจ',   province:'มหาสารคาม',  zone:'NE1', crop:'ข้าวนาปี',             area:300,  usesOurFertilizer:true},
  {name:'หทัย ร่มเย็น',        province:'สุรินทร์',   zone:'NE2', crop:'ยางพารา',              area:280,  usesOurFertilizer:false},
  {name:'วันเพ็ญ สว่าง',       province:'ลำพูน',      zone:'N1',  crop:'ลำไย',                area:250,  usesOurFertilizer:true},
  {name:'จีระศักดิ์ พุ่มไสว',  province:'นครสวรรค์',  zone:'N3',  crop:'อ้อยโรงงาน',           area:220,  usesOurFertilizer:true},
  {name:'อรุณ บริสุทธิ์',      province:'กำแพงเพชร',  zone:'N3',  crop:'ข้าวโพดเลี้ยงสัตว์',  area:200,  usesOurFertilizer:false},
  {name:'กาญจนา แจ่มใส',       province:'ชัยภูมิ',    zone:'NE2', crop:'ข้าวโพดเลี้ยงสัตว์',  area:180,  usesOurFertilizer:true},
  {name:'สนั่น บุญลาภ',        province:'สระแก้ว',    zone:'E2',  crop:'มันสำปะหลัง',         area:160,  usesOurFertilizer:false},
  {name:'รุ่งทิพย์ สดใส',      province:'ประจวบคีรีขันธ์',zone:'W2',crop:'สับปะรด',            area:140,  usesOurFertilizer:true},
  {name:'ชาตรี ทุ่งดอก',       province:'ยโสธร',      zone:'NE1', crop:'ข้าวนาปี',             area:120,  usesOurFertilizer:true},
  {name:'สดศรี ใสสะอาด',       province:'นครพนม',     zone:'NE3', crop:'ข้าวนาปี',             area:100,  usesOurFertilizer:false},
  {name:'เนตรนภา เพ็ชรรัตน์',  province:'พัทลุง',     zone:'S1',  crop:'ปาล์มน้ำมัน',          area:90,   usesOurFertilizer:true},
  {name:'สว่าง แก้วมณี',       province:'ปัตตานี',    zone:'S3',  crop:'ยางพารา',              area:80,   usesOurFertilizer:false},
  {name:'ประยูร อินทรีย์',      province:'สตูล',       zone:'S2',  crop:'ยางพารา',              area:70,   usesOurFertilizer:true},
  {name:'กฤตยา มีสุข',         province:'ภูเก็ต',     zone:'S3',  crop:'มะพร้าว',              area:60,   usesOurFertilizer:false},
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

/** @type {?string} Active coverage overlay: 'dealer' | 'gap' | 'overlap' | null. */
let coverageMode = null;

/** @type {boolean} Whether the Potential heatmap mode is active. */
let potentialMode = false;

/** @type {string} Active crop filter in potential mode. */
let potentialCrop = 'all';

/** @type {?number} Active potential level filter (0-5), null = all. */
let potentialLevel = null;

/** @type {string} Chart grouping in potential mode: 'province' | 'zone'. */
let potentialChartMode = 'province';

/** @type {boolean} Active status for the new dealer modal form. */
let newDealerActive = true;

/** @type {?Object} Leaflet map instance. */
let leafletMap = null;

/** @type {?Object} Leaflet GeoJSON province layer. */
let provinceLayer = null;

/** @type {?Object} Leaflet dealer markers layer group. */
let dealerMarkersLayer = null;

/** @type {?Object} Leaflet farmer circle markers layer group. */
let farmerMarkersLayer = null;

/** @type {boolean} Whether the Farmer heatmap mode is active. */
let farmerMode = false;

/** @type {string} Active crop filter in farmer mode. */
let farmerCropFilter = 'all';

/** @type {string} Farmer page view: 'map' | 'table'. */
let farmerViewMode = 'map';

/** @type {string} Farmer right-sidebar bar chart grouping: 'province' | 'zone'. */
let farmerBarChartMode = 'province';

/** @type {?number} Active farmer density filter level (1-4), null = all. */
let farmerDensityFilter = null;

/** @type {string} Farmer table sort field: 'area' | 'name'. */
let farmerSortField = 'area';

/** @type {boolean} Farmer table ascending sort flag. */
let farmerSortAsc = false;

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
  if (tab === 'potential') {
    if (farmerMode) exitFarmerMode();
    enterPotentialMode();
  } else if (tab === 'farmer') {
    if (potentialMode) exitPotentialMode();
    enterFarmerMode();
  } else {
    if (potentialMode) exitPotentialMode();
    if (farmerMode) exitFarmerMode();
  }
}

// ── Potential Mode ────────────────────────────────────────────────────────────

/**
 * Returns the heatmap fill color for a market value in ลบ.
 * @param {?number} value Market value in million THB, or null for no-data.
 * @return {string} Hex color.
 */
function potentialColor(value) {
  if (value == null) return '#94a3b8'; // no data → grey
  if (value >= 600)  return '#f97316'; // orange-500 (~30% of provinces)
  if (value >= 300)  return '#fb923c'; // orange-400
  if (value >= 150)  return '#fdba74'; // orange-300
  if (value >= 50)   return '#fed7aa'; // orange-200
  return '#fff7ed';                    // orange-50 (<50M, very pale)
}

/**
 * Returns the potential level index (0-5) for a market value.
 * 5=highest (≥600M), 0=no data.
 */
function getPotentialLevel(value) {
  if (value == null) return 0;
  if (value >= 600)  return 5;
  if (value >= 300)  return 4;
  if (value >= 150)  return 3;
  if (value >= 50)   return 2;
  return 1;
}

/**
 * Returns potential data for a province name (Thai or English via EN_TO_TH_PROVINCE).
 * @param {string} provName Province name.
 * @return {?{market:number,sales:number,crops:!Array<string>}}
 */
function getProvPotential(provName) {
  if (PROVINCE_POTENTIAL[provName]) return PROVINCE_POTENTIAL[provName];
  const thai = EN_TO_TH_PROVINCE[provName];
  if (thai && PROVINCE_POTENTIAL[thai]) return PROVINCE_POTENTIAL[thai];
  return null;
}

/** Activates the Potential heatmap mode. */
function enterPotentialMode() {
  potentialMode = true;
  potentialLevel = null;

  const dealerPane = document.getElementById('fsDealerPane');
  const ptPane     = document.getElementById('fsPotentialPane');
  if (dealerPane) dealerPane.style.display = 'none';
  if (ptPane)     ptPane.style.display     = '';

  const dealerContent = document.getElementById('dsDealerContent');
  const ptContent     = document.getElementById('dsPotentialPane');
  if (dealerContent) dealerContent.style.display = 'none';
  if (ptContent)     ptContent.style.display     = '';

  renderPtCropList();
  renderPtRightSidebar();

  if (mapInitialized && provinceLayer) provinceLayer.setStyle(styleProvince);
}

/** Deactivates the Potential heatmap mode and restores dealer view. */
function exitPotentialMode() {
  potentialMode = false;
  potentialCrop  = 'all';
  potentialLevel = null;

  const dealerPane = document.getElementById('fsDealerPane');
  const ptPane     = document.getElementById('fsPotentialPane');
  if (dealerPane) dealerPane.style.display = '';
  if (ptPane)     ptPane.style.display     = 'none';

  const dealerContent = document.getElementById('dsDealerContent');
  const ptContent     = document.getElementById('dsPotentialPane');
  if (dealerContent) dealerContent.style.display = '';
  if (ptContent)     ptContent.style.display     = 'none';

  if (mapInitialized && provinceLayer) provinceLayer.setStyle(styleProvince);
}

/** Renders the crop filter list in the left sidebar. */
function renderPtCropList() {
  const el = document.getElementById('fsPtCropList');
  if (!el) return;

  const crops = potentialCrop === 'all'
    ? PT_CROPS
    : PT_CROPS.slice().sort((a, b) => {
        if (a.id === 'all') return -1;
        if (b.id === 'all') return 1;
        return b.pct - a.pct;
      });

  el.innerHTML = crops.map((c) => {
    const isActive = potentialCrop === c.id;
    return `
      <div class="fs-pt-crop-row${isActive ? ' fs-pt-crop-row--active' : ''}"
           onclick="filterPotentialCrop('${c.id}')"
           style="${isActive ? `border-color:${c.color}44;background:${c.color}11` : ''}">
        <div class="fs-pt-crop-dot" style="background:${c.color}"></div>
        <span class="fs-pt-crop-name">${c.name}</span>
        <div class="fs-pt-crop-bar-wrap">
          <div class="fs-pt-crop-bar-fill" style="width:${c.pct}%;background:${c.color}"></div>
        </div>
        <span class="fs-pt-crop-pct">${c.pct}%</span>
      </div>`;
  }).join('');
}

/**
 * Filters the heatmap by crop type.
 * @param {string} cropId Crop ID or 'all'.
 */
function filterPotentialCrop(cropId) {
  potentialCrop = cropId;
  potentialLevel = null;
  renderPtCropList();
  renderPtRightSidebar();
  if (mapInitialized && provinceLayer) provinceLayer.setStyle(styleProvince);
}

/**
 * Sorts the crop list and heatmap.
 * @param {string} mode 'opportunity' | 'gap'.
 */
function sortPotential(mode) {
  document.getElementById('ptSortOpp').classList.toggle('fs-pt-sort-btn--active', mode === 'opportunity');
  document.getElementById('ptSortGap').classList.toggle('fs-pt-sort-btn--active', mode === 'gap');
  renderPtCropList();
}

/**
 * Highlights provinces in the selected heatmap level band.
 * @param {number} level 0-5.
 */
function filterPotentialLevel(level) {
  potentialLevel = potentialLevel === level ? null : level;
  document.querySelectorAll('.fs-pt-legend-row').forEach((r, i) => {
    r.classList.toggle('fs-pt-legend-row--active', potentialLevel === (5 - i));
  });
  if (mapInitialized && provinceLayer) provinceLayer.setStyle(styleProvince);
}

/** Renders all right-sidebar potential content. */
function renderPtRightSidebar() {
  // Aggregate stats
  const allData = Object.values(PROVINCE_POTENTIAL);
  const totalMarket = allData.reduce((s, d) => s + d.market, 0);
  const totalSales  = allData.reduce((s, d) => s + d.sales,  0);
  const gap         = totalMarket - totalSales;
  const provCount   = allData.length;

  const kpiValEl = document.getElementById('ptKpiVal');
  if (kpiValEl) kpiValEl.textContent = (totalMarket / 1000).toFixed(1) + 'K ลบ.';

  const provEl = document.getElementById('ptProvCount');
  if (provEl) provEl.textContent = `${provCount} จังหวัด`;

  const distEl = document.getElementById('ptDistCount');
  if (distEl) distEl.textContent = `${ZONES.length} เขต`;

  const oppEl = document.getElementById('ptOppCount');
  if (oppEl) oppEl.textContent = `${Math.round(gap / 10)} โอกาส`;

  const farmEl = document.getElementById('ptFarmers');
  if (farmEl) farmEl.textContent = (DEALERS.length * 2800).toLocaleString() + ' ราย';

  const areaEl = document.getElementById('ptArea');
  if (areaEl) areaEl.textContent = (DEALERS.length * 8500).toLocaleString() + ' ไร่';

  renderPtBarChart();
  renderPtOppCards();
}

/** Switches the bar chart between province and zone grouping. */
function switchPotentialChart(mode) {
  potentialChartMode = mode;
  document.getElementById('ptToggleProv').classList.toggle('pt-toggle-btn--active', mode === 'province');
  document.getElementById('ptToggleZone').classList.toggle('pt-toggle-btn--active', mode === 'zone');
  renderPtBarChart();
}

/** Renders the grouped bar chart (Figma orange-tone style) in the right sidebar. */
function renderPtBarChart() {
  const el = document.getElementById('ptBarChart');
  if (!el) return;

  const CHART_H = 120; // px height of the bar area

  let groups;
  if (potentialChartMode === 'province') {
    groups = Object.entries(PROVINCE_POTENTIAL)
      .filter(([, d]) => d && d.market)
      .map(([name, d]) => ({name, market: d.market, sales: d.sales, gap: d.market - d.sales}))
      .sort((a, b) => b.market - a.market).slice(0, 5);
  } else {
    groups = ZONES.map((z) => {
      const provs = z.provinces.map((p) => PROVINCE_POTENTIAL[p]).filter((d) => d && d.market);
      const market = provs.reduce((s, d) => s + d.market, 0);
      const sales  = provs.reduce((s, d) => s + d.sales,  0);
      return {name: z.id, market, sales, gap: market - sales};
    }).sort((a, b) => b.market - a.market).slice(0, 5);
  }

  const rawMax = Math.max(...groups.map((g) => g.market));
  const yMax = Math.ceil(rawMax / 500) * 500;
  const fmtK = (v) => v >= 1000 ? (v % 1000 === 0 ? v / 1000 + 'k' : (v / 1000).toFixed(1) + 'k') : String(v);

  // Y-axis gridlines (0, 25%, 50%, 75%, 100%)
  const glHtml = [0, 0.25, 0.5, 0.75, 1].map((frac) => {
    const b = (frac * CHART_H).toFixed(1);
    return `<div class="pt-gl" style="bottom:${b}px"><span class="pt-gl-label">${fmtK(Math.round(yMax * frac))}</span></div>`;
  }).join('');

  // Bar groups
  const barsHtml = groups.map((g) => {
    const hM = Math.max(2, (g.market / yMax) * CHART_H).toFixed(1);
    const hS = Math.max(2, (g.sales  / yMax) * CHART_H).toFixed(1);
    const hG = Math.max(2, (g.gap    / yMax) * CHART_H).toFixed(1);
    const nm = g.name.length > 5 ? g.name.slice(0, 4) + '…' : g.name;
    return `
      <div class="pt-bar-group">
        <div class="pt-bar-top-label" style="bottom:${(+hM + 3).toFixed(0)}px">${fmtK(Math.round(g.market))}</div>
        <div class="pt-bar-trio">
          <div class="ptb" style="height:${hM}px;background:#fed7aa" title="ตลาด ${g.market} ลบ."></div>
          <div class="ptb" style="height:${hS}px;background:#f97316" title="ขาย ${g.sales} ลบ."></div>
          <div class="ptb ptb--gap" style="height:${hG}px" title="โอกาส ${g.gap} ลบ."></div>
        </div>
        <div class="pt-bar-name">${nm}</div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="pt-chart-canvas" style="height:${CHART_H}px">
      <div class="pt-chart-gls">${glHtml}</div>
      <div class="pt-chart-bars">${barsHtml}</div>
    </div>`;
}

/** Fertilizer formulas recommended by crop type. */
const CROP_FORMULAS = {
  'ข้าวนาปี':            [{code:'16-20-0', desc:'ระยะแตกกอ'}, {code:'46-0-0', desc:'ระยะออกรวง'}],
  'ข้าวนาปรัง':          [{code:'16-20-0', desc:'ระยะแตกกอ'}, {code:'46-0-0', desc:'ระยะออกรวง'}],
  'ข้าวโพดเลี้ยงสัตว์': [{code:'15-15-15', desc:'หลังปลูก 15 วัน'}, {code:'46-0-0', desc:'ระยะออกดอก'}],
  'ยางพารา':             [{code:'20-10-12', desc:'ช่วงเปิดกรีด'}, {code:'15-7-18', desc:'บำรุงต้น'}],
  'ปาล์มน้ำมัน':         [{code:'12-6-22', desc:'ระยะออกทะลาย'}, {code:'0-0-60', desc:'เพิ่มน้ำมัน'}],
  'มันสำปะหลัง':         [{code:'15-15-15', desc:'ครั้งแรก'}, {code:'13-13-21', desc:'ครั้งที่สอง'}],
  'อ้อยโรงงาน':          [{code:'16-8-8',  desc:'หลังปลูก'}, {code:'21-0-0',  desc:'ระยะแตกกอ'}],
  'ทุเรียน':              [{code:'8-24-24', desc:'ติดดอกออกผล'}, {code:'13-13-21', desc:'บำรุงผล'}],
  'ลำไย':                [{code:'14-7-35', desc:'ก่อนออกดอก'}, {code:'8-24-24', desc:'ติดผล'}],
};

/** Renders opportunity cards in the right sidebar. */
function renderPtOppCards() {
  const el = document.getElementById('ptOppList');
  if (!el) return;

  const cropFilter = potentialCrop === 'all' ? null : potentialCrop;
  const allProvs = Object.entries(PROVINCE_POTENTIAL);

  // Aggregate gap by crop
  const cropGap = {};
  allProvs.forEach(([, d]) => {
    d.crops.forEach((crop) => {
      if (!cropFilter || crop === cropFilter) {
        cropGap[crop] = (cropGap[crop] || 0) + (d.market - d.sales) / d.crops.length;
      }
    });
  });

  const topCrops = Object.entries(cropGap)
    .sort((a, b) => b[1] - a[1]).slice(0, 2);

  const months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  const now = new Date();
  const seasonStart = months[now.getMonth()];
  const seasonEnd   = months[(now.getMonth() + 2) % 12];

  el.innerHTML = topCrops.map(([crop, gapVal]) => {
    const cropInfo = PT_CROPS.find((c) => c.id === crop) || {color:'#94a3b8', pct:50};
    const formulas = CROP_FORMULAS[crop] || [{code:'15-15-15', desc:'บำรุงทั่วไป'}];
    const oppPct   = Math.min(99, Math.round(cropInfo.pct * 0.85));
    const provCount = allProvs.filter(([, d]) => d.crops.includes(crop)).length;

    return `
      <div class="pt-opp-card">
        <div class="pt-opp-card-header">
          <div class="pt-opp-crop-dot" style="background:${cropInfo.color}"></div>
          <span class="pt-opp-crop-name">${crop}</span>
          <span class="pt-opp-pct" style="color:${cropInfo.color}">${oppPct}% โอกาส</span>
        </div>
        <div class="pt-opp-progress-wrap">
          <div class="pt-opp-progress-fill" style="width:${oppPct}%;background:${cropInfo.color}"></div>
        </div>
        <div class="pt-opp-body">
          <div class="pt-opp-body-row">
            <span class="pt-opp-body-label">โอกาสเพิ่มยอดขาย</span>
            <span class="pt-opp-body-val" style="color:${cropInfo.color}">${Math.round(gapVal).toLocaleString()} ลบ.</span>
          </div>
          ${formulas.map((f) => `
            <div class="pt-opp-formula-row">
              <span class="pt-product-badge">${f.code}</span>
              <span class="pt-opp-formula-desc">${f.desc}</span>
            </div>
          `).join('')}
        </div>
        <div class="pt-opp-stats">
          <div class="ds-info-row">
            <span class="ds-info-label">พื้นที่เป้าหมาย</span>
            <span class="ds-info-val">${provCount} จังหวัด</span>
          </div>
          <div class="ds-info-row">
            <span class="ds-info-label">เกษตรกรเข้าถึง</span>
            <span class="ds-info-val">${(provCount * 3200).toLocaleString()} ราย</span>
          </div>
          <div class="ds-info-row">
            <span class="ds-info-label">ช่วงแนะนำ</span>
            <span class="ds-info-val pt-opp-season">${seasonStart} – ${seasonEnd} ${now.getFullYear() + 543}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/** Placeholder for campaign creation flow. */
function createCampaign() {
  alert('เปิดระบบสร้างแคมเปญโฆษณา\n(ฟีเจอร์นี้จะเชื่อมต่อกับ Ad Platform)');
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

  // ── Farmer heatmap mode ───────────────────────────────────────────────────
  if (farmerMode) {
    const thaiName = EN_TO_TH_PROVINCE[provName] || provName;
    const data     = PROVINCE_FARMER_STATS[thaiName];
    const farmers  = data ? data.farmers : null;
    let level = null;
    if (farmers >= 50000)      level = 4;
    else if (farmers >= 20000) level = 3;
    else if (farmers >= 5000)  level = 2;
    else if (farmers)          level = 1;
    const show   = farmerDensityFilter === null || farmerDensityFilter === level;
    const color  = farmerHeatmapColor(show ? farmers : null);
    const opac   = (show && farmers) ? 0.80 : 0.18;
    const stroke = isDark ? '#0f172a' : '#94a3b8';
    return {fillColor: color, fillOpacity: opac, color: stroke, weight: 0.7, opacity: 0.8};
  }

  // ── Potential heatmap mode ─────────────────────────────────────────────
  if (potentialMode) {
    const ptData = getProvPotential(provName);
    const marketVal = ptData ? ptData.market : null;

    // Crop filter: dim provinces not growing the selected crop
    let cropMatch = true;
    if (potentialCrop !== 'all' && ptData) {
      cropMatch = ptData.crops.includes(potentialCrop);
    }

    // Level filter
    let levelMatch = true;
    if (potentialLevel !== null && ptData) {
      levelMatch = getPotentialLevel(marketVal) === potentialLevel;
    }

    const show = cropMatch && levelMatch && ptData;
    const color = potentialColor(show ? marketVal : null);
    const opacity = show ? 0.88 : 0.18;
    const strokeColor = isDark ? '#1c1917' : '#d6d3d1';

    return {fillColor: color, fillOpacity: opacity, color: strokeColor, weight: 0.7, opacity: 0.8};
  }

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

// ── Farmer Mode ──────────────────────────────────────────────────────────────

/**
 * Returns grey heatmap fill color based on farmer headcount.
 * @param {?number} farmers Farmer count or null for no data.
 * @return {string} Hex color.
 */
function farmerHeatmapColor(farmers) {
  if (!farmers) return '#f1f5f9';
  if (farmers >= 50000) return '#64748b';
  if (farmers >= 20000) return '#94a3b8';
  if (farmers >= 5000)  return '#b8c4ce';
  return '#dae2ea';
}

/** Activates the Farmer heatmap mode. */
function enterFarmerMode() {
  farmerMode = true;
  farmerCropFilter = 'all';
  farmerDensityFilter = null;
  farmerViewMode = 'map';

  const dealerPane = document.getElementById('fsDealerPane');
  const ptPane     = document.getElementById('fsPotentialPane');
  const fmPane     = document.getElementById('fsFarmerPane');
  if (dealerPane) dealerPane.style.display = 'none';
  if (ptPane)     ptPane.style.display     = 'none';
  if (fmPane)     fmPane.style.display     = '';

  const dealerContent = document.getElementById('dsDealerContent');
  const ptContent     = document.getElementById('dsPotentialPane');
  const fmContent     = document.getElementById('dsFarmerContent');
  if (dealerContent) dealerContent.style.display = 'none';
  if (ptContent)     ptContent.style.display     = 'none';
  if (fmContent)     fmContent.style.display     = '';

  const titleEl = document.querySelector('.ds-title');
  if (titleEl) titleEl.textContent = 'ข้อมูลเกษตรกร';

  // Reset to Map tab
  const tableEl = document.getElementById('mapTableView');
  const mapEl   = document.getElementById('thailand-map');
  if (tableEl) tableEl.style.display = 'none';
  if (mapEl)   mapEl.style.display   = '';
  document.querySelectorAll('.map-tab').forEach((t, i) => {
    t.classList.toggle('map-tab--active', i === 0);
  });

  if (dealerMarkersLayer) dealerMarkersLayer.clearLayers();
  renderFarmerMarkers();
  renderFarmerRightSidebar();

  if (mapInitialized && provinceLayer) provinceLayer.setStyle(styleProvince);
}

/** Deactivates the Farmer heatmap mode and restores dealer view. */
function exitFarmerMode() {
  farmerMode = false;
  farmerCropFilter = 'all';

  const dealerPane = document.getElementById('fsDealerPane');
  const fmPane     = document.getElementById('fsFarmerPane');
  if (dealerPane) dealerPane.style.display = '';
  if (fmPane)     fmPane.style.display     = 'none';

  const dealerContent = document.getElementById('dsDealerContent');
  const fmContent     = document.getElementById('dsFarmerContent');
  if (dealerContent) dealerContent.style.display = '';
  if (fmContent)     fmContent.style.display     = 'none';

  const titleEl = document.querySelector('.ds-title');
  if (titleEl) titleEl.textContent = 'ข้อมูลดีลเลอร์';

  // Reset to Map tab
  const tableEl = document.getElementById('mapTableView');
  const mapEl   = document.getElementById('thailand-map');
  if (tableEl) tableEl.style.display = 'none';
  if (mapEl)   mapEl.style.display   = '';
  document.querySelectorAll('.map-tab').forEach((t, i) => {
    t.classList.toggle('map-tab--active', i === 0);
  });

  if (farmerMarkersLayer) farmerMarkersLayer.clearLayers();
  renderDealerMarkers();

  if (mapInitialized && provinceLayer) provinceLayer.setStyle(styleProvince);
}

/**
 * General Map/Table toggle — works for all page tabs.
 * @param {string} view 'map' | 'table'.
 * @param {!Element} btn Clicked tab button.
 */
function switchMapView(view, btn) {
  document.querySelectorAll('.map-tab').forEach((t) => t.classList.remove('map-tab--active'));
  if (btn) btn.classList.add('map-tab--active');

  const mapEl   = document.getElementById('thailand-map');
  const tableEl = document.getElementById('mapTableView');

  if (view === 'table') {
    if (mapEl)   mapEl.style.display   = 'none';
    if (tableEl) tableEl.style.display = '';
    if (farmerMode) {
      farmerViewMode = 'table';
      renderFarmerTable();
    } else {
      renderDealerTable();
    }
  } else {
    if (mapEl)   mapEl.style.display   = '';
    if (tableEl) tableEl.style.display = 'none';
    if (farmerMode) farmerViewMode = 'map';
    setTimeout(() => { if (leafletMap) leafletMap.invalidateSize(); }, 150);
  }
}

/** Renders dealer list as a sortable table in the map table view. */
function renderDealerTable() {
  const el = document.getElementById('mapTableView');
  if (!el) return;

  const list = DEALERS.slice().sort((a, b) => b.target - a.target);
  el.innerHTML = `
    <table class="fm-table">
      <thead>
        <tr>
          <th class="fm-th-rank">#</th>
          <th>ดีลเลอร์</th>
          <th>โซน</th>
          <th>จังหวัด</th>
          <th>Sales (M)</th>
          <th>เป้า %</th>
          <th>เกษตรกร</th>
        </tr>
      </thead>
      <tbody>
        ${list.map((d, i) => {
          const c = zoneColor(d.zone);
          const pctColor = d.target >= 90 ? '#22c55e' : d.target >= 70 ? '#f59e0b' : '#ef4444';
          return `<tr>
            <td class="fm-td-rank">${i + 1}</td>
            <td class="fm-td-name">${d.name}</td>
            <td><span class="zone-pill" style="background:${c}20;color:${c};border-color:${c}40">${d.zone}</span></td>
            <td class="fm-td-prov">${d.province}</td>
            <td class="fm-td-area">${d.sales.toFixed(1)}</td>
            <td style="font-weight:700;color:${pctColor}">${d.target}%</td>
            <td class="fm-td-prov">${(d.farmers || 0).toLocaleString()}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}

/** Renders the sortable farmer data table. */
function renderFarmerTable() {
  const el = document.getElementById('mapTableView');
  if (!el) return;

  const list = (farmerCropFilter === 'all'
      ? FARMERS
      : FARMERS.filter((f) => f.crop === farmerCropFilter)
  ).slice().sort((a, b) => {
    if (farmerSortField === 'area') return farmerSortAsc ? a.area - b.area : b.area - a.area;
    if (farmerSortField === 'name') {
      return farmerSortAsc ? a.name.localeCompare(b.name, 'th') : b.name.localeCompare(a.name, 'th');
    }
    return 0;
  });

  const ico = (f) => farmerSortField !== f ? ' ↕' : farmerSortAsc ? ' ↑' : ' ↓';

  el.innerHTML = `
    <table class="fm-table">
      <thead>
        <tr>
          <th class="fm-th-rank">#</th>
          <th class="fm-th-sort" onclick="sortFarmerTable('name')">ชื่อ${ico('name')}</th>
          <th>จังหวัด</th>
          <th>พืชหลัก</th>
          <th class="fm-th-sort" onclick="sortFarmerTable('area')">พื้นที่ (ไร่)${ico('area')}</th>
          <th>สถานะ</th>
        </tr>
      </thead>
      <tbody>
        ${list.map((f, i) => {
          const c = f.usesOurFertilizer ? '#f97316' : '#fbbf24';
          return `<tr>
            <td class="fm-td-rank">${i + 1}</td>
            <td class="fm-td-name">${f.name}</td>
            <td class="fm-td-prov">${f.province}</td>
            <td class="fm-td-crop">${f.crop}</td>
            <td class="fm-td-area">${f.area.toLocaleString()}</td>
            <td><span class="fm-status-badge"
              style="background:${c}18;color:${c};border-color:${c}50">
              ${f.usesOurFertilizer ? 'ใช้ปุ๋ยเรา' : 'ยังไม่ใช้'}</span></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}

/**
 * Sorts the farmer table by field.
 * @param {string} field 'area' | 'name'.
 */
function sortFarmerTable(field) {
  if (farmerSortField === field) {
    farmerSortAsc = !farmerSortAsc;
  } else {
    farmerSortField = field;
    farmerSortAsc = false;
  }
  renderFarmerTable();
}

/**
 * Filters the heatmap to a farmer density band and dims others.
 * @param {?number} level 1-4 or null for all.
 */
function filterFarmerDensity(level) {
  farmerDensityFilter = farmerDensityFilter === level ? null : level;
  document.querySelectorAll('.fm-density-row').forEach((r, i) => {
    r.classList.toggle('fm-density-row--active', farmerDensityFilter === (4 - i));
  });
  if (mapInitialized && provinceLayer) provinceLayer.setStyle(styleProvince);
}

/** Renders farmer circle markers on the Leaflet map. */
function renderFarmerMarkers() {
  if (!leafletMap) return;
  if (!farmerMarkersLayer) {
    farmerMarkersLayer = L.layerGroup().addTo(leafletMap);
  } else {
    farmerMarkersLayer.clearLayers();
  }

  const list    = farmerCropFilter === 'all' ? FARMERS : FARMERS.filter((f) => f.crop === farmerCropFilter);
  const maxArea = Math.max(...FARMERS.map((f) => f.area));

  list.forEach((farmer) => {
    const coords = PROVINCE_COORDS[farmer.province];
    if (!coords) return;

    const seed = farmer.name.charCodeAt(0) + (farmer.name.charCodeAt(2) || 0);
    const lat  = coords[0] + ((seed % 11) - 5) * 0.022;
    const lng  = coords[1] + ((seed % 9)  - 4) * 0.022;

    const radius = 4 + (farmer.area / maxArea) * 13;
    const fill   = farmer.usesOurFertilizer ? '#f97316' : '#fbbf24';
    const stroke = farmer.usesOurFertilizer ? '#ea580c' : '#d97706';

    const marker = L.circleMarker([lat, lng], {radius, fillColor: fill, color: stroke, weight: 1.5, fillOpacity: 0.85});

    marker.bindTooltip(`
      <div style="font-family:'Sarabun',sans-serif;min-width:155px;font-size:12px">
        <div style="font-weight:700;margin-bottom:3px">${farmer.name}</div>
        <div style="color:#888;font-size:11px">${farmer.province} · ${farmer.crop}</div>
        <div style="margin-top:3px">พื้นที่: <b>${farmer.area.toLocaleString()} ไร่</b></div>
        <div style="margin-top:2px">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;
            background:${fill};margin-right:3px;vertical-align:middle"></span>
          ${farmer.usesOurFertilizer ? 'ใช้ปุ๋ยเรา' : 'ยังไม่ได้ใช้ปุ๋ยเรา'}
        </div>
      </div>`, {sticky: true});

    farmerMarkersLayer.addLayer(marker);
  });
}

/**
 * Filters farmer crop and refreshes right sidebar + markers.
 * @param {string} crop Crop name or 'all'.
 */
function filterFarmerCrop(crop) {
  farmerCropFilter = crop;
  renderFarmerMarkers();
  renderFarmerRightSidebar();
}

/** Renders all right-sidebar farmer content. */
function renderFarmerRightSidebar() {
  renderFmZoneCard();
  renderFmKpis();
  renderFmBarChart();
  renderFmCropDonut();
  renderFmSaleVsHead();
}

/** Renders the zone header card. */
function renderFmZoneCard() {
  const el = document.getElementById('fmZoneCard');
  if (!el) return;

  const allStats     = Object.values(PROVINCE_FARMER_STATS);
  const totalFarmers = allStats.reduce((s, d) => s + d.farmers, 0);
  const totalUsers   = allStats.reduce((s, d) => s + d.users, 0);
  const msPct        = Math.round(totalUsers / totalFarmers * 100);
  const salesEst     = (totalFarmers * 0.00485).toFixed(1);

  el.innerHTML = `
    <div class="ds-dealer-card">
      <div class="ds-zone-badge" style="background:#f97316;font-size:11px;min-width:36px;letter-spacing:0">ALL</div>
      <div class="ds-dealer-info">
        <div class="ds-dealer-name">รวมทุกเซต</div>
        <div class="ds-dealer-sales" style="color:#f97316">Sales ${salesEst}M | ${msPct}% target</div>
      </div>
    </div>`;
}

/** Populates the KPI stat cards and inline info row. */
function renderFmKpis() {
  const allStats  = Object.values(PROVINCE_FARMER_STATS);
  const totalF    = allStats.reduce((s, d) => s + d.farmers, 0);
  const totalU    = allStats.reduce((s, d) => s + d.users, 0);
  const nonUsers  = totalF - totalU;
  const msPct     = Math.round(totalU / totalF * 100);
  const totalArea = allStats.reduce((s, d) => s + d.area, 0);
  const userArea  = allStats.reduce((s, d) => s + d.area * (d.users / d.farmers), 0);
  const msSales   = Math.round(userArea / totalArea * 100);
  const fmtM      = (n) => n >= 1000000 ? (n / 1000000).toFixed(1) + 'M' : Math.round(n / 1000) + 'K';
  const provCount = Object.keys(PROVINCE_FARMER_STATS).length;

  const set = (id, txt) => { const e = document.getElementById(id); if (e) e.textContent = txt; };

  set('fmStatTotal',    fmtM(totalF));
  set('fmStatUsers',    fmtM(totalU));
  set('fmStatNonUsers', fmtM(nonUsers));
  set('fmStatCoverage', msPct + '%');
  set('fmProvCount',    'จังหวัด ' + provCount);
  set('fmDistCount',    'อำเภอ ' + Math.round(provCount * 1.24));
  set('fmAreaInfo',     (userArea / 1000000).toFixed(0) + '/' + (totalArea / 1000000).toFixed(0) + ' ล.ไร่');
  set('fmMsHead',       msPct + '%');
  set('fmMsHeadSub',    fmtM(totalU) + '/' + fmtM(totalF) + ' ราย');
  set('fmMsSales',      msSales + '%');
  set('fmMsSalesSub',   (userArea / 1000000).toFixed(1) + '/' + (totalArea / 1000000).toFixed(1) + ' ล.ไร่');
}

/** Renders the grouped bar chart (headcount vs sales MS by province or zone). */
function renderFmBarChart() {
  const el = document.getElementById('fmBarChart');
  if (!el) return;

  const CHART_H = 110;
  let groups;

  if (farmerBarChartMode === 'province') {
    groups = Object.entries(PROVINCE_FARMER_STATS)
        .sort((a, b) => b[1].farmers - a[1].farmers)
        .slice(0, 5)
        .map(([name, d]) => {
          const headPct  = Math.round(d.users / d.farmers * 100);
          const salesPct = Math.min(100, Math.round(headPct * 1.12));
          return {
            name: name.length > 5 ? name.slice(0, 4) + '…' : name,
            headPct, salesPct, gap: Math.round((100 - headPct) * 0.55),
          };
        });
  } else {
    groups = ZONES.map((z) => {
      const ps    = z.provinces.map((p) => PROVINCE_FARMER_STATS[p]).filter(Boolean);
      const tf    = ps.reduce((s, d) => s + d.farmers, 0);
      const tu    = ps.reduce((s, d) => s + d.users, 0);
      const headPct  = tf ? Math.round(tu / tf * 100) : 0;
      const salesPct = Math.min(100, Math.round(headPct * 1.12));
      return {name: z.id, headPct, salesPct, gap: Math.round((100 - headPct) * 0.55)};
    }).sort((a, b) => b.headPct - a.headPct).slice(0, 5);
  }

  const glHtml = [0, 25, 50, 75, 100].map((pct) => {
    const b = (pct / 100 * CHART_H).toFixed(1);
    return `<div class="pt-gl" style="bottom:${b}px"><span class="pt-gl-label">${pct}</span></div>`;
  }).join('');

  const barsHtml = groups.map((g) => {
    const hH = Math.max(2, (g.headPct  / 100) * CHART_H).toFixed(1);
    const hS = Math.max(2, (g.salesPct / 100) * CHART_H).toFixed(1);
    const hG = Math.max(2, (g.gap      / 100) * CHART_H).toFixed(1);
    return `
      <div class="pt-bar-group">
        <div class="pt-bar-top-label" style="bottom:${(+hH + 3).toFixed(0)}px">${g.headPct}%</div>
        <div class="pt-bar-trio">
          <div class="ptb" style="height:${hH}px;background:#f97316"></div>
          <div class="ptb" style="height:${hS}px;background:#fb923c"></div>
          <div class="ptb ptb--gap" style="height:${hG}px"></div>
        </div>
        <div class="pt-bar-name">${g.name}</div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="pt-chart-canvas" style="height:${CHART_H}px">
      <div class="pt-chart-gls">${glHtml}</div>
      <div class="pt-chart-bars">${barsHtml}</div>
    </div>`;
}

/**
 * Switches the farmer bar chart between province and zone grouping.
 * @param {string} mode 'province' | 'zone'.
 */
function switchFmBarChart(mode) {
  farmerBarChartMode = mode;
  const p = document.getElementById('fmToggleProv');
  const z = document.getElementById('fmToggleZone');
  if (p) p.classList.toggle('pt-toggle-btn--active', mode === 'province');
  if (z) z.classList.toggle('pt-toggle-btn--active', mode === 'zone');
  renderFmBarChart();
}

/** Renders the crop distribution donut chart. */
function renderFmCropDonut() {
  const svgEl    = document.getElementById('fmDonutSvg');
  const legendEl = document.getElementById('fmDonutLegend');
  if (!svgEl || !legendEl) return;

  const cropCount = {};
  Object.values(PROVINCE_FARMER_STATS).forEach((d) => {
    if (d.crops[0]) cropCount[d.crops[0]] = (cropCount[d.crops[0]] || 0) + d.farmers;
  });

  const total  = Object.values(cropCount).reduce((s, v) => s + v, 0);
  const sorted = Object.entries(cropCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const items  = sorted.map(([name, count]) => ({
    name,
    pct:   Math.round(count / total * 100),
    color: PT_CROPS.find((c) => c.id === name)?.color || '#94a3b8',
  }));

  const topPct = items.reduce((s, c) => s + c.pct, 0);
  if (topPct < 100) items.push({name: 'อื่นๆ', pct: 100 - topPct, color: '#e2e8f0'});

  const cx = 50, cy = 50, r = 34, sw = 14;
  const circ = 2 * Math.PI * r;
  let rot = -90;

  svgEl.innerHTML = items.map((item) => {
    const dash = (item.pct / 100) * circ;
    const path = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
      stroke="${item.color}" stroke-width="${sw}"
      stroke-dasharray="${dash.toFixed(2)} ${(circ - dash).toFixed(2)}"
      transform="rotate(${rot} ${cx} ${cy})"/>`;
    rot += (item.pct / 100) * 360;
    return path;
  }).join('');

  legendEl.innerHTML = items.map((item) => `
    <div class="fm-donut-legend-item">
      <div class="fm-donut-dot" style="background:${item.color}"></div>
      <span class="fm-donut-label">${item.name} ${item.pct}%</span>
    </div>`).join('');
}

/** Renders Sale VS Headcount bars per top crop. */
function renderFmSaleVsHead() {
  const el = document.getElementById('fmSaleVsHead');
  if (!el) return;

  const cropMap = {};
  FARMERS.forEach((f) => {
    if (!cropMap[f.crop]) cropMap[f.crop] = {total: 0, users: 0, totalArea: 0, userArea: 0};
    cropMap[f.crop].total++;
    cropMap[f.crop].totalArea += f.area;
    if (f.usesOurFertilizer) { cropMap[f.crop].users++; cropMap[f.crop].userArea += f.area; }
  });

  const crops = Object.entries(cropMap)
      .map(([name, d]) => ({
        name,
        headPct:  Math.round(d.users / d.total * 100),
        salesPct: Math.round(d.userArea / d.totalArea * 100),
      }))
      .sort((a, b) => b.headPct - a.headPct)
      .slice(0, 4);

  const checkSvg = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
  const warnSvg  = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>`;

  el.innerHTML = crops.map((c) => {
    const isGood = c.headPct >= 80;
    const isBad  = c.headPct < 50;
    const hColor = isGood ? '#22c55e' : isBad ? '#ef4444' : '#f59e0b';
    const lbl    = c.name.length > 8 ? c.name.slice(0, 7) + '…' : c.name;
    return `
      <div class="fm-svh-group">
        <div class="fm-svh-header">
          <span class="fm-svh-crop-name">${lbl}</span>
          <span class="fm-svh-badge" style="color:${hColor}">${isGood ? checkSvg : warnSvg} ${c.headPct}%</span>
        </div>
        <div class="fm-svh-row">
          <span class="fm-svh-row-label">MS by sales</span>
          <div class="fm-svh-bar-wrap"><div class="fm-svh-bar" style="width:${c.salesPct}%;background:#22c55e"></div></div>
          <span class="fm-svh-pct">${c.salesPct}%</span>
        </div>
        <div class="fm-svh-row">
          <span class="fm-svh-row-label">MS by headcount</span>
          <div class="fm-svh-bar-wrap"><div class="fm-svh-bar" style="width:${c.headPct}%;background:${hColor}"></div></div>
          <span class="fm-svh-pct" style="color:${hColor}">${c.headPct}%</span>
        </div>
      </div>`;
  }).join('');
}

// ── Init ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  buildFsZoneRows();
  filterZone('all');
  initMap();
});
