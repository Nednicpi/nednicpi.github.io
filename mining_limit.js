// === VQI GLOBAL - ANTI BAN PLAYSTORE 10 MENIT/HARI ===
const DAILY_LIMIT = 10 * 60 * 1000; // 10 menit = 600.000 ms
let todayStr = new Date().toDateString();
let lastDay = localStorage.getItem('vqi_day');
let usedToday = parseInt(localStorage.getItem('vqi_used') || '0');
let blocksToday = parseInt(localStorage.getItem('vqi_blocks_today') || '0');

if(lastDay !== todayStr){
  localStorage.setItem('vqi_day', todayStr);
  localStorage.setItem('vqi_used', '0');
  localStorage.setItem('vqi_blocks_today', '0');
  usedToday = 0; blocksToday = 0;
}

let mineStart = null;
let mineTimer = null;

function updateTimerUI(){
  let total = usedToday + (mineStart ? Date.now() - mineStart : 0);
  let sisa = DAILY_LIMIT - total;
  if(sisa < 0) sisa = 0;
  let m = Math.floor(sisa/60000);
  let s = Math.floor((sisa%60000)/1000);
  let el = document.getElementById('dailyTimer');
  if(el) el.innerText = `⏱️ Sisa Mining Hari Ini: ${m}:${String(s).padStart(2,'0')} / 10:00 | Blok Hari Ini: ${blocksToday}`;
  if(sisa <= 0){
    stopDailyMining();
    alert('⛔ JATAH 10 MENIT HARI INI HABIS!\nPlay Store Compliant: Mining dibatasi 10 menit/hari.\nBesok reset jam 00:00');
    document.getElementById('mineBtn').disabled = true;
    document.getElementById('mineBtn').innerText = '❌ LIMIT 10 MENIT HABIS - BESOK LAGI';
  }
}

function startDailyMining(){
  if(usedToday >= DAILY_LIMIT){
    alert('Jatah habis hari ini!');
    return false;
  }
  mineStart = Date.now();
  mineTimer = setInterval(updateTimerUI, 1000);
  return true;
}

function stopDailyMining(){
  if(mineStart){
    usedToday += Date.now() - mineStart;
    localStorage.setItem('vqi_used', usedToday);
    clearInterval(mineTimer);
    mineStart = null;
  }
}

// Panggil ini setiap berhasil mine 1 blok
function onBlockFound(){
  blocksToday++;
  localStorage.setItem('vqi_blocks_today', blocksToday);
  stopDailyMining(); // stop dulu, nanti start lagi kalau user klik MINE lagi
  // lanjutkan mining kamu yang lama di sini...
}
