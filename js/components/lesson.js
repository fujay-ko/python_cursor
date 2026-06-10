function buildLessonCard(L) {
  const color = buildPhaseColor(L.phase);
  return `<div class="lesson-card" id="card-${L.id}" data-phase="${escHtml(L.phase)}">
    <div class="lesson-header" id="hdr-${L.id}" onclick="toggleCard('${L.id}')">
      <div class="lesson-num" style="color:${color};">${L.id}</div>
      <div class="lesson-info">
        <div class="lesson-title">${escHtml(L.title)}</div>
        <div class="lesson-meta">${escHtml(L.phase)} ｜ ${escHtml(L.source)} ｜ <span style="font-family:'JetBrains Mono',monospace;font-size:11px;">${escHtml(L.concept)}</span></div>
      </div>
      <span class="completed-badge">✓ 完成</span>
      <button class="expand-btn">展開 ▼</button>
    </div>
    <div class="lesson-body" id="body-${L.id}">
      ${buildTabBar(L.id)}
      ${buildConceptTab(L, color)}
      ${buildTraceTab(L)}
      ${buildFillTab(L)}
      ${buildChallengeTab(L)}
    </div>
  </div>`;
}

function toggleCard(id) {
  const body = document.getElementById('body-'+id);
  const hdr  = document.getElementById('hdr-'+id);
  const btn  = hdr.querySelector('.expand-btn');
  const isOpen = body.classList.contains('open');
  if(isOpen){
    body.classList.remove('open');
    hdr.classList.remove('open');
    btn.textContent = '展開 ▼';
  } else {
    body.classList.add('open');
    hdr.classList.add('open');
    btn.textContent = '收合 ▲';
  }
}

function openCard(id) {
  const body = document.getElementById('body-'+id);
  const hdr  = document.getElementById('hdr-'+id);
  const btn  = hdr.querySelector('.expand-btn');
  body.classList.add('open');
  hdr.classList.add('open');
  btn.textContent = '收合 ▲';
}
