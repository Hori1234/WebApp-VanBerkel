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
          title: "City",
          dataIndex: "city",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.city.localeCompare(b.city),
          width: 100,
          editable: true,
        },
        {
          title: "Inl_Terminal",
          dataIndex: "inl_terminal",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.inl_terminal.localeCompare(b.inl_terminal),
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
        {
          title: "Closing",
          dataIndex: "closing",
          width: 100,
          editable: true,
        },
        {
          title: "Container",
          dataIndex: "container",
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
          title: "Delay",
          dataIndex: "delay",
          width: 100,
          editable: true,
        },
        {
          title: "Gate",
          dataIndex: "gate",
          width: 100,
          editable: true,
        },
        {
          title: "Gate1",
          dataIndex: "gate1",
          width: 100,
          editable: true,
        },
        {
          title: "Gross",
          dataIndex: "gross",
          width: 100,
          editable: true,
        },
        {
          title: "inl_ter_1",
          dataIndex: "inl_ter_1",
          width: 100,
          editable: true,
        },
        {
          title: "Invoice_reference",
          dataIndex: "invoice_reference",
          width: 100,
          editable: true,
        },
        {
          title: "L_D",
          dataIndex: "l_D",
          width: 100,
          editable: true,
        },
        {
          title: "Max_departure",
          dataIndex: "max_departure",
          width: 100,
          editable: true,
        },
        {
          title: "Max_departure",
          dataIndex: "max_departure",
          width: 100,
          editable: true,
        },
        {
          title: "Pickup",
          dataIndex: "pickup",
          width: 100,
          editable: true,
        },
        {
          title: "Seal",
          dataIndex: "seal",
          width: 100,
          editable: true,
        },
        {
          title: "Status",
          dataIndex: "status",
          width: 100,
          editable: true,
        },
        {
          title: "Ship_comp",
          dataIndex: "ship_comp",
          width: 100,
          editable: true,
        },
        {
          title: "Tariff_type",
          dataIndex: "tariff_type",
          width: 100,
          editable: true,
        },
        {
          title: "Terminal1",
          dataIndex: "terminal1",
          width: 100,
          editable: true,
        },
        {
          title: "Time",
          dataIndex: "time",
          width: 100,
          editable: true,
        },
        {
          title: "Time1",
          dataIndex: "time1",
          width: 100,
          editable: true,
        },
        {
          title: "Time2",
          dataIndex: "time2",
          width: 100,
          editable: true,
        },
        {
          title: "Time3",
          dataIndex: "time3",
          width: 100,
          editable: true,
        },
        {
          title: "Truck1",
          dataIndex: "truck1",
          width: 100,
          editable: true,
        },
        {
          title: "Truck2",
          dataIndex: "truck2",
          width: 100,
          editable: true,
        },
        {
          title: "Truck_used",
          dataIndex: "truck_used",
          width: 100,
          editable: true,
        },
        {
          title: "Unit_type",
          dataIndex: "unit_type",
          width: 100,
          editable: true,
        },
        {
          title: "Voyage_inland_carrier",
          dataIndex: "voyage_inland_carrier",
          width: 200,
          editable: true,
        },
        {
          title: "Weight",
          dataIndex: "weight",
          width: 100,
          editable: true,
        },
        {
          title: "Departure_time",
          dataIndex: "departure_time",
          width: 100,
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

  //API Calls ============================================================>

  deleteOrder = (value) => {
    return axios
      .delete(`/api/orders/${value}`)
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
            message.success("Account succesfully deleted");
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
            city: res.data.orders[i]["City"],
            inl_terminal: res.data.orders[i]["inl_terminal"],
            truckId: res.data.orders[i]["Truck (1)"],
            deliveryDeadline: res.data.orders[i]["delivery_deadline"],
            processTime: res.data.orders[i]["process_time"],
            drivingTime: res.data.orders[i]["driving_time"],
            serviceTime: res.data.orders[i]["service_time"],
            closing: res.data.orders[i]["Closing"],
            container: res.data.orders[i]["Container"],
            date: res.data.orders[i]["Date"],
            delay: res.data.orders[i]["Delay"],
            gate: res.data.orders[i]["Gate"],
            gate1: res.data.orders[i]["Gate (1)"],
            gross: res.data.orders[i]["Gross (kgs)"],
            inl_ter_1: res.data.orders[i]["Inl. ter. (1)"],
            invoice_reference: res.data.orders[i]["Invoice reference"],
            l_d: res.data.orders[i]["L/D"],
            max_departure: res.data.orders[i]["Max. departure"],
            pickup: res.data.orders[i]["Pickup"],
            seal: res.data.orders[i]["Seal"],
            status: res.data.orders[i]["Status"],
            ship_comp: res.data.orders[i]["Ship. comp."],
            tariff_type: res.data.orders[i]["Tariff type"],
            terminal1: res.data.orders[i]["Terminal (1)"],
            time: res.data.orders[i]["Time"],
            time1: res.data.orders[i]["Time (1)"],
            time2: res.data.orders[i]["Time (2)"],
            time3: res.data.orders[i]["Time (3)"],
            truck1: res.data.orders[i]["Truck (1)"],
            truck2: res.data.orders[i]["Truck (2)"],
            truck_used: res.data.orders[i]["Truck Used"],
            unit_type: res.data.orders[i]["Unit type"],
            voyage_inland_carrier: res.data.orders[i]["Voyage/inland carrier"],
            weight: res.data.orders[i]["Weight"],
            departure_time: res.data.orders[i]["Departure time"],
            truck_id: res.data.orders[i]["Truck Id"],
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
              setData={this.setData}
              onRow={(record) => ({
                onClick: () => {
                  this.selectOrdersRow(record);
                },
              })}
            ></EditableTable>
            <br />
            <Button onClick={() => this.showOrdersModal()}>Add order</Button>
            <Button
              onClick={() =>
                this.deleteOrderById(this.state.selectedOrdersRowKeys)
              }
            >
              Delete order
            </Button>
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
            <Button
              onClick={() =>
                this.deleteTruckById(this.state.selectedTrucksRowKeys)
              }
            >
              Delete truck
            </Button>
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
