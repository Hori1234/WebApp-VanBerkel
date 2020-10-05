import React, {Component} from "react";
import Chart from "react-google-charts";

function createCustomHTMLTooltip(orderID, startTime, endTime, destination) {
    return ('<div>' +
        '<b>' + orderID + '</b><br>' +
        '<b>' + startTime + '</b><br>' +
        '<b>' + endTime + '<b/><br>' +
        '<b>' + destination + '<b/><br>' +
        '</div>'
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
                data={[
                    [
                        {type: 'string', id: 'Room'},
                        {type: 'string', id: 'Name'},
                        {type: 'string', role: 'tooltip', 'p': {'html': true}},
                        {type: 'date', id: 'Start'},
                        {type: 'date', id: 'End'},
                    ],
                    [
                        'Truck 1',
                        'order id',
                        createCustomHTMLTooltip('Order #:123', 'Start :8:00', 'End:10:30', 'Destination:X'),
                        new Date(0, 0, 0, 8, 0, 0),
                        new Date(0, 0, 0, 10, 30, 0),
                    ],
                    [
                        'Truck 1',
                        'order id',
                        createCustomHTMLTooltip('Order #:123', 'Start :8:00', 'End:10:30', 'Destination:X'),
                        new Date(0, 0, 0, 12, 0, 0),
                        new Date(0, 0, 0, 13, 30, 0),
                    ],
                    [
                        'Truck 1',
                        'order id',
                        createCustomHTMLTooltip('Order #:123', 'Start :8:00', 'End:10:30', 'Destination:X'),
                        new Date(0, 0, 0, 14, 0, 0),
                        new Date(0, 0, 0, 15, 30, 0),
                    ],
                    [
                        'Truck 1',
                        'order id',
                        createCustomHTMLTooltip('Order #:123', 'Start :8:00', 'End:10:30', 'Destination:X'),
                        new Date(0, 0, 0, 16, 0, 0),
                        new Date(0, 0, 0, 17, 30, 0),
                    ],
                    [
                        'Truck 2',
                        'order id',
                        createCustomHTMLTooltip('Order #:123', 'Start :8:00', 'End:10:30', 'Destination:X'),
                        new Date(0, 0, 0, 12, 30, 0),
                        new Date(0, 0, 0, 14, 0, 0),
                    ],
                    [
                        'Truck 2',
                        'order id',
                        createCustomHTMLTooltip('Order #:123', 'Start :8:00', 'End:10:30', 'Destination:X'),
                        new Date(0, 0, 0, 14, 30, 0),
                        new Date(0, 0, 0, 16, 0, 0),
                    ],
                    [
                        'Truck 2',
                        'order id',
                        createCustomHTMLTooltip('Order #:123', 'Start :8:00', 'End:10:30', 'Destination:X'),
                        new Date(0, 0, 0, 16, 30, 0),
                        new Date(0, 0, 0, 18, 0, 0),
                    ],
                    [
                        'Truck 3',
                        'order id',
                        createCustomHTMLTooltip('Order #:123', 'Start :8:00', 'End:10:30', 'Destination:X'),
                        new Date(0, 0, 0, 9, 30, 0),
                        new Date(0, 0, 0, 11, 0, 0),
                    ],
                    [
                        'Truck 3',
                        'order id',
                        createCustomHTMLTooltip('Order #:123', 'Start :8:00', 'End:10:30', 'Destination:X'),
                        new Date(0, 0, 0, 15, 30, 0),
                        new Date(0, 0, 0, 18, 0, 0),
                    ],
                ]}
                options={{
                    timeline: {
                        colorByRowLabel: true,
                        allowHtml: true,
                    },
                }}
                rootProps={{'data-testid': '5'}}
            />
        )
    }
}
