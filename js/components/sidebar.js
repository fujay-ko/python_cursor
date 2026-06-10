function buildSidebar() {
  const container = document.getElementById('sidebar-inner');
  let currentPhase = '';
  LESSONS.forEach(L=>{
    if(L.phase !== currentPhase){
      currentPhase = L.phase;
      const ph = document.createElement('div');
      ph.className = 'sidebar-phase';
      ph.textContent = L.phase.replace('第','').replace('階段：','· ');
      container.appendChild(ph);
    }
    const a = document.createElement('button');
    a.className = 'sidebar-item' + (isDone(L.id)?' completed':'');
    a.id = 'si-'+L.id;
    a.innerHTML = `<span class="sidebar-num">${L.id}</span><span>${L.title}</span><span class="done-dot"></span>`;
    a.onclick = ()=>{
      document.getElementById('card-'+L.id).scrollIntoView({behavior:'smooth',block:'start'});
      openCard(L.id);
    };
    container.appendChild(a);
  });
}
