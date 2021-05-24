import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Room from "../views/Room.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Lobby'
    }
  },
  {
    path: "/:id",
    name: "Chat room",
    component: Room,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
});
export default router;
