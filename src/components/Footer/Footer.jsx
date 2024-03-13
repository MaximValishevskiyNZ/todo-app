import React from "react"
import './Footer.css'
import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter";

class Footer extends React.Component {
    clearCompleted() {
        const {setTasks, tasks} = this.props
        setTasks(tasks.filter(task => !task.completed));
    }

    render() {
        const { setFilter, tasks } = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{tasks.filter(item => !item.completed).length} items left</span>
                <TasksFilter setFilter={setFilter}/>
                <button className="clear-completed" type="button" onClick={() => this.clearCompleted()}>Clear completed</button>
            </footer>
        )
    }
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

export default Footer;