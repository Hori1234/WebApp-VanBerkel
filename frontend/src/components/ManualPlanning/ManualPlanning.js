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
import EditableTableOrder from "./EditableTableOrder";
import AddOrdersLayout from "./AddOrdersLayout";
import AddTruckLayout from "./AddTruckLayout";
import EditableTableTruck from "./EditableTableTruck";
import "./ManualPlanning.css";

const { Option } = Select;

export default class ManualPlanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrdersRowKeys: [],
      selectedTrucksRowKeys: [],
      columnFilter: [],
      columnTruckFilter: [],
      isVisible: false,
      isTruckVisible: false,
      columns: [
        {
          title: "Container",
          dataIndex: "Container",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Container || "|||")
              .toUpperCase()
              .localeCompare((b.Container || "|||").toUpperCase()),
        },
        {
          title: "Unit type",
          dataIndex: "Unit type",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Unit type"] || "|||")
              .toUpperCase()
              .localeCompare((b["Unit type"] || "|||").toUpperCase()),
        },
        {
          title: "Booking",
          dataIndex: "Booking",
          sorter: (a, b) =>
            (a.Booking || "|||")
              .toUpperCase()
              .localeCompare((b.Booking || "|||").toUpperCase()),
          width: 150,
          editable: true,
        },
        {
          title: "Ship. comp.",
          dataIndex: "Ship. comp.",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Ship. comp."] || "|||")
              .toUpperCase()
              .localeCompare((b["Ship. comp."] || "|||").toUpperCase()),
        },
        {
          title: "Terminal",
          dataIndex: "Terminal",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Terminal || "|||")
              .toUpperCase()
              .localeCompare((b.Terminal || "|||").toUpperCase()),
        },
        {
          title: "Truck",
          dataIndex: "Truck",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Truck || "|||")
              .toUpperCase()
              .localeCompare((b.Truck || "|||").toUpperCase()),
        },
        {
          title: "Pickup",
          dataIndex: "Pickup",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Pickup || "|||")
              .toUpperCase()
              .localeCompare((b.Pickup || "|||").toUpperCase()),
        },
        {
          title: "Status",
          dataIndex: "Status",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Status || "|||")
              .toUpperCase()
              .localeCompare((b.Status || "|||").toUpperCase()),
        },
        {
          title: "Inl. Terminal",
          dataIndex: "inl_terminal",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.inl_terminal || "|||")
              .toUpperCase()
              .localeCompare((b.inl_terminal || "|||").toUpperCase()),
        },
        {
          title: "Gate",
          dataIndex: "Gate",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Gate || "|||")
              .toUpperCase()
              .localeCompare((b.Gate || "|||").toUpperCase()),
        },
        {
          title: "Time",
          dataIndex: "Time",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Gate || "|||")
              .toUpperCase()
              .localeCompare((b.Gate || "|||").toUpperCase()),
        },
        {
          title: "Max. departure",
          dataIndex: "Max. departure",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Max. departure"] || "|||")
              .toUpperCase()
              .localeCompare((b["Max. departure"] || "|||").toUpperCase()),
        },
        {
          title: "Time (1)",
          dataIndex: "Time (1)",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Time (1)"] || "|||")
              .toUpperCase()
              .localeCompare((b["Time (1)"] || "|||").toUpperCase()),
        },
        {
          title: "Latest departure time",
          dataIndex: "latest_dep_time",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.latest_dep_time || "|||")
              .toUpperCase()
              .localeCompare((b.latest_dep_time || "|||").toUpperCase()),
        },
        {
          title: "Truck Used",
          dataIndex: "Truck Used",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Truck Used"] || "|||")
              .toUpperCase()
              .localeCompare((b["Truck Used"] || "|||").toUpperCase()),
        },
        {
          title: "Truck Type",
          dataIndex: "truck_type",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.truck_type || "|||")
              .toUpperCase()
              .localeCompare((b.truck_type || "|||").toUpperCase()),
        },
        {
          title: "Hierarchy",
          dataIndex: "hierarchy",
          width: 150,
          editable: true,
          sorter: (a, b) => (a.hierarchy || "|||") - (b.hierarchy || "|||"),
        },
        {
          title: "City",
          dataIndex: "City",
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) =>
            (a.City || "|||")
              .toUpperCase()
              .localeCompare((b.City || "|||").toUpperCase()),
          width: 150,
          editable: true,
        },
        {
          title: "L/D",
          dataIndex: "L/D",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["L/D"] || "|||")
              .toUpperCase()
              .localeCompare((b["L/D"] || "|||").toUpperCase()),
        },
        {
          title: "Date",
          dataIndex: "Date",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Date || "|||")
              .toUpperCase()
              .localeCompare((b.Date || "|||").toUpperCase()),
        },
        {
          title: "Time (2)",
          dataIndex: "Time (2)",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Time (2)"] || "|||")
              .toUpperCase()
              .localeCompare((b["Time (2)"] || "|||").toUpperCase()),
        },
        {
          title: "Delivery Deadline",
          dataIndex: "delivery_deadline",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.delivery_deadline || "|||")
              .toUpperCase()
              .localeCompare((b.delivery_deadline || "|||").toUpperCase()),
        },
        {
          title: "Driving time",
          dataIndex: "driving_time",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.driving_time || "|||") - (b.driving_time || "|||"),
        },
        {
          title: "Process time",
          dataIndex: "process_time",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.process_time || "|||") - (b.process_time || "|||"),
        },
        {
          title: "Service time",
          dataIndex: "service_time",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.service_time || "|||") - (b.service_time || "|||"),
        },
        {
          title: "Reference",
          dataIndex: "Reference",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Reference || "|||")
              .toUpperCase()
              .localeCompare((b.Reference || "|||").toUpperCase()),
        },
        {
          title: "Truck (1)",
          dataIndex: "Truck (1)",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Truck (1)"] || "|||")
              .toUpperCase()
              .localeCompare((b["Truck (1)"] || "|||").toUpperCase()),
        },
        {
          title: "Gate (1)",
          dataIndex: "Gate (1)",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Gate (1)"] || "|||")
              .toUpperCase()
              .localeCompare((b["Gate (1)"] || "|||").toUpperCase()),
        },
        {
          title: "Time (3)",
          dataIndex: "Time (3)",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Time (3)"] || "|||")
              .toUpperCase()
              .localeCompare((b["Time (3)"] || "|||").toUpperCase()),
        },
        {
          title: "Inl. ter. (1)",
          dataIndex: "Inl. ter. (1)",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Inl. ter. (1)"] || "|||")
              .toUpperCase()
              .localeCompare((b["Inl. ter. (1)"] || "|||").toUpperCase()),
        },
        {
          title: "Gross (kgs)",
          dataIndex: "Gross (kgs)",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Gross (kgs)"] || "|||") - (b["Gross (kgs)"] || "|||"),
        },
        {
          title: "Temperature °C",
          dataIndex: "Temperature °C",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Temperature °C"] || "|||")
              .toUpperCase()
              .localeCompare((b["Temperature °C"] || "|||").toUpperCase()),
        },
        {
          title: "Seal",
          dataIndex: "Seal",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Seal || "|||")
              .toUpperCase()
              .localeCompare((b.Seal || "|||").toUpperCase()),
        },
        {
          title: "Truck (2)",
          dataIndex: "Truck (2)",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Truck (2)"] || "|||")
              .toUpperCase()
              .localeCompare((b["Truck (2)"] || "|||").toUpperCase()),
        },
        {
          title: "Voyage/inland carrier",
          dataIndex: "Voyage/inland carrier",
          width: 250,
          editable: true,
          sorter: (a, b) =>
            (a["Voyage/inland carrier"] || "|||")
              .toUpperCase()
              .localeCompare(
                (b["Voyage/inland carrier"] || "|||").toUpperCase()
              ),
        },
        {
          title: "Terminal (1)",
          dataIndex: "Terminal (1)",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Terminal (1)"] || "|||")
              .toUpperCase()
              .localeCompare((b["Terminal (1)"] || "|||").toUpperCase()),
        },
        {
          title: "Closing",
          dataIndex: "Closing",
          sortDirections: ["descend", "ascend"],
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Closing || "|||")
              .toUpperCase()
              .localeCompare((b.Closing || "|||").toUpperCase()),
        },
        {
          title: "POD",
          dataIndex: "POD",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.POD || "|||")
              .toUpperCase()
              .localeCompare((b.POD || "|||").toUpperCase()),
        },
        {
          title: "Invoice reference",
          dataIndex: "Invoice reference",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Invoice reference"] || "|||") - (b["Terminal (1)"] || "|||"),
        },
        {
          title: "Tariff type",
          dataIndex: "Tariff type",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a["Tariff type"] || "|||")
              .toUpperCase()
              .localeCompare((b["Tariff type"] || "|||").toUpperCase()),
        },
        {
          title: "G",
          dataIndex: "G",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.G || "|||")
              .toUpperCase()
              .localeCompare((b.G || "|||").toUpperCase()),
        },
        {
          title: "F",
          dataIndex: "F",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.F || "|||")
              .toUpperCase()
              .localeCompare((b.F || "|||").toUpperCase()),
        },
        {
          title: "Positie",
          dataIndex: "Positie",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Positie || "|||")
              .toUpperCase()
              .localeCompare((b.Positie || "|||").toUpperCase()),
        },
        {
          title: "Delay",
          dataIndex: "Delay",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Delay || "|||")
              .toUpperCase()
              .localeCompare((b.Delay || "|||").toUpperCase()),
        },

        {
          title: "Weight",
          dataIndex: "Weight",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Weight || "|||")
              .toUpperCase()
              .localeCompare((b.Weight || "|||").toUpperCase()),
        },
        {
          title: "Truck ID",
          dataIndex: "truck_id",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.truck_id || "|||")
              .toUpperCase()
              .localeCompare((b.truck_id || "|||").toUpperCase()),
        },
        {
          title: "Departure time",
          dataIndex: "departure_time",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.departure_time || "|||")
              .toUpperCase()
              .localeCompare((b.departure_time || "|||").toUpperCase()),
        },
      ],
      columns2: [
        {
          title: "Truck ID",
          dataIndex: "truck_id",
          sorter: (a, b) =>
            (a.truck_id || "|||")
              .toUpperCase()
              .localeCompare((b.truck_id || "|||").toUpperCase()),
          width: 150,
          editable: true,
        },
        {
          title: "S Number",
          dataIndex: "s_number",
          sorter: (a, b) => (a.s_number || "|||") - (b.s_number || "|||"),
          width: 150,
          editable: true,
        },
        {
          title: "Availability",
          dataIndex: "availability",
          sorter: (a, b) =>
            (a.availability || "|||")
              .toUpperCase()
              .localeCompare((b.availability || "|||").toUpperCase()),
          width: 150,
          editable: true,
        },
        {
          title: "Truck type",
          dataIndex: "truck_type",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.truck_type || "|||")
              .toUpperCase()
              .localeCompare((b.truck_type || "|||").toUpperCase()),
        },
        {
          title: "Business type",
          dataIndex: "business_type",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.business_type || "|||")
              .toUpperCase()
              .localeCompare((b.business_type || "|||").toUpperCase()),
        },
        {
          title: "Driver",
          dataIndex: "Driver",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Driver || "|||")
              .toUpperCase()
              .localeCompare((b.Driver || "|||").toUpperCase()),
        },
        {
          title: "Terminal",
          dataIndex: "terminal",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.terminal || "|||")
              .toUpperCase()
              .localeCompare((b.terminal || "|||").toUpperCase()),
        },
        {
          title: "Owner",
          dataIndex: "Owner",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Owner || "|||")
              .toUpperCase()
              .localeCompare((b.Owner || "|||").toUpperCase()),
        },
        {
          title: "Hierarchy",
          dataIndex: "hierarchy",
          width: 150,
          editable: true,
          sorter: (a, b) => (a.hierarchy || "|||") - (b.hierarchy || "|||"),
        },
        {
          title: "Use cost",
          dataIndex: "use_cost",
          width: 150,
          editable: true,
          sorter: (a, b) => (a.use_cost || "|||") - (b.use_cost || "|||"),
        },
        {
          title: "Date",
          dataIndex: "date",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.date || "|||")
              .toUpperCase()
              .localeCompare((b.date || "|||").toUpperCase()),
        },
        {
          title: "Starting time",
          dataIndex: "starting_time",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.starting_time || "|||")
              .toUpperCase()
              .localeCompare((b.starting_time || "|||").toUpperCase()),
        },
        {
          title: "Remarks",
          dataIndex: "Remarks",
          width: 150,
          editable: true,
          sorter: (a, b) =>
            (a.Remarks || "|||")
              .toUpperCase()
              .localeCompare((b.Remarks || "|||").toUpperCase()),
        },
      ],
      data: [],
      data2: [],
      startingColumns: [],
      startingTruckColumns: [],
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
    this.setState({ startingTruckColumns: this.state.columns2 });
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
  changeTruckVisibility = (isTrue) => {
    this.setState({ isTruckVisible: isTrue });
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
  filterTruckColumns = (e) => {
    var columnTruckFilter = this.state.columnTruckFilter;
    if (e.target.checked) {
      columnTruckFilter = columnTruckFilter.filter((current) => {
        return current !== e.target.id;
      });
    } else if (!e.target.checked) {
      columnTruckFilter.push(e.target.id);
    }
    var final = this.state.startingTruckColumns;
    for (let i = 0; i < columnTruckFilter.length; i++)
      final = final.filter((current) => {
        return current.dataIndex !== columnTruckFilter[i];
      });
    this.setState({ columns2: final, columnFilter: columnTruckFilter });
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
      if (element.inl_terminal === "ITV") {
        itvData.push(element);
      }
    });
    this.setState({ data: itvData });
  };
  getKat = (e) => {
    let katData = [];
    e.forEach((element) => {
      if (element.inl_terminal === "KAT") {
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
    const data = this.refs.addTrucks.createTruckData();
    return axios
      .post(`/api/trucks/sheet/${value}`, data)
      .then((res) => {
        if (res.status === 200) {
          message.success("Truck: added succesfully");
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
    const data = this.refs.addOrders.createOrderData();
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
        for (var i = 0; i < res.data.orders.length; i++) {
          var temp = {
            key: res.data.orders[i]["order_number"],
            Container: res.data.orders[i]["Container"],
            "Unit type": res.data.orders[i]["Unit type"],
            Booking: res.data.orders[i]["Booking"],
            "Ship. comp.": res.data.orders[i]["Ship. comp."],
<<<<<<< HEAD
            Terminal: res.data.orders[i]["Terminal"],
            Truck: res.data.orders[i]["Truck"],
            Pickup: res.data.orders[i]["Pickup"],
            order_number: res.data.orders[i]["order_number"],
            Status: res.data.orders[i]["Status"],
            inl_terminal: res.data.orders[i]["inl_terminal"],
            Gate: res.data.orders[i]["Gate"],
            Time: res.data.orders[i]["Time"],
=======
            "Terminal": res.data.orders[i]["Terminal"],
            "Truck": res.data.orders[i]["Truck"],
            "Pickup": res.data.orders[i]["Pickup"],
            "order_number": res.data.orders[i]["order_number"],
            "Status": res.data.orders[i]["Status"],
            "inl_terminal": res.data.orders[i]["inl_terminal"],
            "Gate": res.data.orders[i]["Gate"],
            "Time": res.data.orders[i]["Time"],
>>>>>>> bf4331bd8c0bba228d2a0870ef3c0718fff9372d
            "Max. departure": res.data.orders[i]["Max. departure"],
            "Time (1)": res.data.orders[i]["Time (1)"],
            latest_dep_time: res.data.orders[i]["latest_dep_time"],
            "Truck Used": res.data.orders[i]["Truck Used"],
            truck_type: res.data.orders[i]["truck_type"],
            hierarchy: res.data.orders[i]["hierarchy"],
            City: res.data.orders[i]["City"],
            "L/D": res.data.orders[i]["L/D"],
            Date: res.data.orders[i]["Date"],
            "Time (2)": res.data.orders[i]["Time (2)"],
            delivery_deadline: res.data.orders[i]["delivery_deadline"],
            driving_time: res.data.orders[i]["driving_time"],
            process_time: res.data.orders[i]["process_time"],
            service_time: res.data.orders[i]["service_time"],
            Reference: res.data.orders[i]["Reference"],
            "Truck (1)": res.data.orders[i]["Truck (1)"],
            "Gate (1)": res.data.orders[i]["Gate (1)"],
            "Time (3)": res.data.orders[i]["Time (3)"],
            "Inl. ter. (1)": res.data.orders[i]["Inl. ter. (1)"],
            "Gross (kgs)": res.data.orders[i]["Gross (kgs)"],
            "Temperature °C": res.data.orders[i]["Temperature °C"],
            Seal: res.data.orders[i]["Seal"],
            "Truck (2)": res.data.orders[i]["Truck (2)"],
            "Voyage/inland carrier":
              res.data.orders[i]["Voyage/inland carrier"],
            "Terminal (1)": res.data.orders[i]["Terminal (1)"],
            Closing: res.data.orders[i]["Closing"],
            POD: res.data.orders[i]["POD"],
            "Invoice reference": res.data.orders[i]["Invoice reference"],
            "Tariff type": res.data.orders[i]["Tariff type"],
            G: res.data.orders[i]["G"],
            F: res.data.orders[i]["F"],
            Positie: res.data.orders[i]["Positie"],
            Delay: res.data.orders[i]["Delay"],
            Weight: res.data.orders[i]["Weight"],
            departure_time: res.data.orders[i]["departure_time"],
            truck_id: res.data.orders[i]["truck_id"],
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
        for (var i = 0; i < res.data.trucks.length; i++) {
          var temp = {
            key: res.data.trucks[i]["s_number"],
            truck_id: res.data.trucks[i]["truck_id"],
            s_number: res.data.trucks[i]["s_number"],
            availability: res.data.trucks[i]["availability"],
            truck_type: res.data.trucks[i]["truck_type"],
            business_type: res.data.trucks[i]["business_type"],
            Driver: res.data.trucks[i]["Driver"],
            terminal: res.data.trucks[i]["terminal"],
            Owner: res.data.trucks[i]["Owner"],
            hierarchy: res.data.trucks[i]["hierarchy"],
            use_cost: res.data.trucks[i]["use_cost"],
            date: res.data.trucks[i]["date"],
            starting_time: res.data.trucks[i]["starting_time"],
            Remarks: res.data.trucks[i]["Remarks"],
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
      <Menu Scrollable style={{ maxHeight: "50vh", overflowY: "scroll" }}>
        <Menu.ItemGroup title="Columns">
          <Menu.Item key="Container">
            <Checkbox
              id="Container"
              onChange={this.filterColumns}
              defaultChecked
            >
              Container
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Unit type">
            <Checkbox
              id="Unit type"
              onChange={this.filterColumns}
              defaultChecked
            >
              Unit type
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Ship. comp.">
            <Checkbox
              id="Ship. comp."
              onChange={this.filterColumns}
              defaultChecked
            >
              Ship. comp.
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Terminal">
            <Checkbox
              id="Terminal"
              onChange={this.filterColumns}
              defaultChecked
            >
              Terminal
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Truck">
            <Checkbox id="Truck" onChange={this.filterColumns} defaultChecked>
              Truck
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Pickup">
            <Checkbox id="Pickup" onChange={this.filterColumns} defaultChecked>
              Pickup
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Status">
            <Checkbox id="Status" onChange={this.filterColumns} defaultChecked>
              Status
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Gate">
            <Checkbox id="Gate" onChange={this.filterColumns} defaultChecked>
              Gate
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Time">
            <Checkbox id="Time" onChange={this.filterColumns} defaultChecked>
              Time
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Max. departure">
            <Checkbox
              id="Max. departure"
              onChange={this.filterColumns}
              defaultChecked
            >
              Max. departure
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Time (1)">
            <Checkbox
              id="Time (1)"
              onChange={this.filterColumns}
              defaultChecked
            >
              Time (1)
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Truck Used">
            <Checkbox
              id="Truck Used"
              onChange={this.filterColumns}
              defaultChecked
            >
              Truck Used
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="City">
            <Checkbox id="City" onChange={this.filterColumns} defaultChecked>
              City
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="L/D">
            <Checkbox id="L/D" onChange={this.filterColumns} defaultChecked>
              L/D
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Date">
            <Checkbox id="Date" onChange={this.filterColumns} defaultChecked>
              Date
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Time (2)">
            <Checkbox
              id="Time (2)"
              onChange={this.filterColumns}
              defaultChecked
            >
              Time (2)
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Reference">
            <Checkbox
              id="Reference"
              onChange={this.filterColumns}
              defaultChecked
            >
              Reference
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Truck (1)">
            <Checkbox
              id="Truck (1)"
              onChange={this.filterColumns}
              defaultChecked
            >
              Truck (1)
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Gate (1)">
            <Checkbox
              id="Gate (1)"
              onChange={this.filterColumns}
              defaultChecked
            >
              Gate (1)
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Time(3)">
            <Checkbox
              id="Time (3)"
              onChange={this.filterColumns}
              defaultChecked
            >
              Time (3)
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Inl. ter. (1)">
            <Checkbox
              id="Inl. ter. (1)"
              onChange={this.filterColumns}
              defaultChecked
            >
              Inl. ter. (1)
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Gross (kgs)">
            <Checkbox
              id="Gross (kgs)"
              onChange={this.filterColumns}
              defaultChecked
            >
              Gross (kgs)
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Temperature °C">
            <Checkbox
              id="Temperature °C"
              onChange={this.filterColumns}
              defaultChecked
            >
              Temperature °C
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Seal">
            <Checkbox id="Seal" onChange={this.filterColumns} defaultChecked>
              Seal
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Truck (2)">
            <Checkbox
              id="Truck (2)"
              onChange={this.filterColumns}
              defaultChecked
            >
              Truck (2)
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Voyage/inland carrier">
            <Checkbox
              id="Voyage/inland carrier"
              onChange={this.filterColumns}
              defaultChecked
            >
              Voyage/inland carrier
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Terminal (1)">
            <Checkbox
              id="Terminal (1)"
              onChange={this.filterColumns}
              defaultChecked
            >
              Terminal (1)
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Closing">
            <Checkbox id="Closing" onChange={this.filterColumns} defaultChecked>
              Closing
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="POD">
            <Checkbox id="POD" onChange={this.filterColumns} defaultChecked>
              POD
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Invoice reference">
            <Checkbox
              id="Invoice reference"
              onChange={this.filterColumns}
              defaultChecked
            >
              Invoice reference
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Tariff type">
            <Checkbox
              id="Tariff type"
              onChange={this.filterColumns}
              defaultChecked
            >
              Tariff type
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="G">
            <Checkbox id="G" onChange={this.filterColumns} defaultChecked>
              G
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="F">
            <Checkbox id="F" onChange={this.filterColumns} defaultChecked>
              F
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Positie">
            <Checkbox id="Positie" onChange={this.filterColumns} defaultChecked>
              Positie
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Delay">
            <Checkbox id="Delay" onChange={this.filterColumns} defaultChecked>
              Delay
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Weight">
            <Checkbox id="Weight" onChange={this.filterColumns} defaultChecked>
              Weight
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="departure_time">
            <Checkbox
              id="departure_time"
              onChange={this.filterColumns}
              defaultChecked
            >
              departure_time
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="truck_id">
            <Checkbox
              id="truck_id"
              onChange={this.filterColumns}
              defaultChecked
            >
              truck_id
            </Checkbox>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    const showHideTruckMenu = (
      <Menu>
        <Menu.ItemGroup title="truck_id">
          <Menu.Item key="truck_id">
            <Checkbox
              id="truck_id"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              truck_id
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="s_number">
            <Checkbox
              id="s_number"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              s_number
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="availability">
            <Checkbox
              id="availability"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              availability
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="truck_type">
            <Checkbox
              id="truck_type"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              truck_type
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="business_type">
            <Checkbox
              id="business_type"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              business_type
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Driver">
            <Checkbox
              id="Driver"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              Driver
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="terminal">
            <Checkbox
              id="terminal"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              terminal
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Owner">
            <Checkbox
              id="Owner"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              Owner
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="hierarchy">
            <Checkbox
              id="hierarchy"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              hierarchy
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="use_cost">
            <Checkbox
              id="use_cost"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              use_cost
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="date">
            <Checkbox
              id="date"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              date
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="starting_time">
            <Checkbox
              id="starting_time"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              starting_time
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="Remarks">
            <Checkbox
              id="Remarks"
              onChange={this.filterTruckColumns}
              defaultChecked
            >
              Remarks
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
          <Col span={2} offset={12}>
            <Dropdown
              Scrollable
              overlay={showHideTruckMenu}
              onVisibleChange={this.changeTruckVisibility}
              visible={this.state.isTruckVisible}
              style={{ maxHeight: "50px" }}
            >
              <Button>Show/Hide</Button>
            </Dropdown>
          </Col>
          <Col span={2}>
            <Button onClick={() => window.open("/data")}>
              Data visualization
            </Button>
          </Col>
        </Row>
        <Row gutter={[24, 8]} justify="space-around" align="middle">
          <Col span={12}>
            <EditableTableOrder
              rowSelection={ordersRowSelection}
              dataSource={this.state.data}
              columns={this.state.columns}
              setData={this.setData}
              onRow={(record) => ({
                onClick: () => {
                  this.selectOrdersRow(record);
                },
              })}
            ></EditableTableOrder>
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
            <EditableTableTruck
              rowSelection={trucksRowSelection}
              dataSource={this.state.data2}
              columns={this.state.columns2}
              setData={this.setData2}
              onRow={(record) => ({
                onClick: () => {
                  this.selectOrdersRow(record);
                },
              })}
            ></EditableTableTruck>
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
              <EditableTableOrder
                rowSelection={ordersRowSelection}
                dataSource={this.state.data}
                columns={this.state.columns}
                setData={this.setData}
                onRow={(record) => ({
                  onClick: () => {
                    this.selectOrdersRow(record);
                  },
                })}
              ></EditableTableOrder>
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
              <EditableTableTruck
                rowSelection={trucksRowSelection}
                dataSource={this.state.data2}
                columns={this.state.columns2}
                setData={this.setData2}
                onRow={(record) => ({
                  onClick: () => {
                    this.selectOrdersRow(record);
                  },
                })}
              ></EditableTableTruck>
            </Layout>
          )}
        </Modal>
      </Layout>
    );
  }
}
