import { createWebHistory, createRouter } from "vue-router"
// import AppView from './App.vue'
import TableView from './table.vue'

const routes = [
  // {    ath: "/",    component: AppView  },
  {    path: "/table",    component: TableView  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 