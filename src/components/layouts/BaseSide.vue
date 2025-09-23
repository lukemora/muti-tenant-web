<template>
  <div class="base-side">
    <el-menu
      router
      default-active="/"
      class="menu-content"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/home">
        <el-icon>
          <House />
        </el-icon>
        <template #title>Home</template>
      </el-menu-item>
      <el-menu-item index="/example">
        <el-icon>
          <List />
        </el-icon>
        <template #title>示例</template>
      </el-menu-item>

      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <Location />
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title>
            <span>Group One</span>
          </template>
          <el-menu-item>item one</el-menu-item>
          <el-menu-item>item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item>item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu
          index="1-4"
          disabled
        >
          <template #title>
            <span>item four</span>
          </template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="/about">
        <el-icon>
          <IconMenu />
        </el-icon>
        <template #title>about</template>
      </el-menu-item>
      <el-menu-item
        index="3"
        disabled
      >
        <el-icon>
          <Document />
        </el-icon>
        <template #title>disabled</template>
      </el-menu-item>
      <el-menu-item index="/counter">
        <el-icon>
          <Setting />
        </el-icon>
        <template #title>counter</template>
      </el-menu-item>
    </el-menu>
    <div
      class="menu-collapse-btn btn-primary"
      @click="isCollapse = !isCollapse"
    >
      <el-icon>
        <ArrowRightBold v-if="isCollapse" />
        <ArrowLeftBold v-else />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue';

const isCollapse = ref(true);
function handleOpen(key: string, keyPath: string[]) {
  // eslint-disable-next-line no-console
  console.log(key, keyPath);
}
function handleClose(key: string, keyPath: string[]) {
  // eslint-disable-next-line no-console
  console.log(key, keyPath);
}
</script>
<style lang="scss" scoped>
.base-side {
  position: relative;

  .menu-content {
    height: 100%;
  }

  .menu-collapse-btn {
    position: absolute;
    top: calc(50% - 33px);
    right: 0;
    cursor: pointer;
    padding: 20px 5px;
  }
}
</style>
