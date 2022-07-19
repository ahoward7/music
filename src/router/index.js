import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'

const HomeView = () => import('@/views/HomeView')
const AboutView = () => import('@/views/AboutView')
const ManageView = () => import(/* webpackChunkName: "groupedChunck" */'@/views/ManageView')
const SongView = () => import(/* webpackChunkName: "groupedChunck" */'@/views/SongView')

const routes = [
    {
        name: 'home',
        path: '/',
        component: HomeView,
    },
    {
        name: 'about',
        path: '/about',
        component: AboutView
    },
    {
        name: 'manage',
        path: '/manage-music',
        meta: {
            requiresAuth: true,
        },
        component: ManageView,
    },
    {
        path: '/manage',
        redirect: { name: 'manage' }
    },
    {
        name: 'song',
        path: '/song/:id',
        component: SongView
    },
    {
        path: '/:catchAll(.*)*',
        redirect: { name: 'home' }
    }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
    // console.log(to.matched);
  
    if (!to.matched.some((record) => record.meta.requiresAuth)) {
      next();
      return;
    }
  
    if (store.state.auth.userLoggedIn) {
      next();
    } 
    else {
      next({ name: 'home' });
    }
  });

export default router;
