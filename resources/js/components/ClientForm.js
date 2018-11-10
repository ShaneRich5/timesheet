import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ClientForm extends Component {
    render() {
        return (<h1>Client Form</h1>);
    }
}

if (document.getElementById('client-form')) {
    ReactDOM.render(
        <ClientForm />,
        document.getElementById('client-form')
    );
}
