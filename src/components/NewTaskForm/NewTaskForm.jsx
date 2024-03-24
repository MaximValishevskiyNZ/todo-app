import React from "react";
import './NewTaskForm.css';
import PropTypes from "prop-types";

export default function NewTaskForm({addTask}) {

    return (
        // eslint-disable-next-line jsx-a11y/no-autofocus

    <form className="new-todo-form">
        <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyDown={addTask}/>
            <input className="new-todo-form__timer" placeholder="Min" autoFocus/>
                <input className="new-todo-form__timer" placeholder="Sec" autoFocus/>
    </form>

    )
}

NewTaskForm.propTypes = {
    addTask: PropTypes.func.isRequired
}