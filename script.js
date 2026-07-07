const todos = [
    {
        id: 1,
        task: "Go to Gym",
        status: false,
        priority: "High"
    },
    {
        id: 2,
        task: "Buy Groceries",
        status: true,
        priority: "Medium"
    },
    {
        id: 3,
        task: "Buy Vegetables",
        status: false,
        priority: "Low"
    }
];
let editId = null;

function displayTodos() {

    const todoContainer = document.getElementById("todoContainer");

    todoContainer.innerHTML = "";

    todos.forEach((todo) => {

        const card = document.createElement("div");
        card.className = "todo-card";

        card.innerHTML = `
        
            <h3>${todo.task}</h3>
            <div class="todo-info">  
                <p>
                  Status :
                  <span
                    class="${todo.status ? "completed" : "pending"}"
                    onclick="toggleStatus(${todo.id})"
                    style="cursor:pointer;"
                 >
                    ${todo.status ? "Completed ✅" : "Pending ❌"}
                </span>
               </p>
                <p>
                    Priority :
                    <span class="${todo.priority.toLowerCase()}">
                        ${todo.priority}
                    </span>
                </p>

            </div>

            <div class="actions">

                <i class="fa-solid fa-pen" onclick="editTodo(${todo.id})"></i>
                <i class="fa-solid fa-trash" onclick="deleteTodo(${todo.id})"></i>
            </div>

        `;

        todoContainer.appendChild(card);

    });

    updateCounter();
    
}

displayTodos();
function deleteTodo(id) {

    const index = todos.findIndex((todo) => todo.id === id);

    if (index !== -1) {
        const confirmDelete = confirm("Are you sure you want to delete this task?");

        if (confirmDelete) {
            todos.splice(index, 1);
            displayTodos();
        }
    }
}
function addTodo() {

    const taskInput = document.getElementById("taskInput");
    const priority = document.getElementById("priority");

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    const newTodo = {
        id: Date.now(),
        task: task,
        status: false,
        priority: priority.value
    };

   if (editId === null) {

    todos.push(newTodo);

} else {

    const todo = todos.find((todo) => todo.id === editId);

    todo.task = task;
    todo.priority = priority.value;

    editId = null;

    document.querySelector("button").innerText = "Add Todo";
}

displayTodos();

taskInput.value = "";
priority.value = "High";

}
function editTodo(id) {

    const todo = todos.find((todo) => todo.id === id);

    document.getElementById("taskInput").value = todo.task;
    document.getElementById("priority").value = todo.priority;

    editId = id;

    document.querySelector("button").innerText = "Update Todo";
}
function toggleStatus(id) {

    const todo = todos.find((todo) => todo.id === id);

    todo.status = !todo.status;

    displayTodos();

}
function updateCounter(){

    document.getElementById("totalTask").innerText = todos.length;

    const completed = todos.filter(todo => todo.status).length;

    const pending = todos.filter(todo => !todo.status).length;

    document.getElementById("completedTask").innerText = completed;

    document.getElementById("pendingTask").innerText = pending;

}