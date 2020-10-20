import React, { Component } from "react";
import Chart from "react-google-charts";
import "../Css/DataVisualization.css";
import { Row, Col, Layout, Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios";

export function downloadFile() {
  axios({
    url: "http://localhost:5000/data/firstride.pdf",
    method: "GET",
    responseType: "blob", // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "FirstRide.pdf");
    document.body.appendChild(link);
    link.click();
  });
}


// var truckIDsDummy = ["23", "23", "23", "234", "235"];
// var orderIDsDummy = ["1", "2", "3", "4", "5"];
// var startTimesDummy = ["8:00", "10:30", "16:00", "12:00", "16:00"];
// var endTimesDummy = ["10:30", "12:00", "18:00", "18:00", "18:00", "18:00"];
// var destinationsDummy = ["Eindhoven", "Eindhoven", "Eindhoven", "Eindhoven", "Eindhoven"];
// var orderTypesDummy = ["Port", "Port", "Port", "Port", "Port"];
// var clientsDummy = ["Hans", "Janna", "Surgei", "Rick", "Sander"];
// var containersDummy = ["1A", "1B", "1C", "1D", "1E"];



// creates the tooltip of an order
export function createCustomHTMLTooltip(
  orderID,
  startTime,
  endTime,
  duration,
  destination,
  orderType,
  client,
  container
) {
  return (
    '<ul class="flex-container">' +
    '<li class="flex-item" style="text-align: center" ><h4><b>' +
    orderID +
    "</b></h4></li>" +
    '<li class="flex-item"><b>Start: </b>' +
    startTime +
    "</li>" +
    '<li class="flex-item"><b>End: </b>' +
    endTime +
    "</li>" +
    '<li class="flex-item"><b>Duration: </b>' +
    duration +
    "</li>" +
    '<li class="flex-item"><b>Destination: </b>' +
    destination +
    "</li>" +
    '<li class="flex-item"><b>Order Type: </b>' +
    orderType +
    "</li>" +
    '<li class="flex-item"><b>Customer: </b>' +
    client +
    "</li>" +
    '<li class="flex-item"><b>Container ID: </b>' +
    container +
    '</li>' +
    '</ul>'
  );
}

export function calculateDuration(startTime, endTime) {
  let startDate = createDataTime(startTime);
  let endDate = createDataTime(endTime);
  let minutes = (endDate - startDate) / (1000 * 60);
  let finalMinutes = minutes % 60;
  if (finalMinutes < 10) {
    finalMinutes = "0" + finalMinutes;
  }
  let finalHours = (minutes - finalMinutes) / 60;
  let duration = finalHours + ":" + finalMinutes;
  return duration;
}

//create javascript data object
export function createDataTime(time) {
  //let index = time.indexOf(":");
  //let hours = time.substr(0, index);
  //let minutes = time.substr(index + 1);
  const arrayTime = time.split(":");
  return new Date(0, 0, 0, arrayTime[0], arrayTime[1], 0);
}

// create single data input for timeline
export function createSingleDataInput(
  truckID,
  orderID,
  startTime,
  endTime,
  destination,
  orderType,
  client,
  container
) {
  let duration = calculateDuration(startTime, endTime);
  return [
    truckID.toString(),
    orderID,
    createCustomHTMLTooltip(orderID, startTime, endTime, duration, destination, orderType, client, container),
    createDataTime(startTime),
    createDataTime(endTime),
  ];
}

//colour for a row available
export function coloursAvailable() {
  let blue = ["DodgerBlue", "DeepSkyBlue"];
  let red = ["FireBrick", "DarkRed"];
  let colours = [blue, red];
  return colours;
}

// create a list with all data points for the timeline
export function createAllDataInput(
  truckIDs,
  orderIDs,
  startTimes,
  endTimes,
  destinations,
  orderTypes,
  clients,
  containers
) {
  let listLength = truckIDs.length;
  let listDataInputs = [
    [
      { type: "string", id: "Truck" },
      { type: "string", id: "Name" },
      { type: "string", role: "tooltip", p: { html: true } },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
  ];
  for (let i = 0; i < listLength; i++) {
    let tempList = createSingleDataInput(
      truckIDs[i],
      orderIDs[i],
      startTimes[i],
      endTimes[i],
      destinations[i],
      orderTypes[i],
      clients[i],
      containers[i]
    );
    listDataInputs.push(tempList);
  }
  return listDataInputs;
}

export default class DataVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineDetails: [],
      status: "loading"
    };
  }

  componentDidMount() {
    this.getTimeline("latest");
  }

  getTimeline = async (value) => {
    return await axios
      .get(`/api/orders/timeline/${value}`)
      .then((res) => {
        this.setState((state) => ({
          ...state,
          timelineDetails: res.data,
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

  publishLatest = (value,value1) => {
    return axios
      .post(`/api/plannings/${value}/${value1}`)
      .then((res) => {
        if (res.status === 200) {
          message.success("Planning: Published successfully");
        }
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
          message.error("Unauthorized: " + error.response.data.message);
          return false;
      });
  };

  createArrays = () => {
    let address = [];
    let bookingID = [];
    let client = [];
    let containerID = [];
    let departureTime = [];
    let endTime = [];
    let orderType = [];
    let truckID = [];

    const property = this.state.timelineDetails;
    property.forEach((element) => {
      if (element.address == null) {
        address.push("unknown destination");
      } else {
        address.push(element.address);
      }
      if (element.booking_id == null) {
        bookingID.push("unknown booking order");
      }
      else {
        bookingID.push(element.booking_id);
      }
      if (element.client == null) {
        client.push("unknown client");
      }
      else {
        client.push(element.client);
      }
      if (element.container_id == null) {
        containerID.push("unknown");
      }
      else {
        containerID.push(element.container_id);
      }
      if (element.departure_time == null) {
        departureTime.push("0:01");
      }
      else {
        departureTime.push(element.departure_time);
      }
      if (element.end_time == null) {
        endTime.push("23:59");
      }
      else {
        endTime.push(element.end_time);
      }
      if (element.order_type == null) {
        orderType.push("No type");
      }
      else {
        orderType.push(element.order_type);
      }
      if (element.truck_id == null) {
        truckID.push("No truck");
      }
      else {
        truckID.push(element.truck_id);
      }
    })
    return createAllDataInput(truckID, bookingID, departureTime, endTime, address, orderType, client, containerID);
  }

  render() {
    return (
      
      this.state.status === "loading" ? "loading...":
      <Layout
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "white"
        }}
      >
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          data={ this.createArrays()
            //createAllDataInput(truckIDsDummy, orderIDsDummy, startTimesDummy, endTimesDummy, destinationsDummy, orderTypesDummy, clientsDummy, containersDummy)
          }
          options={{
            timeline: {
              colorByRowLabel: false,
              allowHtml: true,
            },
            avoidOverlappingGridLines: false,
          }}
          rootProps={{ "data-testid": "5" }}
        />
        <Row>
          <Col span={6}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size={"large"}
              style={{ width: "100%" }}
              onClick={downloadFile}
            >
              Download First-Rides
            </Button>
          </Col>
          <Col span={4} offset={14}>
            <Button type="primary" size={"large"} style={{ width: "100%" }} onClick={() => this.publishLatest('latest','latest')}>
              Publish
            </Button>
          </Col>
        </Row>
      </Layout>
    );
  }
}
