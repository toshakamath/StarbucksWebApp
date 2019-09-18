import React, { Component } from 'react'
import { Button, Input, Divider, Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import logo from '../../logo/Starbucks_Coffee_Logo.png-768x768.png'
import {SERVER_URL} from "../../rooturl"

export default class Login extends Component {
    state={
        username:"",
        password:""
    }

    onChangeUsername =(e)=>{
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword =(e)=>{
        this.setState({
            password: e.target.value
        })
    }
    submitLogin = (e) =>{
        e.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        axios
            .post(`${SERVER_URL}/login`, data)
            .then(response => {
                console.log(response)
                localStorage.setItem("token", response.data.token)
                message.success("Logged in successfully")
                this.props.history.push("/")
            })
            .catch(err => {
                console.log(err)
                this.props.history.push("/login")
            })
    }
    renderSignup=(e)=>{
        this.props.history.push('/signup');
    }
  render() {
    return ( 
        <div style={{padding:"50px", border:"1px solid #DCDCDC", margin: "auto", width: "30%", marginTop: "100px" }}>
        <img src={logo} style={{width:"100px", height: "100px", marginBottom:"30px"}}/>
        <div>
            <Input name="username" prefix={<Icon type="user" />} onChange={this.onChangeUsername} placeholder="Enter username" />
        </div>
        <div>
            <Input.Password name="password" prefix={<Icon type="unlock" />} onChange={this.onChangePassword} placeholder="Enter Password" style={{ margin: "10px 0" }} />
        </div>
        <Button onClick={this.submitLogin} style={{ marginTop:"30px", width: "40%" }} icon="login">Login</Button>
        <Divider />
        <p>Don't have an account?</p>
        <Button onClick={this.renderSignup} type="primary" icon="user">Sign Up</Button>
    </div>
    )
  }
}
