import React, {Component} from 'react';
import {Menu, Icon, Dropdown} from 'antd';
import {sendLogout, sendVerifyRequest} from './HeaderActions';

import '../../main.css';
import 'antd/dist/antd.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }

    this.logout = this.logout.bind(this);
    this.navigateMenu = this.navigateMenu.bind(this);
    this.goToDash = this.goToDash.bind(this);
  }

  goToDash(){
    this.props.history.push('/dashboard');
  }

  componentDidMount(){
    var verifyPromise = sendVerifyRequest();

    verifyPromise.then(result => {
      console.log("In promise");

      if(result === null || result.status === 401){
        this.props.history.push('/auth');
      } else {
        result.json().then(data => {
          console.log("Data is " + data);
          console.log("Username is " + data.username);
          this.setState({
            username: data.username
          });
        });
      }
    });
  }

  logout(){
    var logoutPromise = sendLogout();

    logoutPromise.then(result => {
      console.log("In logout promise");
      console.log(result.status);
      if(result.status === 200){
        this.props.history.push('/auth');
      }
    });
  }

  navigateMenu(e){
    if(e.key === "1"){

    } else if(e.key === "2"){
      console.log("Logging out");
      this.logout();
    }
  }

  render(){
    const menu = (
      <Menu onClick={this.navigateMenu}>
        <Menu.Item key="1"><Icon type="user"/>Account</Menu.Item>
        <Menu.Item key="2"><Icon type="logout"/>Logout</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td onClick={this.goToDash}><h1>Tortoise</h1></td>
              <td>
                <Dropdown overlay={menu}>
                  <Icon type="ellipsis"/>
                </Dropdown>
              </td>
              <td>
                <h3>{this.state.username}</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
} 