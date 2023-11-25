const task_input = document.querySelector("input");
const date_input = document.querySelector(".schedule-date"); // added date input
const add_btn = document.querySelector(".add-task-button");
const todos_list_body = document.querySelector(".todos-list-body");
const alert_message = document.querySelector(".alert-message");
const delete_all_btn = document.querySelector(".delete-all-btn");
const errorModal = document.querySelector(".errorModal");
let inpt1 = document.querySelector(".inp1");
let inpt2 = document.querySelector(".inp2");
let todosArray = [];

add_btn.addEventListener("click", modalOpen);
document.querySelector(".btn-cancel").addEventListener("click", modalClose);

function modalOpen() {
  document.querySelector(".todos").style.top = "150px";
  document.querySelector(".container").style.filter = "blur(10px)";
  document.querySelector(".todos").style.filter = "blur(0px)";
}
function modalClose() {
  inpt1.value = "";
  inpt2.value = "";
  document.querySelector(".todos").style.top = "-550px";
  document.querySelector(".container").style.filter = "blur(0px)";
  document.querySelector(".todos").style.filter = "blur(5px)";
}

document.querySelector(".btn-ok").addEventListener("click", addtodowithokBtn);

function addtodowithokBtn() {
  if (inpt1.value) {
    inpt1v = inpt1.value;
    inpt2v = inpt2.value;
    let newTodo = {
      id: todosArray.length + 1,
      title: inpt1v,
      data: inpt2v || "تاریخی ثبت نشده  ",
      status: false,
    };
    inpt1.value = "";
    inpt2.value = "";
    todosArray.push(newTodo);
    setlocalstorage(todosArray);
  } else {
    const setT = setTimeout(() => {
      errorModal.style.visibility = "visible";
    }, 50);
    setTimeout(() => {
      errorModal.style.visibility = "hidden";
    }, 4000);
  }
}
function setlocalstorage(todolist) {
  localStorage.setItem("todos", JSON.stringify(todolist));
  todosGenerator(todosArray);
}

function todosGenerator(todo) {
  todos_list_body.innerHTML = " ";
  todo.forEach((todo) => {
    todos_list_body.innerHTML += `
            <tr class="todo-item" data-id="${todo.id}">
                <td>${todo.title}</td>
                <td>${todo.data}</td>
               <td>${todo.status ? "انجام شده" : "انجام نشده"}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editTodo('${
                      todo.id
                    }')">
                        <i class="bx bx-edit-alt bx-bx-xs"></i>    
                    </button>
                    <button class="btn btn-success btn-sm" onclick="toggleStatus('${
                      todo.id
                    }')">
                        <i class="bx bx-check bx-xs"></i>
                    </button>
                    <button class="btn btn-error btn-sm" onclick="deleteTodo('${
                      todo.id
                    }')">
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
delete_all_btn.addEventListener("click", () => {
  localStorage.clear();
  todosArray = [];
  todosGenerator(todosArray);
});
function deleteTodo(todoid) {
  let gettodosfordel = JSON.parse(localStorage.getItem("todos"));
  todosArray = gettodosfordel;
  let deltodo = gettodosfordel.findIndex(function (todo) {
    return todo.id == todoid;
  });
  todosArray.splice(deltodo, 1);
  setlocalstorage(todosArray);
}
function toggleStatus(todoid) {
  let gettodoforstatus = JSON.parse(localStorage.getItem("todos"));
  todosArray = gettodoforstatus;
  let statustodo = gettodoforstatus.findIndex(function (todo) {
    return todo.id == todoid;
  });

  if (todosArray[statustodo].status === false) {
    todosArray[statustodo].status = true;
  } else {
    todosArray[statustodo].status = false;
  }
  setlocalstorage(todosArray);
}
function editTodo(todoid) {
  modalOpen();

  let val1, val2;
  let gettodoforedit = JSON.parse(localStorage.getItem("todos"));
  todosArray = gettodoforedit;
  // let statustodo = gettodoforedit.findIndex(function (todo) {
  //   return todo.id == todoid;
  // });
  console.log(todosArray[todoid].id);
  inpt1.value = todosArray[todoid].title;
  inpt2.value = todosArray[todoid].data;
  val1 = inpt1.value;
  val2 = inpt2.value;
  console.log(todosArray);
  console.log(todoid);
  let found = todosArray.find((todoarr) => {
    todoarr.id === todoid;
  });
  console.log(found);
}
function filterTodos(status) {
  let filteredTodos;
  switch (status) {
    case "همه":
      filteredTodos = todosArray;
      break;
    case "انجام نشده":
      filteredTodos = todosArray.filter((todo) => !todo.status);
      break;
    case "انجام شده":
      filteredTodos = todosArray.filter((todo) => todo.status);
      break;
  }

  console.log(filteredTodos);
  todosGenerator(filteredTodos);
}
