const todoForm = document.querySelector(".todo-form");
const todoInput = document.getElementById("todo-input");
const taskList = document.getElementById("task-list");

// console.log(todoForm, todoInput, taskList);

const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

renderTaskList();

todoForm.onsubmit = (e) => {
    e.preventDefault();

    // new task
    const newTask = {
        name: todoInput.value.trim(),
        isComplete: false,
    };

    // add new task to task array, also prevent adding the same task name and empty task
    const hasSameTask = tasks.find((task) => {
        return newTask.name === task.name;
    });
    if (!newTask.name) {
        alert("Do not add empty task!");
        return;
    } else {
        if (hasSameTask) {
            alert(
                `The '${newTask.name}' task already exists in your task list.`
            );
            return;
        } else {
            tasks.unshift(newTask);
        }
    }

    // render task list
    renderTaskList();

    // clear input upon submission
    todoInput.value = "";

    // save data to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function renderTaskList() {
    if (!tasks.length) {
        taskList.innerHTML = `<li>Your list is empty!</li>`;
        return;
    }

    const html = tasks
        .map((task) => {
            return `<li class="task-item">
                        <span class="task-title">${task.name}</span>
                        <div class="task-action">
                            <button class="task-btn edit">Edit</button>
                            <button class="task-btn done">Mark as done</button>
                            <button class="task-btn delete">Delete</button>
                        </div>
                    </li>`;
        })
        .join("");
    taskList.innerHTML = html;
}
