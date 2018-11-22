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
      projects: []
    };

    this.createProjectTable = this.createProjectTable.bind(this);
    this.goToProject = this.goToProject.bind(this);
    this.props.changeModeToAdd.bind(this);
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

  goToProject(event){
    this.props.history.push('/project/' + event.target.offsetParent.id);
  }

  createProjectTable(){
    var projects = this.state.projects;
    var projectGrid = [];
    var cells = [];
    var cellNo = 0;

    for(let i = 0; i < projects.length/3; i++){

      for(let j = 0; j < 3 && cellNo < projects.length; j++){
        cells.push(<Col span={6} key={"col" + cellNo}>
          <Card onClick={() => this.goToProject(event)} id={projects[cellNo]._id} className="projectCard" hoverable="true" title={projects[cellNo].name}><p>{projects[cellNo].description}</p></Card>
          </Col>);
        cellNo++;
      }

      projectGrid.push(<Row key={"row" + i} gutter={16}>{cells}</Row>);
      projectGrid.push(<p></p>);
      cells = [];
    }

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
        <p className="successTxt">{this.state.successMsg}</p>
        <Button onClick={this.props.changeModeToAdd}><Icon type="folder-add"/>Add Project</Button>
        {projectsDiv}
      </div>
    )
  }

}