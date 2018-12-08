import React, {Component} from 'react';
import {Button, Card, Col, Icon, Input, Row} from 'antd';
import {getArtefact} from '../ArtefactActions';

import 'antd/dist/antd.css';
import '../../../main.css';

export default class ProjStatementArtefact extends Component{
  constructor(props){
    super(props);
    this.state = {
      artefact: null
    };
  }

  componentDidMount(){
      console.log("Project" + this.props.projectId);
      console.log("Artefact" + this.props.artefact);

      var artPromise = getArtefact(this.props.projectId, this.props.artefact);

      artPromise.then(result => {
        console.log(result.status);

        result.json().then(data => {
          console.log(data);
          console.log(data.artefact);
  
          this.setState({artefact: data.artefact});
        });
      });
  }

  render(){
    if(this.state.artefact !== null){
      var artefact = (
        <div>
          <h2>{this.state.artefact.artType}</h2>
        </div>
      )
    } else {
      var artefact = (
        <div>
          <p>Loading...</p>
        </div>
      ) 
    }

    return (
      <div>
        <h3>ProjStatementArtefact</h3>
        {artefact}
      </div>
    )
  }

}
