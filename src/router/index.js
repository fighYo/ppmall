import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/advert',
    component: Layout,
    redirect: '/advert/table',
    name: '轮播图管理',
    meta: { title: '轮播图管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '轮播图列表',
        component: () => import('@/views/mall/advert/list'),
        meta: { title: '轮播图列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加轮播图',
        component: () => import('@/views/mall/advert/save'),
        meta: { title: '添加轮播图', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '编辑轮播图',
        component: () => import('@/views/mall/advert/save'),
        meta: { title: '编辑轮播图', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '品类管理列表',
        component: () => import('@/views/mall/category/list'),
        meta: { title: '商品分类列表', icon: 'tree' }
      },
      {
        path: 'table',
        name: '商品列表',
        component: () => import('@/views/mall/category/table'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '增加商品',
        component: () => import('@/views/mall/category/save'),
        meta: { title: '增加商品', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '编辑商品',
        component: () => import('@/views/mall/category/save'),
        meta: { title: '编辑商品', noCache: true },
        hidden: true
      },
      {
        path: 'detail/:id',
        name: '商品详情',
        component: () => import('@/views/mall/category/detail'),
        meta: { title: '商品详情', icon: 'form' },
        hidden: true
      }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: '订单管理',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '订单列表',
        component: () => import('@/views/mall/order/list'),
        meta: { title: '订单列表', icon: 'table' }
      },
      {
        path: 'detail/:id',
        name: '订单详情',
        component: () => import('@/views/mall/order/detail'),
        meta: { title: '订单详情', icon: 'form' },
        hidden: true
      }]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://gitee.com/fighYo/ppmall',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
