
let todos = getTodos();
const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function(e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#hide-completed').addEventListener('change', function(e) {
    filters.hideCompleted = e.target.checked
    console.log(e.target.checked)
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', function(e) {
    e.preventDefault()
    if(e.target.elements.text.value == '')
    {
        window.alert("Data kosong");
    }
    else
    {
        let tampungTodos = todos;
        let statusInsert = true;
        for(loops = 0; loops < tampungTodos.length; loops++)
        {
            const tampungText = tampungTodos[loops].text;
            if(tampungText.toLowerCase() == e.target.elements.text.value.toLowerCase())
            {
                statusInsert = false;
            }
        }
        if(statusInsert === true)
        {
            todos.push({
                text: e.target.elements.text.value,
                completed: false
            })
            saveTodos(todos)
            renderTodos(todos, filters)
            e.target.elements.text.value = ''
            window.alert("Success");
        }
        else
        {
            window.alert("Data sudah ada");
        }
    }
    location.reload();
})

document.querySelector('#delete-first-todo').addEventListener('submit', function(e) {
    e.preventDefault()
    todos.shift()
    saveTodos(todos)
    renderTodos(todos, filters)
    location.reload();
})

document.querySelector('#delete-last-todo').addEventListener('submit', function(e) {
    e.preventDefault()
    todos.pop()
    saveTodos(todos)
    renderTodos(todos, filters)
    location.reload();
})

for(loop = 0; loop < todos.length; loop++)
{
    document.querySelector(`input[name=${todos[loop].text}]`).addEventListener('change', function(e){
        e.preventDefault()
        for(loops = 0; loops < todos.length; loops++)
        {
            if(todos[loops].text == this.value)
            {
                let todosComplete = todos[loops].completed;
                if(todosComplete == true)
                {
                    todos[loops].completed = false;
                }
                else
                {
                    todos[loops].completed = true;
                }
            }
        }
        saveTodos(todos)
        renderTodos(todos, filters)
        location.reload();
    })
}


// remove local storage
// localStorage.removeItem('todos')