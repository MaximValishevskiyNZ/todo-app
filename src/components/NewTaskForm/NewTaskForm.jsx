import React from "react";
import './NewTaskForm.css';
import PropTypes from "prop-types";

export default function NewTaskForm({addTask}) {

    return (
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyDown={addTask}/>
    )
}

NewTaskForm.propTypes = {
    addTask: PropTypes.func.isRequired
}