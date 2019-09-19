import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Table, Tag, notification, Icon } from 'antd';
import PropTypes from 'prop-types';
import { fetchTransactions } from '../../actions/transactionAction';


class TransactionData extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color;
              if (tag === 'depo') {
                color = 'volcano';
              }
              if (tag === 'trans') {
                color = 'geekblue';
              }
              if (tag === 'deposit') {
                color = 'purple';
              }
              if (tag === 'transfer') {
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
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Mode',
        key: 'mode',
        dataIndex: 'mode',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color;
              if (tag === 'card') {
                color = 'volcano';
              }
              if (tag === 'mpesa') {
                color = 'geekblue';
              }
              if (tag === 'airtel money') {
                color = 'purple';
              }
              if (tag === 'tkash') {
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
      
    ];



  }
  componentWillMount() {

    this.props.fetchTransactions();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.newTransaction) {
      this.props.transactions.unshift(nextProps.newTransaction)

    }

  }

  

  render() {

    const data = this.props.transactions
    console.log(data)
    return (


      <Table  pagination={{ pageSize: 3 }} columns={this.columns}  dataSource={data} rowKey='id' />
    )
  }
}

TransactionData.prototypes = {

  fetchTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
  newTransaction: PropTypes.object.isRequired
}

const MapStateToProp = state => ({

  transactions: state.transactions.items,
  newTransaction: state.transactions.item

});

export default connect(MapStateToProp, { fetchTransactions })(TransactionData)



