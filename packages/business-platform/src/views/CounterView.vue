<template>
  <div class="counter-view">
    <h1>Pinia State Management</h1>
    <p class="subtitle">Demonstrating Pinia store with history tracking</p>

    <div class="counter-container">
      <div class="counter-display">
        <div class="count-value">{{ counter.count }}</div>
        <div class="count-label">Current Count</div>

        <div class="double-count">
          Double:
          <span>{{ counter.doubleCount }}</span>
        </div>
      </div>

      <div class="counter-controls">
        <button
          class="counter-btn decrement"
          @click="counter.decrement"
        >
          <span>-</span>
        </button>
        <button
          class="counter-btn increment"
          @click="counter.increment"
        >
          <span>+</span>
        </button>
        <button
          class="counter-btn reset"
          @click="counter.reset"
        >
          Reset
        </button>
      </div>
    </div>

    <div class="history-section">
      <h2>Recent History</h2>
      <div
        v-if="counter.recentHistory.length > 0"
        class="history-items"
      >
        <div
          v-for="(item, index) in counter.recentHistory"
          :key="index"
          class="history-item"
        >
          {{ item }}
        </div>
      </div>
      <div
        v-else
        class="empty-history"
      >
        No history yet. Start counting!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores';

const counter = useCounterStore();
</script>

<style scoped>
.counter-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.subtitle {
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 2rem;
}

.counter-container {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.counter-display {
  text-align: center;
  margin-bottom: 2rem;
}

.count-value {
  font-size: 5rem;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.count-label {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.double-count {
  font-size: 1.2rem;
  color: #2c3e50;
}

.double-count span {
  font-weight: bold;
  color: #41a7ff;
}

.counter-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.counter-btn {
  border: none;
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.counter-btn span {
  font-size: 1.5rem;
  line-height: 1;
}

.decrement {
  background: #ff6b6b;
  color: white;
}

.increment {
  background: #42b883;
  color: white;
}

.reset {
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #e1e4e8;
}

.counter-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.decrement:hover {
  background: #ff5252;
}

.increment:hover {
  background: #359268;
}

.reset:hover {
  background: #e9ecef;
}

.history-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.history-items {
  margin-top: 1rem;
}

.history-item {
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border-left: 4px solid #42b883;
  border-radius: 0 5px 5px 0;
  animation: fadeIn 0.3s ease;
}

.empty-history {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  font-style: italic;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
