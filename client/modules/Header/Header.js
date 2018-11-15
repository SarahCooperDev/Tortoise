import React, {Component} from 'react';
import {Menu, Icon, Dropdown} from 'antd';
import {sendLogout} from './HeaderActions';

import '../../main.css';
import 'antd/dist/antd.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {

    }

    this.logout = this.logout.bind(this);
    this.navigateMenu = this.navigateMenu.bind(this);
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
              <td><h1>Tortoise</h1></td>
              <td>
                <Dropdown overlay={menu}>
                  <Icon type="ellipsis"/>
                </Dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
} 