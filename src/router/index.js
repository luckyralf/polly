import { createRouter, createWebHashHistory } from "vue-router";
import Start from "../views/Start.vue";

const routes = [
  {
    path: "/",
    name: "Start",
    component: Start,
  },
  {
    path: "/waiting/:id",
    name: "Waiting",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Waiting.vue"),
  },
  {
    path: "/poll/:id",
    name: "Poll",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Poll.vue"),
  },

  {
    path: "/create/:lang",
    name: "Create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Create.vue"),
  },
  {
    path: "/result/:id",
    name: "Result",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Result.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
