const task_input = document.querySelector("input");
const date_input = document.querySelector(".schedule-date"); // added date input
const add_btn = document.querySelector(".add-task-button");
const todos_list_body = document.querySelector(".todos-list-body");
const alert_message = document.querySelector(".alert-message");
const delete_all_btn = document.querySelector(".delete-all-btn");
let todosArray = [];
add_btn.addEventListener("click", () => {
  document.querySelector(".todos").style.top = "150px";
  document.querySelector(".container").style.filter = "blur(10px)";
  document.querySelector(".todos").style.filter = "blur(0px)";
});
document.querySelector(".btn-cancel").addEventListener("click", () => {
  document.querySelector(".todos").style.top = "-250px";
  document.querySelector(".container").style.filter = "blur(0px)";
  document.querySelector(".todos").style.filter = "blur(5px)";
});

document.querySelector(".btn-ok").addEventListener("click", () => {
  let inpt1 = document.querySelector(".inp1");
  let inpt2 = document.querySelector(".inp2");
  inpt1v = inpt1.value;
  inpt2v = inpt2.value;
  let newTodo = {
    id: todosArray.length + 1,
    title: inpt1v,
    data: inpt2v || "تاریخی ثبت نشده  ",
    status: "انجام نشده",
  };
  inpt1.value = "";
  inpt2.value = "";
  todosArray.push(newTodo);
  setlocalstorage(todosArray);
  todosGenerator(todosArray);
});
function setlocalstorage(todolist) {
  localStorage.setItem("todos", JSON.stringify(todolist));
}

function todosGenerator(todo) {
  todos_list_body.innerHTML = " ";
  todo.forEach((todo) => {
    todos_list_body.innerHTML += `
            <tr class="todo-item" data-id="${todo.id}">
                <td>${todo.title}</td>
                <td>${todo.data}</td>
                <td>${todo.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editTodo('${todo.id}')">
                        <i class="bx bx-edit-alt bx-bx-xs"></i>    
                    </button>
                    <button class="btn btn-success btn-sm" onclick="toggleStatus('${todo.id}')">
                        <i class="bx bx-check bx-xs"></i>
                    </button>
                    <button class="btn btn-error btn-sm" onclick="deleteTodo('${todo.id}')">
                        <i class="bx bx-trash bx-xs"></i>
                    </button>
                </td>
            </tr>
        `;
    todo = [];
  });
}
function getLocalStorage() {
  getTodos = JSON.parse(localStorage.getItem("todos"));
  if (getTodos) {
    todosArray = getTodos;
  } else {
    todosArray = [];
  }
  todosGenerator(todosArray);
}
window.addEventListener("load", getLocalStorage);
