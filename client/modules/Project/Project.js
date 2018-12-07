import React, {Component} from 'react';
import Header from '../Header/Header';
import Artefacts from '../Artefacts/Artefacts';
import AddArtefact from '../Artefact/components/AddArtefact';
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
      artefact: null
    };

    this.displayArtefact = this.displayArtefact.bind(this);
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

        this.setState({projectName: data.project.name, projectDesc: data.project.description, artefacts: data.project.artefacts, projectID: data.project._id});
      });
    });
  }

  displayArtefact(artefact){
    console.log(artefact);

    if(artefact === "Add"){
      console.log("Displaying add artefact component");
      console.log(this.state.projectID);

      this.setState({artefact: "Add"});
    }
  }


  render(){
    if(this.state.artefact === null){
      var mainWindow = (
        <div className="mainWindow">
          <h2>Project {this.state.projectName}</h2>
          <p>{this.state.projectDesc}</p>
        </div>
      )
    } else if(this.state.artefact === "Add"){
      var mainWindow = (<div className="mainWindow"><AddArtefact projectID={this.state.projectID} displayArtefact={this.displayArtefact}/></div>);
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
                <Artefacts history={this.props.history} artefacts={this.state.artefacts} displayArtefact={this.displayArtefact}/>
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