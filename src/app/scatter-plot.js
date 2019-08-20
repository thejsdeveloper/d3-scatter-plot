
import * as d3 from 'd3';

export class ScatterPlot {

    constructor() {
    }


    draw(dataset) {

        const xAccessor = d => d.dewPoint
        const yAccessor = d => d.humidity
        const colorAccessor = d => d.cloudCover

        const container = document.getElementById('main');

        const width = d3.min([
            container.clientWidth * 0.9,
            container.clientHeight * 0.9
        ]);


        const dimensions = {
            width: width,
            height: width,
            margin: {
                top: 60,
                right: 20,
                bottom: 60,
                left: 60
            }
        };

        dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

        const wrapper = d3.select('#wrapper')
            .append('svg')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height);

        const bounds = wrapper.append('g')
            .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

        const xScale = d3.scaleLinear()
            .domain(d3.extent(dataset, xAccessor))
            .range([0, dimensions.boundedWidth])
            .nice();

        const yScale = d3.scaleLinear()
            .domain(d3.extent(dataset, yAccessor))
            .range([dimensions.boundedHeight, 0])
            .nice();

        const colorScale = d3.scaleLinear()
            .domain(d3.extent(dataset, colorAccessor))
            .range(['skyblue', 'darkslategrey']);

        const dots = bounds.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(xAccessor(d)))
            .attr('cy', d => yScale(yAccessor(d)))
            .attr('r', 5)
            .attr('fill', d => colorScale(colorAccessor(d)));

        const xAxisGenerator = d3.axisBottom()
            .scale(xScale);

        const xAxis = bounds.append('g')
            .call(xAxisGenerator)
            .style('transform', `translateY(${dimensions.boundedHeight}px)`);

        const xAxisLabel = xAxis.append('text')
            .attr('x', dimensions.boundedWidth / 2)
            .attr('y', dimensions.margin.bottom - 10)
            .attr('fill', 'white')
            .style('font-size', '1.4em')
            .html('Dew Point (&deg;F)')
            .attr('text-anchor', 'middle');


        const yAxisGenerator = d3.axisLeft()
            .scale(yScale)
            .ticks(4);

        const yAxis = bounds.append('g')
            .call(yAxisGenerator);

        const yAxisLabel = yAxis.append('text')
            .attr('x', -dimensions.boundedHeight / 2)
            .attr('y', -dimensions.margin.left + 20)
            .attr('fill', 'white')
            .style('font-size', '1.4em')
            .html('Relative humidity')
            .style("transform", "rotate(-90deg)")
            .attr('text-anchor', 'middle');


        const title = bounds.append('text')
            .attr('x', dimensions.boundedWidth / 2)
            .attr('y', -dimensions.margin.top + 30)
            .attr('fill', 'white')
            .style('font-size', '1.4em')
            .html(`Singapore's Humidity Vs Dew Point`)
            .attr('text-anchor', 'middle');

        const subTitle = bounds.append('text')
            .attr('x', dimensions.boundedWidth / 2)
            .attr('y', -dimensions.margin.top + 50)
            .attr('fill', 'white')
            .style('font-size', '1em')
            .html(`(Aug 2018 to Sep 2019)`)
            .attr('text-anchor', 'middle');

    }
}