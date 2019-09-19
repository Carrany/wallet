import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Table, Tag, notification, Icon } from 'antd';
import PropTypes from 'prop-types';
import { fetchRequests, deleteRequest } from '../../actions/requestAction';


class RequestData extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Requested Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'LP',
        key: 'months',
        dataIndex: 'months',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color;
              if (tag === 'rejected') {
                color = 'volcano';
              }
              if (tag === 'pending') {
                color = 'geekblue';
              }
              if (tag === 'accepted') {
                color = 'purple';
              }
              if (tag === 'approved') {
                color = 'green';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (


          <span>

            <a
              onClick={() => { this.handleDelete(record.id) }}>
                Delete</a>

          </span>
        ),
      },
    ];



  }
  componentWillMount() {

    this.props.fetchRequests();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.newRequest) {
      this.props.requests.unshift(nextProps.newRequest)

    }

  }

  handleDelete(id) {
    this.props.deleteRequest(id);
    notification.open({
      message: 'Delete Successful',
      description:
        '',
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });

    console.log(id)
  }




  render() {

    const data2 = this.props.requests
    console.log(data2)
    return (


      <Table  pagination={{ pageSize: 3 }} columns={this.columns} dataSource={data2} rowKey='id' />
    )
  }
}

RequestData.prototypes = {

  fetchRequests: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired,
  newRequest: PropTypes.object.isRequired
}

const MapStateToProp = state => ({

  requests: state.requests.items,
  newRequest: state.requests.item

});

export default connect(MapStateToProp, { fetchRequests, deleteRequest })(RequestData)

// export const RequestTableData = () => {
//   return (
//     <Table columns={columns} dataSource={data} />
//   );

// }

