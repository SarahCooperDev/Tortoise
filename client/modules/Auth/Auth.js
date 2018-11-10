import React, {Component, } from 'react';
import {sendSignUp} from './AuthActions';

class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRegistered: false,
      email: '',
      password: ''
    }

    this.switchAuth = this.switchAuth.bind(this);
    this.signUp = this.signUp.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onEmailChange(event){
    this.setState({
      email: event.target.value
    });
  }

  onPasswordChange(event){
    this.setState({
      password: event.target.value
    });
  }

  switchAuth() {
    this.state.isRegistered ? this.setState({ isRegistered: false }) : this.setState({ isRegistered: true });
  }

  signUp(){
    console.log("Signing up");
    sendSignUp(this.state.email, this.state.password);
  }

  render() {
    if(this.state.isRegistered){
      return (
        <div>
          <h1>Sign in</h1>
          <ul>
            <li><label>Email</label><input type="text" id="email" name="email" value={this.state.email} onChange={this.onEmailChange}/></li>
            <li><label>Password</label><input type="password" id="password" name="password" value={this.state.password} onChange={this.onPasswordChange}/></li>
          </ul>
          <button onClick={this.switchAuth}>Switch</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Sign up</h1>
          <ul>
            <li><label>Email</label><input type="text" id="email" name="email" value={this.state.email} onChange={this.onEmailChange}/></li>
            <li><label>Password</label><input type="password" id="password" name="password" value={this.state.password} onChange={this.onPasswordChange}/></li>
          </ul>
          <button onClick={this.signUp}>Submit</button>
          <button onClick={this.switchAuth}>Switch</button>
        </div>
      )
    }
  }
 }
 export default Auth;