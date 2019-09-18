import React, { Component } from 'react'
import { Table, Divider, Tag, Checkbox, Button, Modal, Select, Icon } from 'antd';
import axios from 'axios'
import { SERVER_URL } from '../../rooturl';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
}];

const data = [{
    key: '1',
    name: 'Cappuccino',
    price: '$ 1.50',
    value: 1.5
}, {
    key: '2',
    name: 'Irish Coffee',
    price: '$ 1.50',
    value: 1.5
}, {
    key: '3',
    name: 'Cafe Latte',
    price: '$ 1.50',
    value: 1.5
}, {
    key: '4',
    name: 'Cafe Mocha',
    price: '$ 1.50',
    value: 1.5
}, {
    key: '5',
    name: 'Expresso Shot',
    price: '$ 1.50',
    value: 1.5
}];
const Option = Select.Option;

export default class OrderMenu extends Component {

    state = {
        total: 0,
        visible: false,
        mycards: [],
        selectedCard: "",
        successmessage:""
    };

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let t = 0;
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            for (let i = 0; i < selectedRows.length; i++) {
                console.log(selectedRows[i].value);
                t = t + selectedRows[i].value;
            }
            console.log("local ", t);
            this.setState({
                total: t
            })
            console.log("state ", this.state.total);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        let token=localStorage.getItem("token");
        console.log(e);
        this.setState({
            visible: false,
        });
        let data={
            number: parseInt (this.state.selectedCard)
        }
        axios
            .post(`${SERVER_URL}/payment`, data, {headers:{Token: token}})
            .then(response => {
                console.log(response)
                this.setState({
                    total: 0,
                    visible: false,
                    selectedCard: "",
                    successmessage: "Payment Done Successfully"
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
    selectCard=(value)=> {

        console.log(`selected ${value}`);
        this.setState({
            selectedCard: value
        })
      }
    componentDidMount=()=>{
        let token=localStorage.getItem("token")||""

        axios(`${SERVER_URL}/fetchcards`, {method:"GET", headers:{Token:token}})
            .then(response=>{
                console.log(response.data);
                this.setState({
                    mycards: response.data||[]
                })
            })
            .catch(err=>{
                console.log(err);
                // this.setState({
                //     mycards: [{number:"12345678", cvv:"123", balance:"789"}, {number:"87654321", cvv:"321", balance:"987"}]
                // })
            })
    }
    placeOrder=(e)=>{
        console.log("inside order")
        let token=localStorage.getItem("token")||""
        let data={
            total: this.state.total,
        }
        axios
            .post(`${SERVER_URL}/placeorder`,data, {headers:{Token: token}})
            .then(response=>{
                console.log(response.data);
                this.setState({
                    successmessage: "Order Placed Successfully! Please Make Payment!"
                })
                alert(this.state.successmessage);
                this.setState({
                    visible: true
                });
            })
            .catch(err=>{
                console.log(err);
            })
    }
    render() {
        let cards= this.state.mycards.map(c=>
            <Option value={c.CARD_NUMBER}>{c.CARD_NUMBER}</Option>
        )
        console.log("state TOTAL ", this.state.total);
        return (
            <div>
                <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#006633" }}>Menu</h2>
                <hr style={{ borderColor: "#006633", color: "#006633", height: "1px" }} />
                <div style={{ fontSize: "40px", borderBottom: '1px solid #E9E9E9' }}>
                    <Table pagination={false} rowSelection={this.rowSelection} columns={columns} dataSource={data} />
                    <hr style={{ borderColor: "#006633", color: "#006633", height: "1px" }} />
                    <h6 style={{ color: "#006633", float: "left" }}>Total: {this.state.total}
                        <span style={{ marginLeft: "670px" }}>
                        <Button onClick={this.placeOrder} type="primary">Order</Button>
                            <Button onClick={this.showModal} type="primary">Make Payment</Button>
                        </span>
                    </h6>
                    <Modal
                        title="Select Card for Payment"
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
                        <Select style={{ width: "100%" }} onChange={this.selectCard}>
                            {cards}
                        </Select>
                        {/* dropdown card number, on select card number display card balance */}
                    </Modal>
                </div>
            </div>
        );
    }
}
