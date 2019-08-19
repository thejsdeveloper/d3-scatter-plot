import '@scss/main.scss'
import * as d3 from 'd3';

import { LineChart } from '@/app/line-chart';

d3.json("./my_weather_data.json").then(dataset => {
     let linechart = new LineChart();
    linechart.draw(dataset);
});
