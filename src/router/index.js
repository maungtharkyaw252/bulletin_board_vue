import Vue from 'vue'
import VueRouter from 'vue-router'
import PostView from '../views/PostView.vue'
import PostCreateView from '../views/PostCreateVue.vue'
import PostEditView from '../views/PostEditView'
import PostUploadView from '../views/PostUploadView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PostView
  },
  {
    path: '/post/create',
    name: 'postCreate',
    component: PostCreateView
  },
  {
    path: '/post/edit/:id',
    name: 'postEdit',
    component: PostEditView
  },
  {
    path: '/post/upload',
    name: 'postUpload',
    component: PostUploadView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
