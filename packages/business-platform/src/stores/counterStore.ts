export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    history: [] as string[]
  }),
  actions: {
    increment() {
      this.count++;
      this.history.push(`Incremented to ${this.count}`);
    },
    decrement() {
      this.count--;
      this.history.push(`Decremented to ${this.count}`);
    },
    reset() {
      this.count = 0;
      this.history.push(`Reset to 0`);
    }
  },
  getters: {
    doubleCount(): number {
      return this.count * 2;
    },
    recentHistory(): string[] {
      return this.history.slice(-5).reverse();
    }
  }
});
