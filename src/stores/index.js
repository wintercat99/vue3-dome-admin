import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const routeStore = defineStore('route', {
  // other options...
  state: () => ({
    history: [],
    activeName: '',
    isCollapse: false,
  }),
  persist: {
    key: 'history',
    storage: window.sessionStorage,
    paths: ['history'],
  },
  actions: {
    //用户访问过的页面
    addHistory(route) {
      if (
        this.history.some((v) => v.name === route.name) ||
        !route.name ||
        route.name == 'login'
      )
        return
      this.history.push(route)
    },
    //关闭用户访问过的页面
    removeHistory(route) {
      for (const [i, v] of this.history.entries()) {
        if (v.path === route.path) {
          this.history.splice(i, 1)
          break
        }
      }
    },
  },
})
