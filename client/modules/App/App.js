import React, {Component, } from 'react';
import PropTypes from 'prop-types';
import {connect, } from 'react-redux';
import { Link } from 'react-router-dom';

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){}

    render(){
        return (
            <div>
                <h2>In App</h2>
                <Link to='/auth'>Auth</Link>
            </div>
        )
    }
}