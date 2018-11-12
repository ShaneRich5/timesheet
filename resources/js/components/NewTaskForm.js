import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import swal from 'sweetalert';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export default class NewTaskForm extends Component {
    constructor(props) {
        super(props);

        const initialValue = Object.assign({}, this.props.fields);

        this.state = {
            id: initialValue.id || null,
            title: initialValue.title || '',
            startDate: NewTaskForm.defaultDate(initialValue.startDate).format("YYYY-MM-DD HH:mm:ss"),
            endDate: NewTaskForm.defaultDate(initialValue.endDate).format("YYYY-MM-DD HH:mm:ss"),
            description: initialValue.description || '',
            clientId: initialValue.clientId || '',
        };

        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static defaultDate(date) {
        return date ? moment(date) : moment();
    }

    handleInputChange(event) {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleStartDateChanged(date) {
        const difference = moment(this.state.endDate).diff(date);
        if (difference >= 0) {
            const startDate = date.format("YYYY-MM-DD HH:mm:ss");
            this.setState({ startDate });
        } else {
            swal('Start time must be before end time', { icon: 'warning'});
        }
    }


    handleEndDateChanged(date) {
        const difference = date.diff(this.state.startDate);
        if (difference >= 0) {
            const endDate = date.format("YYYY-MM-DD HH:mm:ss");
            this.setState({endDate});
        } else {
            swal('Please set the date after the start time', { icon: 'warning'});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.saveAction(this.state);
    }

    render() {
        const clientOptions = this.props.clients.map(client =>
            <option
                key={client.id}
                value={client.id}
            >{client.name}</option>
        );

        return (
            <div className="card" style={{marginBottom: '15px'}}>
                <div className="card-header">New Task</div>

                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">Title</label>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    value={this.state.title}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">Start Time</label>
                            <div className="col-md-6">
                                <DatePicker
                                    type="datetime"
                                    className="form-control"
                                    maxDate={NewTaskForm.defaultDate(this.state.endDate)}
                                    selected={NewTaskForm.defaultDate(this.state.startDate)}
                                    onChange={this.handleStartDateChanged}
                                    timeFormat="HH:mm"
                                    dateFormat="LLL"
                                    timeIntervals={15}
                                    showTimeSelect
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">End Time</label>
                            <div className="col-md-6">
                                <DatePicker
                                    type="datetime"
                                    className="form-control"
                                    minDate={NewTaskForm.defaultDate(this.state.startDate)}
                                    selected={NewTaskForm.defaultDate(this.state.endDate)}
                                    onChange={this.handleEndDateChanged}
                                    timeFormat="HH:mm"
                                    dateFormat="LLL"
                                    timeIntervals={15}
                                    showTimeSelect
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">Client</label>
                            <div className="col-md-6">
                                <select
                                    onChange={this.handleInputChange}
                                    name="clientId"
                                    className="form-control"
                                    value={this.state.clientId}
                                    required
                                >
                                    <option value="" disabled>Select a client</option>
                                    {clientOptions}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">Narrative</label>
                            <div className="col-md-6">
                                    <textarea
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                        className="form-control"
                                    />
                            </div>
                        </div>
                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
