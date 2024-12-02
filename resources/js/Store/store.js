// store/store.js
import { reactive } from 'vue';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-based month

export const store = reactive({
  year: currentYear,
  month: currentMonth,
  essential_needs_percentage: 0,
  savings_percentage: 0,
  discretionary_spending_percentage: 0,
  wallet: null // Añade la propiedad wallet
});