import React,{ Component } from 'react'
import { Popconfirm, Switch, message } from 'antd';

class DeletePopUp extends Component {
  state = {
    visible: true,
    condition: true, // Whether meet the condition, if not show popconfirm.
  };

  

  confirm = () => {
    this.setState({ visible: false });
    message.success('Deleted Successfully');
  };

  cancel = () => {
    this.setState({ visible: false });
    message.error('Click on cancel.');
  };

  handleVisibleChange = visible => {
    if (!visible) {
      this.setState({ visible });
      return;
    }
    // Determining condition before show the popconfirm.
    console.log(this.state.condition);
    if (this.state.condition) {
      this.confirm(); // next step
    } else {
      this.setState({ visible }); // show the popconfirm
    }
  };

  render() {
    return (
        <Popconfirm
          title="Are you sure delete this request?"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
          onConfirm={this.confirm}
          onCancel={this.cancel}
          okText="Yes"
          cancelText="No"
        >
        </Popconfirm>
    );
  }
}

export default DeletePopUp;