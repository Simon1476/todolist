const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDOList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


function deleteToDo(event) {
   const li  = event.target.parentElement; // This li is a element li we want to delete when we click the delete button.
   li.remove();
   toDos = toDos.filter((item) => item.id !== parseInt(li.id));
   saveToDos();
}


function paintToDo(newTodoObj) {

    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.id = newTodoObj.id;
    span.innerText = newTodoObj.text;
    button.innerText = "❌";
    button.addEventListener('click', deleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    toDOList.appendChild(li);
   
}

function handleToDOSubmit(event) {

    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";  
    const newTodoObj = {
        text: newTodo,
        id: Date.now(), // why need ,? 
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos(); //Put ToDos into localStorage  
    
}

toDoForm.addEventListener('submit', handleToDOSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null ) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}