function filterPhase(phase, btn) {
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.lesson-card').forEach(card=>{
    if(phase==='all' || card.dataset.phase===phase){
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function buildFilters() {
  const phases = {};
  LESSONS.forEach(L=>{ phases[L.phase] = (phases[L.phase]||0)+1; });
  const bar = document.getElementById('filter-bar');
  bar.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.textContent = `全部 ${LESSONS.length}`;
  allBtn.onclick = function(){ filterPhase('all',this); };
  bar.appendChild(allBtn);
  Object.entries(phases).forEach(([phase, count])=>{
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    const emoji = PHASE_EMOJI[phase]||'';
    const short = phase.replace(/第.階段：/,'');
    btn.textContent = `${emoji} ${short} ${count}`;
    btn.onclick = function(){ filterPhase(phase,this); };
    bar.appendChild(btn);
  });
}
