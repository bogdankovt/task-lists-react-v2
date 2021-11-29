import React from "react";
import Task from "./Task";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import ListTasksService from "../ListTasksService";
import AddForm from "./AddForm";
import EditTaskModal from "./EditTaskModal";

const useLists = () => {}

const ListTasks = () => {

    const [activeList, setActiveList] = useState({tasks: []})
    const [lastUpdate, setLastUpdate] = useState([]);
    const [modalData, setModalData] = useState({taskId : '', title : '', desc : '', isDone: '', dueDate: ''});
    const [showDone, setShowDone] = useState(false);
    
    let queryParams = useParams();
    let activeListContext;
    
    const visibleTask = showDone ? activeList.tasks : activeList.tasks.filter(t => !t.isDone)


    //getAndSetTasksForActiveList
    const updateActiveList = (listId) => {
        ListTasksService.getListById(listId)
        .then(res => {
            setActiveList(res)
          })
    }
    
    //update content
    function trigerUpdate() {
        setLastUpdate(new Date().getTime());
    }

    useEffect(() => {
        updateActiveList(queryParams.id)
    }, [queryParams.id]);


    useEffect(() => {
        updateActiveList(queryParams.id)
    }, [lastUpdate])

    //tasks update

    console.log(visibleTask);
    const addNewTask = (t) => {
        ListTasksService.createTaskForList(queryParams.id, t)
        .then(trigerUpdate);
    }

    const editTask = (t) => {
        ListTasksService.updateTask(t)
        .then(trigerUpdate)
    }

    const deleteTask = (taskId) => {
        ListTasksService.removeTask(taskId)
        .then(trigerUpdate)
    }
    

    
    if(!activeList.tasks.length) {
        activeListContext =
        <div className="message-box">
            <p>list <strong>{activeList.title}</strong> is empty</p>
        </div>
    }else {
        
        activeListContext = 
            <div>
                <div className="active-list-content-header d-flex justify-content-between align-items-center">
                    <h3>{activeList.title}</h3>
                    <div className="form-check d-flex align-items-center">
                        <label className="form-check-label mr-2" htmlFor="checkbox-show-done">
                        All
                        </label>
                        <input type="checkbox" id="checkbox-show-done" onChange={(e) =>  setShowDone(e.target.checked)}/>
                    </div>
                </div>
                <hr/>
               
                <div className="active-list-tasks-content overflow-auto show-done">
                    {visibleTask.map(t => <Task  key={t.taskId} task={t} onEdit={setModalData} onDelete={deleteTask}/>)}
                </div>
            </div>
    }
    
    
    
    return (
        
            
                <div className="h-100 d-flex flex-column justify-content-between">
                    <div className="active-list-content h-100">
                        {activeListContext}
                    </div>
                    <AddForm onSubmit={addNewTask}/>
                    <EditTaskModal onSubmit={editTask} data={modalData}/>
                </div>
            
    )
}       

export default ListTasks