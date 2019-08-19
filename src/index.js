import '@scss/main.scss'
import * as d3 from 'd3';
let data = require('../my_weather_data.json');

console.log(data);

import { LineChart } from '@/app/line-chart';

d3.json("./my_weather_data.json").then(dataset => {
    let linechart = new LineChart();
    linechart.draw(dataset);
})



