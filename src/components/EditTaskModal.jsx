import React from 'react'
import { useRef } from 'react'
import $ from 'jquery';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const formatDate = (d) => {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export default function EditTaskModal({data,isHide,...props}) {

    const modal = useRef({})
    
    props.task = {taskId: data.taskId, title: data.title, desc: data.desc, isDone: data.isDone, dueDate: data.dueDate}
    if(props.task.dueDate) {
        props.task.dueDate = formatDate(new Date(props.task.dueDate))
    }

    const onChange = (e) => {
        props.task[e.target.name] = e.target.value;
    }
    const sendToApp = (e) => {
        e.preventDefault()
        props.onSubmit(props.task)
        window.$(modal.current).modal('hide')
    }   


    return (
            <div ref={modal} className="modal fade demo" id="taskEditModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="task1title">Edit task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form name="taskEditForm" onSubmit={sendToApp}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <i className="bi bi-fonts input-group-text" id="taskNewTitle"></i>
                                    </div>
                                    <input name="title" onChange={onChange} defaultValue={props.task.title} type="text" className="form-control"  placeholder="Title"/>
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                    <i className="bi bi-type input-group-text" id="taskNewDesc"></i>
                                    </div>
                                    <input name="desc" onChange={onChange} type="text" defaultValue={props.task.desc} className="form-control" placeholder="Description"/>
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                    <i className="bi bi-calendar-date input-group-text" id="taskNewExpDate"></i>
                                    </div>
                                    <input onChange={onChange} name="dueDate" type="date" defaultValue={props.task.dueDate} className="form-control" placeholder="Expiration date"/>
                                </div>
                                <div className="modal-footer d-flex justify-content-between">
                                    <BootstrapSwitchButton onChange={(c) => props.task.isDone = c} checked={props.task.isDone} onlabel='Ready' offlabel='Not Ready' width={100} size='xs' onstyle="outline-success" offstyle="outline-danger"/>
                                    <button type="submit" className="btn btn-sm btn-success my-1 task-save-button">Save changes</button>
                                </div>
                            </form>                        
                        </div>
                    </div>
                </div>
            </div>
    
    )
}