import {
    Form,
    Input,
    Cascader,
    Select,
   
    Checkbox,
    Button,
   
} from 'antd';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {register} from '../actions/userAction';
import {Logo} from '../common/walletLogo';
import Alert from 'react-s-alert';




const { Option } = Select;


const residences = [
    {
        value: 'Kenya',
        label: 'Kenya',
        children: [
            {
                value: 'Nairobi',
                label: 'Nairobi',
                children: [
                    {
                        value: 'Westlands',
                        label: 'Westlands',
                    },
                    {
                        value: 'CBD',
                        label: 'CBD',
                    },
                ],
            },
        ],
    },
    {
        value: 'Uganda',
        label: 'Uganda',
        children: [
            {
                value: 'Kampala',
                label: 'Kampala',
                children: [
                    {
                        value: 'Northern',
                        label: 'Northern',
                    },
                    {
                        value: 'Eastern',
                        label: 'Eastern',
                    },
                ],
            },
        ],
    },
];

class RegistrationForm extends Component {

    
    state = {
        confirmDirty: false,
       
    };

   

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

        //To handle registration
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.register(values);
                Alert.success("You're successfully registered. Please login to continue!");
                this.props.history.push('/login');
                console.log('Received values of form: ', values);
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
      

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '254',
        })(
            <Select style={{ width: 70 }}>
                <Option value="254">+254</Option>
                <Option value="256">+256</Option>
            </Select>,
        );



        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
                <Logo/>
                <Form.Item label="First Name">
                    {getFieldDecorator('firstName', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your First Name!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Last Name">
                    {getFieldDecorator('lastName', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Last Name!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

                <Form.Item label="Residence ">
                    {getFieldDecorator('residence', {
                        initialValue: ['Kenya', 'Nairobi', 'CBD'],
                        rules: [
                            { type: 'array', required: true, message: 'Please select your habitual residence!' },
                        ],
                    })(<Cascader options={residences} />)}
                </Form.Item>
                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>,
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

 const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

// export default WrappedRegistrationForm;

export default connect(null,{register})(WrappedRegistrationForm);