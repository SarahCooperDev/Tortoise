import React, {Component, } from 'react';
import PropTypes from 'prop-types';
import {connect, } from 'react-redux';
import 'whatwg-fetch';

export class App extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){}

    render(){
        return (
            <div>
                <h2>In App</h2>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

function mapStateToProps(store){
    return {
        intl: store.intl,
    };
}

export default connect(mapStateToProps)(App);