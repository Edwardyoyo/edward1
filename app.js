const STORAGE_KEY = "todo-list-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let currentFilter = "all";

// 從 localStorage 讀取待辦資料，若資料損壞則回傳空陣列。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

// 將目前的待辦資料保存到 localStorage。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 依照目前的篩選條件取得要顯示的待辦事項。
function getVisibleTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }
  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

// 篩選結果為空時說明項目狀態，避免使用者誤以為資料已被刪除。
function getEmptyMessage(visibleTodos) {
  if (todos.length === 0) {
    return "還沒有任何待辦事項,新增一個吧!";
  }
  if (visibleTodos.length === 0 && currentFilter === "completed") {
    return "目前沒有已完成的事項；項目仍在清單中，切回「全部」即可查看。";
  }
  if (visibleTodos.length === 0 && currentFilter === "active") {
    return "目前沒有未完成的事項；切回「全部」即可查看所有項目。";
  }
  return "還沒有符合目前篩選條件的事項。";
}

// 重新繪製篩選結果與整份清單的未完成數量。
function renderTodos() {
  const visibleTodos = getVisibleTodos();
  todoList.textContent = "";

  visibleTodos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    listItem.classList.toggle("completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成待辦：${todo.text}`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除待辦：${todo.text}`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    listItem.append(checkbox, todoText, deleteButton);
    todoList.append(listItem);
  });

  emptyMessage.hidden = visibleTodos.length > 0;
  emptyMessage.textContent = getEmptyMessage(visibleTodos);

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${unfinishedCount} 項`;
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  todos.push({
    id: Date.now(),
    text,
    completed: false
  });

  saveTodos();
  renderTodos();
  todoInput.value = "";
  todoInput.focus();
});

// 切換全部、未完成或已完成的篩選條件。
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

renderTodos();
