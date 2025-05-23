<template>
  <div class="space-y-4">
    <!-- Table for Breakdown -->
    <div class="bg-white p-4 rounded-lg dark:bg-dark-card">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b dark:border-gray-600">
            <th class="pb-2 font-semibold dark:text-dark-text-primary">
              Country
            </th>
            <th class="pb-2 font-semibold dark:text-dark-text-primary">
              Sales
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.country"
            class="border-b dark:border-gray-600"
          >
            <td class="py-3 dark:text-dark-text-secondary">
              {{ row.country }}
            </td>
            <td class="py-3 dark:text-dark-text-secondary">{{ row.sales }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const rows = ref([]);
const total = ref(0);
const change = ref(0);

onMounted(async () => {
  try {
    const res = await fetch("/api/mock/asia-pacific");
    const data = await res.json();

    rows.value = data.breakdown;
    total.value = data.total;
    change.value = data.change;
  } catch (err) {
    console.error("Fetch failed:", err);
  }
});
</script>
