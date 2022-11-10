<script setup>
import { routeStore } from '@/stores/index.js'
import { computed } from 'vue'
import RouterHistoryBar from './components/RouteHistoryBar.vue'
import Aside from './components/Aside.vue'

const mainStore = routeStore()

const containObj = computed(() => {
  return {
    hideSidebar: mainStore.isCollapse,
    mobile: mainStore.mobile,
  }
})

const toggleSide = () => {
  mainStore.isCollapse = !mainStore.isCollapse
}
</script>

<template>
  <el-container class="main contain" :class="containObj">
    <el-header class="header">
      <el-row :align="'middle'" justify="center" class="headLine">
        <el-col :span="18"> 卖号网</el-col>
      </el-row>
    </el-header>

    <el-container class="contain">
      <el-aside class="leftside" width="210px">
        <el-scrollbar height="100%">
          <Aside class="sidebar-container" />
        </el-scrollbar>
      </el-aside>

      <el-main class="mainside">
        <el-row align="middle" justify="start" class="tabLine">
          <el-col :span="24">
            <div class="navTag">
              <el-icon class="menuIcon" @click="toggleSide">
                <component :is="mainStore.isCollapse ? 'Expand' : 'Fold'" />
              </el-icon>
              <RouterHistoryBar />
            </div>
          </el-col>
        </el-row>
        <el-scrollbar class="formContain">
          <!-- <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.name" />
            </transition>
          </router-view> -->
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>

    <div
      v-if="mainStore.mobile && !mainStore.isCollapse"
      class="overlay"
      @click="toggleSide"
    ></div>
  </el-container>
</template>
<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.contain {
  height: 100%;
  width: 100%;
}
.header {
  background-color: rgb(15, 139, 228);
}
.headLine {
  height: 100%;
  font-size: 24px;
}
.btnLineTop {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.headLine :deep(.el-col) {
  color: #fff;
}
.btn {
  cursor: pointer;
}
.leftside {
  height: 95vh;
  background-color: #304156;
  z-index: 100;
  /* transition-duration: 0.3s; */
}
.leftside :deep(.el-menu) {
  border: none;
}
.mainside {
  margin-left: 210px;
  position: absolute;
  z-index: 10;
  /* transition-duration: 0.3s; */
  overflow: hidden;
  width: calc(100% - 210px);
  height: 100%;
  background-color: #f2f3f5;
  padding: 0;

  .menuIcon {
    margin: 0 10px;
    font-size: 24px;
  }
}

.overlay {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 50;
}
.tabLine {
  height: 45px;
  margin-bottom: 5px;
  background-color: #fff;

  .navTag {
    width: 99%;
    display: flex;
    align-items: center;
    margin: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.formContain {
  height: calc(100% - 120px);
  width: 100%;
  position: relative;
}
</style>
