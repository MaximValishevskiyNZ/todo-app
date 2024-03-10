import React from "react"
import './TasksFilter.css'
import PropTypes from "prop-types";

class TasksFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        const {setFilter} = this.props
        setFilter(filter);
    }

    render() {
        return (
            <ul className="filters">
                <li>
                    <button className="selected" type="button" onClick={() => this.handleFilter('All')}>All</button>
                </li>
                <li>
                    <button type="button" onClick={() => this.handleFilter('Active')}>Active</button>
                </li>
                <li>
                    <button type="button" onClick={() => this.handleFilter('Completed')}>Completed</button>
                </li>
            </ul>
        )
    }
}

TasksFilter.propTypes = {
    setFilter: PropTypes.func.isRequired
}

export default TasksFilter;