import React, {Component} from 'react';
import {Button, Card, Col, Icon, Input, Row} from 'antd';
import {sendAddProject, getAllProjects} from './ProjectsActions';
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';

import 'antd/dist/antd.css';
import '../../main.css';

export default class Projects extends Component{
  constructor(props){
    super(props);
    this.state = {
      successMsg: null,
      projectName: '',
      projectDesc: '',
      projects: [],
      displayMode: 'listall'
    };

    this.changeDisplayMode = this.changeDisplayMode.bind(this);
    this.changeModeToAdd = this.changeModeToAdd.bind(this);
    this.changeModeToListAll = this.changeModeToListAll.bind(this);
  }

  changeDisplayMode(mode){
    console.log("Changing to " + mode);

    this.setState({
      displayMode: mode
    });
  }

  changeModeToAdd(){
    this.changeDisplayMode('add');
  }

  changeModeToListAll(){
    this.changeDisplayMode('listall');
  }

  render(){

    if(this.state.displayMode === 'listall'){
      var projectContent = <ProjectList changeModeToAdd={this.changeModeToAdd} history={this.props.history}/>;
    } else if(this.state.displayMode === 'add'){
      var projectContent = <AddProject changeDisplayMode={this.changeModeToListAll} />;
    }

    return (
      <div>
        <h2>Projects</h2>
        <p className="successTxt">{this.state.successMsg}</p>
        {projectContent}
      </div>
    )
  }
}