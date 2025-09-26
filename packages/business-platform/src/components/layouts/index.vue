<template>
  <BaseHeader />
  <div class="main-container flex">
    <BaseSide />
    <div
      w="full"
      py="4"
      overflow-y-auto
      text-align-left
      class="container-right"
    >
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
.main-container {
  height: calc(100vh - var(--el-menu-item-height) - 4px);

  .container-right {
    display: block;
    box-sizing: border-box;
    margin: 10px;
    // background: #fff;
  }
}
</style>
