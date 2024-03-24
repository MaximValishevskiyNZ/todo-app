import React from "react";
import {createRoot} from 'react-dom/client';
import './index.css';
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaksList";
import Footer from "./components/Footer";


const data = [
    {id: crypto.randomUUID(), text: "eat wax", completed: true, added: new Date(), time: new Date(50000), isRunning: false},
    {id: crypto.randomUUID(), text: "say gex", completed: true, added: new Date(), time: new Date(80000), isRunning: false},
    {id: crypto.randomUUID(), text: "ball munching", completed: false, added: new Date(), time: new Date(1000000), isRunning: false},
]

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: data,
            filter: 'All'
        };
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.switchTimer = this.switchTimer.bind(this);

    }

    componentDidMount() {
        setInterval(() => {
            this.setState(prevState => ({
                tasks: prevState.tasks.map(task => {
                    const { hours, minutes, seconds } = this.getHoursMinutesSeconds(task.time);
                    const newTime = new Date(task.time.getFullYear(), task.time.getMonth(), task.time.getDate(), hours, minutes, seconds - 1);
                    return {
                        ...task,
                        time: task.isRunning ? newTime < new Date(0) ? new Date(0) : newTime : task.time,
                        added: new Date(task.added)
                    };
                })
            }));
        }, 1000);
    }

    getHoursMinutesSeconds(dateObj) {
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();
        return { hours, minutes, seconds };
    }

    switchTimer(id) {
        const newList = this.state.tasks.map(item => item.id === id ? {...item, isRunning: !item.isRunning} : item)
        this.setState({tasks: newList})
    }

    addTask(event) {
        if (event.key === 'Enter' && !(/^\s*$/.test(event.target.value))) {
            const minutesInput = event.target.parentNode.querySelector('.new-todo-form__timer');
            const secondsInput = event.target.parentNode.querySelectorAll('.new-todo-form__timer')[1];

            const minutes = parseInt(minutesInput.value || '0', 10);
            const seconds = parseInt(secondsInput.value || '0', 10);

            const time = new Date();
            time.setHours(0, minutes, seconds, 0); // Устанавливаем часы на 0, минуты и секунды на введенные значения

            const newTask = { id: crypto.randomUUID(), text: event.target.value, completed: false, added: new Date(), time, isRunning: false };
            this.setState(prevState => ({
                tasks: [...prevState.tasks, newTask]
            }));
            event.target.value = '';
            minutesInput.value = '';
            secondsInput.value = '';
        }
    }

    deleteTask(taskId) {
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(task => task.id !== taskId)
        }));
    }


    editTask(t, id) {
        if (t.key === 'Enter') {
            const newList = this.state.tasks.map(item => item.id === id ? {...item, text: t.target.value} : item)
            this.setState({tasks: newList})
            t.target.value = ''
            return true
        }
    }

    render() {
        const {tasks, filter} = this.state;
        const filteredTasks = tasks.filter(task => filter === 'All' || task.completed === (filter === 'Completed'));

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addTask={this.addTask}/>
                </header>
                <section className="main">
                    <ul className="todo-list">
                        <TaskList tasks={filteredTasks} onDelete={this.deleteTask} filter={filter}
                                  setTasks={(tasks) => this.setState({tasks})} editTask={this.editTask}
                                  switchTimer={this.switchTimer}/>
                    </ul>
                </section>
                <Footer setFilter={(filter) => this.setState({filter})} tasks={tasks}
                        setTasks={(tasks) => this.setState({tasks})}/>
            </section>
        );
    }
}

const root = createRoot(document.getElementById('root'))
root.render(<App/>);