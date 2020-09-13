//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EventListener
document.addEventListener('DOMContentLoaded', getToDos);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', checkDelete);
filterOption.addEventListener('change', filterToDo);

//function

function addToDo (event)
{
  //prevent form from submitting
  event.preventDefault();

  //create Div
  const todoDiv= document.createElement('div');
  todoDiv.classList.add('todo');

  //create Li
  const newTodo= document.createElement('li');
  newTodo.innerText= todoInput.value;
  newTodo.classList.add('todo-item');

  //append Li as child of Div
  todoDiv.appendChild(newTodo);

  //addToDo to local storage
  saveLocalTodos(todoInput.value);

  //complete button
  const completeButton = document.createElement('button');
  completeButton.innerHTML= '<i class="fa fa-check"></i>';
  completeButton.classList.add('complete-btn');
  todoDiv.appendChild(completeButton);

  //trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML= '<i class="fa fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  //append Div to Ul list
  todoList.appendChild(todoDiv);

  //clear todoInput
  todoInput.value='';
}

//delete button function
function checkDelete(e)
{
  const item= e.target;

  //delete ToDo
  if(item.classList[0] ==='trash-btn')
  {
  const todo= item.parentElement;
  todo.classList.add('fall');

  //removing from local storage
  removeTodos(todo);

  todo.addEventListener('transitionend', function(){
    todo.remove();
  })
  }

  //check ToDo
  if(item.classList[0] ==='complete-btn')
  {
  const todo= item.parentElement;
  todo.classList.toggle('completed');
  }
}

//filter function
function filterToDo(e)
{
   //to show always all by default
   event.preventDefault();

  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch (e.target.value)
    {
      case "all":
        todo.style.display= "flex";
        break;

      case "completed":
        if(todo.classList.contains("completed"))
        {
        todo.style.display = "flex";
        }
        else 
        {
          todo.style.display = "none";
        }
        break;

        case "uncompleted":
          if(!todo.classList.contains("completed"))
          {
          todo.style.display = "flex";
          }
          else
          {
             todo.style.display = "none";
          }
          break;
    }
  })
}

//function to store values in local storage
function saveLocalTodos(todo)
{
//check if you already had items in there
let todos;
//if we don't have that items already, then it will create a new array
if(localStorage.getItem('todos') === null)
{
  todos = [];
}
//else just get back json array from local storage
else
{
  todos = JSON.parse(localStorage.getItem('todos'));
}
//storing array in local storage
todos.push(todo);
localStorage.setItem('todos', JSON.stringify(todos));
}

//getting data from local storage
function getToDos()
{
  let todos;
  if(localStorage.getItem('todos')==null)
  {
    todos = [];
  }
  else
  {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo)
  {
      //create Div
  const todoDiv= document.createElement('div');
  todoDiv.classList.add('todo');

  //create Li
  const newTodo= document.createElement('li');
  newTodo.innerText= todo;
  newTodo.classList.add('todo-item');

  //append Li as child of Div
  todoDiv.appendChild(newTodo);

  //complete button
  const completeButton = document.createElement('button');
  completeButton.innerHTML= '<i class="fa fa-check"></i>';
  completeButton.classList.add('complete-btn');
  todoDiv.appendChild(completeButton);

  //trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML= '<i class="fa fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  //append Div to Ul list
  todoList.appendChild(todoDiv);

  })
}

//removing items from local storage which have been deleted from todo list
function removeTodos(todo)
{
//check if you already had items in there
let todos;
//if we don't have that items already, then it will create a new array
if(localStorage.getItem('todos') === null)
{
  todos = [];
}
//else just get back json array from local storage
else
{
  todos = JSON.parse(localStorage.getItem('todos'));
}
console.log(todo.innerText);
const todoIndex = todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex),1);
console.log(todos.indexOf(todoIndex));
localStorage.setItem('todos', JSON.stringify(todos));
}