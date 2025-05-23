<template>
  <nav
    class="flex items-center justify-between px-6 py-4 bg-white dark:bg-dark-card shadow rounded-xl shadow-md"
  >
    <h1 class="text-xl font-bold text-gray-800 dark:text-dark-text-primary">
      Sales Dashboard
    </h1>
    <button
      @click="toggleDark"
      class="text-gray-600 dark:text-dark-text-secondary hover:text-black dark:hover:text-dark-text-primary"
    >
      {{ isDark ? "☀️ Light" : "🌙 Dark" }}
    </button>
  </nav>
</template>

<script setup>
import { useColorMode } from "#imports";
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const toggleDark = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>
