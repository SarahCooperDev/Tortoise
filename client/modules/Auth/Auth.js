import React, {Component, } from 'react';
import { sendSignUp, sendSignIn } from './AuthActions';

class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRegistered: true,
      email: '',
      username: '',
      password: '',
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
    console.log("Signing up");
    var signUpPromise = sendSignUp(this.state.email, this.state.username, this.state.password);

    signUpPromise.then(result => {
      if(result.status === 200){
        this.props.history.push('/dashboard');
      }
    });
  }

  signIn(){
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
          <ul>
            <li><label>Email</label><input type="text" id="email" name="email" value={this.state.email} onChange={this.onEmailChange}/></li>
            <li><label>Password</label><input type="password" id="password" name="password" value={this.state.password} onChange={this.onPasswordChange}/></li>
          </ul>
          <button onClick={this.signIn}>Sign In</button>
          <button onClick={this.switchAuth}>Switch</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Sign up</h1>
          <ul>
            <li><label>Email</label><input type="text" id="email" name="email" value={this.state.email} onChange={this.onEmailChange}/></li>
            <li><label>Username</label><input type="text" id="username" name="username" value={this.state.username} onChange={this.onUsernameChange}/></li>
            <li><label>Password</label><input type="password" id="password" name="password" value={this.state.password} onChange={this.onPasswordChange}/></li>
          </ul>
          <button onClick={this.signUp}>Sign Up</button>
          <button onClick={this.switchAuth}>Switch</button>
        </div>
      )
    }
  }
 }
 export default Auth;