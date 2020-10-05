import React, { Component } from "react";
import Chart from "react-google-charts";

export default class DataVisualization extends Component {
    render(){
      return(
       <Chart
  width={'100%'}
  height={'600px'}
  chartType="Timeline"
  loader={<div>Loading Chart</div>}
  data={[
    [
      { type: 'string', id: 'Room' },
      { type: 'string', id: 'Name' },
      { type: 'date', id: 'Start' },
      { type: 'date', id: 'End' },
    ],
      [
      'Truck 1',
      'order id',
      new Date(0, 0, 0, 8, 0, 0),
      new Date(0, 0, 0, 10, 30, 0),
    ],
    [
      'Truck 1',
      'order id',
      new Date(0, 0, 0, 12, 0, 0),
      new Date(0, 0, 0, 13, 30, 0),
    ],
    [
      'Truck 1',
      'order id',
      new Date(0, 0, 0, 14, 0, 0),
      new Date(0, 0, 0, 15, 30, 0),
    ],
    [
      'Truck 1',
      'order id',
      new Date(0, 0, 0, 16, 0, 0),
      new Date(0, 0, 0, 17, 30, 0),
    ],
    [
      'Truck 2',
      'order id',
      new Date(0, 0, 0, 12, 30, 0),
      new Date(0, 0, 0, 14, 0, 0),
    ],
    [
      'Truck 2',
      'order id',
      new Date(0, 0, 0, 14, 30, 0),
      new Date(0, 0, 0, 16, 0, 0),
    ],
    [
      'Truck 2',
      'order id',
      new Date(0, 0, 0, 16, 30, 0),
      new Date(0, 0, 0, 18, 0, 0),
    ],
      [
      'Truck 3',
      'order id',
      new Date(0, 0, 0, 9, 30, 0),
      new Date(0, 0, 0, 11, 0, 0),
    ],
      [
      'Truck 3',
      'order id',
      new Date(0, 0, 0, 15, 30, 0),
      new Date(0, 0, 0, 18, 0, 0),
    ],

      [
      'Truck 4',
      'order id',
      new Date(0, 0, 0, 8, 30, 0),
      new Date(0, 0, 0, 11, 0, 0),
    ],
      [
      'Truck 4',
      'order id',
      new Date(0, 0, 0, 12, 30, 0),
      new Date(0, 0, 0, 15, 0, 0),
    ],

      [
      'Truck 5',
      'order id',
      new Date(0, 0, 0, 9, 30, 0),
      new Date(0, 0, 0, 11, 0, 0),
    ],
      [
      'Truck 5',
      'order id',
      new Date(0, 0, 0, 12, 30, 0),
      new Date(0, 0, 0, 14, 0, 0),
    ],

      [
      'Truck 6',
      'order id',
      new Date(0, 0, 0, 10, 30, 0),
      new Date(0, 0, 0, 12, 0, 0),
    ],
      [
      'Truck 6',
      'order id',
      new Date(0, 0, 0, 15, 30, 0),
      new Date(0, 0, 0, 16, 0, 0),
    ],

      [
      'Truck 7',
      'order id',
      new Date(0, 0, 0, 8, 30, 0),
      new Date(0, 0, 0, 10, 0, 0),
    ],
      [
      'Truck 7',
      'order id',
      new Date(0, 0, 0, 14, 30, 0),
      new Date(0, 0, 0, 17, 0, 0),
    ],

      [
      'Truck 8',
      'order id',
      new Date(0, 0, 0, 8, 30, 0),
      new Date(0, 0, 0, 11, 0, 0),
    ],
      [
      'Truck 9',
      'order id',
      new Date(0, 0, 0, 12, 30, 0),
      new Date(0, 0, 0, 15, 0, 0),
    ],
  ]}
  options={{
    timeline: {
      colorByRowLabel: true,
    },
  }}
  rootProps={{ 'data-testid': '5' }}
/>
      )
    }
}
