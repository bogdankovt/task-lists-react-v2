import React from "react";


const AddForm = ({...props}) => {

    const submitHandle = (e) => {
        e.preventDefault();
        props.onSubmit(props.value)
        e.target.reset();
    }

    const addChange = (e) => {
        props.value = e.target.value;
    }
    return (
        <div className="add-form">
            <form onSubmit={submitHandle}>
                <input type="text" value={props.reset} onChange={addChange}/>
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddForm