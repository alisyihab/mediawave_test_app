<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-2">
      <select
        v-model="period"
        @change="fetchData"
        class="border p-2 rounded dark:bg-dark-card dark:border-gray-600 dark:text-dark-text-primary"
      >
        <option value="7d">Last 7 Days</option>
        <option value="month">This Month</option>
      </select>
      <select
        v-model="country"
        @change="fetchData"
        class="border p-2 rounded dark:bg-dark-card dark:border-gray-600 dark:text-dark-text-primary"
      >
        <option value="">All Countries</option>
        <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div class="bg-white p-4 space-y-2 rounded-lg dark:bg-dark-card">
      <h2 class="text-lg font-semibold dark:text-dark-text-primary">
        Reported Phone Sales
      </h2>
      <div class="text-3xl font-bold dark:text-dark-text-primary">
        {{ data?.total || 0 }}
      </div>
      <div class="text-sm text-green-600 dark:text-green-400">
        ▲ {{ data?.change || 0 }} since last period
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useColorMode } from '#imports'

const period = ref("7d");
const country = ref("");
const countries = [
  "Japan",
  "Australia",
  "Indonesia",
  "Thailand",
  "Philippines",
  "Malaysia",
];
const data = ref(null);

async function fetchData() {
  const query = new URLSearchParams();
  if (period.value) query.append("period", period.value);
  if (country.value) query.append("country", country.value);

  const res = await fetch(`/api/mock/asia-pacific?${query}`);
  data.value = await res.json();
}

onMounted(fetchData);
</script>
