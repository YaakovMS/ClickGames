// Alternar a exibição da sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open'); // Usando a classe 'open' para exibir a sidebar
  }
  
  // Abrir o modal de criação de tarefa
  function openTaskCreationModal() {
    document.getElementById('task-creation-modal').style.display = 'flex';
  }
  
  // Fechar o modal de criação de tarefa
  function closeTaskCreationModal() {
    document.getElementById('task-creation-modal').style.display = 'none';
  }
  
  // Criar nova tarefa
  function createNewTask(event) {
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const responsible = document.getElementById('task-responsible').value;
    const date = document.getElementById('task-date').value;
    const label = document.getElementById('task-label').value;
  
    if (title && responsible && date && label) {
      const task = { title, responsible, date, label, stage: "todo" }; // Criar objeto da tarefa
  
      // Salvar no localStorage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      // Adicionar tarefa ao DOM
      const taskColumn = document.querySelector('[data-stage="todo"]');
      const newTask = document.createElement('div');
      newTask.className = 'card task-card';
      newTask.innerHTML = `
        <p class="task-title">${task.title}</p>
        <p class="task-desc">Responsável: ${task.responsible}</p>
        <p class="task-desc">Data: ${task.date}</p>
        <p class="task-desc">Label: ${task.label}</p>
      `;
      newTask.onclick = () => openTaskDetails(task.title, task.responsible, task.date, task.label);
      taskColumn.appendChild(newTask);
  
      closeTaskCreationModal();
      document.getElementById('new-task-form').reset();
    }
  }
  
  
  // Abrir modal de detalhes da tarefa
  function openTaskDetails(title, responsible, date, label) {
    // Preencher os detalhes no modal
    const taskDetailModal = document.getElementById('task-detail-modal');
    const modalContent = taskDetailModal.querySelector('.modal-content');
  
    modalContent.innerHTML = `
      <span class="close-modal" onclick="closeModal()">×</span>
      <div class="task-detail">
        <h2 class="task-detail-title">${title}</h2>
        <p><strong>Responsável:</strong> ${responsible}</p>
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Label:</strong> ${label}</p>
      </div>
      <button onclick="closeModal()">Fechar</button>
    `;
  
    taskDetailModal.style.display = 'flex'; // Exibe o modal
  }
  
  // Fechar modal genérico
  function closeModal() {
    document.getElementById('task-detail-modal').style.display = 'none';
  }
  