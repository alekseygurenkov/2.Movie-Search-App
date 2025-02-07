fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
        title: 'новая задача',
        completed: false
    }),
    headers: {
        'Content-Type': 'application/json'
    }
})

    .then(response => response.json())
    .then(json => console.log(json))