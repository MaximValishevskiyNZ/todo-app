import React from "react";
import './Task.css'
import PropTypes from "prop-types";
import {formatDistanceToNow} from "date-fns";


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.changeTaskStatus = this.changeTaskStatus.bind(this);
    }
    
    changeTaskStatus() {
        const { task, tasks, setTasks } = this.props;
        setTasks(tasks.map(item => task.id === item.id ? {...task, completed: !task.completed} : item));
    }

    render() {
        const { task, onDelete } = this.props;
        const { text, completed = false, id , added} = task;
        const status = completed ? "completed" : "";
        return (
            <li className={status}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={completed} onChange={this.changeTaskStatus} id={`taskToggle${  task.id}`} />
                    <label htmlFor={`taskToggle${  task.id}`}>
                        <span className="description">{text}</span>
                        <span className="created">created {formatDistanceToNow(added, {includeSeconds: true})} ago</span>
                    </label>
                    <button className="icon icon-edit" type="button" aria-label="Edit task">
                        <span aria-hidden="true" />
                    </button>
                    <button className="icon icon-destroy" type="button" onClick={() => onDelete(id)} aria-label="Delete task">
                        <span aria-hidden="true" />
                    </button>
                </div>
                <input type="text" className="edit"/>
            </li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        added: PropTypes.instanceOf(Date).isRequired
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

export default Task;