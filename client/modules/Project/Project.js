import React, {Component} from 'react';
import {Button, Icon, Input} from 'antd';
import {sendAddProject, getAllProjects} from './ProjectActions';

import '../../main.css';
import 'antd/dist/antd.css';

export default class Project extends Component{
  constructor(props){
    super(props);
    this.state = {
      successMsg: null,
      projectName: '',
      projects: []
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
        result.json().then(data => {
          console.log(data);

          this.setState({successMsg: 'Project added!', projects: data.projects});
        });
      }
    })
  }

  componentDidMount(){
    var getProjectsPromise = getAllProjects();

    getProjectsPromise.then(result => {
      console.log(result.status);

      result.json().then(data => {
        console.log(data);
        this.setState({projects: data.projects});
      });
    })
  }

  render(){
    if(this.state.projects.length < 1){
      var projectsDiv = (<div><p>You have no projects yet!</p></div>);
    } else {
      var projects = this.state.projects.map((project, i) => {
        return (
          <div key={project._id}>
            <h4>Project: {project.name}</h4>
          </div>
        )
      });

      var projectsDiv = (<div><h3>Projects</h3>{projects}</div>);
    }

    return (
      <div>
        <h2>Projects</h2>
        <Input placeholder="Project Name" prefix={<Icon type="folder" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={this.state.projectName} onChange={this.onProjectNameChange} />
        <Button onClick={this.addProject}><Icon type="folder-add"/>Add Project</Button>
        <p className="successTxt">{this.state.successMsg}</p>
        {projectsDiv}
      </div>
    )
  }
}