import React, {Component} from 'react';
import Header from '../Header/Header';
import {Button, Card, Col, Icon, Input, Row} from 'antd';

import 'antd/dist/antd.css';
import '../../main.css';

export default class Artefacts extends Component{
  constructor(props){
    super(props);
    this.state = {
      projectName: null
    };
  }

  componentDidMount(){
      
  }

  render(){
    return (
      <div>
        <h3>Artefacts</h3>
      </div>
    )
  }
}