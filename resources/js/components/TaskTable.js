import React, { Component } from 'react';
import moment from 'moment';

export default class TaskTable extends Component {
    differenceBetweenDates(startDate, endDate) {
        const startMoment = moment(startDate);
        const endMoment = moment(endDate);

        const days = startMoment.diff(endMoment, 'days');
        const hours = startMoment.diff(endMoment, 'hours');
        const minutes = startMoment.diff(endMoment, 'minutes');

        let difference = '';

        if (days) difference += Math.abs(days) + 'd ';
        difference += Math.abs(hours % 24) + 'h ';
        difference += Math.abs(minutes % 60) + 'm';

        return difference;
    }

    render() {
        let taskRowElement;
        if (this.props.tasks.length) {
            taskRowElement = this.props.tasks.map(task =>
                <tr key={task.id}>
                    <td scope="row">{task.id}</td>
                    <td>{task.title}</td>
                    <td>{moment(task.startDate).format('lll')}</td>
                    <td>{moment(task.endDate).format('lll')}</td>
                    <td>{this.differenceBetweenDates(task.startDate, task.endDate)}</td>
                    <td>{task.client.name}</td>
                    <td>
                        <i onClick={() => this.props.editAction(task)}
                           className="material-icons"
                        >edit</i>
                        <i
                            onClick={() => this.props.showAction(task)}
                            className="material-icons"
                        >note</i>
                        <i
                            onClick={() => this.props.deleteAction(task)}
                            className="material-icons"
                        >delete</i>
                    </td>
                </tr>
            );
        } else {
            taskRowElement = (
                <tr>
                    <td colSpan={7}>No tasks created</td>
                </tr>
            );
        }

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Total</th>
                        <th scope="col">Client</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {taskRowElement}
                </tbody>
            </table>
        );
    }
}
