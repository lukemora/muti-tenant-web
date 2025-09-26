<template>
  <div class="about-view">
    <h1>About This Project</h1>

    <div class="tech-stack">
      <h2>Technology Stack</h2>
      <div class="tech-grid">
        <div class="tech-item">
          <div class="tech-logo vue"></div>
          <h3>Vue 3</h3>
          <p>Composition API, Reactivity System</p>
        </div>
        <div class="tech-item">
          <div class="tech-logo typescript"></div>
          <h3>TypeScript</h3>
          <p>Static typing for JavaScript</p>
        </div>
        <div class="tech-item">
          <div class="tech-logo vite"></div>
          <h3>Vite</h3>
          <p>Next Generation Frontend Tooling</p>
        </div>
        <div class="tech-item">
          <div class="tech-logo pinia"></div>
          <h3>Pinia</h3>
          <p>Intuitive Vue Store</p>
        </div>
        <div class="tech-item">
          <div class="tech-logo router"></div>
          <h3>Vue Router</h3>
          <p>Client-Side Routing</p>
        </div>
      </div>
    </div>

    <div class="features">
      <h2>Project Features</h2>
      <ul>
        <li>Vue 3 Composition API with TypeScript</li>
        <li>Vite for fast development experience</li>
        <li>Vue Router for navigation</li>
        <li>Pinia for state management</li>
        <li>Responsive and modern UI design</li>
        <li>CSS animations and transitions</li>
      </ul>
    </div>

    <div class="resources">
      <h2>Learning Resources</h2>
      <div class="resource-links">
        <a
          href="https://vuejs.org/"
          target="_blank"
          class="resource-link"
        >
          Vue.js Documentation
        </a>
        <a
          href="https://vitejs.dev/"
          target="_blank"
          class="resource-link"
        >
          Vite Documentation
        </a>
        <a
          href="https://pinia.vuejs.org/"
          target="_blank"
          class="resource-link"
        >
          Pinia Documentation
        </a>
        <a
          href="https://router.vuejs.org/"
          target="_blank"
          class="resource-link"
        >
          Vue Router Documentation
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.about-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1,
h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.tech-stack,
.features,
.resources {
  margin-bottom: 3rem;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.tech-item {
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
}

.tech-item:hover {
  transform: translateY(-5px);
  background: #e9f5f0;
}

.tech-logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
}

.vue {
  background: linear-gradient(135deg, #42b883, #35495e);
}

.typescript {
  background: linear-gradient(135deg, #3178c6, #1e3557);
}

.vite {
  background: linear-gradient(135deg, #bd34fe, #41d1ff);
}

.pinia {
  background: linear-gradient(135deg, #ffd859, #ff9e7d);
}

.router {
  background: linear-gradient(135deg, #42b883, #3b8070);
}

.features ul {
  list-style-type: none;
  padding: 0;
}

.features li {
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border-left: 4px solid #42b883;
  border-radius: 0 5px 5px 0;
}

.resource-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.resource-link {
  display: block;
  padding: 0.8rem 1.5rem;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.resource-link:hover {
  background: #359268;
  transform: translateY(-2px);
}
</style>
