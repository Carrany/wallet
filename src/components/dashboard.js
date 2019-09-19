import React, { Component } from 'react'
import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';
import RequestData from './borrow/requestData';
import Borrow from './borrow/borrowModal'
import TransactionData from './transaction/TransactionData'
import TransactionModal from './transaction/transactModal'



const { TabPane } = Tabs;

const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}>
        <Descriptions.Item label="Account Name">Sir. BankAlot</Descriptions.Item>
        <Descriptions.Item label="Account No:">
            <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="Creation Time">2019-09-17</Descriptions.Item>
        <Descriptions.Item label="Effective Time">2019-09-17</Descriptions.Item>
        <Descriptions.Item label="Account Type">
            Primary Account
    </Descriptions.Item>
    </Descriptions>
);

const extraContent = (
    <div
        style={{
            display: 'flex',
            width: 'max-content',
            justifyContent: 'flex-end',
        }}
    >
        <Statistic
            title="Status"
            value="Active"
            style={{
                marginRight: 32,
            }}
        />
        <Statistic title="Balance" prefix="KES" value={60000} />
    </div>
);

const Content = ({ children, extra }) => {
    return (
        <div className="content">
            <div className="main">{children}</div>
            <div className="extra">{extra}</div>
        </div>
    );
};
export default class TopHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    // onBack={() => window.history.back()}
                    title="Wallet "
                    subTitle="TM"
                    extra={[
                        <Borrow key="3" />,
                        <TransactionModal key="2"/>,
                        <Button key="1" type="primary">
                            Transfer
              </Button>,
                    ]}
                    footer={
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Transactions" key="1" >
                                <TransactionData />
                            </TabPane>
                            <TabPane tab="Requests" key="2" >
                                <RequestData />
                                </TabPane>
                        </Tabs>
                    }
                >
                    <Content extra={extraContent}>{renderContent()}</Content>
                </PageHeader>
        
            </div>
        )
    }

}
