import React, {Component} from "react";
import {Layout, Button, Row, Col, Table, Select, Menu, Checkbox, Dropdown} from 'antd';

const {Option} = Select;
const data = [
    {
        key: '1',
        bookingNr: '923928012',
        address: 'Eindhoven',
        customer: 'ABC',
        truckId: '',
    }, {
        key: '2',
        bookingNr: '12392801',
        address: 'Amsterdam',
        customer: 'ACC',
        truckId: '',
    },
    {
        key: '3',
        bookingNr: '23',
        address: 'Utrecht',
        customer: 'CAC',
        truckId: '',
    },
    {
        key: '4',
        bookingNr: '23928012',
        address: 'Eindhoven',
        customer: 'ZZZ',
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
const columns2 = [
    {
        title: 'TruckId',
        dataIndex: 'truckId',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.truckId.localeCompare(b.truckId),
        width: 100,
    },
    {
        title: 'Truck Driver',
        dataIndex: 'truckDriver',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.truckId.localeCompare(b.truckId),
        width: 100,
    }, {
        title: 'Operation',
        dataIndex: 'operation',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.truckId.localeCompare(b.truckId),
        width: 100,
    }
];
export default class ManualPlanning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrdersRowKeys: [],
            selectedTrucksRowKeys: [],
            columnFilter: [],
            isVisible: false,
            columns: [
                {
                    title: 'BookingNr',
                    dataIndex: 'bookingNr',
                    sorter: (a, b) => a.bookingNr - b.bookingNr,
                    width: 110,

                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    sortDirections: ['descend', 'ascend'],
                    sorter: (a, b) => a.address.localeCompare(b.address),
                    width: 100,
                }, {
                    title: 'Customer',
                    dataIndex: 'customer',
                    sortDirections: ['descend', 'ascend'],
                    sorter: (a, b) => a.customer.localeCompare(b.customer),
                    width: 100,
                }, {
                    title: 'TruckId',
                    dataIndex: 'truckId',
                    width: 90,
                }, {
                    title: 'DeliveryDeadline',
                    dataIndex: 'deliveryDeadline',
                    width: 100,
                }, {
                    title: 'ProcessTime',
                    dataIndex: 'processTime',
                    width: 100,
                }
            ],
            startingColumns: []
        };
    }

    componentDidMount() {
        this.setState({startingColumns: this.state.columns})
    }
    changeVisibility = isTrue => {
        this.setState({isVisible: isTrue});
    };
    filterColumns = (e) => {
        var columnFilter = this.state.columnFilter
        if (e.target.checked) {
            columnFilter = columnFilter.filter(current => {
                return current !== e.target.id
            })
        } else if (!e.target.checked) {
            columnFilter.push(e.target.id)
        }
        var final = this.state.startingColumns;
        for (var i = 0; i < columnFilter.length; i++)
            final = final.filter(current => {
                return current.dataIndex !== columnFilter[i]
            })
        this.setState({columns: final, columnFilter: columnFilter})
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
        const showHideMenu = (
            <Menu>
                <Menu.ItemGroup title="Columns">
                    <Menu.Item key="addressMenu"><Checkbox id="address" onChange={this.filterColumns}
                                                           defaultChecked>Address</Checkbox></Menu.Item>
                    <Menu.Item key="customerMenu"><Checkbox id="customer" onChange={this.filterColumns}
                                                            defaultChecked>Customer</Checkbox></Menu.Item>
                    <Menu.Item key="truckIdMenu"><Checkbox id="truckId" onChange={this.filterColumns}
                                                           defaultChecked>TruckId</Checkbox></Menu.Item>
                    <Menu.Item key="deliveryDeadline"><Checkbox id="deliveryDeadline" onChange={this.filterColumns}
                                                                defaultChecked>deliveryDeadline</Checkbox></Menu.Item>
                    <Menu.Item key="processTime"><Checkbox id="processTime" onChange={this.filterColumns}
                                                           defaultChecked>processTime</Checkbox></Menu.Item>

                </Menu.ItemGroup>
            </Menu>
        )
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
                <Row gutter={[0, 10]}>
                    <Col span={8}>
                        <Select defaultValue="ITV" style={{width: 120}}>
                            <Option value="ITV">ITV</Option>
                            <Option value="KAT">KAT</Option>
                        </Select>
                        &nbsp;
                        <Dropdown overlay={showHideMenu} onVisibleChange={this.changeVisibility}
                                  visible={this.state.isVisible}>
                            <Button>Show/Hide</Button>
                        </Dropdown>

                    </Col>
                    <Col span={3} offset={13}>
                        <Button>Data visualization</Button>
                    </Col>
                </Row>
                <Row gutter={[24, 8]} justify="space-around" align="middle">
                    <Col span={12}>
                        <Table bordered={true} rowSelection={ordersRowSelection} dataSource={data}
                               columns={this.state.columns}
                               scroll={{x: 'max-content'}} scroll={{y: "50vh"}} pagination={false} onRow={(record) => ({
                            onClick: () => {
                                this.selectOrdersRow(record);
                            },
                        })}/>
                        <Button>Add order</Button> &nbsp;&nbsp;
                        <Button>Delete order</Button>
                    </Col>
                    <Col span={3}>
                        <Row>
                            <button style={{width: "100%"}}>assign</button>
                        </Row>
                        <br/>
                        <Row>
                            <button style={{width: "100%"}}>unassign</button>
                        </Row>
                        <br/>
                        <Row>
                            <button style={{width: "100%"}}>Auto Plan</button>
                        </Row>

                    </Col>
                    <Col span={9}>
                        <Table bordered={true} rowSelection={trucksRowSelection} dataSource={data2} columns={columns2}
                               scroll={{x: 'max-content'}} scroll={{y: "50vh"}} pagination={false} onRow={(record) => ({
                            onClick: () => {
                                this.selectTrucksRow(record);
                            },
                        })}/>
                        <Button>Add truck</Button> &nbsp;&nbsp;
                        <Button>Delete truck</Button>
                    </Col>
                </Row>
            </Layout>
        )
    }
}