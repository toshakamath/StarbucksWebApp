import React, { Component } from 'react'
import { Card, Icon, Button, Modal, Select, Input } from 'antd';
import axios from 'axios'
import { SERVER_URL } from '../../rooturl';

export default class MyCards extends Component {
    state = {
        mycards: [],
        visible: false,
        number: "",
        cvv: "",
        balance: ""
    };
    componentDidMount = () => {
        let token = localStorage.getItem("token") || ""
        // console.log("log")
        let timer = setInterval(_ => {
            if (!!token)
                axios.get(`${SERVER_URL}/fetchcards`, {method:"GET", headers:{Token:token}})
                    .then(response => {
                        console.log(response.data);
                        clearInterval(timer)
                        this.setState({
                            mycards: response.data || []
                        })
                    })
                    .catch(err => {
                        clearInterval(timer)
                        console.log(err);
                        // this.setState({
                        //     mycards: [{number:"12345678", cvv:"123", balance:"789"}, {number:"87654321", cvv:"321", balance:"987"}]
                        // })
                    })
        }, 100)
    }
    showAddCardModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token") || ""
        this.setState({
            visible: false,
        });
        // if (this.state.number.length != 9) {
        //     this.setState({
        //         errormessage: "Length of the card is not appropriate!"
        //     })
        // }
        // else if (this.state.cvv.length != 3) {
        //     this.setState({
        //         errormessage: "Length of the cvv is not appropriate!"
        //     })
        // }
        // else if (this.state.balance <= 0) {
        //     this.setState({
        //         errormessage: "Card doesn't have enough balance!"
        //     })
        // }
        // else {
            console.log("here")
            let data = {
                number: parseInt(this.state.number),
                cvv: parseInt(this.state.cvv),
                balance: parseInt(this.state.balance)
            }
            console.log("data+token: ", data, token);
            axios.post(`${SERVER_URL}/addcard`, data, {method:"POST", headers:{Token:token}})
                .then(response => {
                    this.setState({
                        successmessage: "Added Card Successfully!"
                    })
                    alert(this.state.successmessage);
                })
                .catch(err => {
                    console.log(err)
                })
        // }
    }
    deleteCard = (e) => {
        console.log("DELETE: ", e.target.value);
        let token = localStorage.getItem("token");
        // let data = {
        //     number: e.target.value
        // }
        let number=e.target.value;
        // axios.post('http://localhost:5000/card?number='+number,{}, {method:"DELETE", headers:{Token:token}})

        axios.post(`${SERVER_URL}/deletecard?number=${number}`,{}, {method:"DELETE", headers:{Token:token}})
            .then(response => {
                console.log(response.data);
                this.setState({
                    successmessage: "Deleted Card Successfully!"
                })
                alert(this.state.successmessage);
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    onChange = (e) => {
        console.log([e.target.name], " ", e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // updateBalance=(e)=>{
    //     console.log("Update: ",e.target.value);
    //     let token=localStorage.getItem("token");
    //     this.setState({
    //         addbalance:false
    //     })
    //     let data={
    //         number:this.state.number,
    //         balance:this.state.newbalance
    //     }
    //     axios
    //         .post("http://localhost:5000/addbalance", data, {headers:{Token: token}})
    //         .then(response => {
    //             console.log(response.data);
    //             this.setState({
    //                 successmessage: "Deleted Card Successfully!"
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    balanceChangeHandler = (e) => {
        this.setState({
            newbalance: e.target.value
        })
    }
    render() {
        let cards = this.state.mycards.map((c, i) =>
            <Card
                title={<div>Card {i + 1}<span style={{ float: "right" }}><Button type="danger" value={c.CARD_NUMBER} onClick={this.deleteCard}><Icon type="delete" /></Button></span></div>}
                style={{ width: 300 }}
                headStyle={{ border: "1px solid #006633" }}
                bodyStyle={{ border: "1px solid #006633" }}
            >
                <p><b>Card Number: {c.CARD_NUMBER}</b></p>
                <p>CVV: {c.CARD_CVV}</p>
                <p>Balance: ${c.CARD_BALANCE}</p>
            </Card>
        )

        return (
            <div>
                <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#006633" }}>
                    My Cards
                <span>
                        <Button onClick={this.showAddCardModal} type="primary" style={{ float: "right" }}>
                            <Icon type="plus" />
                        </Button>
                    </span>
                </h2>
                <hr style={{ borderColor: "#006633", color: "#006633", height: "1px" }} />
                {cards}
                <Modal
                    title="Add New Card"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            <Icon type="wallet" />
                            Pay
                            </Button>
                    ]}
                >
                    <Input name="number" prefix={<Icon type="wallet" />} onChange={this.onChange} placeholder="Enter Card Number" style={{ margin: "10px 0" }} />
                    <Input name="cvv" prefix={<Icon type="key" />} onChange={this.onChange} placeholder="Enter CVV" style={{ margin: "10px 0" }} />
                    <Input name="balance" prefix={<Icon type="dollar" />} onChange={this.onChange} placeholder="Enter Balance" style={{ margin: "10px 0" }} />
                    {/* dropdown card number, on select card number display card balance */}
                </Modal>
            </div>
        )
    }
}
