import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaksList";
import Footer from "./components/Footer";
import Task from "./components/Task/index.jsx";

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

    componentDidMount() {
        setInterval(() => {
            this.setState({
                tasks: this.state.tasks.map(task => ({
                    ...task,
                    added: new Date(task.added)
                }))
            });
        }, 10000);
    }



    addTask(event) {
        if (event.key === 'Enter' && !(/^\s*$/.test(event.target.value))) {
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
        const filteredTasks = tasks.filter(task => filter === 'All' || task.completed === (filter === 'Completed'));

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addTask={this.addTask}/>
                </header>
                <section className="main">
                    <ul className="todo-list">
                        <TaskList tasks={filteredTasks} onDelete={this.deleteTask} filter={filter} setTasks={(tasks) => this.setState({ tasks })}/>
                    </ul>
                </section>
                <Footer setFilter={(filter) => this.setState({ filter })} tasks={tasks} setTasks={(tasks) => this.setState({ tasks })}/>
            </section>
        );
    }
}

const root = createRoot(document.getElementById('root'))
root.render(<App />);