import React, {Component} from 'react';
import Header from '../Header/Header';
import Projects from '../Projects/Projects';

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
          <Projects history={this.props.history}/>
        </div>
      </div>
    )
  }
}