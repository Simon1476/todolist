const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDOList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';
const TODOS_CNT = 'todoscnt';

let toDosCnt = 0;   // to-do list 개수

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function changeToDo(li, span, newTodoObj) {

    let id = parseInt(li.id);

    
    const inputElem = document.createElement('input');
    inputElem.value = span.innerText;
    inputElem.classList.add('edit_input');

    inputElem.addEventListener('keypress',(e)=> {

        if(e.key === 'Enter'){

            span.innerText = inputElem.value;

            // newTodoObj.text = span.innerText;
            if(toDos[0].id === id) {
               toDos[0].text = span.innerText;
            }   else if (toDos[1].id === id) {
                toDos[1].text = span.innerText;
             }  else if (toDos[2].id === id) {
                toDos[2].text = span.innerText;
             }  else if (toDos[3].id === id) {
                toDos[3].text = span.innerText;
             }  else if (toDos[4].id === id) {
                toDos[4].text = span.innerText;
             }
            saveToDos();
            inputElem.classList.add('edit_hidden');

        }
    })

    li.appendChild(inputElem);
    
}

function deleteToDo(event) {
//    const li  = event.target.parentElement; // This li is a element li we want to delete when we click the delete button.
//    li.remove();
//    toDos = toDos.filter((item) => item.id !== parseInt(li.id));
//    saveToDos();
//    toDosCnt--;

    const div  = event.target.parentElement; // This li is a element li we want to delete when we click the delete button.
    const li   = div.parentNode;  
    li.remove();
    toDos = toDos.filter((item) => item.id !== parseInt(li.id));
    saveToDos();
    toDosCnt--;
}   

function paintToDo(newTodoObj) {

    const li = document.createElement("li");
    const span = document.createElement("span");

    const div = document.createElement("div");
    const button = document.createElement("button");
    const changeBtn = document.createElement("button");

    li.id = newTodoObj.id;
    span.innerText = newTodoObj.text;
    button.innerText = "❌";
    changeBtn.innerHTML ='<i class="fa-solid fa-pencil"></i>';


    button.addEventListener('click', deleteToDo);
    changeBtn.addEventListener('click', function(){changeToDo(li, span, newTodoObj)});

    div.appendChild(button);
    div.appendChild(changeBtn);
    li.appendChild(span);
    li.appendChild(div);

    toDOList.appendChild(li);
    toDosCnt++; // to-do list하나 생성 시 todo-list값 증가 
    
}

function handleToDOSubmit(event) {

    event.preventDefault();
    if(toDosCnt >= 5) {
        alert("You can't create todo list");
        return;
    }

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