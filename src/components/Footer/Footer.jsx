import React from "react"
import './Footer.css'
import TasksFilter from "../TasksFilter";
import PropTypes from "prop-types";

export default function Footer({setFilter, tasks, setTasks}) {

    const clearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed))
    }

    return (
        <footer className="footer">
            <span className="todo-count">{tasks.length} items left</span>
            <TasksFilter setFilter={setFilter}/>
            <button className="clear-completed" type="button" onClick={() => clearCompleted()}>Clear completed</button>
        </footer>
    )
}

Footer.propTypes = {
    setFilter: PropTypes.func.isRequired,
    setTasks: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        })
    ).isRequired
}