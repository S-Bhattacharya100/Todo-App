let todoForm = document.querySelector("form");
let todoInput = document.querySelector("#todo-input");
let todoList = document.querySelector(".todo-list");
let todoAddBtn = document.querySelector("#add-btn");

let allTodo = getTodo();
updateTodoList();

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
});

function addTodo() {
    let todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        let todoObj = {
            text: todoText,
            complited: false
        }
        allTodo.push(todoObj);
        updateTodoList();
        saveTodo();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoList.innerHTML = "";
    allTodo.forEach((todo, index) => {
        todoItem = createTodoItem(todo, index);
        todoList.append(todoItem);
    });
}

function createTodoItem(todo, index) {
    let listItem = document.createElement("li");
    let todoId = "todo-" + index;
    let todoText = todo.text;
    listItem.classList.add("list-item");
    listItem.innerHTML = `
    <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#00000">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                </label>
                <label class="todo-text" for="${todoId}">
                    ${todoText}
                </label>
                <button class="delete-btn">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#000000">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </button>
    `;
    let deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        deleteTodoBtn(index);
    });
    let checkbox = listItem.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodo[index].complited = checkbox.checked;
        saveTodo();
    });
    checkbox.checked = todo.complited;
    return listItem;
}

function saveTodo() {
    let jsonTodos = JSON.stringify(allTodo);
    localStorage.setItem("todos", jsonTodos);
}

function getTodo() {
    let todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

function deleteTodoBtn(todoIdx) {
    allTodo = allTodo.filter((_, i) => i !== todoIdx);
    saveTodo();
    updateTodoList();
}