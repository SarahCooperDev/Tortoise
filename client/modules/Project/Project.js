import React, {Component} from 'react';
import {Button, Card, Col, Icon, Input, Row} from 'antd';
import {sendAddProject, getAllProjects} from './ProjectActions';

import '../../main.css';
import 'antd/dist/antd.css';

export default class Project extends Component{
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
    this.createProjectTable = this.createProjectTable.bind(this);
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

  createProjectTable(){
    console.log("Creating project");
    console.log(this.state.projects);
    var projects = this.state.projects;
    var projectGrid = [];
    var cells = [];
    var cellNo = 0;

    for(let i = 0; i < projects.length/3; i++){

      for(let j = 0; j < 3 && cellNo < projects.length; j++){
        cells.push(<Col span={6}>
          <div key={projects[cellNo]._id}><h4>Project: {projects[cellNo].name}</h4></div>
          </Col>);
        cellNo++;
      }

      projectGrid.push(<Row key={i}>{cells}</Row>);
      cells = [];
    }
    console.log(projectGrid);

    return projectGrid;
  }

  render(){
    if(this.state.projects.length < 1){
      var projectsDiv = (<div><p>You have no projects yet!</p></div>);
    } else {
      var projects = this.createProjectTable();
      var projectsDiv = (<div><h3>Projects</h3>{projects}</div>);
    }

    return (
      <div>
        <h2>Projects</h2>
        <Input placeholder="Project Name" prefix={<Icon type="folder" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={this.state.projectName} onChange={this.onProjectNameChange} />
        <Input placeholder="Project Description"
        value={this.state.projectDesc} onChange={this.onProjectDescChange} />
        <Button onClick={this.addProject}><Icon type="folder-add"/>Add Project</Button>
        <p className="successTxt">{this.state.successMsg}</p>
        {projectsDiv}
      </div>
    )
  }
}