<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <el-menu-item index="/">
      <div class="flex items-center justify-center gap-2">
        <div
          class="text-xl"
          i-ep-element-plus
        />
        <span class="header-title">Element Plus</span>
      </div>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="about">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="example">Example</el-menu-item>
    <el-menu-item
      h="full"
      @click="toggleDark()"
    >
      <button
        class="w-full cursor-pointer border-none bg-transparent"
        style="height: var(--el-menu-item-height)"
      >
        <i
          inline-flex
          i="dark:ep-moon ep-sunny"
        />
      </button>
    </el-menu-item>

    <el-menu-item
      h="full"
      index="login"
    >
      <div i-carbon-login />
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { toggleDark } from '@/composables/dark';
// const toggleDark = () => { }
</script>

<style lang="scss" scoped>
.el-menu-demo {
  &.el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
  }

  .header-title {
    color: $primary;
  }
}
</style>
