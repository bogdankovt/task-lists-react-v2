import React from "react";


const Task = ({task}) => {
    return (
        <div className={"card" + (task.isDone ? " done" : "")} id={task.taskId}>
            <div className="card-header text-white bg-success">
                <h5 className="card-title">{task.title}<i className="bi bi-check-all"></i></h5>
                <div className="card-actions">
                    <span className="action-content">{task.dueDate}</span>
                    <i className="bi bi-pencil-square edit"></i>
                    <i className="bi bi-trash remove-icon"></i>
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