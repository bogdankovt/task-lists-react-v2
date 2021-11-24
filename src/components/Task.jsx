import React from "react";


const formatDate = (date) => {
    return `${date.toLocaleString('default', { month: 'short' })} ${date.toLocaleString('default', {  day: '2-digit' })}`
}
const Task = ({task, ...props}) => {

    let taskClasses = ['card']
    let taskHeaderClasses = ["card-header", "text-white" ]
    let spanDate = formatDate(new Date(task.dueDate))
    let date = new Date(task.dueDate).setHours(0,0,0,0);
    let today = new Date().setHours(0,0,0,0);

    if(task.isDone) {
        taskClasses.push('done')
        taskHeaderClasses.push('bg-success')
    }else if(today > date) {
        taskHeaderClasses.push('bg-danger')
    }
    else{
        taskHeaderClasses.push('bg-primary')
    }
    


    return (
        <div className={taskClasses.join(' ')} id={task.taskId}>
            <div className={taskHeaderClasses.join(' ')}>
                <h5 className="card-title">{task.title}<i className="bi bi-check-all"></i></h5>
                <div className="card-actions">
                    <span className="action-content">{spanDate}</span>
                    <i className="bi bi-pencil-square edit"></i>
                    <i className="bi bi-trash remove-icon" onClick={() => props.onDelete(task.taskId)}></i>
                </div>
            </div>
                           
            <div className="card-body">
                {task.desc}
                <hr/>
            </div>
        </div>
    )
}

export default Task