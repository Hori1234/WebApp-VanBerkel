import React, {Component} from "react";
import {Layout, Button, Row, Col, Table, Select} from 'antd';

const {Option} = Select;
const columns = [
    {
        title: 'BookingNr',
        dataIndex: 'bookingNr',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    }, {
        title: 'Customer',
        dataIndex: 'customer',
    }, {
        title: 'TruckId',
        dataIndex: 'truckId',
    }
];
const columns2 = [
    {
        title: 'TruckId',
        dataIndex: 'truckId',
    },
    {
        title: 'Truck Driver',
        dataIndex: 'truckDriver',
    }, {
        title: 'Operation',
        dataIndex: 'operation',
    }
];
export default class ManualPlanning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrdersRowKeys: [],
            selectedTrucksRowKeys: [],
        };
    }

    selectOrdersRow = (record) => {
        const selectedOrdersRowKeys = [...this.state.selectedOrdersRowKeys];
        if (selectedOrdersRowKeys.indexOf(record.key) >= 0) {
            selectedOrdersRowKeys.splice(selectedOrdersRowKeys.indexOf(record.key), 1);
        } else {
            selectedOrdersRowKeys.push(record.key);
        }
        this.setState({selectedOrdersRowKeys});
    }
    onSelectedOrdersRowKeysChange = (selectedOrdersRowKeys) => {
        this.setState({selectedOrdersRowKeys});
        console.log('orders', selectedOrdersRowKeys);

    }
    selectTrucksRow = (record) => {
        const selectedTrucksRowKeys = [...this.state.selectedTrucksRowKeys];
        if (selectedTrucksRowKeys.indexOf(record.key) >= 0) {
            selectedTrucksRowKeys.splice(selectedTrucksRowKeys.indexOf(record.key), 1);
        } else {
            selectedTrucksRowKeys.push(record.key);
        }
        this.setState({selectedTrucksRowKeys});
    }
    onSelectedTrucksRowKeysChange = (selectedTrucksRowKeys) => {
        this.setState({selectedTrucksRowKeys});
        console.log('trucks', selectedTrucksRowKeys);

    }

    render() {
        const data = [
            {
                key: '1',
                bookingNr: '23928012',
                address: 'Eindhoven',
                customer: 'ABC',
                truckId: '',
            }, {
                key: '2',
                bookingNr: '23928012',
                address: 'Eindhoven',
                customer: 'ABC',
                truckId: '',
            },
            {
                key: '3',
                bookingNr: '23928012',
                address: 'Eindhoven',
                customer: 'ABC',
                truckId: '',
            },
            {
                key: '4',
                bookingNr: '23928012',
                address: 'Eindhoven',
                customer: 'ABC',
                truckId: '',
            },
            {
                key: '5',
                bookingNr: '23928012',
                address: 'Eindhoven',
                customer: 'ABC',
                truckId: '',
            },
            {
                key: '6',
                bookingNr: '23928012',
                address: 'Eindhoven',
                customer: 'ABC',
                truckId: '',
            },
            {
                key: '7',
                bookingNr: '23928012',
                address: 'Eindhoven',
                customer: 'ABC',
                truckId: '',
            },
            {
                key: '8',
                bookingNr: '23928012',
                address: 'Eindhoven',
                customer: 'ABC',
                truckId: '',
            },
            {
                key: '9',
                bookingNr: '23928012',
                address: 'Eindhoven',
                customer: 'ABC',
                truckId: '',
            },

        ];
        const data2 = [
            {
                key: '1',
                truckId: "TS4",
                truckDriver: "Tom",
                operation: "Regional",
            },
            {
                key: '2',
                truckId: "TS4",
                truckDriver: "Tom",
                operation: "Regional",
            },
            {
                key: '3',
                truckId: "TS4",
                truckDriver: "Tom",
                operation: "Regional",
            },
            {
                key: '4',
                truckId: "TS4",
                truckDriver: "Tom",
                operation: "Regional",
            },
            {
                key: '5',
                truckId: "TS4",
                truckDriver: "Tom",
                operation: "Regional",
            },
            {
                key: '6',
                truckId: "TS4",
                truckDriver: "Tom",
                operation: "Regional",
            }, {
                key: '7',
                truckId: "TS4",
                truckDriver: "Tom",
                operation: "Regional",
            },
            {
                key: '8',
                truckId: "TS4",
                truckDriver: "Tom",
                operation: "Regional",
            },
            {
                key: '9',
                truckId: "TS4",
                truckDriver: "Tom",
                operation: "Regional",
            }


        ];
        const {selectedOrdersRowKeys} = this.state;
        const {selectedTrucksRowKeys} = this.state;
        const ordersRowSelection = {
            selectedOrdersRowKeys,
            onChange: this.onSelectedOrdersRowKeysChange,
        };
        const trucksRowSelection = {
            selectedTrucksRowKeys,
            onChange: this.onSelectedTrucksRowKeysChange,
        };

        return (
            <Layout style={{width: "100%", backgroundColor: "white"}}>
                <Row gutter={[0, 20]}>
                    <Col span={8}>
                        <Select defaultValue="ITV" style={{width: 120}}>
                            <Option value="ITV">ITV</Option>
                            <Option value="KAT">KAT</Option>
                        </Select>
                    </Col>
                    <Col span={4} offset={12}>
                        <Button>Data visualization</Button>
                    </Col>
                </Row>
                <Row gutter={[24, 8]}>
                    <Col span={12}>
                        <Table bordered={true} rowSelection={ordersRowSelection} dataSource={data} columns={columns}
                               scroll={{x: 40}} scroll={{y: 400}} pagination={false} onRow={(record) => ({
                            onClick: () => {
                                this.selectOrdersRow(record);
                            },
                        })}/>
                    </Col>
                    <Col span={3} offset={1}>
                        <br/>
                        <br/>
                        <br/>
                        <Row>
                            <button>assign</button>
                        </Row>
                        <br/>
                        <Row>
                            <button>unassign</button>
                        </Row>
                        <br/>
                        <Row>
                            <button>Automatic Planning</button>
                        </Row>

                    </Col>
                    <Col span={7} offset={1}>
                        <Table bordered={true} rowSelection={trucksRowSelection} dataSource={data2} columns={columns2}
                               scroll={{x: 40}} scroll={{y: 400}} pagination={false} onRow={(record) => ({
                            onClick: () => {
                                this.selectTrucksRow(record);
                            },
                        })}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Button>Add order</Button> &nbsp;&nbsp;
                        <Button>Delete order</Button>
                    </Col>
                    <Col span={7} offset={9}>
                        <Button>Add truck</Button> &nbsp;&nbsp;
                        <Button>Delete truck</Button>
                    </Col>

                </Row>

            </Layout>

        )
    }

}