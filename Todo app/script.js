let todoForm = document.querySelector("form");
let todoInput = document.querySelector("#todo-input");
let todoList = document.querySelector(".todo-UL");

// Getting all the todos from localstorage
let allTodo = getTodo();
updateTodoList();

// Extracting tasks from the input
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
});

// Adding the todos into localstorage
function addTodo() {
    let todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        let todoObj = {
            text: todoText,
            completed: false
        };
        allTodo.push(todoObj);
        updateTodoList();
        saveTodo();
        todoInput.value = "";
    }
}

// Todo list updation
function updateTodoList() {
    todoList.innerHTML = "";
    allTodo.forEach((todo, index) => {
        let todoItem = createTodoItem(todo, index);
        todoList.append(todoItem);
    });
}

// Creating todo items, its internal components and applying styles on them
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
    <button class="more-btn invisible">
        <span class="material-symbols-outlined">read_more</span>
    </button>
    <button class="delete-btn">
        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#000000">
            <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    </button>
    `;

    // Assigning delete button and its functionality
    let deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        deleteTodoBtn(index);
    });

    // Creating "more" button for showing full text if the text overflows
    let moreBtn = listItem.querySelector(".more-btn");
    let text = listItem.querySelector(".todo-text");
    moreBtn.addEventListener("click", () => {
        text.classList.toggle("full-text");
        text.classList.toggle("todo-text");
        moreBtn.classList.toggle("btn-pressed");
    });

    // Assigning more button
    if (todoText.length > 52) {
        moreBtn.classList.toggle("visible");
        moreBtn.classList.toggle("invisible");
    }
    
    // Saving the completed status in localstorage and updating it's value
    let checkbox = listItem.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodo[index].completed = checkbox.checked;
        saveTodo();
    });
    checkbox.checked = todo.completed;
    return listItem;
}

// Function for saving todos into localstorage
function saveTodo() {
    let jsonTodos = JSON.stringify(allTodo);
    localStorage.setItem("todos", jsonTodos);
}

// Function for getting todos from localstorage
function getTodo() {
    let todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

// Todo delete function
function deleteTodoBtn(todoIdx) {
    allTodo = allTodo.filter((_, i) => i !== todoIdx);
    saveTodo();
    updateTodoList();
}