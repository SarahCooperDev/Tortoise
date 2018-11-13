import React, { Component } from 'react';
import { sendVerifyRequest } from './DashboardActions';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: ''
        };

    }

    componentDidMount(){
        var verifyPromise = sendVerifyRequest();

        verifyPromise.then(result => {
            console.log("In promise");

            if(result === null || result.status === 401){
                this.props.history.push('/auth');
            } else {
                result.json().then(data => {
                    console.log("Data is " + data);
                    console.log("Username is " + data.username);
                    this.setState({
                        username: data.username
                    });
                });
            }
        });
    }

    render(){
        return (
            <div>
                <h1>Dashboard</h1>
                <h2>{this.state.username}</h2>
            </div>
        )
    }
}