function buildCodeCard(fname, actionsHTML, bodyHTML, outputWrapHTML) {
  return `<div class="code-card">
    <div class="code-topbar">
      <div class="mac-dots">
        <div class="mac-dot mac-dot-r"></div>
        <div class="mac-dot mac-dot-y"></div>
        <div class="mac-dot mac-dot-g"></div>
      </div>
      <span class="code-fname">${fname}</span>
      <div class="code-actions">${actionsHTML}</div>
    </div>
    ${bodyHTML}
    ${outputWrapHTML||''}
  </div>`;
}

function buildCodePre(code) {
  return `<pre class="code-display">${escHtml(code)}</pre>`;
}

function buildCodeTextarea(id, prefix, placeholder, extraClass) {
  return `<textarea class="code-input${extraClass?' '+extraClass:''}" id="${prefix}-${id}" placeholder="${escHtml(placeholder)}"></textarea>`;
}
