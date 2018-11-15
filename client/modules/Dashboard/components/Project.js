import React, {Component} from 'react';
import {Button, Icon, Input} from 'antd';
import {sendAddProject} from './ProjectActions';

import '../../../main.css';
import 'antd/dist/antd.css';

export default class Project extends Component{
  constructor(props){
    super(props);
    this.state = {
      successMsg: null,
      projectName: ''
    };

    this.addProject = this.addProject.bind(this);
    this.onProjectNameChange = this.onProjectNameChange.bind(this);
  }

  onProjectNameChange(event){
    this.setState({
      projectName: event.target.value,
      successMsg: null
    })
  }

  addProject(){
    this.setState({
      successMsg: null
    });

    var addProjectPromise = sendAddProject(this.state.projectName);

    addProjectPromise.then(result => {
      if(result.status === 200){
          this.setState({successMsg: 'Project added!'});
      }
    })
  }

  render(){
    return (
      <div>
        <h2>Projects</h2>
        <Input placeholder="Project Name"
        value={this.state.projectName} onChange={this.onProjectNameChange} />
        <Button onClick={this.addProject}>Add Project</Button>
        <p className="successTxt">{this.state.successMsg}</p>
      </div>
    )
  }
}