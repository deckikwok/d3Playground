/**
 * Created by decki on 8/8/15.
 */

var chartHeight = 500;
var chartWidth = 500;
var chartMargin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
}

var plotHeight = chartHeight - chartMargin.top - chartMargin.bottom;
var plotWidth = chartWidth - chartMargin.left - chartMargin.right;

var data = [181, 87, 324, 356, 65, 58, 44, 13, 31, 64, 97, 82, 10];

var objData = [
    {
        'key': 'froyo',
        'value': 0.3
    },
    {
        'key': 'gingerBread',
        'value': 4.6
    },
    {
        'key': 'iceCream',
        'value': 4.1
    },
    {
        'key': 'jellyBean16',
        'value': 13.0
    },
    {
        'key': 'jellyBean17',
        'value': 15.9
    },
    {
        'key': 'jellyBean18',
        'value': 4.7
    },
    {
        'key': 'kitKat',
        'value': 39.3
    },
    {
        'key': 'Lollipop21',
        'value': 15.5
    },
    {
        'key': 'Lollipop22',
        'value': 2.6
    },

]

var svg = d3.select("body").append("svg")
    .attr("id", "complexChartTut")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .style('background', "lightgrey")

var chart = svg.append('g')
    .classed('chartDisplay', true)
    .attr('transform','translate(' + chartMargin.left + ',' + chartMargin.top + ')')

var barHeight = 20;
var marginTop = 1;
var marginBottom = 1;



function getDataValue(paramData) {
    //console.log('typeof test ', typeof paramData);
 if( typeof paramData === 'object') {
     //console.log('paramData: ' + paramData + ' is an ' + typeof paramData)
     return paramData.value
 }
    else {
     return paramData
 }
}


function plot(params) {
    var xScale = d3.scale.linear()
        .domain([0, d3.max(params.data, function (d) {
            //console.log('d is ', getDataValue(d))
            return getDataValue(d);
        })])
        .range([0, plotWidth]);

    if (params.ordinal.y) {
        var yScale = d3.scale.ordinal()
            .domain(params.data.map(function (entry) {
                return entry.key;
            }))
            .rangeBands([0, plotHeight]);
    }
    else {
        var yScale = d3.scale.linear()
            .domain([0, params.data.length]) //the number of data elements
            .range([0, plotHeight]);
    }

    console.log('y test', yScale('jellyBean17'))


    this.selectAll('.bar')
        .data(params.data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .style('fill', 'navy')
        .style('shape-rendering', 'crispEdges')
        .attr('background', 'black')
        .attr('margin-top', '1')
        .attr('margin-bottom', '1')
        .attr('x', 0)
        .attr('y', function (d, i) {
            if (params.ordinal.y) {
                return yScale(d.key)
            }
            else {
                return yScale(i);
            }

        })
        .attr('width', function (d, i) {
            console.log('whats d in width scaled calculation ', d);
            console.log('xscale for width ', xScale(getDataValue(d)));
            return xScale(getDataValue(d));
        })
        .attr('height', function (d, i) {
            if (params.ordinal.y) {
                return yScale.rangeBand() - (marginTop + marginBottom)
            }
            else {
                return yScale(1) - (marginTop + marginBottom)
            }

        })

    this.selectAll('.bar-label')
        .data(params.data)
        .enter()
        .append('text')
        .classed('bar-label', true)
        .attr('x', function (d, i) {
            console.log('whats xscale d ', xScale(getDataValue(d)));
            return xScale(getDataValue(d));
        })
        .style('text-anchor', 'end')
        .attr('dx', function (d, i) {
            if (xScale(getDataValue(d)) >= 15) {
                return -10;
            }
        })
        .attr('y', function (d, i) {
            if (params.ordinal.y) {
                return yScale(d.key);
            }
            else {
                return yScale(i);
            }

        })
        .attr('dy', function (d, i) {
            if (params.ordinal.y){
                return yScale.rangeBand() /2
            }
            else {
                return yScale(1) / 2
            }

        })

        .style('fill', 'white')
        .style('font-size', '1.4em')
        //TODO: how to center align Y the text for a bar in a bar chart
        .attr('transform', 'translate(0,6)')
        .text(function (d, i) {
            return getDataValue(d);
        }
    )
}

plot.call(chart, {
    data: objData,
    ordinal: {
        y: true,
        x: false
    }
})