import React, {Component} from 'react';
import Header from '../Header/Header';
import {Button, Card, Col, Icon, Input, Row} from 'antd';

import 'antd/dist/antd.css';
import '../../main.css';

export default class Artefacts extends Component{
  constructor(props){
    super(props);
    this.state = {
      projectName: null,
    };

    this.createArtefactList = this.createArtefactList.bind(this);
    this.props.displayArtefact.bind(this);
    this.addArtefact = this.addArtefact.bind(this);
    this.viewArtefact = this.viewArtefact.bind(this);
  }

  componentDidMount(){
      
  }

  createArtefactList(){
    console.log("creating artefact list");
    var artefacts = this.props.artefacts;
    var artefactList = [];
    var rows = [];

    for(var i = 0; i < artefacts.length; i++){
      console.log("Artefact " + artefacts[i].artType);
      rows.push(<li onClick={() => this.viewArtefact(event)} id={artefacts[i].artType}>{artefacts[i].artType}</li>);
    }

    artefactList.push(<ul>{rows}</ul>);

    return artefactList;
  }

  viewArtefact(event){
    console.log("View artefact ");
    console.log(event);
    console.log(event.target.id);
    this.props.displayArtefact(null, event.target.id);
  }

  addArtefact(){
    console.log("Add artefact");
    this.props.displayArtefact("Add", null);
  }

  render(){
    if(this.props.artefacts == null || this.props.artefacts.length < 1){
      var artefactsList = (<div><p>You have no artefacts yet</p></div>);
    } else {
      var artefactsList = this.createArtefactList();
    }

    console.log(artefactsList);

    return (
      <div>
        <h3>Artefacts</h3>
        <Button onClick={this.addArtefact}><Icon type="plus"/></Button>
        {artefactsList}
      </div>
    )
  }
}