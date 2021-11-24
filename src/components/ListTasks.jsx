import React from "react";
import Task from "./Task";


const ListTasks = ({activeList}) => {

    let activeListContent;

    if(activeList.tasks) {
        if(!activeList.tasks.length) {
            activeListContent = <p>list <strong>{activeList.title}</strong> is empty</p>
        }else {
            return (
                <div className="active-list-content card flex-column">
                    <div className="active-list-content-header flex-grow-1">
                        <h3>{activeList.title}</h3>
                        <hr/>
                    </div>
                    <div className="active-list-tasks-content overflow-auto">
                        {activeList.tasks.map(t => <Task task={t}/>)}
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