// ── 填空檢查 ──────────────────────────────────────
function checkBlanks(id) {
  const L = LESSONS.find(l=>l.id===id);
  const skEl = document.getElementById('sk-'+id);
  const blanks = skEl.querySelectorAll('.blank');
  const answers = L.skeleton_answers || [];
  const resultEl = document.getElementById('check-result-'+id);
  let allFilled = true, correctCount = 0;
  blanks.forEach((b, i)=>{
    const val = b.value.trim();
    if(!val){ allFilled = false; b.classList.add('wrong'); return; }
    const expected = (answers[i]||'').trim();
    if(expected && val === expected){
      b.classList.add('correct'); b.classList.remove('wrong'); correctCount++;
    } else if(expected){
      b.classList.add('wrong'); b.classList.remove('correct');
    }
  });
  resultEl.style.display = 'block';
  if(!allFilled){
    resultEl.className = 'check-result check-warn';
    resultEl.textContent = '⚠️ 還有空格沒填！';
  } else if(correctCount === answers.filter(a=>a).length){
    resultEl.className = 'check-result check-ok';
    resultEl.textContent = '✅ 所有空格填對了！按「執行」確認輸出正確。';
  } else {
    resultEl.className = 'check-result check-warn';
    resultEl.textContent = `💡 還有空格不對（紅色的重新想想）。提示：${L.hint}`;
  }
}

function resetBlanks(id) {
  const skEl = document.getElementById('sk-'+id);
  skEl.querySelectorAll('.blank').forEach(b=>{
    b.value = '';
    b.classList.remove('correct','wrong');
  });
  document.querySelectorAll(`#sk-${id} .hint-popup.show`).forEach(p=>{
    p.classList.remove('show');
    p.previousElementSibling && p.previousElementSibling.classList.remove('shown');
  });
  document.getElementById('check-result-'+id).style.display = 'none';
  const outWrap = document.getElementById('out-wrap-fill-'+id);
  if(outWrap){ outWrap.style.display='none'; }
}

function clearChallenge(id) {
  document.getElementById('chal-'+id).value = '';
  const outWrap = document.getElementById('out-wrap-chal-'+id);
  if(outWrap){ outWrap.style.display='none'; }
}

function markDone(id) {
  setDone(id);
  const si = document.getElementById('si-'+id);
  si && si.classList.add('completed');
}

// ── 執行函式 ──────────────────────────────────────
async function runTrace(id) {
  const btn = document.getElementById(`btn-trace-${id}`);
  btn.disabled=true; btn.innerHTML='⏳ 執行中...';
  const L = LESSONS.find(x=>x.id===id);
  const result = await runPython(L.trace_code, '', `out-trace-${id}`);
  document.getElementById(`out-wrap-trace-${id}`).style.display = 'block';
  btn.disabled=false; btn.innerHTML=`${RUN_ICON} 執行追蹤版`;
}

async function runFill(id) {
  const btn = document.getElementById(`btn-fill-${id}`);
  btn.disabled=true; btn.innerHTML='⏳ 執行中...';
  const L = LESSONS.find(x=>x.id===id);
  const blanks = document.getElementById(`sk-${id}`).querySelectorAll('.blank');
  let hasEmpty = false;
  blanks.forEach(b=>{ if(!b.value.trim()) hasEmpty=true; });
  if(hasEmpty){
    document.getElementById(`out-wrap-fill-${id}`).style.display = 'block';
    const body = document.getElementById(`out-fill-${id}`);
    body.className='output-body err';
    body.textContent='⚠️ 還有空格沒填！請先把所有框框填完再執行。';
    btn.disabled=false; btn.innerHTML=`${RUN_ICON} 執行`;
    return;
  }
  let code = L.skeleton;
  blanks.forEach(b=>{ code = code.replace('___', b.value.trim()); });
  const stdin = document.getElementById(`stdin-fill-${id}`).value;
  const output = await runPython(code, stdin, `out-fill-${id}`);
  document.getElementById(`out-wrap-fill-${id}`).style.display = 'block';
  handleExpectedOutput(id, output, `out-fill-${id}`);
  btn.disabled=false; btn.innerHTML=`${RUN_ICON} 執行`;
}

async function runChallenge(id) {
  const btn = document.getElementById(`btn-chal-${id}`);
  btn.disabled=true; btn.innerHTML='⏳ 執行中...';
  const L = LESSONS.find(x=>x.id===id);
  const code = document.getElementById(`chal-${id}`).value;
  if(!code.trim()){
    document.getElementById(`out-wrap-chal-${id}`).style.display = 'block';
    const body = document.getElementById(`out-chal-${id}`);
    body.className='output-body err';
    body.textContent='程式是空的，請先寫程式！';
    btn.disabled=false; btn.innerHTML=`${RUN_ICON} 執行`;
    return;
  }
  const stdin = document.getElementById(`stdin-chal-${id}`).value;
  const output = await runPython(code, stdin, `out-chal-${id}`);
  document.getElementById(`out-wrap-chal-${id}`).style.display = 'block';
  handleExpectedOutput(id, output, `out-chal-${id}`);
  btn.disabled=false; btn.innerHTML=`${RUN_ICON} 執行`;
}

// ── 初始化 ────────────────────────────────────────
function init() {
  buildFilters();
  const wrap = document.getElementById('lessons-wrap');
  LESSONS.forEach(L=>{ wrap.insertAdjacentHTML('beforeend', buildLessonCard(L)); });
  buildSidebar();
  updateProgressUI();
  document.querySelectorAll('.btn-run').forEach(b=>b.disabled=true);
}

init();
