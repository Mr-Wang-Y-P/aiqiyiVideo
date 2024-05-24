import { defineStore } from 'pinia';

export const useSharedStore = defineStore('shared', {
  state: () => ({
    inputValue: '',
  }),

  actions: {
    setInputValue(value) {
      this.inputValue = value;
    },
  },

  getters: {
    getInputValue: (state) => state.inputValue,
  },
});