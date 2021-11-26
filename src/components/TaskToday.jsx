import React from "react";
import { Link } from "react-router-dom";


const formatDate = (date) => {
    return `${date.toLocaleString('default', { month: 'short' })} ${date.toLocaleString('default', {  day: '2-digit' })}`
}
const TaskToday = ({task, ...props}) => {

    


    return (
        <div className="card mt-3">
            <div className={`card-header text-white ${formatDate(new Date(task.dueDate)) === formatDate(new Date()) ? 'bg-primary' : 'bg-danger'}`}>
                <h5 className="card-title">{task.title}</h5>
                <div className="card-actions">
                    <u><Link to={`/lists-tasks/${task.listId}`} className="text-white" >{task.listTitle}</Link></u>
                    <span className="action-content ml-3">{formatDate(new Date(task.dueDate))}</span>
                </div>
            </div>
                           
            <div className="card-body">
                {task.desc}
                <hr/>
            </div>
        </div>
    )
}

export default TaskToday