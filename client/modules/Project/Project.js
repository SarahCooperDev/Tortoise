import React, {Component} from 'react';
import Header from '../Header/Header';
import Artefacts from '../Artefacts/Artefacts';
import {getProjectDetails} from './ProjectActions';
import {Button, Card, Col, Icon, Input, Row} from 'antd';

import 'antd/dist/antd.css';
import '../../main.css';
import './Project.css';

export default class Project extends Component{
  constructor(props){
    super(props);
    this.state = {
      projectName: null,
      projectDesc: null,
    };
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

        this.setState({projectName: data.project.name, projectDesc: data.project.description});
      });
    });
  }


  render(){
    return (
      <div>
        <div className="header">
          <Header history={this.props.history}/>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="artefactsComponent">
                <Artefacts history={this.props.history}/>
              </td>
              <td className="mainWindowCell">
                <div className="mainWindow">
                  <h2>Project {this.state.projectName}</h2>
                  <p>{this.state.projectDesc}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    )
  }
}