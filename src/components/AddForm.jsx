import React from "react";
import { useSelector } from "react-redux";
import { activeListSelector } from "../store/activeList/reducer";
import { Formik } from "formik";
import * as yup from 'yup';


const AddForm = ({listId, ...props}) => {
    
    const today = new Date();
    today.setHours(0, 0, 0, 0)

    const validationsSchema = yup.object().shape({
        title: yup.string().test('len', 'Must be exactly 5 characters', t => t && t.length >= 5).required(),
        desc: yup.string().test('len', 'Must be exactly 5 characters', t => t && t.length >= 5).required(),
        dueDate: yup.date().min(today, 'Date cannot be in the past').required('Enter expiration date')
    })

    return (
        
        <Formik
        initialValues={{listId:  Number(listId), title: '', desc: '', dueDate: ''}}
        onSubmit={(values, {resetForm}) => {
            props.onSubmit(values)
            resetForm()
        }}
        validateOnBlur
        validationSchema={validationsSchema}
        
    >
        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) =>
        
            <div className="add-form mt-2">
                <div className="input-group">
                    <div className="input-group-prepend">
                    <i className="bi bi-fonts input-group-text" id="taskNewTitle"></i>
                    </div>
                    <input name="title" onChange={handleChange} onBlur={handleBlur} type="text" value={values.title} className="form-control"  placeholder="Title" autocomplete="off"></input>
                    {touched.title && errors.title && <p className='error-label'>{errors.title}</p> }
                </div>
                <div className="input-group mt-2">
                    <div className="input-group-prepend">
                    <i className="bi bi-type input-group-text" id="taskNewDesc"></i>
                    </div>
                    <input name="desc" onChange={handleChange} onBlur={handleBlur} type="text" value={values.desc} className="form-control" aria-describedby="taskNewDesc" placeholder="Description" autocomplete="off"></input>
                    {touched.desc && errors.desc && <p className='error-label'>{errors.desc}</p> }
                </div>
                <div className="input-group mt-2">
                    <div className="input-group-prepend">
                    <i className="bi bi-calendar-date input-group-text" id="taskNewExpDate"></i>
                    </div>
                    <input name="dueDate" onChange={handleChange} onBlur={handleBlur} type="date" value={values.dueDate} className="form-control edit-exp-date" aria-describedby="taskNewExpDate" placeholder="Expiration date" autocomplete="off"></input>
                    {touched.dueDate && errors.dueDate && <p className='error-label'>{errors.dueDate}</p> }
                </div>
                <button disabled={!(isValid && dirty)} onClick={handleSubmit} type="submit" className="btn btn-sm btn-success mt-4 task-save-button w-100">Create New</button>
        </div>
        }
    </Formik>
    )
}

export default AddForm