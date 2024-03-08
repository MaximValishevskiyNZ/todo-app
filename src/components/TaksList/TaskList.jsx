import React from "react";
import './TaskList.css'
import Task from "../Task";

function TaskList({ tasks }) {
    console.log(tasks)
    return (
        <ul className="todo-list">
            { tasks.map((task) => <Task task={task}/> )}
        </ul>
    )
}

export default TaskList