const STORAGE_KEY = 'py_learn_progress';

function getProgress() {
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); }
  catch{ return {}; }
}

function setDone(id) {
  const p = getProgress();
  p[id] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  updateProgressUI();
}

function isDone(id) { return !!getProgress()[id]; }

function updateProgressUI() {
  const p = getProgress();
  const done = Object.keys(p).filter(k=>p[k]).length;
  const total = LESSONS.length;
  document.getElementById('progress-stats').textContent = `${done} / ${total} 完成`;
  document.getElementById('progress-bar').style.width = `${(done/total)*100}%`;
  LESSONS.forEach(L=>{
    const card = document.getElementById('card-'+L.id);
    const si   = document.getElementById('si-'+L.id);
    if(isDone(L.id)){
      card && card.classList.add('completed');
      si   && si.classList.add('completed');
    }
  });
}
