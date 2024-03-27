import React from 'react';
import './Task.css';
import PropTypes from 'prop-types';
import { format, formatDistanceToNow } from 'date-fns';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editText: '', // новое свойство для хранения текста задачи при редактировании
    };
    this.changeTaskStatus = this.changeTaskStatus.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
  }

  changeTaskStatus() {
    const { task, tasks, setTasks } = this.props;
    setTasks(
      tasks.map((item) =>
        task.id === item.id ? { ...task, completed: !task.completed } : item,
      ),
    );
  }

  handleEditTask(e, id) {
    const { editTask } = this.props;
    if (editTask(e, id)) {
      this.setState({ editing: false });
    }
  }

  handleswitchTimer(id, state) {
    const { switchTimer, task } = this.props;
    const { isRunning } = task;
    if (state === isRunning) {
      switchTimer(id);
    }
  }

  render() {
    const { task, onDelete } = this.props;
    const { text, completed = false, id, added } = task;
    const status = this.state.editing
      ? 'editing'
      : completed
        ? 'completed'
        : '';

    return (
      <li className={status}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={this.changeTaskStatus}
            id={`taskToggle${task.id}`}
          />
          <label htmlFor={`taskToggle${task.id}`}>
            <span className="title">{text}</span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={() => this.handleswitchTimer(task.id, false)}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => this.handleswitchTimer(task.id, true)}
              ></button>
              {format(task.time, 'mm:ss')}
            </span>
            <span className="description">
              created {formatDistanceToNow(added, { includeSeconds: true })} ago
            </span>
          </label>
          <button
            className="icon icon-edit"
            type="button"
            aria-label="Edit task"
            onClick={() => {
              this.setState({ editing: true, editText: task.text });
            }}
          >
            <span aria-hidden="true" />
          </button>
          <button
            className="icon icon-destroy"
            type="button"
            onClick={() => onDelete(id)}
            aria-label="Delete task"
          >
            <span aria-hidden="true" />
          </button>
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.editText}
          onChange={(e) => this.setState({ editText: e.target.value })}
          onKeyDown={(e) => this.handleEditTask(e, task.id)}
        />
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    added: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default Task;
