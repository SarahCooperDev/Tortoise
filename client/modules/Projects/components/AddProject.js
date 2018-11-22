import React, {Component} from 'react';
import {Button, Card, Col, Icon, Input, Row} from 'antd';
import {sendAddProject, getAllProjects} from '../ProjectsActions';

import 'antd/dist/antd.css';
import '../../../main.css';

export default class ProjectList extends Component{
  constructor(props){
    super(props);
    this.state = {
      successMsg: null,
      projectName: '',
      projectDesc: '',
      projects: []
    };

    this.addProject = this.addProject.bind(this);
    this.onProjectNameChange = this.onProjectNameChange.bind(this);
    this.onProjectDescChange = this.onProjectDescChange.bind(this);
    this.props.changeDisplayMode.bind(this);
  }

  onProjectNameChange(event){
    this.setState({
      projectName: event.target.value,
      successMsg: null
    })
  }

  onProjectDescChange(event){
    this.setState({
      projectDesc: event.target.value,
      successMsg: null
    })
  }

  addProject(){
    this.setState({
      successMsg: null
    });

    var addProjectPromise = sendAddProject(this.state.projectName, this.state.projectDesc);

    addProjectPromise.then(result => {
      if(result.status === 200){
        result.json().then(data => {
          console.log(data);

          this.setState({successMsg: 'Project added!', projects: data.projects, projectDesc: '', projectName: ''});
          this.props.changeDisplayMode();
        });
      }
    })
  }

  render(){
    return (
      <div>
        <h3>Add Project</h3>
        <p className="successTxt">{this.state.successMsg}</p>
        <Input placeholder="Project Name" prefix={<Icon type="folder" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={this.state.projectName} onChange={this.onProjectNameChange} />
        <Input placeholder="Project Description"
        value={this.state.projectDesc} onChange={this.onProjectDescChange} />
        <Button className="cancelBtn" onClick={this.props.changeDisplayMode}><Icon type="folder-add"/>Cancel</Button>
        <Button className="submitBtn" onClick={this.addProject}><Icon type="folder-add"/>Create</Button>
      </div>
    )
  }

}