import React from "react";
import Task from "./Task";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router";
import ListTasksService from "../ListTasksService";
import AddForm from "./AddForm";
import EditTaskModal from "./EditTaskModal";
import { useSelector, useDispatch } from "react-redux";
import { activeListSelector } from "../store/activeList/reducer";
import * as asyncActions from "../asyncActions/index"

function useActionCreator(actionCreator) {
    const dispatch = useDispatch();
    return useMemo(() => {
        switch (actionCreator.length) {
            case 1: return (p1) => dispatch(actionCreator(p1));
            case 2: return (p1, p2) => dispatch(actionCreator(p1, p2));
            default: throw `Unsupported params legths: ${actionCreator.name}(${actionCreator.length})`
        }
    }, [actionCreator])
}

const ListTasks = () => {


    const dispatch = useDispatch()
    const listId = useParams().id;
    let activeListContext;
    const activeList = useSelector(activeListSelector)

    const [modalData, setModalData] = useState({});
    const [showDone, setShowDone] = useState(false)

    const visibleTask = showDone ? activeList.tasks : activeList.tasks.filter(t => !t.isDone)

    const fetchListById = useActionCreator(asyncActions.fetchListById);
    useEffect(() => {
        fetchListById(listId)
    }, [listId])



    const createTask = useActionCreator(asyncActions.createTask);
    const updateTask = useActionCreator(asyncActions.updateTask);
    const deleteTask = useActionCreator(asyncActions.deleteTask);


    if (!activeList.tasks.length) {
        activeListContext =
            <div className="message-box">
                <p>list <strong>{activeList.title}</strong> is empty</p>
            </div>
    } else {

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
                <hr />

                <div className="active-list-tasks-content overflow-auto show-done">
                    {/* {visibleTask.map(t => <Task  key={t.taskId} task={t} onEdit={setModalData} onDelete={deleteTask}/>)} */}
                    {visibleTask.map(t => <Task key={t.taskId} task={t} onDelete={deleteTask} onEdit={setModalData}/>)}

                </div>

            </div>
    }



    return (


        <div className="h-100 d-flex flex-column justify-content-between">
            <div className="active-list-content h-100">
                {activeListContext}
            </div>
            <AddForm onSubmit={createTask} />
            <EditTaskModal data={modalData} onSubmit={updateTask} />
        </div>

    )
}

export default ListTasks