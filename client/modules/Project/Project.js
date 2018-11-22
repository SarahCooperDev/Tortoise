import React, {Component} from 'react';
import Header from '../Header/Header';
import {Button, Card, Col, Icon, Input, Row} from 'antd';

import 'antd/dist/antd.css';
import '../../main.css';

export default class Project extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }


  render(){
    return (
      <div>
        <div className="header">
          <Header history={this.props.history}/>
        </div>
        <div>
          <h2>Project</h2>
        </div>
      </div>
    )
  }
}