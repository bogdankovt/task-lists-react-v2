export default {

    getAll() {
        return fetch('http://localhost:5000/dashboard')
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    },

    getListById(id) {
        return fetch(`http://localhost:5000/lists/${id}`)
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))

    },

    createTaskForList(listId, t) {
        return fetch(`http://localhost:5000/tasks?listId=${listId}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(t)
          });
    }
    // createNew(taskObj) {
    //     return fetch(`${tasksEndpoint}?listId=18`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(taskObj)
    //     })
    //     .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    // },
    // update(taskObj) {
    //     return fetch(`${tasksEndpoint}/${taskObj.taskId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(taskObj)
    //     })
    //     .then(res => res.ok ? res.json() : Promise.reject(res.statusText))    
    // },
    // remove(id) {
    //     return fetch(`${tasksEndpoint}/${id}`, {
    //         method: 'DELETE',
    //     })
    //     .then(res => res.status == 204 ? console.log('removed') : Promise.reject(res.statusText))    
    // }

}