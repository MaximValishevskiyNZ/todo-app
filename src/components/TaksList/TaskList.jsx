import React from "react";
import './TaskList.css';
import PropTypes from "prop-types";
import Task from "../Task";

class TaskList extends React.Component {
    render() {
        const { tasks, onDelete, setTasks, editTask, switchTimer } = this.props;
        return (
            <ul className="todo-list">
                {tasks.map((task) => <Task key={task.id} task={task} onDelete={onDelete} tasks={tasks} setTasks={setTasks} editTask={editTask} switchTimer={switchTimer}/>)}
            </ul>
        )
    }
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            added: PropTypes.instanceOf(Date).isRequired
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    setTasks: PropTypes.func.isRequired,
};

export default TaskList;