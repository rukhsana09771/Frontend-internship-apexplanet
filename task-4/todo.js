document.addEventListener('DOMContentLoaded', () => {
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const totalCountEl = document.getElementById('totalCount');
  const activeCountEl = document.getElementById('activeCount');
  const completedCountEl = document.getElementById('completedCount');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const clearActiveBtn = document.getElementById('clearActiveBtn');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const currentDateEl = document.getElementById('currentDate');

  // Show current date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentDateEl.textContent = new Date().toLocaleDateString(undefined, options);

  // Add task
  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Filters
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      filterTasks(btn.dataset.filter);
    });
  });

  // Clear Completed Tasks
  clearCompletedBtn?.addEventListener('click', () => {
    document.querySelectorAll('.task-item.completed').forEach(task => task.remove());
    updateTaskSummary();
  });

  // Clear All Tasks
  clearAllBtn?.addEventListener('click', () => {
    taskList.innerHTML = '';
    updateTaskSummary();
  });

  // Clear Only Active Tasks
  clearActiveBtn?.addEventListener('click', () => {
    document.querySelectorAll('.task-item:not(.completed)').forEach(task => task.remove());
    updateTaskSummary();
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
      alert('Please enter a task.');
      return;
    }

    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div class="task-controls">
        <button class="complete-btn" title="Mark as Completed"><i class="fa-solid fa-check-to-slot"></i></button>
        <button class="edit-btn" title="Edit Task"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    li.querySelector('.complete-btn').addEventListener('click', () => {
      li.classList.toggle('completed');
      updateTaskSummary();
      applyCurrentFilter();
    });

    li.querySelector('.edit-btn').addEventListener('click', () => {
      const taskSpan = li.querySelector('.task-text');
      const currentText = taskSpan.textContent;
      const newText = prompt('Edit your task:', currentText);
      if (newText) taskSpan.textContent = newText;
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
      updateTaskSummary();
    });

    taskList.appendChild(li);
    taskInput.value = '';
    updateTaskSummary();
    applyCurrentFilter();
  }

  function updateTaskSummary() {
    const tasks = document.querySelectorAll('.task-item');
    const completedTasks = document.querySelectorAll('.task-item.completed');
    totalCountEl.textContent = `Total: ${tasks.length}`;
    activeCountEl.textContent = `Active: ${tasks.length - completedTasks.length}`;
    completedCountEl.textContent = `Completed: ${completedTasks.length}`;
  }

  function filterTasks(filterType) {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
      switch (filterType) {
        case 'all':
          task.style.display = 'flex';
          break;
        case 'active':
          task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
          break;
        case 'completed':
          task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
          break;
      }
    });
  }

  function applyCurrentFilter() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    filterTasks(activeFilter);
  }
});
