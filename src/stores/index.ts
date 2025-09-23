import { createPinia } from 'pinia';

const pinia = createPinia();

export { pinia };

export * from './counterStore';
export * from './userStore';
