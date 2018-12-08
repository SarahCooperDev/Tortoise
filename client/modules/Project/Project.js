import React, {Component} from 'react';
import Header from '../Header/Header';
import Artefacts from '../Artefacts/Artefacts';
import AddArtefact from '../Artefact/components/AddArtefact';
import ProjStatementArtefact from '../Artefact/components/ProjStatementArtefact';
import {getProjectDetails} from './ProjectActions';
import {Button, Card, Col, Icon, Input, Row} from 'antd';

import 'antd/dist/antd.css';
import '../../main.css';
import './Project.css';

export default class Project extends Component{
  constructor(props){
    super(props);
    this.state = {
      projectID: null,
      projectName: null,
      projectDesc: null,
      artefacts: null,
      artefact: null,
      project: null
    };

    this.displayArtefact = this.displayArtefact.bind(this);
    this.updateProject = this.updateProject.bind(this);
  }

  componentDidMount(){
    console.log("In component");
    console.log(this.props.match.params.projectId);

    var getProjectDetailsPromise = getProjectDetails(this.props.match.params.projectId);

    getProjectDetailsPromise.then(result => {
      console.log(result.status);

      result.json().then(data => {
        console.log(data);
        console.log(data.project.name);

        this.setState({project: {name: data.project.name, description: data.project.description, artefacts: data.project.artefacts, projectId: data.project._id}});
      });
    });
  }

  displayArtefact(artefactType, artId){
    console.log(artefactType);

    if(artefactType === "Add"){
      console.log("Displaying add artefact component");
      console.log(this.state.project.projectId);

      this.setState({artefact: "Add"});
    } else if(artId === "Project Statement"){
      console.log(artId);
      this.setState({artefact: "Project Statement"});
    }
  }

  updateProject(project){
    console.log("Updating project");
    this.setState({project: project, artefact: null});
  }


  render(){
    if(this.state.project === null){
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    } else {
      if(this.state.artefact === null){
        console.log("In render");
        console.log(this.state.project);
        var mainWindow = (
          <div className="mainWindow">
            <h2>Project {this.state.project.projectName}</h2>
            <p>{this.state.project.description}</p>
          </div>
        )
      } else if(this.state.artefact === "Add"){
        var mainWindow = (<div className="mainWindow"><AddArtefact projectId={this.state.project.projectId} displayArtefact={this.displayArtefact} updateProject={this.updateProject}/></div>);
      } else if(this.state.artefact === "Project Statement"){
        var mainWindow = (<div className="mainWindow"><ProjStatementArtefact projectId={this.state.project.projectId} artefact={this.state.artefact}/></div>);
      }

      return (
        <div>
          <div className="header">
            <Header history={this.props.history}/>
          </div>
          <table>
            <tbody>
              <tr>
                <td className="artefactsComponent">
                  <Artefacts history={this.props.history} artefacts={this.state.project.artefacts} displayArtefact={this.displayArtefact} updateProject={this.updateProject}/>
                </td>
                <td className="mainWindowCell">
                  {mainWindow}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  }
}