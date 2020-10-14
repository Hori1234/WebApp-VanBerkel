import React, { Component } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Select,
  Menu,
  Checkbox,
  Dropdown,
  Modal,
  message,
  Popconfirm,
} from "antd";
import axios from "axios";
import EditableTable from "./EditableTable";
import AddOrdersLayout from "./AddOrdersLayout";
import AddTruckLayout from "./AddTruckLayout";
import "./ManualPlanning.css";

const { Option } = Select;

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
          title: "Container",
          dataIndex: "Container",
          width: 150,
          editable: true,
        },
        {
          title: "Unit type",
          dataIndex: "Unit type",
          width: 150,
          editable: true,
        },
        {
          title: "Booking",
          dataIndex: "Booking",
          sorter: (a, b) => a.Booking - b.Booking,
          width: 150,
          editable: true,
        },
        {
          title: "Ship. comp.",
          dataIndex: "Ship. comp.",
          width: 150,
          editable: true,
        },
        {
          title: "Terminal",
          dataIndex: "Terminal",
          width: 150,
          editable: true,
        },
        {
          title: "Truck",
          dataIndex: "Truck",
          width: 150,
          editable: true,
        },
        {
          title: "Pickup",
          dataIndex: "Pickup",
          width: 150,
          editable: true,
        },
        {
          title: "Order Number",
          dataIndex: "order_number",
          width: 150,
          editable: true,
        },
        {
          title: "Status",
          dataIndex: "Status",
          width: 150,
          editable: true,
        },
        {
          title: "Inl. Terminal",
          dataIndex: "inl_terminal",
          width: 150,
          editable: true,
        },
        {
          title: "Gate",
          dataIndex: "Gate",
          width: 150,
          editable: true,
        },
        {
          title: "Time",
          dataIndex: "Time",
          width: 150,
          editable: true,
        },
        {
          title: "Max. departure",
          dataIndex: "Max. departure",
          width: 150,
          editable: true,
        },
        {
          title: "Time (1)",
          dataIndex: "Time (1)",
          width: 150,
          editable: true,
        },
        {
          title: "Latest departure time",
          dataIndex: "latest_dep_time",
          width: 150,
          editable: true,
        },
        {
          title: "Truck Used",
          dataIndex: "Truck Used",
          width: 150,
          editable: true,
        },
        {
          title: "Truck Type",
          dataIndex: "truck_type",
          width: 150,
          editable: true,
        },
        {
          title: "Hierarchy",
          dataIndex: "hierarchy",
          width: 150,
          editable: true,
        },
        {
          title: "City",
          dataIndex: "City",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.City.localeCompare(b.City),
          width: 150,
          editable: true,
        },
        {
          title: "L/D",
          dataIndex: "L/D",
          width: 150,
          editable: true,
        },
        {
          title: "Date",
          dataIndex: "Date",
          width: 150,
          editable: true,
        },
        {
          title: "Time (2)",
          dataIndex: "Time (2)",
          width: 150,
          editable: true,
        },
        {
          title: "Delivery Deadline",
          dataIndex: "delivery_deadline",
          width: 150,
          editable: true,
        },
        {
          title: "Driving time",
          dataIndex: "driving_time",
          width: 150,
          editable: true,
        },
        {
          title: "Process time",
          dataIndex: "process_time",
          width: 150,
          editable: true,
        },
        {
          title: "Service time",
          dataIndex: "service_time",
          width: 150,
          editable: true,
        },
        {
          title: "Reference",
          dataIndex: "Reference",
          width: 150,
          editable: true,
        },
        {
          title: "Truck (1)",
          dataIndex: "Truck (1)",
          width: 150,
          editable: true,
        },
        {
          title: "Gate (1)",
          dataIndex: "Gate (1)",
          width: 150,
          editable: true,
        },
        {
          title: "Time (3)",
          dataIndex: "Time (3)",
          width: 150,
          editable: true,
        },
        {
          title: "Inl. ter. (1)",
          dataIndex: "Inl. ter. (1)",
          width: 150,
          editable: true,
        },
        {
          title: "Gross (kgs)",
          dataIndex: "Gross (kgs)",
          width: 150,
          editable: true,
        },
        {
          title: "Temperature °C",
          dataIndex: "Temperature °C",
          width: 150,
          editable: true,
        },
        {
          title: "Seal",
          dataIndex: "Seal",
          width: 150,
          editable: true,
        },
        {
          title: "Truck (2)",
          dataIndex: "Truck (2)",
          width: 150,
          editable: true,
        },
        {
          title: "Voyage/inland carrier",
          dataIndex: "Voyage/inland carrier",
          width: 250,
          editable: true,
        },
        {
          title: "Terminal (1)",
          dataIndex: "Terminal (1)",
          width: 150,
          editable: true,
        },
        {
          title: "Closing",
          dataIndex: "Closing",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.inl_terminal.localeCompare(b.inl_terminal),
          width: 150,
          editable: true,
        },
        {
          title: "POD",
          dataIndex: "POD",
          width: 150,
          editable: true,
        },
        {
          title: "Invoice reference",
          dataIndex: "Invoice reference",
          width: 150,
          editable: true,
        },
        {
          title: "Tariff type",
          dataIndex: "Tariff type",
          width: 150,
          editable: true,
        },
        {
          title: "G",
          dataIndex: "G",
          width: 150,
          editable: true,
        },
        {
          title: "F",
          dataIndex: "F",
          width: 150,
          editable: true,
        },
        {
          title: "Positie",
          dataIndex: "Positie",
          width: 150,
          editable: true,
        },
        {
          title: "Delay",
          dataIndex: "Delay",
          width: 150,
          editable: true,
        },

        {
          title: "Weight",
          dataIndex: "Weight",
          width: 150,
          editable: true,
        },
        {
          title: "Truck ID",
          dataIndex: "truck_id",
          width: 150,
          editable: true,
        },
        {
          title: "Departure time",
          dataIndex: "departure_time",
          width: 150,
          editable: true,
        },
      ],
      columns2: [
        {
          title: "Truck_id",
          dataIndex: "truck_id",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.truck_id.localeCompare(b.truck_id),
          width: 100,
          editable: true,
        },
        {
          title: "Driver",
          dataIndex: "driver",
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
        {
          title: "Owner",
          dataIndex: "owner",
          width: 100,
          editable: true,
        },
        {
          title: "Remarks",
          dataIndex: "remarks",
          width: 100,
          editable: true,
        },
        {
          title: "Business_type",
          dataIndex: "business_type",
          width: 100,
          editable: true,
        },
        {
          title: "Date",
          dataIndex: "date",
          width: 100,
          editable: true,
        },
        {
          title: "Hierarchy",
          dataIndex: "hierarchy",
          width: 100,
          editable: true,
        },
        {
          title: "Starting",
          dataIndex: "starting",
          width: 100,
          editable: true,
        },
        {
          title: "Terminal",
          dataIndex: "terminal",
          width: 100,
          editable: true,
        },
        {
          title: "Truck_type",
          dataIndex: "truck_type",
          width: 100,
          editable: true,
        },
        {
          title: "Use_cost",
          dataIndex: "use_cost",
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
      magnifyTrucks: false,
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
        starting: "",
        date: "",
        owner: "",
        driver: "",
        remarks: "",
        business_type: "",
      },
      temp: [],
      originalOrders: [],
    };
  }

  componentDidMount() {
    this.setState({ startingColumns: this.state.columns });
    this.getOrderList("latest");
    this.getTruckList("latest");
  }
  setData = (e) => {
    this.setState({ data: e });
  };
  setData2 = (e) => {
    this.setState({ data2: e });
  };
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
  changeDataOrders = (d) => {
    if (d === "Both") {
      this.setState({ data: this.state.originalOrders });
    } else if (d === "ITV") {
      this.getItv(this.state.originalOrders);
    } else if (d === "KAT") {
      this.getKat(this.state.originalOrders);
    }
  };
  getItv = (e) => {
    let itvData = [];
    e.forEach((element) => {
      if (element.inl_terminal == "ITV") {
        itvData.push(element);
      }
    });
    this.setState({ data: itvData });
  };
  getKat = (e) => {
    let katData = [];
    e.forEach((element) => {
      if (element.inl_terminal == "KAT") {
        katData.push(element);
      }
    });
    this.setState({ data: katData });
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
  magnifyTrucksModal = () => {
    this.setState({
      magnifyTrucks: true,
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
    this.setState({ magnifyOrders: false, magnifyTrucks: false });
  };
  cancelMagnify = (e) => {
    this.setState({ magnifyOrders: false, magnifyTrucks: false });
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

  //API Calls ============================================================>

  deleteOrder = (value) => {
    return axios
      .delete(`/api/orders/${value}`)
      .then((res) => {
        if (res.status === 404) {
          message.error(res.message);
        } else {
          if (res.status === 204) {
            message.success("Order succesfully deleted");
          } else {
            if (res.status === 401) {
              message.error("Unauthorized Action");
            } else {
              message.error("Service Unavailable");
            }
          }
        }
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
  deleteOrderById = (info) => {
    info.forEach((id) => {
      this.deleteOrder(id);
      const filteredData = this.state.data.filter((item) => item.id !== id);
      this.setState({ data: filteredData });
    });
  };
  deleteTruck = (value) => {
    return axios
      .delete(`/api/trucks/${value}`)
      .then((res) => {
        if (res.status === 404) {
          message.error(res.message);
        } else {
          if (res.status === 204) {
            message.success("Truck succesfully deleted");
          } else {
            if (res.status === 401) {
              message.error("Unauthorized Action");
            } else {
              message.error("Service Unavailable");
            }
          }
        }
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
  deleteTruckById = (data) => {
    data.forEach((id) => {
      this.deleteTruck(id);
      const filteredData = this.state.data2.filter((item) => item.id !== id);
      this.setState({ data2: filteredData });
    });
  };

  //Adding the truck and the order
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
        } else {
          if (res.status === 422) {
            message.success(res.message);
          }
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
    const data = this.refs.addOrders.createOrderData()
    return axios
      .post(`/api/orders/sheet/${value}`, data)
      .then((res) => {
        if (res.status === 200) {
          message.success(
            "Order: " +
              res.data["inl_terminal"] +
              res.data["truck_type"] +
              "added succesfully"
          );
        } else {
          if (res.status === 401) {
            message.error("Unauthorized: " + res.message);
          } else {
            if (res.status === 404) {
              message.error("Not Found: " + res.message);
            } else {
              if (res.status === 422) {
                message.error("	Unprocessable Entity: " + res.message);
              } else {
                message.error(res.message);
              }
            }
          }
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
            "Container": res.data.orders[i]["Container"],
            "Unit type": res.data.orders[i]["Unit type"],
            "Booking": res.data.orders[i]["Booking"],
            "Ship. comp.": res.data.orders[i]["Ship. comp."],
            "Terminal": res.data.orders[i]["Terminal"],
            "Truck": res.data.orders[i]["Truck"],
            "Pickup": res.data.orders[i]["Pickup"],
            "order_number": res.data.orders[i]["order_number"],
            "Status": res.data.orders[i]["Status"],
            "inl_terminal": res.data.orders[i]["inl_terminal"],
            "Gate": res.data.orders[i]["Gate"],
            "Time": res.data.orders[i]["Time"],
            "Max. departure": res.data.orders[i]["Max. departure"],
            "Time (1)": res.data.orders[i]["Time (1)"],
            "latest_dep_time": res.data.orders[i]["latest_dep_time"],
            "Truck Used": res.data.orders[i]["Truck Used"],
            "truck_type": res.data.orders[i]["truck_type"],
	          "hierarchy": res.data.orders[i]["hierarchy"],
            "City": res.data.orders[i]["City"],
            "L/D": res.data.orders[i]["L/D"],
            "Date": res.data.orders[i]["Date"],
            "Time (2)": res.data.orders[i]["Time (2)"],
	          "delivery_deadline": res.data.orders[i]["delivery_deadline"],
            "driving_time": res.data.orders[i]["driving_time"],
            "process_time": res.data.orders[i]["process_time"],
            "service_time": res.data.orders[i]["service_time"],
            "Reference": res.data.orders[i]["Reference"],
            "Truck (1)": res.data.orders[i]["Truck (1)"],
            "Gate (1)": res.data.orders[i]["Gate (1)"],
            "Time (3)": res.data.orders[i]["Time (3)"],
            "Inl. ter. (1)": res.data.orders[i]["Inl. ter. (1)"],
            "Gross (kgs)": res.data.orders[i]["Gross (kgs)"],
            "Temperature °C": res.data.orders[i]["Temperature °C"],
            "Seal": res.data.orders[i]["Seal"],
            "Truck (2)": res.data.orders[i]["Truck (2)"],
            "Voyage/inland carrier": res.data.orders[i]["Voyage/inland carrier"],
            "Terminal (1)": res.data.orders[i]["Terminal (1)"],
            "Closing": res.data.orders[i]["Closing"],
            "POD": res.data.orders[i]["POD"],
            "Invoice reference": res.data.orders[i]["Invoice reference"],
            "Tariff type": res.data.orders[i]["Tariff type"],
            "G": res.data.orders[i]["G"],
            "F": res.data.orders[i]["F"],
            "Positie": res.data.orders[i]["Positie"],
            "Delay": res.data.orders[i]["Delay"],
            "Weight": res.data.orders[i]["Weight"],
            "departure_time": res.data.orders[i]["departure_time"],
            "truck_id": res.data.orders[i]["truck_id"]
          };
          outarray.push(temp);
        }
        console.log(outarray);
        this.setState((state) => ({
          ...state,
          data: outarray,
          originalOrders: outarray,
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
            truck_id: res.data.trucks[i]["truck_id"],
            driver: res.data.trucks[i]["Driver"],
            availability: res.data.trucks[i]["availability"],
            starting: res.data.trucks[i]["starting_time"],
            truck_type: res.data.trucks[i]["truck_type"],
            terminal: res.data.trucks[i]["terminal"],
            hierarchy: res.data.trucks[i]["hierarchy"],
            use_cost: res.data.trucks[i]["use_cost"],
            date: res.data.trucks[i]["date"],
            owner: res.data.trucks[i]["Owner"],
            remarks: res.data.trucks[i]["Remarks"],
            business_type: res.data.trucks[i]["business_type"],
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

  //setting the new orders and the new truck
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

  //Getting the new order's and new truck's information from their modals
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

  // Assigning , editing and Unassigning orders
  assign_unassignOrder = (orderId, truckId) => {
    return axios
      .patch(`/api/orders/${orderId}`, {
        truck_id: truckId,
      })
      .then((res) => {
        if (res.status === 404) {
          message.error(res.message);
        } else {
          if (res.status === 204) {
            message.success("Account succesfully deleted");
          } else {
            if (res.status === 401) {
              message.error("Unauthorized Action");
            } else {
              if (res.status === 200) {
                message.success("Order succesfully assigned");
              } else {
                message.warning("Service unavailable");
              }
            }
          }
        }
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
  editOrder = () => {};

  render() {
    const showHideMenu = (
      <Menu>
        <Menu.ItemGroup title="Columns">
          <Menu.Item key="cityMenu">
            <Checkbox id="city" onChange={this.filterColumns} defaultChecked>
              city
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="inl_terminalMenu">
            <Checkbox
              id="inl_terminal"
              onChange={this.filterColumns}
              defaultChecked
            >
              inl_terminal
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="truckIdMenu">
            <Checkbox id="truckId" onChange={this.filterColumns} defaultChecked>
              Truck ID
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="deliveryDeadline">
            <Checkbox
              id="deliveryDeadline"
              onChange={this.filterColumns}
              defaultChecked
            >
              Delivery Deadline
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="processTime">
            <Checkbox
              id="processTime"
              onChange={this.filterColumns}
              defaultChecked
            >
              Process Time
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="drivingTime">
            <Checkbox
              id="drivingTime"
              onChange={this.filterColumns}
              defaultChecked
            >
              drivingTime
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="serviceTime">
            <Checkbox
              id="serviceTime"
              onChange={this.filterColumns}
              defaultChecked
            >
              serviceTime
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="closing">
            <Checkbox id="closing" onChange={this.filterColumns} defaultChecked>
              closing
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="container">
            <Checkbox
              id="container"
              onChange={this.filterColumns}
              defaultChecked
            >
              container
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="date">
            <Checkbox id="date" onChange={this.filterColumns} defaultChecked>
              date
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="delay">
            <Checkbox id="delay" onChange={this.filterColumns} defaultChecked>
              delay
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="gate">
            <Checkbox id="gate" onChange={this.filterColumns} defaultChecked>
              gate
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="gate1">
            <Checkbox id="gate1" onChange={this.filterColumns} defaultChecked>
              gate1
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="gross">
            <Checkbox id="gross" onChange={this.filterColumns} defaultChecked>
              gross
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="inl_ter_1">
            <Checkbox
              id="inl_ter_1"
              onChange={this.filterColumns}
              defaultChecked
            >
              inl_ter_1
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="l_d">
            <Checkbox id="l_d" onChange={this.filterColumns} defaultChecked>
              l_d
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="max_departure">
            <Checkbox
              id="max_departure"
              onChange={this.filterColumns}
              defaultChecked
            >
              max_departure
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="pickup">
            <Checkbox id="pickup" onChange={this.filterColumns} defaultChecked>
              pickup
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="seal">
            <Checkbox id="seal" onChange={this.filterColumns} defaultChecked>
              seal
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="status">
            <Checkbox id="status" onChange={this.filterColumns} defaultChecked>
              status
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="ship_comp">
            <Checkbox
              id="ship_comp"
              onChange={this.filterColumns}
              defaultChecked
            >
              ship_comp
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
              defaultValue="Both"
              onChange={this.changeDataOrders}
              style={{ width: 120 }}
            >
              <Option value="Both">Both</Option>
              <Option value="ITV">ITV</Option>
              <Option value="KAT">KAT</Option>
            </Select>
            &nbsp;
            <Dropdown
              overlay={showHideMenu}
              onVisibleChange={this.changeVisibility}
              visible={this.state.isVisible}
              style={{ height: "50vh" }}
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
              setData={this.setData}
              onRow={(record) => ({
                onClick: () => {
                  this.selectOrdersRow(record);
                },
              })}
            ></EditableTable>
            <br />
            <Button onClick={() => this.showOrdersModal()}>Add order</Button>
            <Popconfirm
              title="Are you sure you want to delete the selected orders？"
              okText="Yes"
              cancelText="No"
              onConfirm={() =>
                this.deleteOrderById(this.state.selectedOrdersRowKeys)
              }
            >
              <Button>Delete order</Button>
            </Popconfirm>
            &nbsp;&nbsp;
            <Button onClick={this.magnifyOrdersModal}>Magnify</Button>
          </Col>
          <Col span={3}>
            <Row>
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  var orderLength = this.state.selectedOrdersRowKeys.length;
                  var truckLength = this.state.selectedTrucksRowKeys.length;
                  this.assign_unassignOrder(
                    this.state.selectedOrdersRowKeys[orderLength - 1],
                    this.state.selectedTrucksRowKeys[truckLength - 1]
                  );
                }}
              >
                Assign
              </Button>
            </Row>
            <br />
            <Row>
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  var orderLength = this.state.selectedOrdersRowKeys.length;
                  this.assign_unassignOrder(
                    this.state.selectedOrdersRowKeys[orderLength - 1],
                    0
                  );
                }}
              >
                Unassign
              </Button>
            </Row>
            <br />
            <Row>
              <Button style={{ width: "100%" }}>Auto Plan</Button>
            </Row>
          </Col>
          <Col span={9}>
            <EditableTable
              rowSelection={trucksRowSelection}
              dataSource={this.state.data2}
              columns={this.state.columns2}
              setData={this.setData2}
              onRow={(record) => ({
                onClick: () => {
                  this.selectOrdersRow(record);
                },
              })}
            ></EditableTable>
            <br />
            <Button onClick={this.ShowTruckModal}>Add truck</Button>
            <Popconfirm
              title="Are you sure you want to delete the selected trucks？"
              okText="Yes"
              cancelText="No"
              onConfirm={() =>
                this.deleteTruckById(this.state.selectedTrucksRowKeys)
              }
            >
              <Button>Delete truck</Button>
            </Popconfirm>
            &nbsp;&nbsp;
            <Button onClick={this.magnifyTrucksModal}>Magnify</Button>
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
              <EditableTable
                rowSelection={ordersRowSelection}
                dataSource={this.state.data}
                columns={this.state.columns}
                setData={this.setData}
                onRow={(record) => ({
                  onClick: () => {
                    this.selectOrdersRow(record);
                  },
                })}
              ></EditableTable>
              <Col span={12}>
                <br />
                <Button onClick={this.showOrdersModal}>Add order</Button>
                &nbsp;&nbsp;
                <Popconfirm
                  title="Are you sure you want to delete the selected trucks？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() =>
                    this.deleteOrderById(this.state.selectedOrdersRowKeys)
                  }
                >
                  <Button>Delete Order</Button>
                </Popconfirm>
              </Col>
            </Layout>
          )}
        </Modal>
        <Modal
          title="Truck List"
          visible={this.state.magnifyTrucks}
          onOk={this.okMagnify}
          onCancel={this.cancelMagnify}
          width={"100%"}
          style={{ top: 20 }}
        >
          {this.state.magnifyTrucks && (
            <Layout style={{ width: "100%", backgroundColor: "white" }}>
              <EditableTable
                rowSelection={trucksRowSelection}
                dataSource={this.state.data2}
                columns={this.state.columns2}
                setData={this.setData2}
                onRow={(record) => ({
                  onClick: () => {
                    this.selectOrdersRow(record);
                  },
                })}
              ></EditableTable>
              <Col span={12}>
                <br />
                <Button onClick={this.ShowTruckModal}>Add truck</Button>
                <Popconfirm
                  title="Are you sure you want to delete the selected trucks？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() =>
                    this.deleteTruckById(this.state.selectedTrucksRowKeys)
                  }
                >
                  <Button>Delete truck</Button>
                </Popconfirm>
              </Col>
            </Layout>
          )}
        </Modal>
      </Layout>
    );
  }
}
