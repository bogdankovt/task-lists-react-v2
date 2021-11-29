import React from "react";
import Task from "./Task";
import { useState, useRef, useEffect} from "react";
import { useParams } from "react-router";
import ListTasksService from "../ListTasksService";
import AddForm from "./AddForm";
import EditTaskModal from "./EditTaskModal";
import { useSelector, useDispatch } from "react-redux";
import { setActiveList } from "../store/activeList/actions";
import { fetchDashboard, fetchListById } from "../asyncActions/dashboard";

const ListTasks = () => {

    const dispatch = useDispatch()
    const listId = useParams().id;
    let activeListContext;
    const activeList = useSelector(state => state.activeList)

    const [modalData, setModalData] = useState({});
    const [showDone, setShowDone] = useState(false);
    const [lastUpdate, setLastUpdate] = useState([]);

    const visibleTask = showDone ? activeList.tasks : activeList.tasks.filter(t => !t.isDone)


    useEffect(() => {
        dispatch(fetchListById(listId))
    }, [listId])

    useEffect(() => {
        dispatch(fetchListById(listId))
        dispatch(fetchDashboard())
    }, [lastUpdate])

    const trigerUpdate = () => {
        setLastUpdate(new Date().getTime());
    }

    

    const addNewTask = (t) => {
        ListTasksService.createTaskForList(listId, t)
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
                        <input type="checkbox" id="checkbox-show-done" onChange={e => setShowDone(e.target.checked)} />
                    </div>
                </div>
                <hr/>
               
                <div className="active-list-tasks-content overflow-auto show-done">
                    {/* {visibleTask.map(t => <Task  key={t.taskId} task={t} onEdit={setModalData} onDelete={deleteTask}/>)} */}
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