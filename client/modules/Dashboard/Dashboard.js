import React, {Component} from 'react';
import {sendVerifyRequest} from './DashboardActions';
import Header from '../Header/Header';

import '../../main.css';
import 'antd/dist/antd.css';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    };

  }

  render(){
    return (
      <div>
        <div className="header">
          <Header history={this.props.history}/>
        </div>

        <div>
          <h2>Dashboard</h2>
          <h3>{this.state.username}</h3>
        </div>
      </div>
    )
  }
}