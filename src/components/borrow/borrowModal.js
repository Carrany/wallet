import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, InputNumber, Slider, message } from 'antd';
import moment from 'moment';
import {requestLoan} from '../../actions/requestAction';

const marks = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: '11',
    12: {
        style: {
            color: '#3C33FF',
        },
        label: <strong>12 Months</strong>,
    },
};

class Borrow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            amount: '',
            months: '',
            date: moment(new Date()).format('DD-MM-YY')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMonths = this.handleChangeMonths.bind(this);
    }
   

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        if(this.state.amount&&this.state.months)
        {
    
        const borrowDetails = {
        amount: this.state.amount,
        months: this.state.months,
        date: this.state.date,
        status: ["pending"],
        type: "LOAN"
        }
        this.props.requestLoan(borrowDetails);
        console.log(borrowDetails);

        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                amount:'',
                months:''

            });
        });
         message.success('Loan Request Successful', 3);

    }else{
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
    handleChange(e) {
        console.log(e);
        this.setState({ amount: e });

    }
    handleChangeMonths(m) {
        console.log(m);
        this.setState({ months: m });

    }


    render() {

        return (
            <>
                <Button onClick={this.showModal}>
                    Borrow
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
                    </div>
                    <div>
                        <h3>Period:</h3>

                        <Slider marks={marks} min={1} max={12} name="months" value={this.state.months?this.state.months:0} onChange={this.handleChangeMonths} />
                    </div>
                    
                </Modal>
            </>
        );
    }
}

export default connect(null,{ requestLoan })(Borrow);
