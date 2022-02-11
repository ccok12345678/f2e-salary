import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'HomePage',
        component: () => import('../views/EngineerCharts.vue'),
      },
      {
        path: 'engineercharts',
        name: 'Engineer',
        component: () => import('../views/EngineerCharts.vue'),
      },
    ],
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
