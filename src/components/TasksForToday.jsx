import React from 'react'
import { useState, useEffect } from 'react'
import ListTasksService from '../ListTasksService'
import TaskToday from './TaskToday'

export default function TasksForToday() {
    const [TasksForToday, setTasksForToday] = useState([])

    useEffect(() => {
        ListTasksService.getCollectionToday()
        .then(res => setTasksForToday(res))
    }, [])

    return (
        <div>
            <h3>Task Collection Today</h3>
            <hr/>
            <div className="today-tasks overflow-auto">
                {
                    TasksForToday.map(t => <TaskToday key={t.taskId} task={t}/>)
                }
            </div>
        </div>
    ) 
}
