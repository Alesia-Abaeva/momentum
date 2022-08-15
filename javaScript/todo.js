const deskTaskInput = document.getElementById('description-task'),
      todosWrapper = document.querySelector('.todos-wrapper'),
      todoContainer = document.querySelector('.flex-wrapper')


let tasksArr = [] // здесь будут храниться наши задачи
// описание задачи должно попадать в todos
// задачи записывать в объект, используя конструктор!

let itemTodoElems = []

!localStorage.tasks ? tasksArr = [] : tasksArr = JSON.parse(localStorage.getItem('tasks'))

if(JSON.parse(localStorage.getItem('todoContainerActive')) == true ){
    todoContainer.classList.add('active-todo');

}

// = JSON.parse(localStorage.getItem('todoContainerActive'))

// если у нас локальном хранилище ничего нет, то TasksArr будет равен пустому массиву

function Task(descriprionTask){
    this.descriprion = descriprionTask // this.descriprion - это ключ объекта, который мы создаем
    this.completed = false 
    this.contenteditable = false 
    this.readable = 'readonly'// меняется на true, когда задача выполнена в туду листе
}
// то что вводит пользователь в инпут


// создаем шаблон для добавления в HTML
const createTemplate = (task, index) =>{
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="buttons">
                <input onclick = "completeTask(${index})" class="btn-conplete" type="checkbox" ${task.completed ? 'checked' : ''}>
            </div>
            <div class="description">
            
            <input type="text" class="input-text" value="${task.descriprion}" onkeypress="saveTask(event,${index})" readonly>
            </div>
            <div class="more buttons">
                <div class="icon-wrapper">

            <button class="button-edit buttonR" onclick = "editTask(${index})">
                <svg   class="icon more-icon " version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 217.855 217.855" style="enable-background:new 0 0 217.855 217.855;" xml:space="preserve">
                <path d="M215.658,53.55L164.305,2.196C162.899,0.79,160.991,0,159.002,0c-1.989,0-3.897,0.79-5.303,2.196L3.809,152.086
                c-1.35,1.352-2.135,3.166-2.193,5.075l-1.611,52.966c-0.063,2.067,0.731,4.069,2.193,5.532c1.409,1.408,3.317,2.196,5.303,2.196
                c0.076,0,0.152-0.001,0.229-0.004l52.964-1.613c1.909-0.058,3.724-0.842,5.075-2.192l149.89-149.889
                C218.587,61.228,218.587,56.479,215.658,53.55z M57.264,201.336l-42.024,1.28l1.279-42.026l91.124-91.125l40.75,40.743
                L57.264,201.336z M159,99.602l-40.751-40.742l40.752-40.753l40.746,40.747L159,99.602z"/>
                </svg>
            </button>

            <button class="button-edit buttonR"  onclick = "deleteTask(${index})">
                <svg version="1.1" class="icon more-icon " id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 443 443" style="enable-background:new 0 0 443 443;" xml:space="preserve">

                    <rect x="61.785" y="128" width="60" height="290"/>
                    <path d="M211.785,250.65V128h-60v290h44.172c-14.861-21.067-23.602-46.746-23.602-74.43
                        C172.356,307.145,187.486,274.193,211.785,250.65z"/>
                    <path d="M301.785,214.141l0-86.141h-60v100.918C259.731,219.488,280.144,214.141,301.785,214.141z"/>
                    <path d="M321.785,38h-83.384V0H125.169v38H41.785v60h280V38z M155.169,30h53.232v8h-53.232V30z"/>
                    <path d="M301.785,244.141c-54.826,0-99.429,44.604-99.429,99.429S246.959,443,301.785,443s99.43-44.604,99.43-99.43
                        S356.611,244.141,301.785,244.141z M355.961,376.533l-21.213,21.213l-32.963-32.963l-32.963,32.963l-21.213-21.213l32.963-32.963
                        l-32.963-32.963l21.213-21.213l32.963,32.963l32.963-32.963l21.213,21.213l-32.963,32.963L355.961,376.533z"/>
                </svg>
            </button>
         
                </div>
            </div>
        </div>
    `
}

          // <svg class="icon more-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
                    //     <path d="M8 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM52 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM30 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"></path>
          // </svg>

const fillHtmlLists = () =>{
    //для начала нужно зачищать задачи!
    todosWrapper.innerHTML = '';
    if(tasksArr.length > 0){
        tasksArr.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index)
        })
       
        itemTodoElems = document.querySelectorAll('.todo-item')
    }
}
fillHtmlLists();//обращается к массиву


const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasksArr))
}
// отправляем в localStorage данные полученные из инпута. т.к он лучше рабочает с JSON, используем его метод JSON.stringify

const completeTask = (indexElement) => {
    tasksArr[indexElement].completed = !tasksArr[indexElement].completed  //меняем на противопложное значение
    if(tasksArr[indexElement].completed){
        
        itemTodoElems[indexElement].classList.add('checked')
        
    } else {
        itemTodoElems[indexElement].classList.remove('checked')
    }
    updateLocal() // изменение локал сториджа
    fillHtmlLists()
}


// удаление задач!!! по кнопке

deskTaskInput.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
        tasksArr.push(new Task(deskTaskInput.value))
        console.log(tasksArr)
        updateLocal() 
        fillHtmlLists()
        deskTaskInput.value = '' //очищаем строку инпута

    }
  });

//   кнопка комплит ищем по индексу массива
const deleteTask = (index) => {
    itemTodoElems[index].classList.add('delition')
    setTimeout(()=>{
        tasksArr.splice(index, 1);
        updateLocal()
        fillHtmlLists()
    }, 500)

}



const deskTask = document.querySelectorAll('.description')


const editTask = (index) => {
    const inputTasks = document.querySelectorAll('.input-text')
    inputTasks[index].readOnly = !inputTasks[index].readOnly
    if(!inputTasks[index].readOnly){
        
        itemTodoElems[index].classList.add('edition')
        
    } else {
        itemTodoElems[index].classList.remove('edition')
    }
    

    // добавить класс к инпуту

}


const saveTask = (event, index) => {
    if (event.code !== 'Enter') {
        return null
    }

    tasksArr[index].descriprion = event.target.value
    event.target.readOnly = true
    itemTodoElems[index].classList.remove('edition')

    updateLocal()
}



// window.addEventListener('click', e => {
//     const target = e.target
//     console.log(target)
//     })


// open todo

const todoClick = document.querySelector('.todo-icon')
// let todoContainerActive


todoClick.addEventListener('click', function(){
    console.log('pushhhh')
    todoContainer.classList.toggle('active-todo');
    console.log(todoContainer.classList.contains('active-todo'))
    if(!todoContainer.classList.contains('active-todo')){
        
        // todoContainerActive = false
        setLocalStorageTodo(false)
    } else setLocalStorageTodo(true)
    
}) // open modal window on click by button


function setLocalStorageTodo(value) {
    localStorage.setItem('todoContainerActive',  value);
  }

