function showOutput(wrapId, bodyId, out, err, expectedOutput='') {
  const wrap = document.getElementById(wrapId);
  const body = document.getElementById(bodyId);
  if(!wrap||!body) return;
  wrap.style.display = 'block';
  if(err){
    body.className = 'output-body err';
    body.textContent = out;
  } else if(expectedOutput && out.trim() === expectedOutput.trim()){
    body.className = 'output-body ok';
    body.textContent = out + '\n\n✅ 輸出正確！';
  } else {
    body.className = 'output-body';
    body.textContent = out;
  }
}

function handleExpectedOutput(id, output, outputBodyId) {
  if(output === null) return;
  const L = LESSONS.find(x=>x.id===id);
  const body = document.getElementById(outputBodyId);
  if(output.trim() === L.expected_output.trim()){
    body.className='output-body ok';
    body.textContent = output + '\n\n✅ 輸出正確！';
  }
}

function buildOutputPanel(id, prefix) {
  return `<div class="output-wrap" id="out-wrap-${prefix}-${id}" style="display:none;">
    <div class="output-header">▶ 輸出結果</div>
    <div class="output-body empty" id="out-${prefix}-${id}">（點「執行」看結果）</div>
  </div>`;
}
