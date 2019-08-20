import '@scss/main.scss'
import * as d3 from 'd3';
import { ScatterPlot } from '@/app/scatter-plot.js';

d3.json("./data/my_weather_data.json").then(dataset => {
    let scatterPlot = new ScatterPlot();
    scatterPlot.draw(dataset);
});



