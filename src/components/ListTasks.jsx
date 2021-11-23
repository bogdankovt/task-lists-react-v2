import React from "react";


const ListTasks = ({activeList}) => {
    return (
        <div className="selected">
            <h1>{activeList.title}</h1>
            <ol>
                {
                    activeList.tasks ? activeList.tasks.map(t => <li>{t.title}</li>) : ""
                }
            </ol>
        </div>
    )
}

export default ListTasks