const fs = require('fs');
let content = fs.readFileSync('Js/main.js', 'utf8');

// 1. Update saveAgentSheet
content = content.replace(/const agents = JSON\.parse[\s\S]*?return agentData;/s,
  `const agents = JSON.parse(localStorage.getItem('todo_agents') || '[]');
    const activeIndex = sessionStorage.getItem('todo_active_agent_index');
    
    if (activeIndex !== null && activeIndex !== '') {
      agentData.createdAt = agents[activeIndex]?.createdAt || agentData.createdAt;
      agents[activeIndex] = agentData;
    } else {
      agents.push(agentData);
    }
    
    localStorage.setItem('todo_agents', JSON.stringify(agents));

    return agentData;`
);

// 2. Add loadSheetForm after resetSheetForm
content = content.replace(/(function resetSheetForm.*?goToSheetStep\(1\);\s*})/s,
  `$1

  function loadSheetForm(agentData) {
    document.querySelectorAll('input[name="origin"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="class"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="org"]').forEach(el => el.checked = false);

    ['agi', 'for', 'int', 'pre', 'vig'].forEach((attr, idx) => {
      const val = parseInt(agentData.attributes?.[attr]) || 0;
      const input = document.getElementById('attr-' + attr);
      if (input) input.value = val;
      if (attrBars[idx]) attrBars[idx].style.width = (val / MAX_ATTR_VALUE * 100) + '%';
    });
    
    usedPoints = calculateUsedPoints();
    updatePointsDisplay();
    
    ['origin', 'class', 'org'].forEach(group => {
      const val = agentData[group];
      if (val) {
        const rb = document.querySelector('input[name="' + group + '"][value="' + val + '"]');
        if (rb) rb.checked = true;
      }
    });

    const charNameEl = document.getElementById('char-name');
    const playerNameEl = document.getElementById('player-name');
    const charHistoryEl = document.getElementById('char-history');
    if (charNameEl) charNameEl.value = agentData.character?.name || '';
    if (playerNameEl) playerNameEl.value = agentData.character?.playerName || '';
    if (charHistoryEl) charHistoryEl.value = agentData.character?.history || '';

    goToSheetStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }`
);

// 3. Update handleCreateAgent
content = content.replace(/(function handleCreateAgent.*?tabSections\.forEach)/s,
  `function handleCreateAgent() {
    const userName = localStorage.getItem('todo_user_name');
    if (!userName) {
      const loginLink = document.querySelector('a[data-target="login"]');
      if (loginLink) loginLink.click();
      showPopup('Você precisa estar identificado para criar um agente.');
      return;
    }

    sessionStorage.removeItem('todo_active_agent_index');
    tabSections.forEach`
);

// 4. Update the observer condition to avoid reset on edit
content = content.replace(/if \(entry\.isIntersecting\) \{\s*resetSheetForm\(\);\s*\}/s,
  `if (entry.isIntersecting) {
          if (!sessionStorage.getItem('todo_active_agent_index')) {
            resetSheetForm();
          }
        }`
);

// 5. Update renderAgentCards
content = content.replace(/(function renderAgentCards\(\) \{[\s\S]*?\}[\s\S]*?function updateCounterSystem)/s,
  `function renderAgentCards() {
    document.querySelectorAll('.app-created-agent').forEach(el => el.remove());
    const agents = JSON.parse(localStorage.getItem('todo_agents') || '[]');
    agentCount = agents.length;
    localStorage.setItem('todo_agent_count', agentCount);
    for (let i = 0; i < agents.length; i++) {
      createAgentDOM(agents[i], i);
    }
    updateCounterSystem();
  }

  function updateCounterSystem`
);

// 6. Update createAgentDOM
content = content.replace(/function createAgentDOM\(\) \{[\s\S]*?if \(gridContainer && emptyStateEl\) gridContainer\.insertBefore\(card, emptyStateEl\);\s*\}/s,
  `function createAgentDOM(agentData, index) {
    const card = document.createElement('div');
    card.className = 'agent-dash-card app-created-agent';
    
    const agentName = agentData?.character?.name || 'Novo Agente';
    const agentClass = agentData?.class || 'Recruta';
    let dateStr = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    if (agentData?.createdAt) {
      dateStr = new Date(agentData.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }

    card.innerHTML = \`
      <button class="agent-dash-settings btn-remove-agent" aria-label="Remover Agente">
        <i class="fas fa-trash" style="color: var(--color-red-light);"></i>
      </button>
      <div class="dash-card-content">
        <div class="dash-card-avatar empty"><i class="fas fa-user-secret"></i></div>
        <div class="dash-card-info">
          <h4>\${agentName}</h4>
          <span class="dash-card-class">\${agentClass}</span>
          <span class="dash-card-date">Criado em \${dateStr}</span>
        </div>
      </div>
      <div class="dash-card-footer">
        <button class="btn btn-primary btn-sm btn-access-sheet">Acessar Ficha</button>
      </div>
    \`;

    card.querySelector('.btn-remove-agent').addEventListener('click', () => {
      const agents = JSON.parse(localStorage.getItem('todo_agents') || '[]');
      agents.splice(index, 1);
      localStorage.setItem('todo_agents', JSON.stringify(agents));
      renderAgentCards();
    });

    card.querySelector('.btn-access-sheet').addEventListener('click', () => {
      sessionStorage.setItem('todo_active_agent_index', index);
      const sheetLink = document.querySelector('a[data-target="sheet"]');
      if (sheetLink) sheetLink.click();
      loadSheetForm(agentData);
    });

    if (gridContainer && emptyStateEl) gridContainer.insertBefore(card, emptyStateEl);
  }`
);

fs.writeFileSync('Js/main.js', content, 'utf8');
console.log('Modifications completed.');
