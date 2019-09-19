import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopHeader from '../components/dashboard'
import auth from '../components/auth/auth';
import Alert from 'react-s-alert';

import { Layout, Menu, Icon, Button } from 'antd';

const { Header, Sider, Content } = Layout;

class SiderDemo extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  logOut = () =>{

    auth.logout(()=>{
      Alert.success("You're safely logged out!");
        this.props.history.push('/login')
    })
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="menu-logo">
          <Icon type="wallet" theme="twoTone" className="menu-header-logo"/>
            {/* <img src={logo} className="menu-header-logo" alt="logo"/> */}
            <h1 className="menu-header" >My Wallet</h1>
            </div> 
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Dashboard</span>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Button
              type="danger"
              icon="poweroff"
              style={{float:"right"}}
              onClick={this.logOut}
            >
            
        </Button>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <TopHeader />

          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(null)(SiderDemo)

