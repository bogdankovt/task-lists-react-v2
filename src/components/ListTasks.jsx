import React from "react";
import Task from "./Task";
import { useState, useRef } from "react";

const ListTasks = ({activeList, ...props}) => {

    let activeListContent;
    const tasksElement = useRef({});

    const renderAllTask = () => {
        tasksElement.current.classList.toggle('show-done')
    }
    

    if(activeList.tasks) {
        if(!activeList.tasks.length) {
            activeListContent = <p>list <strong>{activeList.title}</strong> is empty</p>
        }else {
            if(activeList.tasks.filter(t => t.isDone == false).count == 0) {
                console.log('dsdsds');
            }
            return (
                <div className="active-list-content card flex-column">
                    <div className="active-list-content-header d-flex align-items-center justify-content-between">
                        <h3>{activeList.title}</h3>
                        <input defaultChecked={true} type="checkbox" onChange={renderAllTask} />
                    </div>
                    <hr/>
                    <div ref={tasksElement} className="active-list-tasks-content overflow-auto show-done">
                        {activeList.tasks.map(t => <Task onDelete={props.onDelete} onEdit={props.onEdit} key={t.taskId} task={t}/>)}
                    </div>
                </div>
            )
        }
    }else {
        activeListContent = <p>{activeList.title}</p>
    }
    return (
        <div className="active-list-content card">
            <div className="message-box">
                {activeListContent}
            </div>
        </div>
    )
    // return (
    //     <div className="selected">
    //             <h1>{activeList.title}</h1>
    //             {
    //                 activeList.tasks ? activeList.tasks.map(t => <Task task={t}/>) : <p>Asdadasdasdasd</p>
    //             }
    //     </div>
    // )
}

export default ListTasks