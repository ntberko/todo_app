
//Will store all todos
let todoItems = [];

function rendererTodoList() {
    for (let todo of todoItems){
        renderTodo(todo);
    }
}

// This function gets to-do object and rendering the page.
//
// @param todo - Todo object
function renderTodo(todo) {

    const list = document.querySelector('.js-todo-list');
    const binlist = document.querySelector('.js-bin-list');
    let item = document.querySelector(`[id='${todo.id}']`);

    if (todo.deleted) {
        if(!item){
            item = document.createElement("li");
            item.setAttribute('id', todo.id);
            item.setAttribute('data-key', todo.id);

        }
        binlist.append(item);
        item.innerHTML = `
            <input id="${todo.id}" type="checkbox"/>
            <label for="${todo.id}" class="tick js-tick"></label>
            <span>${todo.text}</span>
            <button onclick="restoreTodo(${todo.id})">
            restore
            </button>
          `;
        updatebin();
        return
    }

    const isChecked = todo.checked ? 'done' : '';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.setAttribute('id', todo.id);
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span id="span${todo.id}">${todo.text}</span>
    <button onclick="editTodo(${todo.id})">edit</button>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

    if (todo.restore) {
        item.remove();
        delete todo.restore;
        list.append(node);
        updatebin();
        setCookie();
        return
    }

    if (item) {
        list.replaceChild(node, item);
    }
    else {
        list.append(node);
    }
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
        deleted: false
    };
    todoItems.push(todo);
    setCookie();
    renderTodo(todo);
    console.log("addTodo",getCookie());
}


function setCookie() {
    console.log("setCookie", todoItems);
    document.cookie = JSON.stringify(todoItems);
}

function getCookie() {
    let decodedCookie = decodeURIComponent(document.cookie);
    if (!document.cookie || document.cookie.length == 0){
        return;
    }
    console.log("getCookie", decodedCookie);
    todoItems = JSON.parse(decodedCookie);
    return todoItems;
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].checked = !todoItems[index].checked;
    setCookie();
    renderTodo(todoItems[index]);
}

//
function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].deleted = true;
    setCookie();
    renderTodo(todoItems[index]);
}

// This function gets to-do id, changes its deleted value to false and restore to true,
// and rendering the new list.
function restoreTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].deleted = false;
    setCookie();
    todoItems[index].restore = true;
    console.log(todoItems[index]);
    renderTodo(todoItems[index]);
}

// This function gets to-do id and rendering an edit form for the selected to-do item
function editTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const editspan = document.querySelector("#span" + key);
    editspan.innerHTML = `
    <form class="edit-form" onsubmit="updateTodo(${index})" >
      <input class="edit-input" autofocus type="text" placeholder="${todoItems[index].text}">
    </form>    `;
}

// This function renders the count of deleted items at the Bin.
function updatebin() {
    const binlist = document.querySelector('.bincount');
    let bincount = todoItems.filter(todoItem => todoItem.deleted).length;

    binlist.innerText = bincount;
}

function updateTodo(index) {
    event.preventDefault();
    const input = document.querySelector('.edit-input');
    const text = input.value.trim();
    if (text !== '') {
        todoItems[index].text = text;
        setCookie();
        renderTodo(todoItems[index]);
    }
}


const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});


const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});


window.addEventListener('load', (event) => {
    getCookie()
    rendererTodoList();
});
