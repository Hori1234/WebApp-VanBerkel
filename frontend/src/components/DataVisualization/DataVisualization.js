import React, { Component } from "react";
import Chart from "react-google-charts";
import "../Css/DataVisualization.css";
import {
  Row,
  Col,
  Layout,
  Button
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios";

function downloadFile() {
  axios({
    url: 'http://localhost:5000/data/firstride.pdf',
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'FirstRide.pdf');
    document.body.appendChild(link);
    link.click();
  });
}

//Dummy list data
var truckIDsDummy = ['23', '23', '23', '234', '235', '1', '2', '3', '4', '5', '6', '7', '7', '7', '7', '7', '7', '7', '7', '7', '7', '7'];
var orderIDsDummy = ['124124', '124124', '124124', '236234592', '234623466', '2', '2', '2', '2', '2', '2', '2', '7', '7', '7', '7', '7', '7', '7', '7', '7', '7'];
var startTimesDummy = ['8:00', '10:30', '16:00', '12:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00', '16:00'];
var endTimesDummy = ['10:30', '12:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00'];
var destinationsDummy = ['Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven'];

// creates the tooltip of an order
function createCustomHTMLTooltip(orderID, startTime, endTime, duration, destination) {
  return (
    '<ul class="flex-container">' +
    '<li class="flex-item" style="text-align: center" ><h4><b>' + orderID + '</b></h4></li>' +
    '<li class="flex-item"><b>Start: </b>' + startTime + '</li>' +
    '<li class="flex-item"><b>End: </b>' + endTime + '</li>' +
    '<li class="flex-item"><b>Duration: </b>' + duration + '</li>' +
    '<li class="flex-item"><b>Destination: </b>' + destination + '</li>' +
    '</ul>'
  )
}

function calculateDuration(startTime, endTime) {
  let startDate = createDataTime(startTime);
  let endDate = createDataTime(endTime);
  let minutes = ((endDate - startDate) / (1000 * 60));
  let finalMinutes = minutes % 60;
  if (finalMinutes < 10) {
    finalMinutes = "0" + finalMinutes;
  }
  let finalHours = (minutes - finalMinutes) / 60;
  let duration = finalHours + ":" + finalMinutes;
  return duration;
}

//create javascript data object
function createDataTime(time) {
  let index = time.indexOf(":");
  let hours = time.substr(0, index)
  let minutes = time.substr(index + 1)
  return (
    new Date(0, 0, 0, hours, minutes, 0)
  )
}

// create single data input for timeline
function createSingleDataInput(truckID, orderID, startTime, endTime, destination) {
  let duration = calculateDuration(startTime, endTime);
  return ([truckID,
    +orderID,
    createCustomHTMLTooltip(orderID, startTime, endTime, duration, destination),
    createDataTime(startTime),
    createDataTime(endTime),
  ])
}

// create a list with all data points for the timeline
function createAllDataInput(truckIDs, orderIDs, startTimes, endTimes, destinations) {
  let listLength = truckIDs.length;
  let listDataInputs = [[{ type: 'string', id: 'Room' },
  { type: 'string', id: 'Name' },
  { type: 'string', role: 'tooltip', 'p': { 'html': true } },
  { type: 'date', id: 'Start' },
  { type: 'date', id: 'End' },]];
  for (let i = 0; i < listLength; i++) {
    let tempList = createSingleDataInput(truckIDs[i], orderIDs[i], startTimes[i], endTimes[i], destinations[i]);
    listDataInputs.push(tempList)
  }
  return (
    listDataInputs
  )
}

export default class DataVisualization extends Component {
  render() {
    return (
      <Layout style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background: "white",
      }}>
        <Chart
          width={'100%'}
          height={'100%'}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          data={createAllDataInput(truckIDsDummy, orderIDsDummy, startTimesDummy, endTimesDummy, destinationsDummy)
          }
          options={{
            timeline: {
              colorByRowLabel: true,
              allowHtml: true,
              avoidOverlappingGridLines: false,
            },
          }}
          rootProps={{ 'data-testid': '5' }}
        />
        <Row>
          <Col span={6}>
            <Button type="primary" icon={<DownloadOutlined />} size={'large'} style={{ width: "100%" }} onClick={downloadFile}>Download First-Rides</Button>
          </Col>
          <Col span={4} offset={14} >
            <Button type="primary" size={'large'} style={{ width: "100%" }}>Publish</Button>
          </Col>
        </Row>
      </Layout>
    )
  }
}
