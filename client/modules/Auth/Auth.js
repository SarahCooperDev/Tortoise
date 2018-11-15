import React, {Component, } from 'react';
import { sendSignUp, sendSignIn } from './AuthActions';
import {Button, Icon, Input} from 'antd';

import '../../main.css';

class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRegistered: true,
      email: '',
      username: '',
      password: '',
      errorMsg: ''
    }

    this.switchAuth = this.switchAuth.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onEmailChange(event){
    this.setState({
      email: event.target.value
    });
  }

  onUsernameChange(event){
    this.setState({
      username: event.target.value
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
    this.setState({
      errorMsg: ''
    });

    console.log("Signing up");

    if(this.state.email.length < 6){
      this.setState({
        errorMsg: 'Email must be longer than 5'
      });
    } else if(this.state.username.length < 6){
      this.setState({
        errorMsg: 'Username must be longer than 5'
      });
    } else if(this.state.password.length < 6){
      this.setState({
        errorMsg: 'Password must be longer than 5'
      });
    } else {
      var signUpPromise = sendSignUp(this.state.email, this.state.username, this.state.password);

      signUpPromise.then(result => {
        if(result.status === 200){
          this.props.history.push('/dashboard');
        }
      });
    }
  }

  signIn(){
    this.setState({
      errorMsg: ''
    });

    console.log("Signing in");
    var signInPromise = sendSignIn(this.state.email, this.state.password);

    signInPromise.then(result => {
      if(result.status === 200){
        this.props.history.push('/dashboard');
      }
    });
  }

  render() {
    if(this.state.isRegistered){
      return (
        <div>
          <h1>Sign in</h1>
          <p className="errorTxt">{this.state.errorMsg}</p>
          <ul>
            <li><Input placeholder="Email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
             type="text" id="email" name="email" 
             value={this.state.email} onChange={this.onEmailChange}/></li>
            <li><Input placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password" id="password" name="password" 
              value={this.state.password} onChange={this.onPasswordChange}/></li>
          </ul>
          <Button onClick={this.signIn}><Icon type="login"/>Sign In</Button>
          <Button onClick={this.switchAuth}>Switch</Button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Sign up</h1>
          <p className="errorTxt">{this.state.errorMsg}</p>
          <ul>
            <li><Input placeholder="Email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
             type="text" id="email" name="email" 
             value={this.state.email} onChange={this.onEmailChange}/></li>
            <li><Input placeholder="Username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text" id="username" name="username" 
              value={this.state.username} onChange={this.onUsernameChange}/></li>
            <li><Input placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password" id="password" name="password" 
              value={this.state.password} onChange={this.onPasswordChange}/></li>
          </ul>
          <Button onClick={this.signUp}><Icon type="user-add"/>Sign Up</Button>
          <Button onClick={this.switchAuth}>Switch</Button>
        </div>
      )
    }
  }
 }
 export default Auth;