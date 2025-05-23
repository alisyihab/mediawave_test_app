<template>
  <div
    class="max-w-screen-2xl mx-auto px-[100px] py-6 bg-gray-50 dark:bg-dark-background min-h-screen"
  >
    <div class="pb-5">
      <Navbar />
    </div>

    <!-- Data Panel & Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      <!-- Data Panel -->
      <div class="lg:col-span-4">
        <div
          class="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 h-full"
        >
          <DataPanel v-if="dataReady" />
        </div>
      </div>

      <!-- Chart -->
      <div class="lg:col-span-8">
        <div
          class="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 h-full"
        >
          <SalesChart v-if="dataReady" />
        </div>
      </div>
    </div>

    <!-- Tabel & Map -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Tabel -->
      <div class="lg:col-span-4">
        <div
          class="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
        >
          <DataTable v-if="dataReady" />
        </div>
      </div>

      <!-- Map -->
      <div class="lg:col-span-8">
        <div
          class="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 h-full"
        >
          <PhoneMap v-if="dataReady" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "~/components/Navbar.vue";
import PhoneMap from "~/components/PhoneMap.vue";
import DataTable from "~/components/Datatable.vue";
import DataPanel from "~/components/DataPanel.vue";
import SalesChart from "~/components/SalesChart.vue";

const dataReady = ref(false);

onMounted(() => {
  setTimeout(() => {
    dataReady.value = true;
  }, 300);
});
</script>

<style>
/* Smooth transition for dark mode */
html.dark {
  color-scheme: dark;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-track {
  background: #2f3249;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}
</style>
