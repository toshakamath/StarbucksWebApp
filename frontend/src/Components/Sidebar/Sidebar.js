import React from "react";
import { Layout, Menu, Icon, Typography, message } from "antd";
import logo from '../../logo/Starbucks_Coffee_Logo.png-768x768.png'
import { Switch, Route } from "react-router-dom";
import MyCards from "../MyCards/MyCards";
import OrderMenu from "../OrderMenu/OrderMenu";

const { Header, Content, Sider } = Layout;

const SubMenu = Menu.SubMenu;

export default class Sidebar extends React.Component {
  state = {
    collapsed: false
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  handleClick = ({ key }) => {
    key = key === "placeorder" ? "" : key;
    this.props.history.push(`/${key}`);
  };
  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
      <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
        <Menu
          defaultSelectedKeys={['placeorder']}
          mode="inline"
          theme="dark"
          onClick={this.handleClick}
        >
        <div style={{display: "flex", justifyContent: "center", alignItems:"center", padding: "10px 0"}}></div>
        <img src={logo} style={{width:"50px", height: "50px"}}/>
        <Menu.Item key="placeorder">
          <Icon type="ordered-list" />
            <span>Place Order</span>
          </Menu.Item>
          <Menu.Item key="managecards">
          <Icon type="credit-card" />
            <span>Manage Cards</span>
          </Menu.Item>
        </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#FFF", padding: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  marginLeft: "20px",
                  fontWeight: "600",
                  fontSize: "20px"
                }}
              >
              </div>
              <div
                style={{ marginRight: "20px", cursor: "pointer" }}
                onClick={this.handleLogout}
              >
                <Icon type="logout" />
                &nbsp;Logout
              </div>
            </div>
          </Header>
          <Content >
            <div style={{ padding: 24, background: "#fff", minHeight: "90vh" }}>
              <Switch>
                <Route path="/managecards" component={MyCards} />
                <Route path="/" exact component={OrderMenu} />
              </Switch>
            </div>
          </Content>
        </Layout>
        </Layout>
        
    );
  }
}
