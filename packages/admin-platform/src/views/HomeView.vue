<template>
  <div class="home-view">
    <h1 class="gradient-title">多租户管理平台</h1>
    <!-- A basic anchor icon from Phosphor icons -->
    <div class="i-ph-anchor-simple-thin" />
    <!-- An orange alarm from Material Design Icons -->
    <div class="i-mdi-alarm text-orange-400" />
    <!-- A large Vue logo -->
    <div class="i-logos-vue text-3xl" />
    <!-- Sun in light mode, Moon in dark mode, from Carbon -->
    <a class="i-carbon-sun dark:i-carbon-moon" />
    <!-- Twemoji of laugh, turns to tear on hovering -->
    <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
    <div class="features">
      <div class="feature-card">
        <div class="icon">👥</div>
        <h3>租户管理</h3>
        <p>多租户系统管理</p>
      </div>
      <div class="feature-card">
        <div class="icon">⚙️</div>
        <h3>系统配置</h3>
        <p>系统参数配置</p>
      </div>
      <div class="feature-card">
        <div class="icon">📊</div>
        <h3>数据统计</h3>
        <p>业务数据统计</p>
      </div>
      <div class="feature-card">
        <div class="icon">🔐</div>
        <h3>权限管理</h3>
        <p>用户权限控制</p>
      </div>
      <div class="feature-card">
        <div class="icon">📋</div>
        <h3>日志管理</h3>
        <p>系统日志查看</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.gradient-title {
  background: linear-gradient(45deg, #42b883, #35495e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 200px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.feature-card .icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #7f8c8d;
  margin: 0;
}

.cta-button {
  display: inline-block;
  background: #42b883;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.3);
}

.cta-button:hover {
  background: #359268;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(66, 184, 131, 0.4);
}
</style>
