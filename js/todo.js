const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDOList = document.getElementById('todo-list');

const toDos = [];
function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
}


function deleteToDo(event) {
   const li  = event.target.parentElement; // This li is a element li we want to delete when we click the delete button.
   li.remove();
}


function paintToDo(newTodo) {

    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    button.innerText = "❌";
    button.addEventListener('click', deleteToDo);
    span.innerText = newTodo;

    li.appendChild(span);
    li.appendChild(button);
    toDOList.appendChild(li);
   
}

function handleToDOSubmit(event) {

    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";  
    toDos.push(newTodo);
    paintToDo(newTodo);
    saveToDos(); //Put ToDos into localStorage  
}

toDoForm.addEventListener('submit', handleToDOSubmit);