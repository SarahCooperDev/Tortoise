import React, {Component} from 'react';
import {Input} from 'antd';

export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {

    }

  }

  render(){
    return (
      <div>
        <h1>Tortoise</h1>
        <Input placeholder="Basic usage" />
      </div>
    )
  }
} 