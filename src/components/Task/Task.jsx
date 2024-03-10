import React from "react";
import './Task.css'
import PropTypes from "prop-types";


export default function Task({ task, onDelete, setTasks, tasks }) {
    const { text, completed = false , id} = task;
    const status = completed ? "completed" : "";

    const changeTaskStatus = () => {
        setTasks(tasks.map(item => task.id === item.id ? {...task, completed: !task.completed} : item))
    }

    return (
        <li className={status}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={completed} onChange={() => changeTaskStatus()} id={"taskToggle" + task.id} />
                <label htmlFor={"taskToggle" + task.id}>
                    <span className="description">{text}</span>
                    <span className="created">created 5 minutes ago</span>
                </label>
                <button className="icon icon-edit" type="button" aria-label="Edit task">
                    <span aria-hidden="true" />
                </button>
                <button className="icon icon-destroy" type="button" onClick={() => onDelete(id)} aria-label="Delete task">
                    <span aria-hidden="true" />
                </button>
            </div>
        </li>
    );
}

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    setTasks: PropTypes.func.isRequired
};
