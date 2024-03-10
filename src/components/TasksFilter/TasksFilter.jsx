import React from "react"
import './TasksFilter.css'
import PropTypes from "prop-types";

export default function TasksFilter({setFilter}) {

    const handleFilter = (a) => {
        setFilter(a)
    }

    return (
            <ul className="filters">
                <li>
                    <button className="selected" type="button" onClick={(e) => handleFilter(e.target.textContent)}>All</button>
                </li>
                <li>
                    <button type="button" onClick={(e) => handleFilter(e.target.textContent)}>Active</button>
                </li>
                <li>
                    <button type="button" onClick={(e) => handleFilter(e.target.textContent)}>Completed</button>
                </li>
            </ul>
    )
}

TasksFilter.propTypes = {
    setFilter: PropTypes.func.isRequired
}