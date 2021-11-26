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


    console.log(activeList);
    useEffect(() => {
        updateActiveList(queryParams.id)
    }, [lastUpdate])

    const visibleTask = showDone ? activeList.tasks : activeList.tasks.filter(t => t.isDone)
    //tasks update
    const addNewTask = (t) => {
        ListTasksService.createTaskForList(queryParams.id, t)
        .then(trigerUpdate);
    }

    const editTask = (t) => {
        console.log(t);
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
                    <div class="form-check d-flex align-items-center">
                        <label class="form-check-label mr-2" for="checkbox-show-done">
                        All
                        </label>
                        <input type="checkbox" id="checkbox-show-done"/>
                    </div>
                </div>
                <hr/>
               
                <div className="active-list-tasks-content overflow-auto show-done">
                    {activeList.tasks.map(t => <Task  key={t.taskId} task={t} onEdit={(t) => setModalData(t)} onDelete={deleteTask}/>)}
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