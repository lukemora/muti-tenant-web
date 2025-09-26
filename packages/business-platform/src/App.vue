<template>
  <el-config-provider>
    <div
      w="full"
      h="full"
      overflow-y-hidden
      text-align-left
    >
      <router-view />
    </div>
  </el-config-provider>
</template>
<script setup lang="ts"></script>

<style lang="scss">
#app {
  height: 100%;
  text-align: center;
  color: $text-primary;
}
</style>
