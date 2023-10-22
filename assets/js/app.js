let cl = console.log;
const todoForm = document.getElementById("todoForm");
const todoControl = document.getElementById("todo");
const submitbtn = document.getElementById("submitbtn");
const updatebtn = document.getElementById("updatebtn");


let todoArr = [{
    todoItem: "javascript",
    todoId: 1
}]

const onEdit = (ele) => {
    cl("Ediited", ele);
    let getEditId = ele.parentNode.parentNode.getAttribute('id');
    //cl(getEditId)
    //cl(todoArr)
    localStorage.setItem("edited", getEditId);
    let getObj = todoArr.find(todo => {
        return todo.todoId === getEditId
    })
    cl(getObj)
    todoControl.value = getObj.todoItem;
    submitbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
}

const onDelete = (ele) => {
    //cl("deleted!!1")
    let getDeleteId = ele.closest("li").id;
    // cl(getDeleteId);
    let getIndex = todoArr.findIndex(todo => {
            return todo.todoId === getDeleteId
        })
        //cl(getIndex);
    todoArr.splice(getIndex, 1);
    localStorage.setItem("todoArray", JSON.stringify(todoArr));
    document.getElementById(getDeleteId).remove()
}
const todoTemplting = (arr) => {
    let result = '<ul class="list-group">';
    arr.forEach(ele => {
        result += ` 
             
                     <li class="list-group-item d-flex justify-content-between" id="${ele.todoId}">
                           <span> ${ele.todoItem} </span>
                           <span>
                           <button class="btn btn-primary" onclick="onEdit(this)" >Edit</button>
                           <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                           </span>
                     </li>    
        `
    });
    result += '</ul>'
    todoContainer.innerHTML = result;

}

if (localStorage.getItem('todoArray')) {
    todoArr = JSON.parse(localStorage.getItem("todoArray"))
}
todoTemplting(todoArr)

const onTodoHandler = (eve) => {
    eve.preventDefault();
    let todoObj = {
        todoItem: todoControl.value,
        todoId: generateUUID()
    }
    todoArr.push(todoObj)
    localStorage.setItem('todoArray', JSON.stringify(todoArr))
    eve.target.reset()
        // cl(todoArr)
    todoTemplting(todoArr);
}
const onUpdatehandler = () => {
    let updatedeval = todoControl.value;
    // cl(updatedeval)
    let updatedId = localStorage.getItem("edited");
    //cl(updatedId)
    let getIndex = todoArr.findIndex(todo => {
        return todo.todoId === updatedId
    })
    cl(getIndex)
    todoArr[getIndex].todoItem = updatedeval
    localStorage.setItem("todoArray", JSON.stringify(todoArr))
    let li = document.getElementById(updatedId);
    cl(li.firstElementChild)
    li.firstElementChild.innerHTML = updatedeval;
    todoForm.reset()
    updatebtn.classList.add('d-none')
    submitbtn.classList.remove('d-none')

}
todoForm.addEventListener("submit", onTodoHandler);
updatebtn.addEventListener("click", onUpdatehandler)

function generateUUID() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}