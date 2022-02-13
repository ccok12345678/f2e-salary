import { createApp } from 'vue';

import {
  Chart,
  // ArcElement,
  LineElement,
  BarElement,
  // PointElement,
  BarController,
  // BubbleController,
  // DoughnutController,
  LineController,
  // PieController,
  // PolarAreaController,
  // RadarController,
  // ScatterController,
  CategoryScale,
  LinearScale,
  // LogarithmicScale,
  // RadialLinearScale,
  // TimeScale,
  // TimeSeriesScale,
  // Decimation,
  // Filler,
  // Legend,
  // Title,
  Tooltip,
  // SubTitle,
} from 'chart.js';

import App from './App.vue';
import router from './router';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// chart.js
Chart.register(
  // ArcElement,
  LineElement,
  BarElement,
  // PointElement,
  BarController,
  // BubbleController,
  // DoughnutController,
  LineController,
  // PieController,
  // PolarAreaController,
  // RadarController,
  // ScatterController,
  CategoryScale,
  LinearScale,
  // LogarithmicScale,
  // RadialLinearScale,
  // TimeScale,
  // TimeSeriesScale,
  // Decimation,
  // Filler,
  // Legend,
  // Title,
  Tooltip,
  // SubTitle,
);

Chart.defaults.color = '#F2F2F4';
Chart.defaults.borderColor = '#6B6783';
Chart.defaults.elements.bar.backgroundColor = '#8E7DFA';

const app = createApp(App);

app.use(router);
app.mount('#app');
