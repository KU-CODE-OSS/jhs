import { createWebHistory, createRouter } from "vue-router"
// import AppView from './App.vue'
import TableView from './table.vue'
import NewTableView from './new_table.vue'
import DashBoard from './dashboard.vue'
import Login from './login.vue'

const routes = [
  // {    path: "/",    component: AppView  },
  {    path: "/table",    component: TableView  },
  {    path: "/new_table",    component: NewTableView, name: 'new_table' },
  {    path: "/dashboard",    component: DashBoard  },
  {    path: "/login",    component: Login  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 