<template>
  <div id="tags-view-container" class="tags-view-container">
    <div
      v-for="route in history"
      class="tags-view-item"
      :key="route.path"
      :class="isActive(route) ? 'active' : ''"
      @click="changeRoute(route)"
      @contextmenu.prevent="openMenu(route, $event)"
    >
      {{ route.meta.title }}
      <span
        class="el-icon-close"
        v-if="route.meta.title != '工作台'"
        @click.prevent.stop="closeSelectedTag(route)"
      >
        <el-icon><CloseBold /></el-icon
      ></span>
    </div>
    <ul
      v-for="item in selectedTag"
      :key="item.path"
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="closeOthersTags(item)">
        <i class="el-icon-circle-close"></i> 关闭其他
      </li>
      <li @click="closeAllTags">
        <i class="el-icon-circle-close"></i> 全部关闭
      </li>
    </ul>
  </div>
</template>
<script setup>
import { CloseBold } from "@element-plus/icons-vue";
import { routeStore } from "@/stores/index";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
let store = routeStore();
let history = store.history;
let selectedTag = ref([]);
let visible = ref(false);
let left = ref(null);
let top = ref(null);
const router = useRoute();
const routers = useRouter();

const isActive = (route) => {
  return router.path == route.path;
};

//跳转路由
const changeRoute = (route) => {
  routers.push(route.path);
};

//删除标签
const closeSelectedTag = (item) => {
  store.removeHistory(item);
  if (isActive(item)) {
    toLastView(history);
  }
};

//如果在最后一个标签页则跳转到倒数第二标签
const toLastView = (history) => {
  const latestView = history.slice(-1)[0];
  if (latestView) {
    routers.push(latestView.path);
  }
};

//右击打开标签选项
const openMenu = (route, e) => {
  left.value = e.layerX;
  top.value = e.layerY;
  visible.value = true;
  selectedTag.value.push(route);
};

//关闭选项
const closeMenu = () => {
  visible.value = false;
};

//删除其他
const closeOthersTags = (item) => {
  history.splice(0, history.length);
  history.push(item);
  routers.push(item.path);
};
//删除全部
const closeAllTags = () => {
  history.splice(0, history.length);
};

//监听点击
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});

watch(history, (value) => {
  if (value.length <= 0) {
    routers.push("/home");
  }
});
</script>
<style lang="less" scoped>
.tags-view-container {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    width: auto;
    display: inline-block;
    cursor: pointer;
    height: 30px;
    line-height: 28px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    margin: 0 5px;
    font-size: 12px;
    border-radius: 2px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }

    .el-icon-close {
      margin-left: 2px;
      border-radius: 50%;

      .el-icon svg {
        height: 9px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  .active {
    background-color: rgba(36, 123, 255, 1);
    color: #fff;
    border-color: rgba(36, 123, 255, 1);
    &::before {
      content: "";
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
