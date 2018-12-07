import React, {Component} from 'react';
import {addArtefact} from '../ArtefactActions';
import {Button, Card, Col, Icon, Input, Row, Select} from 'antd';
const Option = Select.Option;
const TextArea = Input;

import 'antd/dist/antd.css';
import '../../../main.css';

export default class AddArtefact extends Component{
  constructor(props){
    super(props);

    this.state = {
      projectID: this.props.projectID,
      artType: null,
      artAddComment: null
    }

    this.props.displayArtefact.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
    this.onAddCommentChange = this.onAddCommentChange.bind(this);
    this.submitArtefact = this.submitArtefact.bind(this);
  }

  onSelectType(value){
    this.setState({artType: value});
  }

  onAddCommentChange(event){
    this.setState({artAddComment: event.target.value});
  }

  submitArtefact(){
    console.log("Submitting");

    var addPromise = addArtefact(this.state.projectID, this.state.artType, this.state.artAddComment);

    addPromise.then(result => {
      console.log(result);
    });
  }

  render(){
    return (
      <div>
        <h2>Add Artefact</h2>
        <table>
          <tbody>
            <tr>
              <td>Artefact Type</td>
              <td><Select style={{ width: 200 }} onChange={this.onSelectType}>
                <Option value="projectStatement">Project Statement</Option>
              </Select></td>
            </tr>
            <tr>
              <td>Additional Comments</td>
              <td><TextArea rows={4} onChange={this.onAddCommentChange}/></td>
            </tr>
            <tr>
              <td>
              </td>
              <td><Button onClick={this.submitArtefact}>Add Artefact</Button></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}