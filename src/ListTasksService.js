export default {

    getAll() {
        return fetch('http://localhost:5000/dashboard')
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    },
    getListById(id) {
        return fetch(`http://localhost:5000/lists/${id}`)
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))

    },
    createTaskForList(task) {
        return fetch(`http://localhost:5000/tasks`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(task)
          })
          .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    },
    updateTask(task) {
        return fetch(`http://localhost:5000/tasks/${task.taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))  
    },
    removeTask(taskId) {
        return fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: 'DELETE',
        })
        .then(res => res.status === 204 ? 'removed' : Promise.reject(res.statusText))  
    },
    getCollectionToday() {
        return fetch('https://localhost:5001/collection/today')
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }
}