import React, { Component } from 'react'
import { Button, Input, Divider, Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import logo from '../../logo/Starbucks_Coffee_Logo.png-768x768.png'
import {SERVER_URL} from "../../rooturl"

export default class Signup extends Component {
    
    state={
        name:"",
        username:"",
        password:""
    }

    onChangeName =(e)=>{
        this.setState({
            name: e.target.value
        })
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
    submitSignup=(e)=>{
        e.preventDefault();
        console.log(this.state.name);
        console.log(this.state.username);
        console.log(this.state.password);
        let data = {
            name:this.state.name,
            username: this.state.username,
            password: this.state.password
        }
        axios
            .post(`${SERVER_URL}/signup`, data)
            .then(response => {
                console.log(response)
                this.props.history.push("/login")
            })
            .catch(err => {
                console.log(err)
            })
    }
    renderLogin =(e)=>{
        this.props.history.push('/login');
    }
    
  render() {
    const { toggleForms } = this.props;
    return ( 
        <div style={{padding:"50px", border:"1px solid #DCDCDC", margin: "auto", width: "30%", marginTop: "100px" }}>
        <img src={logo} style={{width:"100px", height: "100px", marginBottom:"30px"}}/>
        <div>
            <Input name="name" prefix={<Icon type="smile" />} onChange={this.onChangeName} placeholder="Enter Name" style={{ margin: "10px 0" }}/>
        </div>
        <div>
            <Input name="username" prefix={<Icon type="user" />} onChange={this.onChangeUsername} placeholder="Enter username" />
        </div>
        <div>
        <Input.Password name="password" prefix={<Icon type="unlock" />} onChange={this.onChangePassword} placeholder="Enter Password" style={{ margin: "10px 0" }} />
        </div>
        {/* <div>
            <Button icon="user-add" style={{ width: "40%", marginTop: "10px" }}  >Add More</Button>
        </div> */}
        <Button onClick={this.submitSignup} type="primary" style={{ width: "40%", marginTop: "40px" }} icon="user">Sign Up</Button>
        <Divider />
        <p>Already have an account?</p>
        <Button onClick={this.renderLogin} style={{ width: "40%" }} icon="login">Login</Button>
    </div>
    )
  }
}
