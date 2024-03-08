import React from "react";
import './Task.css'


function Task({ task }) {
    const { text, completed = false } = task;
    const status = completed ? "completed" : ""
    return (
                <li className={ status }>
                    <div className="view">
                        <input className="toggle" type="checkbox" />
                            <label>
                                <span className="description">{ text }</span>
                                <span className="created">created 5 minutes ago</span>
                            </label>
                            <button className="icon icon-edit" type="button"/>
                            <button className="icon icon-destroy" type="button"/>
                    </div>
                </li>
    )
}

export default Task