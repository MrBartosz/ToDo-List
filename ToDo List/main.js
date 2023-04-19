const addButton = document.querySelector("#add-btn");
const taskList = document.querySelector(".task-list");
const input = document.querySelector('#task-name')
const filter = document.querySelector('#filter-select')
const totalTasks = document.querySelector('#total-tasks');
const completedTasks = document.querySelector('#completed-tasks');

function addTask(task) {
  if (task !== "") {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <div class="task">${task}</div>
    <div class="buttons">
      <button class="done-button">Done</button>
      <button class="delete-button">Delete</button>
    </div>
  `;

  const completeButton = listItem.querySelector(".done-button");
  const deleteButton = listItem.querySelector(".delete-button");

    completeButton.addEventListener("click", function () {
        listItem.classList.add('done')
        listItem.innerText = task;
        listItem.appendChild(deleteButton);
        updateStats();
    });

    deleteButton.addEventListener("click", function () {
      listItem.remove();
      updateStats();
    });

    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
    updateStats();
  }
}

function updateStats() {
  const total = document.querySelectorAll(".task-list li").length;
  const completed = document.querySelectorAll(".task-list li.done").length;

  totalTasks.innerText = total;
  completedTasks.innerText = completed;

}

addButton.addEventListener("click", function () {
    addTask(input.value);
    input.value = '';
});

filter.addEventListener('change', () => {
  const tasks = document.querySelectorAll('.task-list li');
  const filterValue = filter.value;

  tasks.forEach(task => {
    if (filterValue === 'completed' && !task.classList.contains('done')) {
      task.style.display = 'none';
    } else if (filterValue === 'uncompleted' && task.classList.contains('done')) {
      task.style.display = 'none';
    } else {
      task.style.display = 'flex';
    }
  });
  updateStats();
});