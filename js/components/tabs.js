function switchTab(id, tab) {
  const body = document.getElementById('body-'+id);
  body.querySelectorAll('.tab-content').forEach(el=>el.classList.remove('active'));
  body.querySelectorAll('.tab-btn').forEach(el=>el.classList.remove('active'));
  document.getElementById(`tab-${tab}-${id}`).classList.add('active');
  const idx = {concept:0,trace:1,fill:2,challenge:3}[tab];
  body.querySelectorAll('.tab-btn')[idx].classList.add('active');
  const firstFocusable = body.querySelector(`#tab-${tab}-${id}`).querySelector('button, input, textarea, [tabindex]:not([tabindex="-1"])');
  if(firstFocusable) firstFocusable.focus();
}

function buildTabBar(id) {
  return `<div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab('${id}','concept')">📖 概念</button>
    <button class="tab-btn" onclick="switchTab('${id}','trace')">🔍 追蹤</button>
    <button class="tab-btn" onclick="switchTab('${id}','fill')">✏️ 填空</button>
    <button class="tab-btn" onclick="switchTab('${id}','challenge')">💡 挑戰</button>
  </div>`;
}

function buildConceptTab(L, color) {
  const keyPointsHtml = L.key_points.map(([title,body])=>`
    <div class="key-point" style="border-left-color:${color};">
      <div class="key-point-title">${escHtml(title)}</div>
      <div class="key-point-body">${escHtml(body)}</div>
    </div>`).join('');
  return `<div class="tab-content active" id="tab-concept-${L.id}">
    <div class="section-label"><span class="step-badge">①</span> 概念說明（先讀這裡）</div>
    <div class="concept-text">${escHtml(L.concept_explain)}</div>
    <div class="key-point-list">${keyPointsHtml}</div>
  </div>`;
}

function buildTraceTab(L) {
  return `<div class="tab-content" id="tab-trace-${L.id}">
    <div class="section-label"><span class="step-badge">②</span> 追蹤版（直接執行，看程式怎麼跑）</div>
    ${buildCodeCard(
      `trace_${L.id}.py`,
      `<button class="btn btn-run" id="btn-trace-${L.id}" onclick="runTrace('${L.id}')">${RUN_ICON} 執行追蹤版</button>`,
      buildCodePre(L.trace_code),
      buildOutputPanel(L.id, 'trace')
    )}
  </div>`;
}

function buildFillTab(L) {
  return `<div class="tab-content" id="tab-fill-${L.id}">
    <div class="section-label"><span class="step-badge">③</span> 填空版（點空格輸入答案，? 可看提示）</div>
    <div class="hint-box">💬 整體提示：${escHtml(L.hint)}</div>
    <div class="input-section">
      <div class="input-label">📥 測試輸入</div>
      <textarea class="code-input" id="stdin-fill-${L.id}" rows="3">${escHtml(L.default_input)}</textarea>
    </div>
    ${buildCodeCard(
      `fill_in_${L.id}.py`,
      `<button class="btn btn-ghost" onclick="resetBlanks('${L.id}')">重置</button>
       <button class="btn btn-check" onclick="checkBlanks('${L.id}')">✓ 檢查</button>
       <button class="btn btn-run" id="btn-fill-${L.id}" onclick="runFill('${L.id}')">${RUN_ICON} 執行</button>`,
      `<div class="skeleton-code" id="sk-${L.id}">${buildSkeleton(L.skeleton, L.skeleton_answers)}</div>`,
      buildOutputPanel(L.id, 'fill')
    )}
    <div class="check-result" id="check-result-${L.id}"></div>
  </div>`;
}

function buildChallengeTab(L) {
  return `<div class="tab-content" id="tab-challenge-${L.id}">
    <div class="section-label"><span class="step-badge">④</span> 自我挑戰（自己從空白開始寫）</div>
    <div class="hint-box">🎯 ${escHtml(L.challenge_hint)}</div>
    <div class="input-section">
      <div class="input-label">📥 測試輸入</div>
      <textarea class="code-input" id="stdin-chal-${L.id}" rows="3">${escHtml(L.default_input)}</textarea>
    </div>
    ${buildCodeCard(
      `challenge_${L.id}.py`,
      `<button class="btn btn-ghost" onclick="clearChallenge('${L.id}')">清除</button>
       <button class="btn btn-done" onclick="markDone('${L.id}')">✓ 完成</button>
       <button class="btn btn-run" id="btn-chal-${L.id}" onclick="runChallenge('${L.id}')">${RUN_ICON} 執行</button>`,
      buildCodeTextarea(L.id, 'chal', '在這裡寫你的程式...', 'challenge-editor'),
      buildOutputPanel(L.id, 'chal')
    )}
  </div>`;
}
