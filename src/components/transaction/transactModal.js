import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, InputNumber, Select, message } from 'antd';
import moment from 'moment';
import { createTransaction } from '../../actions/transactionAction'

const { Option } = Select;

class Transact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            amount: '',
            mode: '',
            date: moment(new Date()).format('DD-MM-YY')
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        if (this.state.amount && this.state.mode) {

            const transactionDetails = {
                amount: this.state.amount,
                date: this.state.date,
                mode: [this.state.mode],
                type: ["deposit"]
            }
            this.props.createTransaction(transactionDetails);
            console.log(transactionDetails);

            this.setState({
                confirmLoading: true,
            });
            setTimeout(() => {
                this.setState({
                    visible: false,
                    confirmLoading: false,
                    amount:'',
                    mode:''
                });
            });
            message.success('Transaction Successful', 3);

        } else {
            message.info('Please apply correctly', 3);
            return;
        }

    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    handleChange(unit) {

        this.setState({ amount: unit });

    }
    handleSelectChange(value) {
        this.setState({ mode: value });
        
      }




    render() {

        return (
            <>
                <Button onClick={this.showModal}>
                    Deposit
        </Button>
                <Modal
                    title="How Much?"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <h3>Amount:</h3>
                        <InputNumber
                            style={{ width: 200 }}
                            defaultValue={1000}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={this.handleChange}
                            name="amount"
                            value={this.state.amount}

                        />
                        <h3>Mode:</h3>
                        <Select defaultValue="mpesa" style={{ width: 120 }} onChange={this.handleSelectChange}>
                            <Option value="mpesa">Mpesa</Option>
                            <Option value="card">Card</Option>
                            <Option value="tkash">TKash</Option>
                            <Option value="airtel money">Airtel Money</Option>
                        </Select>


                    </div>




                </Modal>
            </>
        );
    }
}

export default connect(null, { createTransaction })(Transact);
