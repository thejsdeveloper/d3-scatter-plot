import * as d3 from 'd3';

export class LineChart {
    constructor() {}

    draw(dataset) {

        const yAccessor = d => d.temperatureMax
        const dateParser = d3.timeParse('%Y-%m-%d')
        const xAccessor = d => dateParser(d.date)
    
        let dimensions = {
            width: window.innerWidth * 0.9,
            height: 600,
            margin: {
                top: 60,
                right: 15,
                bottom: 40,
                left: 40
            }
        };
    
        dimensions.boundWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left;
        dimensions.boundHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
    
        const container = d3.select('#wrapper');
    
        const text = container.append('h3')
            .text('Maximum Temperature of Singapore from AUG 2018 to SEP 2019')
            .style('transform', `translate(0px, 30px)`);
    
        const wrapper = d3.select('#wrapper')
            .append('svg')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height);
    
    
        const bounds = wrapper.append('g')
            .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);
    
    
        const yScale = d3.scaleLinear()
            .domain(d3.extent(dataset, yAccessor))
            .range([dimensions.boundHeight, 0])
    
        const xScale = d3.scaleTime()
            .domain(d3.extent(dataset, xAccessor))
            .range([0, dimensions.boundWidth]);
    
        const lineGenerator = d3.line()
            .x(d => xScale(xAccessor(d)))
            .y(d => yScale(yAccessor(d)));
    
        const line = bounds.append('path')
            .attr('d', lineGenerator(dataset))
            .attr('fill', 'none')
            .attr('stroke', '#F54780')
            .attr('stroke-width', 2);
    
    
        const xAxisGenerator = d3.axisBottom()
            .scale(xScale);
    
        const xAxis = bounds.append('g')
            .call(xAxisGenerator)
            .style('transform', `translateY(${dimensions.boundHeight}px)`)
            .attr('class', 'axis')
    
        const yAxisGenerator = d3.axisLeft()
            .scale(yScale);
    
        const yAxis = bounds.append('g')
            .call(yAxisGenerator)
            .attr('class', 'axis');
    
    }
}
    