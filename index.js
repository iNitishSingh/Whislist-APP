let todoInput=document.querySelector(".input")
let addTodoButton=document.querySelector(".button")
let showToDos=document.querySelector(".todos-container")
let todo

let localData=JSON.parse(localStorage.getItem("todo"))
let todoList=localData || []

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

addTodoButton.addEventListener("click",(e)=>{
    e.preventDefault();//it will prevet to reload
    todo=todoInput.value
    if(todo.length>0){
        todoList.push({id:uuid(),todo, isCompleted:false})
    }
    renderTodoList(todoList);
    localStorage.setItem("todo",JSON.stringify(todoList ))
    console.log(todoList)
})

showToDos.addEventListener('click',(e)=>{
    e.preventDefault();
    let key=e.target.dataset.key
    let delTodoKey=e.target.dataset.todokey
    //console.log(key)
    console.log(todoList)
    todoList=todoList.map((todo) => todo.id==key? {...todo,isCompleted:!todo.isCompleted}:todo)
    todoList=todoList.filter(todo=> todo.id!=delTodoKey)
//     todoList = todoList.map((todo) =>
//     todo.id === key ? {
//         ...todo,
//         isCompleted: !todo.isCompleted
//     } : todo
// );
    renderTodoList(todoList)
    localStorage.setItem("todo",JSON.stringify(todoList))
})

 function renderTodoList(todoList){
     console.log(todoList)
        showToDos.innerHTML=todoList.map(({id,todo,isCompleted})=>`<div class="todo relative"> <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" type="checkbox" ${
            isCompleted ? "checked" : ""
          }> <label data-key=${id} class="todo-text t-pointer ${
            isCompleted ? "checked-todo" : ""
          }" for="item-${id}"> ${todo} </label> <button class="absolute right-0 button cursor">
          <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
                </button> </div>`)
        }
//renderTodoList(todolist);
      