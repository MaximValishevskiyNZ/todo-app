import React from "react";
import './TaskList.css';
import PropTypes from "prop-types";
import Task from "../Task";



export default function TaskList({ tasks, onDelete, filter, setTasks }) {

    return (
        <ul className="todo-list">
            { tasks.map((task) => {
                switch (filter) {
                    case 'Completed':
                        return task.completed ? <Task task={task} onDelete={onDelete} tasks={tasks} setTasks={setTasks}/> : ''
                    case 'Active':
                        return !task.completed ? <Task task={task} onDelete={onDelete} tasks={tasks} setTasks={setTasks}/> : ''
                    default:
                        return <Task task={task} onDelete={onDelete} tasks={tasks} setTasks={setTasks}/>
                }
                }
                )
            }
        </ul>
    )
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    setTasks: PropTypes.func.isRequired,
};

