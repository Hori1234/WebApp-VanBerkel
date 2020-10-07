import React, { Component } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Table,
  Select,
  Menu,
  Checkbox,
  Dropdown,
  Modal,
  message,
} from "antd";
import axios from "axios";
import EditableTable from "./EditableTable";
import AddOrdersLayout from "./AddOrdersLayout";
import AddTruckLayout from "./AddTruckLayout";
import "./ManualPlanning.css";

const { Option } = Select;

var vPage_orders = 1;
var vPage_trucks = 1;
var vPage_size = 10;

const dataITV = [
  {
    key: "1",
    bookingNr: "923928012",
    address: "Eindhoven",
    customer: "ITV",
    truckId: "",
  },
  {
    key: "2",
    bookingNr: "12392801",
    address: "Amsterdam",
    customer: "ITV",
    truckId: "",
  },
  {
    key: "3",
    bookingNr: "23",
    address: "Utrecht",
    customer: "ITV",
    truckId: "",
  },
  {
    key: "4",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "ITV",
    truckId: "",
  },
  {
    key: "5",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "ITV",
    truckId: "",
  },
  {
    key: "6",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "ITV",
    truckId: "",
  },
  {
    key: "7",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "ITV",
    truckId: "",
  },
  {
    key: "8",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "ABC",
    truckId: "",
  },
  {
    key: "9",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "ABC",
    truckId: "",
  },
];
const dataKAT = [
  {
    key: "1",
    bookingNr: "923928012",
    address: "Eindhoven",
    customer: "KAT",
    truckId: "",
  },
  {
    key: "2",
    bookingNr: "12392801",
    address: "Amsterdam",
    customer: "KAT",
    truckId: "",
  },
  {
    key: "3",
    bookingNr: "23",
    address: "Utrecht",
    customer: "KAT",
    truckId: "",
  },
  {
    key: "4",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "KAT",
    truckId: "",
  },
  {
    key: "5",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "KAT",
    truckId: "",
  },
  {
    key: "6",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "KAT",
    truckId: "",
  },
  {
    key: "7",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "KAT",
    truckId: "",
  },
  {
    key: "8",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "ABC",
    truckId: "",
  },
  {
    key: "9",
    bookingNr: "23928012",
    address: "Eindhoven",
    customer: "ABC",
    truckId: "",
  },
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
          title: "Booking Nr",
          dataIndex: "bookingNr",
          sorter: (a, b) => a.bookingNr - b.bookingNr,
          width: 110,
          editable: true,
        },
        {
          title: "Address",
          dataIndex: "address",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.address.localeCompare(b.address),
          width: 100,
          editable: true,
        },
        {
          title: "Customer",
          dataIndex: "customer",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.customer.localeCompare(b.customer),
          width: 100,
          editable: true,
        },
        {
          title: "Truck ID",
          dataIndex: "truckId",
          width: 90,
          editable: true,
        },
        {
          title: "Delivery Deadline",
          dataIndex: "deliveryDeadline",
          width: 100,
          editable: true,
        },
        {
          title: "Process Time",
          dataIndex: "processTime",
          width: 100,
          editable: true,
        },
        {
          title: "Driving Time",
          dataIndex: "drivingTime",
          width: 100,
          editable: true,
        },
        {
          title: "Service Time",
          dataIndex: "serviceTime",
          width: 100,
          editable: true,
        },
      ],
      columns2: [
        {
          title: "Truck ID",
          dataIndex: "truckId",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.truckId.localeCompare(b.truckId),
          width: 100,
          editable: true,
        },
        {
          title: "Truck Driver",
          dataIndex: "truckDriver",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.truckId.localeCompare(b.truckId),
          width: 100,
          editable: true,
        },
        {
          title: "Availability",
          dataIndex: "availability",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.truckId.localeCompare(b.truckId),
          width: 100,
          editable: true,
        },
      ],
      data: [],
      data2: [],
      startingColumns: [],
      AOVisible: false,
      ATVisible: false,
      magnifyOrders: false,
      status: "",
      newOrder: {
        order_number: "",
        inl: "",
        latest_dept_time: "",
        truck_type: "",
        hierarchy: "",
        delivery_deadline: "",
        driving_time: "",
        process_time: "",
        service_time: "",
      },
      newTruck: {
        truck_id: "",
        truck_snumber: "",
        availability: "",
        truck_type: "",
        terminal: "",
        hierarchy: "",
        use_cost: "",
        starting_time: "",
        date: "",
      },
      temp: [],
    };
  }

  componentDidMount() {
    this.setState({ startingColumns: this.state.columns });
    this.getOrderList("latest");
    this.getTruckList("latest");
  }

  changeVisibility = (isTrue) => {
    this.setState({ isVisible: isTrue });
  };
  filterColumns = (e) => {
    var columnFilter = this.state.columnFilter;
    if (e.target.checked) {
      columnFilter = columnFilter.filter((current) => {
        return current !== e.target.id;
      });
    } else if (!e.target.checked) {
      columnFilter.push(e.target.id);
    }
    var final = this.state.startingColumns;
    for (let i = 0; i < columnFilter.length; i++)
      final = final.filter((current) => {
        return current.dataIndex !== columnFilter[i];
      });
    this.setState({ columns: final, columnFilter: columnFilter });
  };
  changeData = (d) => {
    if (d === "KAT") {
      this.setState({ data: this.state.orderList });
    } else if (d === "ITV") {
      this.setState({ data: dataITV });
    }
  };
  selectOrdersRow = (record) => {
    const selectedOrdersRowKeys = [...this.state.selectedOrdersRowKeys];
    if (selectedOrdersRowKeys.indexOf(record.key) >= 0) {
      selectedOrdersRowKeys.splice(
        selectedOrdersRowKeys.indexOf(record.key),
        1
      );
    } else {
      selectedOrdersRowKeys.push(record.key);
    }
    this.setState({ selectedOrdersRowKeys });
  };
  onSelectedOrdersRowKeysChange = (selectedOrdersRowKeys) => {
    this.setState({ selectedOrdersRowKeys });
    console.log("orders", selectedOrdersRowKeys);
  };
  selectTrucksRow = (record) => {
    const selectedTrucksRowKeys = [...this.state.selectedTrucksRowKeys];
    if (selectedTrucksRowKeys.indexOf(record.key) >= 0) {
      selectedTrucksRowKeys.splice(
        selectedTrucksRowKeys.indexOf(record.key),
        1
      );
    } else {
      selectedTrucksRowKeys.push(record.key);
    }
    this.setState({ selectedTrucksRowKeys });
  };
  onSelectedTrucksRowKeysChange = (selectedTrucksRowKeys) => {
    this.setState({ selectedTrucksRowKeys });
    console.log("trucks", selectedTrucksRowKeys);
  };
  ShowTruckModal = () => {
    this.setState({
      ATVisible: true,
    });
  };
  showOrdersModal = () => {
    this.setState({
      AOVisible: true,
    });
  };
  magnifyOrdersModal = () => {
    this.setState({
      magnifyOrders: true,
    });
  };
  handleOk = () => {
    this.setState({
      AOVisible: false,
      ATVisible: false,
    });
  };
  handleCancel = (e) => {
    this.setState({
      AOVisible: false,
      ATVisible: false,
    });
  };
  okMagnify = (e) => {
    this.setState({ magnifyOrders: false });
  };
  cancelMagnify = (e) => {
    this.setState({ magnifyOrders: false });
  };
  truckRowColor = (e) => {
    if (e === "Regional") {
      return "table-row-regional";
    } else if (e === "Terminal") {
      return "table-row-terminal";
    } else if (e === "Port") {
      return "table-row-port";
    }
  };

  deleteTruck = () => {};
  deleteOrder = () => {};
  addTruck = (value) => {
    this.getTruckInfo();
    return axios
      .post(`/api/trucks/sheet/${value}`, {
        truck_id: this.state.newTruck.truck_id,
        availability: false,
        truck_type: this.state.newTruck.truck_type,
        business_type: this.state.newTruck.use_cost,
        terminal: this.state.newTruck.terminal,
        hierarchy: 0,
        use_cost: 0,
        date: toString(this.state.newTruck.date),
        starting_time: this.state.newTruck.starting_time,
      })
      .then((res) => {
        if (res.status === 200) {
          message.success("Trcuk: " + "added succesfully");
        }
        this.handleOk();
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        return false;
      });
  };
  addOrder = (value) => {
    this.getOrderInfo();
    return axios
      .post(`/api/orders/sheet/${value}`, {
        inl_terminal: this.state.newOrder.inl,
        truck_type: this.state.newOrder.truck_type,
        hierarchy: 0,
        delivery_deadline: 0,
        driving_time: 0,
        process_time: 0,
      })
      .then((res) => {
        if (res.status === 200) {
          message.success(
            "Order: " +
              res.data["inl_terminal"] +
              res.data["truck_type"] +
              "added succesfully"
          );
        }
        this.handleOk();
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        return false;
      });
  };

  getOrderList = async (value) => {
    return axios
      .get(`/api/orders/sheet/${value}`)
      .then((res) => {
        var outarray = [];
        for (var i = 1; i < res.data.orders.length; i++) {
          var temp = {
            key: res.data.orders[i]["order_number"],
            bookingNr: res.data.orders[i]["Booking"],
            address: res.data.orders[i]["City"],
            customer: res.data.orders[i]["inl_terminal"],
            truckId: res.data.orders[i]["Truck (1)"],
            deliveryDeadline: res.data.orders[i]["delivery_deadline"],
            processTime: res.data.orders[i]["process_time"],
            drivingTime: res.data.orders[i]["driving_time"],
            serviceTime: res.data.orders[i]["service_time"],
          };
          outarray.push(temp);
        }
        console.log(outarray);
        this.setState((state) => ({
          ...state,
          data: outarray,
          status: "success",
        }));
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        return false;
      });
  };
  getTruckList = async (value) => {
    return axios
      .get(`/api/trucks/sheet/${value}`)
      .then((res) => {
        var outarray = [];
        for (var i = 1; i < res.data.trucks.length; i++) {
          var temp = {
            key: res.data.trucks[i]["s_number"],
            truckId: res.data.trucks[i]["truck_id"],
            truckDriver: res.data.trucks[i]["Driver"],
            availability: res.data.trucks[i]["starting_time"],
          };
          outarray.push(temp);
        }
        console.log(outarray);
        this.setState((state) => ({
          ...state,
          data2: outarray,
          status: "success",
        }));
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        return false;
      });
  };

  setNewOrder = (vON, vInl, vLDT, vTT, vH, vDD, vDT, vPT, vST) => {
    console.log(vON, vInl, vLDT, vTT, vH, vDD, vDT, vPT, vST);
    this.setState((prevState) => {
      let newOrder = Object.assign({}, prevState.newOrder); // creating copy of state variable newOrder
      newOrder.order_number = vON;
      newOrder.inl = vInl;
      newOrder.latest_dept_time = vLDT;
      newOrder.truck_type = vTT;
      newOrder.hierarchy = vH;
      newOrder.delivery_deadline = vDD;
      newOrder.driving_time = vDT;
      newOrder.process_time = vPT;
      newOrder.service_time = vST;
      return { newOrder }; // return new object newOrder object
    });
    console.log(this.state.newOrder);
  };

  setNewTruck = (vON, vInl, vLDT, vTT, vH, vDD, vDT, vPT, vST) => {
    console.log(vON, vInl, vLDT, vTT, vH, vDD, vDT, vPT, vST);
    this.setState((prevState) => {
      let newTruck = Object.assign({}, prevState.newTruck); // creating copy of state variable newOrder
      newTruck.truck_id = vON;
      newTruck.truck_snumber = vInl;
      newTruck.availability = vLDT;
      newTruck.truck_type = vTT;
      newTruck.hierarchy = vH;
      newTruck.terminal = vDD;
      newTruck.use_cost = vDT;
      newTruck.starting_time = vPT;
      newTruck.date = vST;
      return { newTruck }; // return new object newOrder object
    });
    console.log(this.state.newTruck);
  };
  getOrderInfo = () => {
    var temp = [];
    temp = this.refs.addOrders.getFormOrderData();
    console.log(temp);
    this.setNewOrder(
      temp[0],
      temp[1],
      temp[2],
      temp[3],
      temp[4],
      temp[5],
      temp[6],
      temp[7],
      temp[8]
    );
  };

  getTruckInfo = () => {
    var temp = [];
    temp = this.refs.addTrucks.getFormTruckData();
    console.log(temp);
    this.setNewTruck(
      temp[0],
      temp[1],
      temp[2],
      temp[3],
      temp[4],
      temp[5],
      temp[6],
      temp[7],
      temp[8]
    );
  };

  render() {
    const showHideMenu = (
      <Menu>
        <Menu.ItemGroup title="Columns">
          <Menu.Item key="addressMenu">
            <Checkbox id="address" onChange={this.filterColumns} defaultChecked>
              Address
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="customerMenu">
            <Checkbox
              id="customer"
              onChange={this.filterColumns}
              defaultChecked
            >
              Customer
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="truckIdMenu">
            <Checkbox id="truckId" onChange={this.filterColumns} defaultChecked>
              TruckId
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="deliveryDeadline">
            <Checkbox
              id="deliveryDeadline"
              onChange={this.filterColumns}
              defaultChecked
            >
              deliveryDeadline
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="processTime">
            <Checkbox
              id="processTime"
              onChange={this.filterColumns}
              defaultChecked
            >
              processTime
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="processTime">
            <Checkbox
              id="drivingTime"
              onChange={this.filterColumns}
              defaultChecked
            >
              drivingTime
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="processTime">
            <Checkbox
              id="serviceTime"
              onChange={this.filterColumns}
              defaultChecked
            >
              serviceTime
            </Checkbox>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    const { selectedOrdersRowKeys } = this.state;
    const { selectedTrucksRowKeys } = this.state;
    const ordersRowSelection = {
      selectedOrdersRowKeys,
      onChange: this.onSelectedOrdersRowKeysChange,
    };
    const trucksRowSelection = {
      selectedTrucksRowKeys,
      onChange: this.onSelectedTrucksRowKeysChange,
    };
    return (
      <Layout style={{ width: "100%", backgroundColor: "white" }}>
        <Row gutter={[0, 10]}>
          <Col span={8}>
            <Select
              defaultValue="ITV"
              onChange={this.changeData}
              style={{ width: 120 }}
            >
              <Option value="ITV">ITV</Option>
              <Option value="KAT">KAT</Option>
            </Select>
            &nbsp;
            <Dropdown
              overlay={showHideMenu}
              onVisibleChange={this.changeVisibility}
              visible={this.state.isVisible}
            >
              <Button>Show/Hide</Button>
            </Dropdown>
          </Col>
          <Col span={3} offset={13}>
            <Button onClick={() => window.open("/data")}>
              Data visualization
            </Button>
          </Col>
        </Row>
        <Row gutter={[24, 8]} justify="space-around" align="middle">
          <Col span={12}>
            <EditableTable
              rowSelection={ordersRowSelection}
              dataSource={this.state.data}
              columns={this.state.columns}
              onRow={(record) => ({
                onClick: () => {
                  this.selectOrdersRow(record);
                },
              })}
            ></EditableTable>
            <br />
            <Button onClick={() => this.showOrdersModal()}>Add order</Button>
            <Button>Delete order</Button>&nbsp;&nbsp;
            <Button onClick={this.magnifyOrdersModal}>Magnify</Button>
          </Col>
          <Col span={3}>
            <Row>
              <Button style={{ width: "100%" }}>Assign</Button>
            </Row>
            <br />
            <Row>
              <Button style={{ width: "100%" }}>Unassign</Button>
            </Row>
            <br />
            <Row>
              <Button style={{ width: "100%" }}>Auto Plan</Button>
            </Row>
          </Col>
          <Col span={9}>
            <EditableTable
              rowSelection={ordersRowSelection}
              dataSource={this.state.data2}
              columns={this.state.columns2}
              onRow={(record) => ({
                onClick: () => {
                  this.selectOrdersRow(record);
                },
              })}
            ></EditableTable>
            <br />
            <Button onClick={this.ShowTruckModal}>Add truck</Button>
            <Button>Delete truck</Button>
          </Col>
        </Row>

        <Modal
          style={{
            width: "100vh",
            display: "flex",
            alignItems: "center",
            marginLeft: 280,
          }}
          title="Add Order"
          visible={this.state.AOVisible}
          onCancel={this.handleCancel}
          onOk={() => {
            this.addOrder("latest");
          }}
        >
          {this.state.AOVisible && <AddOrdersLayout ref="addOrders" />}
        </Modal>
        <Modal
          title="Add Truck"
          visible={this.state.ATVisible}
          onOk={() => {
            this.addTruck("latest");
          }}
          onCancel={this.handleCancel}
        >
          {this.state.ATVisible && <AddTruckLayout ref="addTrucks" />}
        </Modal>
        <Modal
          title="Order List"
          visible={this.state.magnifyOrders}
          onOk={this.okMagnify}
          onCancel={this.cancelMagnify}
          width={"100%"}
          style={{ top: 20 }}
        >
          {this.state.magnifyOrders && (
            <Layout style={{ width: "100%", backgroundColor: "white" }}>
              <Table
                bordered={true}
                rowSelection={ordersRowSelection}
                dataSource={this.state.data}
                columns={this.state.columns}
                scroll={{ x: "max-content", y: "50vh" }}
                pagination={false}
                onRow={(record) => ({
                  onClick: () => {
                    this.selectOrdersRow(record);
                  },
                })}
              />
              <Col span={12}>
                <br />
                <Button onClick={this.showOrdersModal}>Add order</Button>
                &nbsp;&nbsp;
                <Button>Delete order</Button>
              </Col>
            </Layout>
          )}
        </Modal>
      </Layout>
    );
  }
}
