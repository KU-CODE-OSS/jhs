import { createWebHistory, createRouter } from "vue-router"
// import AppView from './App.vue'
import TableView from './table.vue'
import NewTableView from './new_table.vue'
import DashBoard from './dashboard.vue'

const routes = [
  // {    path: "/",    component: AppView  },
  {    path: "/table",    component: TableView  },
  {    path: "/new_table",    component: NewTableView  },
  {    path: "/dashboard",    component: DashBoard  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 