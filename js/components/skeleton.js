function buildSkeleton(skeletonCode, answers) {
  const parts = skeletonCode.split('___');
  let html = '';
  parts.forEach((p, i)=>{
    html += escHtml(p);
    if(i < parts.length - 1){
      const hint = (answers && answers[i]) ? answers[i] : null;
      if(hint){
        html += `<span class="blank-wrap">`;
        html += `<input type="text" class="blank" data-idx="${i}" autocomplete="off" placeholder="___">`;
        html += `<span class="hint-btn" onclick="toggleHint(this,'${escHtml(hint)}')">?</span>`;
        html += `<span class="hint-popup"></span>`;
        html += `</span>`;
      } else {
        html += `<input type="text" class="blank" data-idx="${i}" autocomplete="off" placeholder="___">`;
      }
    }
  });
  return html;
}

function toggleHint(btn, hintText) {
  const popup = btn.nextElementSibling;
  const shown = popup.classList.contains('show');
  document.querySelectorAll('.hint-popup.show').forEach(p=>{
    p.classList.remove('show');
    p.previousElementSibling && p.previousElementSibling.classList.remove('shown');
  });
  if(!shown){
    popup.textContent = '💡 ' + hintText;
    popup.classList.add('show');
    btn.classList.add('shown');
  }
}
