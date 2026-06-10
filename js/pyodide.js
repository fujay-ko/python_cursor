let pyodide = null;
let pyodideReady = false;

async function initPyodide() {
  const statusEl = document.getElementById('pyodide-status');
  const msgEl    = document.getElementById('loading-msg');
  try{
    msgEl.textContent = '正在載入 Python 環境...（第一次約需 10-20 秒）';
    pyodide = await loadPyodide();
    pyodideReady = true;
    statusEl.textContent = '✓ Python 就緒';
    statusEl.className = 'ready';
    document.getElementById('loading-screen').classList.add('hidden');
    document.querySelectorAll('.btn-run').forEach(b=>b.disabled=false);
  } catch(e){
    statusEl.textContent = '✗ 載入失敗';
    statusEl.className = 'error';
    msgEl.textContent = '載入失敗，請重新整理頁面或確認網路連線';
  }
}

async function runPython(code, inputStr, outputBodyId) {
  if(!pyodideReady){
    document.getElementById(outputBodyId).textContent = '⏳ Python 還在載入，請稍候...';
    return null;
  }
  const outEl = document.getElementById(outputBodyId);
  outEl.textContent = '執行中...';
  outEl.className = 'output-body';
  try{
    const inputLines = (inputStr||'').split('\n');
    pyodide.globals.set('_input_lines', inputLines);
    await pyodide.runPythonAsync(`
import sys, io, builtins
_buf = io.StringIO()
_lines = list(_input_lines)
_idx = [0]
def _inp(prompt=''):
    if _idx[0] < len(_lines):
        v = _lines[_idx[0]]; _idx[0]+=1
        _buf.write(str(prompt)+str(v)+'\\n')
        return v
    return ''
builtins.input = _inp
sys.stdout = _buf
sys.stderr = _buf
`);
    await pyodide.runPythonAsync(code);
    const out = await pyodide.runPythonAsync('_buf.getvalue()');
    await pyodide.runPythonAsync('sys.stdout=sys.__stdout__;sys.stderr=sys.__stderr__');
    const trimmed = out.trimEnd() || '（無輸出）';
    outEl.textContent = trimmed;
    outEl.className = 'output-body';
    return trimmed;
  } catch(e){
    try{ await pyodide.runPythonAsync('sys.stdout=sys.__stdout__;sys.stderr=sys.__stderr__'); }catch(_){}
    outEl.textContent = e.message.split('\n').slice(-4).join('\n');
    outEl.className = 'output-body err';
    return null;
  }
}
