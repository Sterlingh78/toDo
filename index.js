let toDos = [
    /*{
        id: 0,
        name: "Take out trash",
        done: false
    },
    {
        id: 1,
        name: "Do Homework",
        done: false
    },
    {
        id: 2,
        name: "Do Laundry",
        done: false
    }*/
]

function pendingItems(arr) {
    const alertText = document.querySelector(".alert")
    let count = 0
    for (i = 0; i < arr.length; i ++) {
        if (arr[i].done == false) {
            count += 1
        }
    }

    alertText.textContent = `You have ${count} pending tasks.`
}

function setDoneItem(elem,arr) {
     elem.classList.add("done")
     for (i = 0; i < arr.length; i++) {
        if (elem.id == arr[i].id) {
            arr[i].done = true
        }
    }
    pendingItems(toDos)
}

function showToDo(arr) {
    const list = document.querySelector(".todoList")

    for (i = 0; i < arr.length; i++) {
        const toDoItem = document.createElement("li")
        toDoItem.setAttribute("ondblclick","setDoneItem(this,toDos);")
        toDoItem.id = arr[i].id
        toDoItem.textContent = `${arr[i].name}`
        if (arr[i].done == true) {
            toDoItem.classList.add("done")
        }

        const editBtn = document.createElement("span")
        editBtn.classList.add("editBtn")
        editBtn.id = arr[i].id
        editBtn.setAttribute("onclick","editToDo(this,toDos);")
        const editIcon = document.createElement("i")
        editIcon.classList.add("fa", "fa-edit")
        editBtn.appendChild(editIcon)

        const trashBtn = document.createElement("span")
        trashBtn.classList.add("trashBtn")
        trashBtn.setAttribute("onclick","deleteToDo(this,toDos);")
        trashBtn.id = arr[i].id
        const trashIcon = document.createElement("i")
        trashIcon.classList.add("fa", "fa-trash")
        trashBtn.appendChild(trashIcon)

        editBtn.id = arr[i].id
        trashBtn.id = arr[i].id

        toDoItem.appendChild(editBtn)
        toDoItem.appendChild(trashBtn)

        list.appendChild(toDoItem)
    }
    pendingItems(toDos)
}

function addToDo(arr) {
    const list = document.querySelector(".todoList")
    const inputField = document.querySelector("input")
    
    if (inputField.value !== "") {
        arr.push({
            id: arr.length,
            name: `${inputField.value}`,
            done: false
        })
    
        inputField.value = ""
        inputField.setAttribute("placeholder","Enter new task")
    
        list.innerHTML = ""
        showToDo(toDos)
    }
}

function editToDo(elem,arr) {
    const wrapper = document.querySelector(".inputField")
    const addInput = document.querySelector("input")
    const addBtn = document.querySelector("button")
    addInput.remove()
    addBtn.remove()

    const itemID = elem.id
    const editInput = document.createElement("input")
    editInput.setAttribute("type","text")
    for (i = 0; i < arr.length; i++) {
        if (i == itemID) {
            editInput.setAttribute("placeholder",`${arr[i].name}`)
        }
    }

    const editBtn = document.createElement("button")
    editBtn.setAttribute("type","button")
    editBtn.setAttribute("onclick","finishEdit(toDos);")

    const icon = document.createElement("i")
    icon.classList.add("fas","fa-edit")

    editBtn.appendChild(icon)
    wrapper.appendChild(editInput)
    wrapper.appendChild(editBtn)
}

function finishEdit(arr) {
    const newInput = document.querySelector("input")

    for (i = 0; i < arr.length; i ++) {
        if (arr[i].name == newInput.placeholder) {
            arr[i].name = newInput.value
        }
    }

    const wrapper = document.querySelector(".inputField")
    const list = document.querySelector(".todoList")
    const editInput = document.querySelector("input")
    const editBtn = document.querySelector("button")
    editInput.remove();
    editBtn.remove();

    const addInput = document.createElement("input")
    addInput.setAttribute("type","text")
    addInput.setAttribute("placeholder","Enter new task")

    const addBtn = document.createElement("button")
    addBtn.setAttribute("type","button")
    addBtn.setAttribute("onclick","addToDo(toDos);")

    const icon = document.createElement("i")
    icon.classList.add("fas","fa-plus")

    addBtn.appendChild(icon)
    wrapper.appendChild(addInput)
    wrapper.appendChild(addBtn)

    list.innerHTML = ""
    showToDo(toDos)
}

function deleteToDo(elem,arr) {
    for (i = 0; i < arr.length; i++) {
        if (elem.id == arr[i].id) {
            arr.splice(i, 1)
        }
    }

    finishEdit(toDos)

    const list = document.querySelector(".todoList")
    list.innerHTML = ""

    showToDo(toDos)
}

function clearDoneItems(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].done == true) {
            arr.splice(i, 1)
        }
    }

    const list = document.querySelector(".todoList")
    list.innerHTML = ""

    showToDo(toDos)
    console.log(toDos)
}