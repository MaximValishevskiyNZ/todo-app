import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaksList";
import Footer from "./components/Footer";

const data = [
    {id: crypto.randomUUID(), text:"eat wax", completed:true, added: new Date() },
    {id: crypto.randomUUID(), text:"say gex", completed:true, added: new Date()},
    {id: crypto.randomUUID(), text:"ball munching", completed:false, added: new Date()},
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
    }

    addTask(event) {
        if (event.key === 'Enter') {
            const newTask = { id: crypto.randomUUID(), text: event.target.value, completed: false, added: new Date() };
            this.setState(prevState => ({
                tasks: [...prevState.tasks, newTask]
            }));
            event.target.value = '';
        }
    }

    deleteTask(taskId) {
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(task => task.id !== taskId)
        }));
    }

    render() {
        const { tasks, filter } = this.state;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addTask={this.addTask}/>
                </header>
                <section className="main">
                    <ul className="todo-list">
                        <TaskList tasks={tasks} onDelete={this.deleteTask} filter={filter} setTasks={(tasks) => this.setState({ tasks })}/>
                    </ul>
                </section>
                <Footer setFilter={(filter) => this.setState({ filter })} tasks={tasks} setTasks={(tasks) => this.setState({ tasks })}/>
            </section>
        );
    }
}

const root = createRoot(document.getElementById('root'))
root.render(<App />);