<script setup>
const hasChildren = (children) => {
  if (children && children.length > 0) return true;
  return false;
};

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <template v-if="!hasChildren(props.item.children) && !props.item.hidden">
    <router-link :to="props.item.path" custom v-slot="{ navigate, route }">
      <el-menu-item :index="props.item.name" @click="navigate">
        <el-icon v-if="route.meta.icon">
          <component :is="route.meta.icon"></component>
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </el-menu-item>
    </router-link>
  </template>

  <el-sub-menu v-else-if="!props.item.hidden" :index="props.item.name">
    <template #title>
      <el-icon v-if="props.item.meta.icon">
        <component :is="props.item.meta.icon"></component>
      </el-icon>
      <span>{{ props.item.meta.title }}</span>
    </template>
    <SideBarItem
      v-for="route in item.children"
      :key="route.path"
      :item="route"
    />
  </el-sub-menu>
</template>

<style scoped></style>
