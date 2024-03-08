import React from "react"
import './NewTaskForm.css'

function NewTaskForm() {
    return (
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <input className="new-todo" placeholder="What needs to be done?" autoFocus />
    )
}

export default NewTaskForm