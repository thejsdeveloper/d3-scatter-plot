import '@scss/main.scss'
import * as d3 from 'd3';

let dataset = require('./app/data/my_weather_data.json');

import { LineChart } from '@/app/line-chart';

let linechart = new LineChart();
linechart.draw(dataset);

