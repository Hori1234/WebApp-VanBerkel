import React, { Component } from "react";
import Chart from "react-google-charts";
import "../Css/DataVisualization.css";

//Dummy list data
var truckIDsDummy = ['23', '23', '23', '234', '235'];
var orderIDsDummy = ['124124', '124124', '124124', '236234592', '234623466'];
var startTimesDummy = ['8:00', '10:30', '16:00', '12:00', '16:00'];
var endTimesDummy = ['10:30', '12:00', '18:00', '18:00', '18:00'];
var durationsDummy = ['2:30', '1:30', '2:00', '6:00', '2:00'];
var destinationsDummy = ['Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven', 'Eindhoven'];

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
function createSingleDataInput(truckID, orderID, startTime, endTime, duration, destination) {
  return ([truckID,
    orderID,
    createCustomHTMLTooltip(orderID, startTime, endTime, duration, destination),
    createDataTime(startTime),
    createDataTime(endTime),
  ])
}

// create a list with all data points for the list timeline
function createAllDataInput(truckIDs, orderIDs, startTimes, endTimes, durations, destinations) {
  let listLength = truckIDs.length;
  let listDataInputs = [[{ type: 'string', id: 'Room' },
  { type: 'string', id: 'Name' },
  { type: 'string', role: 'tooltip', 'p': { 'html': true } },
  { type: 'date', id: 'Start' },
  { type: 'date', id: 'End' },]];
  for (let i = 0; i < listLength; i++) {
    let tempList = createSingleDataInput(truckIDs[i], orderIDs[i], startTimes[i], endTimes[i], durations[i], destinations[i]);
    listDataInputs.push(tempList)
  }
  return(
    listDataInputs
  )
}

export default class DataVisualization extends Component {
  render() {
    return (
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="Timeline"
        loader={<div>Loading Chart</div>}
         data={createAllDataInput(truckIDsDummy,orderIDsDummy,startTimesDummy,endTimesDummy,durationsDummy,destinationsDummy)
           //[
        //   [
        //     { type: 'string', id: 'Room' },
        //     { type: 'string', id: 'Name' },
        //     { type: 'string', role: 'tooltip', 'p': { 'html': true } },
        //     { type: 'date', id: 'Start' },
        //     { type: 'date', id: 'End' },
        //   ],
          // createAllDataInput(truckIDsDummy,orderIDsDummy,startTimesDummy,endTimesDummy,durationsDummy,destinationsDummy)
          // ,
          // createSingleDataInput('Truck 1', '167639B', '8:00', '10:30', '2:30', 'Amsterdam')
          // ,
          // createSingleDataInput('Truck 1', '167639B', '10:30', '12:30', '2:30', 'Eindhoven')
          // ,
          // createSingleDataInput(truckIDsDummy[0],orderIDsDummy[0],startTimesDummy[0],endTimesDummy[0],durationsDummy[0],destinationsDummy[0])
          // ,
          // createSingleDataInput(truckIDsDummy[1],orderIDsDummy[1],startTimesDummy[1],endTimesDummy[1],durationsDummy[1],destinationsDummy[1])
          // ,
          // createSingleDataInput(truckIDsDummy[2],orderIDsDummy[2],startTimesDummy[2],endTimesDummy[2],durationsDummy[2],destinationsDummy[2])
          // ,
          // createSingleDataInput(truckIDsDummy[3],orderIDsDummy[3],startTimesDummy[3],endTimesDummy[3],durationsDummy[3],destinationsDummy[3])
          // ,
          // createSingleDataInput(truckIDsDummy[4],orderIDsDummy[4],startTimesDummy[4],endTimesDummy[4],durationsDummy[4],destinationsDummy[4])
          // ,
          // [
          //   'Truck 1',
          //   'order id',
          //   createCustomHTMLTooltip('167639B', '8:00', '10:30', '2:30', 'Eindhoven'),
          //   new Date(0, 0, 0, 14, 0, 0),
          //   new Date(0, 0, 0, 15, 30, 0),
          // ],
          // [
          //   'Truck 1',
          //   'order id',
          //   createCustomHTMLTooltip('167639B', '8:00', '10:30', '2:30', 'Eindhoven'),
          //   new Date(0, 0, 0, 16, 0, 0),
          //   new Date(0, 0, 0, 17, 30, 0),
          // ],
          // [
          //   'Truck 2',
          //   'order id',
          //   createCustomHTMLTooltip('167639B', '8:00', '10:30', '2:30', 'Eindhoven'),
          //   new Date(0, 0, 0, 12, 30, 0),
          //   new Date(0, 0, 0, 14, 0, 0),
          // ],
          // [
          //   'Truck 2',
          //   'order id',
          //   createCustomHTMLTooltip('167639B', '8:00', '10:30', '2:30', 'Eindhoven'),
          //   new Date(0, 0, 0, 14, 30, 0),
          //   new Date(0, 0, 0, 16, 0, 0),
          // ],
          // [
          //   'Truck 2',
          //   'order id',
          //   createCustomHTMLTooltip('167639B', '8:00', '10:30', '2:30', 'Eindhoven'),
          //   new Date(0, 0, 0, 16, 30, 0),
          //   new Date(0, 0, 0, 18, 0, 0),
          // ],
          // [
          //   'Truck 3',
          //   'order id',
          //   createCustomHTMLTooltip('167639B', '8:00', '10:30', '2:30', 'Eindhoven'),
          //   new Date(0, 0, 0, 9, 30, 0),
          //   new Date(0, 0, 0, 11, 0, 0),
          // ],
          // [
          //   'Truck 3',
          //   'order id',
          //   createCustomHTMLTooltip('167639B', '8:00', '10:30', '2:30', 'Eindhoven'),
          //   new Date(0, 0, 0, 15, 30, 0),
          //   new Date(0, 0, 0, 18, 0, 0),
          // ],
        //]
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
    )
  }
}
