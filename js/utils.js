function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
const RUN_ICON = `<svg viewBox="0 0 12 12"><path d="M2 1l9 5-9 5V1z"/></svg>`;

function buildPhaseColor(phase) {
  const map = {
    '第一階段：基本運算':'#9198a1',
    '第二階段：條件判斷':'#a371f7',
    '第三階段：for 迴圈':'#3fb950',
    '第四階段：while 迴圈':'#d29922',
    '第五階段：陣列':'#58a6ff',
    '第六階段：進階整合':'#f85149',
  };
  return map[phase]||'#9198a1';
}

const PHASE_EMOJI = {
  '第一階段：基本運算':'🔘','第二階段：條件判斷':'🟣','第三階段：for 迴圈':'🟢',
  '第四階段：while 迴圈':'🟡','第五階段：陣列':'🔵','第六階段：進階整合':'🔴',
};
