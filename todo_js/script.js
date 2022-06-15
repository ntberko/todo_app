
//Will store all todos
let todoItems = [];

function renderTodo(todo) {

    const list = document.querySelector('.js-todo-list');
    const binlist = document.querySelector('.js-bin-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
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
    renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].deleted = true;
    renderTodo(todoItems[index]);
    console.log(todoItems);
}


function restoreTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].deleted = false;
    todoItems[index].restore = true;
    renderTodo(todoItems[index]);
}


function editTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const editspan = document.querySelector("#span" + key);
    editspan.innerHTML = `
    <form class="edit-form" onsubmit="myFunction(${index})" >
      <input class="edit-input" autofocus type="text" placeholder="${todoItems[index].text}">
    </form>    `;
}


function updatebin() {
    const bincount = document.querySelector('.bincount');
    const binlist = document.querySelector('.js-bin-list');

    bincount.innerText = binlist.childElementCount;
}

function myFunction(index) {
    event.preventDefault();
    const input = document.querySelector('.edit-input');
    const text = input.value.trim();
    if (text !== '') {
        todoItems[index].text = text;
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
