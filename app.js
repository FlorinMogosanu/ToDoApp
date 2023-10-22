const form = document.querySelector('#task-form');
const ul = document.querySelector('.collection');
const clearTasksBtn = document.querySelector('.clear-tasks');
const filterInput = document.querySelector('#filter');

function callEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded' , loadTasksFromStorage);

    //Add Task
    form.addEventListener('submit' , addTask);

    //Delete Task
    ul.addEventListener('click' , deleteTask);

    //Clear Tasks
    clearTasksBtn.addEventListener('click' , clearTasks);

    //Filter
    filterInput.addEventListener('input' , filter);
}

function loadTasksFromStorage(){
    let tasks;

    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
        const span = document.createElement('span');
        const textNode = document.createTextNode(task);
        span.appendChild(textNode);

        const deleteBtn = document.createElement('a');
        deleteBtn.href = '#';
        deleteBtn.classList.add('delete-btn');

        const deleteIcon = document.createElement('i');
        deleteIcon.classList = 'far fa-trash-alt';

        deleteBtn.appendChild(deleteIcon);

        const li = document.createElement('li');
        li.classList = 'collection-item';
        li.appendChild(span);
        li.appendChild(deleteBtn);

        ul.appendChild(li);
    })
}

function addTask(event){
    event.preventDefault();
    const taskInput = document.querySelector('#task');
    
    const span = document.createElement('span');
    const textNode = document.createTextNode(taskInput.value);
    span.appendChild(textNode);

    const deleteBtn = document.createElement('a');
    deleteBtn.href = '#';
    deleteBtn.classList.add('delete-btn');

    const deleteIcon = document.createElement('i');
    deleteIcon.classList = 'far fa-trash-alt';

    deleteBtn.appendChild(deleteIcon);

    const li = document.createElement('li');
    li.classList = 'collection-item';
    li.appendChild(span);
    li.appendChild(deleteBtn);

    ul.appendChild(li);

    addTaskToLocalStorage(taskInput)


    taskInput.value = '';

    
    
}

function addTaskToLocalStorage(task){
    let tasks;

    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task.value);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function deleteTask(event){
    item = event.target;
    if(item.classList[0] === 'delete-btn'){
        if(confirm('Are you sure?')){
            item.parentElement.remove();
        }
    }

    deleteTaskFromLocalStorage(item.parentElement);
}

function deleteTaskFromLocalStorage(item){
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task , index) => {
        if(item.textContent === task){
            tasks.splice(index , 1);
        }
    })

    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function clearTasks(event){
    const lis = document.querySelectorAll('.collection-item');
    
    if(confirm('Are you sure?')){
        lis.forEach((li) => {
            li.remove();
        })
    }
    clearAllTasksFromLocalStorage();
}

function clearAllTasksFromLocalStorage(){
    localStorage.clear();
}

function filter(event){
    const lis = document.querySelectorAll('.collection-item');
    lis.forEach((li) => {
        if(li.firstElementChild.textContent.toLowerCase().includes(filterInput.value.toLowerCase())){
            li.style.display = 'block';
        }
        else{
            li.style.display = 'none';
        }
    })
}

callEventListeners();