import React from "react";


const AddForm = ({...props}) => {

    const dateToday = new Date().toISOString().split('T')[0];
    props.task = {title: '', desc:'', dueDate: dateToday}

    const submitHandle = (e) => {
        e.preventDefault();
        props.onSubmit(props.task)
        e.target.reset()
    }

    const setField = (e) => {
        props.task[e.target.name]  = e.target.value;  
    }
    return (
        
                        <div className="add-form mt-2">
                            <form name="taskEditForm" onSubmit={submitHandle}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <i className="bi bi-fonts input-group-text" id="taskNewTitle"></i>
                                    </div>
                                    <input name="title" onChange={setField} type="text" className="form-control"  placeholder="Title"></input>
                                </div>
                                <div className="input-group mt-2">
                                    <div className="input-group-prepend">
                                    <i className="bi bi-type input-group-text" id="taskNewDesc"></i>
                                    </div>
                                    <input name="desc" onChange={setField} type="text" className="form-control" aria-describedby="taskNewDesc" placeholder="Description"></input>
                                </div>
                                <div className="input-group mt-2">
                                    <div className="input-group-prepend">
                                    <i className="bi bi-calendar-date input-group-text" id="taskNewExpDate"></i>
                                    </div>
                                    <input name="dueDate" defaultValue={dateToday} onChange={setField} type="date" className="form-control edit-exp-date" aria-describedby="taskNewExpDate" placeholder="Expiration date"></input>
                                </div>
                                <button className="btn btn-sm btn-success mt-4 task-save-button w-100">Create New</button>

                            </form>
                        </div>
    )
}

export default AddForm