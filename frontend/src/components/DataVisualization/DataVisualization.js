import React, { Component } from "react";
import Chart from "react-google-charts";
import "../Css/DataVisualization.css";

// creates the tooltip of an order
function createCustomHTMLTooltip(orderID, startTime, endTime,duration, destination) {
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
function createDataTime(time){
  let index = time.indexOf(":");
  let hours = time.substr(0, index)
  let minutes = time.substr(index+1)
  return(
    new Date(0, 0, 0, hours, minutes, 0)
  )
}

// create single data input for timeline
function createSingleDataInput(truckID,orderID, startTime, endTime,duration, destination) {
  return([truckID,
    orderID,
  createCustomHTMLTooltip(orderID, startTime, endTime,duration, destination),
  createDataTime(startTime),
  createDataTime(endTime),
  ])
}

// create all the data input for timeline
function createAllDataInput(truckID,orderID, startTime, endTime,duration, destination){

}

export default class DataVisualization extends Component {
  render() {
    return (
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="Timeline"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: 'string', id: 'Room' },
            { type: 'string', id: 'Name' },
            { type: 'string', role: 'tooltip', 'p': { 'html': true } },
            { type: 'date', id: 'Start' },
            { type: 'date', id: 'End' },
          ],
            createSingleDataInput('Truck 1','167639B','8:00', '10:30', '2:30', 'Amsterdam')
          ,
            createSingleDataInput('Truck 1','167639B','10:30', '12:30', '2:30', 'Eindhoven')
          ,
          [
            'Truck 1',
            'order id',
            createCustomHTMLTooltip('167639B','8:00', '10:30', '2:30', 'Eindhoven'),
            new Date(0, 0, 0, 14, 0, 0),
            new Date(0, 0, 0, 15, 30, 0),
          ],
          [
            'Truck 1',
            'order id',
            createCustomHTMLTooltip('167639B','8:00', '10:30', '2:30', 'Eindhoven'),
            new Date(0, 0, 0, 16, 0, 0),
            new Date(0, 0, 0, 17, 30, 0),
          ],
          [
            'Truck 2',
            'order id',
            createCustomHTMLTooltip('167639B','8:00', '10:30', '2:30', 'Eindhoven'),
            new Date(0, 0, 0, 12, 30, 0),
            new Date(0, 0, 0, 14, 0, 0),
          ],
          [
            'Truck 2',
            'order id',
            createCustomHTMLTooltip('167639B','8:00', '10:30', '2:30', 'Eindhoven'),
            new Date(0, 0, 0, 14, 30, 0),
            new Date(0, 0, 0, 16, 0, 0),
          ],
          [
            'Truck 2',
            'order id',
            createCustomHTMLTooltip('167639B','8:00', '10:30', '2:30', 'Eindhoven'),
            new Date(0, 0, 0, 16, 30, 0),
            new Date(0, 0, 0, 18, 0, 0),
          ],
          [
            'Truck 3',
            'order id',
            createCustomHTMLTooltip('167639B','8:00', '10:30', '2:30', 'Eindhoven'),
            new Date(0, 0, 0, 9, 30, 0),
            new Date(0, 0, 0, 11, 0, 0),
          ],
          [
            'Truck 3',
            'order id',
            createCustomHTMLTooltip('167639B','8:00', '10:30', '2:30', 'Eindhoven'),
            new Date(0, 0, 0, 15, 30, 0),
            new Date(0, 0, 0, 18, 0, 0),
          ],
        ]}
        options={{
          timeline: {
            colorByRowLabel: true,
            allowHtml: true,
          },
          avoidOverlappingGridLines: true,
        }}
        rootProps={{ 'data-testid': '5' }}
      />
    )
  }
}
