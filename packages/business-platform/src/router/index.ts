import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/demo',
    name: 'Layouts',
    component: () => import('@/components/layouts/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: '/example',
        name: 'Example',
        component: () => import('@/views/ExampleView/index.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/AboutView.vue')
      },
      {
        path: '/counter',
        name: 'Counter',
        component: () => import('@/views/CounterView.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((_to, _from, next) => {
  //  const isAuthenticated = localStorage.getItem('token')

  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next({ name: 'Login' })
  // } else {
  //   next()
  // }

  next();
});

export default router;
