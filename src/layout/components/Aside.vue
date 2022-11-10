<script setup>
import { routes } from "@/router/index";
import { routeStore } from "@/stores/index";
import SideBarItem from "./SideBarItem.vue";

const routesList = routeStore();
</script>
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="routesList.activeName"
      :collapse="routesList.isCollapse"
      :background-color="'#304156'"
      :text-color="'#bfcbd9'"
      :unique-opened="false"
      :active-text-color="'#409EFF'"
      :collapse-transition="false"
      mode="vertical"
    >
      <SideBarItem v-for="route in routes" :key="route.path" :item="route" />
    </el-menu>
  </el-scrollbar>
</template>
<style scoped></style>
