import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import {useCookies} from 'vue3-cookies'
const {cookies} = useCookies();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      // beforeEnter: requireAuth
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
  ]
})


// function requireAuth(to, from, next) {
//   if(from.name !== 'register' || cookies.get('secretkey') == null) return next({name: 'register'})
//   next()
// }
export default router
