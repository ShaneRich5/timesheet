import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import TaskTable from './TaskTable';
import NewTaskForm from './NewTaskForm';

export default class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            clients: [],
            isLoading: false,
            isCreatingTask: false,
            showingDeleteConfirmation: false,
            editTask: null,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});

        axios.all([
            axios.get('api/clients'),
            axios.get('api/tasks')
        ]).then(
            axios.spread((clientListResponse, taskListResponse
        ) => {
            const { data: { clients }} = clientListResponse;
            const { data: { tasks }} = taskListResponse;
            this.setState({clients, tasks})
        }), console.error)
            .finally(() => this.setState({isLoading: false}));
    }

    showDescription(task) {
        swal({ title: task.name, text: task.description});
    }

    editTask(task) {
        this.setState({
            isCreatingTask: true,
            editTask: Object.assign({}, task)
        })
    }

    saveTask(task) {
        const url = 'api/tasks';
        const { id } = task;
        let request, successHandler;

        if (id) {
            request = axios.put(`${url}/${id}`, task);

            console.log('put called');
            successHandler = (task) => {
                let tasks = [...this.state.tasks];
                const index = this.state.tasks.findIndex(current => +current.id === +task.id);
                console.log('index', index);
                if (index > -1) {
                    tasks.splice(index, 1, task);
                    console.log('tasks', tasks);
                    this.setState({ tasks });
                }
            };
        } else {
            request = axios.post(url, task);

            successHandler = (task) => {
                const tasks = [...this.state.tasks, task];
                this.setState({ tasks });
            }
        }
        request.then(
            ({ data: { task }}) => successHandler(task),
            console.error
        ).finally(() => this.setState({isCreatingTask: false}));
    }

    deleteTask({ id }) {
        swal({
            title: "Are you sure?",
            text: "You task will be permanently deleted!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`api/tasks/${id}`).then(() => {
                    let icon;
                    let message;
                    let tasks = [...this.state.tasks];
                    const index = tasks.findIndex(task => task.id === id);

                    if (index !== -1) {
                        tasks.splice(index, 1);
                        this.setState({tasks});

                        message = 'The task has been deleted';
                        icon = 'success';
                    } else {
                        message = 'Failed to delete task!';
                        icon = 'error';
                    }

                    swal(message, { icon });
                });
            } else {
                swal("Delete cancelled");
            }
        });
    }

    toggleForm() {
        const isCreatingTask = ! this.state.isCreatingTask;
        let updates = {isCreatingTask};
        if (! isCreatingTask) {
            updates.editTask = null;
        }
        this.setState(updates);
    }

    render() {
        let newTaskForm = null;

        if (this.state.isCreatingTask) {
            newTaskForm = <NewTaskForm
                fields={this.state.editTask}
                clients={this.state.clients}
                saveAction={this.saveTask.bind(this)}
            />;
        }

        return (
            <div>
                <button
                    className="btn btn-primary"
                    onClick={this.toggleForm.bind(this)}
                    style={{marginBottom: '15px'}}
                >
                    {this.state.isCreatingTask ? 'Cancel' : 'Add Task'}
                </button>
                {newTaskForm}
                <TaskTable
                    editAction={this.editTask.bind(this)}
                    deleteAction={this.deleteTask.bind(this)}
                    showAction={this.showDescription.bind(this)}
                    tasks={this.state.tasks}
                />
            </div>
        );
    }
}

if (document.getElementById('task-container')) {
    ReactDOM.render(<TaskContainer />, document.getElementById('task-container'));
}
