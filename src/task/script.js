// Alternar a exibição da sidebar
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open'); // Usando a classe 'open' para exibir a sidebar
}

// Abrir o modal de criação de tarefa
function openTaskCreationModal(task = null) {
  const modal = document.getElementById('task-creation-modal');
  const form = document.getElementById('new-task-form');
  
  // Se a tarefa for fornecida, preenche o formulário para edição
  if (task) {
      document.getElementById('task-title').value = task.title;
      document.getElementById('task-responsible').value = task.responsible;
      document.getElementById('task-date').value = task.date;
      document.getElementById('task-label').value = task.label;
      form.onsubmit = (event) => updateTask(event, task); // Mudar para atualização
  } else {
      form.onsubmit = createNewTask; // Manter para criar nova tarefa
  }

  modal.style.display = 'flex';
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
      addTaskToDOM(task);

      closeTaskCreationModal();
      document.getElementById('new-task-form').reset();
  }
}

// Atualizar tarefa existente
function updateTask(event, task) {
  event.preventDefault();

  const title = document.getElementById('task-title').value;
  const responsible = document.getElementById('task-responsible').value;
  const date = document.getElementById('task-date').value;
  const label = document.getElementById('task-label').value;

  // Atualiza os dados da tarefa
  task.title = title;
  task.responsible = responsible;
  task.date = date;
  task.label = label;

  // Atualiza no localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex(t => t.title === task.title && t.responsible === task.responsible); // Encontrar a tarefa
  tasks[taskIndex] = task; // Substitui a tarefa antiga pela nova
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Atualizar a tarefa no DOM
  updateTaskInDOM(task);

  closeTaskCreationModal();
}

// Adicionar nova tarefa ao DOM
function addTaskToDOM(task) {
  const taskColumn = document.querySelector('[data-stage="todo"]');
  const newTask = document.createElement('div');
  newTask.className = 'card task-card';
  newTask.innerHTML = `
      <p class="task-title">${task.title}</p>
      <p class="task-desc">Responsável: ${task.responsible}</p>
      <p class="task-desc">Data: ${task.date}</p>
      <p class="task-desc">Label: ${task.label}</p>
  `;
  newTask.onclick = () => openTaskDetailModal(task); // Chama o modal de detalhes
  taskColumn.appendChild(newTask);
}

// Atualizar tarefa no DOM após edição
function updateTaskInDOM(updatedTask) {
  const taskColumn = document.querySelector('[data-stage="todo"]');
  const taskCards = taskColumn.querySelectorAll('.task-card');
  
  // Procurar pelo card correspondente e atualizar
  taskCards.forEach(card => {
      const taskTitle = card.querySelector('.task-title').textContent;
      if (taskTitle === updatedTask.title) {
          card.querySelector('.task-title').textContent = updatedTask.title;
          card.querySelector('.task-desc').textContent = `Responsável: ${updatedTask.responsible}`;
          card.querySelectorAll('.task-desc')[1].textContent = `Data: ${updatedTask.date}`;
          card.querySelectorAll('.task-desc')[2].textContent = `Label: ${updatedTask.label}`;
      }
  });
}

// Abrir o modal de detalhes da tarefa (para visualização)
function openTaskDetailModal(task) {
  const modal = document.getElementById('task-detail-modal');
  const modalContent = modal.querySelector('.modal-content');

  modalContent.innerHTML = `
      <span class="close-modal" onclick="closeModal()">×</span>
      <h2>${task.title}</h2>
      <p><strong>Responsável:</strong> ${task.responsible}</p>
      <p><strong>Data:</strong> ${task.date}</p>
      <p><strong>Label:</strong> ${task.label}</p>
  `;

  modal.style.display = 'flex'; // Exibe o modal
}

// Fechar modal genérico
function closeModal() {
  document.getElementById('task-detail-modal').style.display = 'none';
}
