<template>
  <div
    ref="chartRef"
    class="w-full h-80 rounded-lg bg-white dark:bg-dark-card"
  ></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useColorMode } from "#imports";

const { $Highcharts } = useNuxtApp();
const colorMode = useColorMode();
const chartRef = ref(null);
let chart = null;

const initChart = async () => {
  const res = await fetch("/api/mock/asia-pacific");
  const data = await res.json();

  if (chart) chart.destroy();

  const isDark = colorMode.value === "dark";
  const textColor = isDark ? "#e2e8f0" : "#1e40af";
  const bgColor = isDark ? "#2f3249" : "#ffffff";

  chart = $Highcharts.chart(chartRef.value, {
    chart: {
      type: "column",
      backgroundColor: bgColor,
      borderRadius: 8,
    },
    title: {
      text: "Monthly Phone Sales",
      style: { color: textColor },
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      labels: { style: { color: textColor } },
      lineColor: isDark ? "#3b3f58" : "#ddd",
    },
    yAxis: {
      title: {
        text: "Units Sold",
        style: { color: textColor },
      },
      labels: { style: { color: textColor } },
      gridLineColor: isDark ? "#3b3f58" : "#eee",
    },
    legend: {
      itemStyle: { color: textColor },
      itemHoverStyle: { color: isDark ? "#60a5fa" : "#3b82f6" },
    },
    tooltip: {
      backgroundColor: bgColor,
      borderColor: isDark ? "#60a5fa" : "#3b82f6",
      style: { color: textColor },
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        pointPadding: 0.1,
        groupPadding: 0.1,
      },
      series: {
        borderWidth: 0,
        dataLabels: {
          color: textColor,
          style: {
            textOutline: "none",
          },
        },
      },
    },
    series: data.monthlySales.map((series) => ({
      ...series,
      color:
        series.name === "Iphin"
          ? isDark
            ? "#7dd3fc"
            : "#3b82f6"
          : isDark
          ? "#a5b4fc"
          : "#6366f1",
    })),
    credits: { enabled: false },
  });
};

const updateChartTheme = () => {
  if (!chart) return;

  const isDark = colorMode.value === "dark";
  const textColor = isDark ? "#e2e8f0" : "#1e40af";
  const bgColor = isDark ? "#2f3249" : "#ffffff";

  chart.update(
    {
      chart: { backgroundColor: bgColor },
      title: { style: { color: textColor } },
      xAxis: {
        labels: { style: { color: textColor } },
        lineColor: isDark ? "#3b3f58" : "#ddd",
      },
      yAxis: {
        title: { style: { color: textColor } },
        labels: { style: { color: textColor } },
        gridLineColor: isDark ? "#3b3f58" : "#eee",
      },
      legend: {
        itemStyle: { color: textColor },
        itemHoverStyle: { color: isDark ? "#60a5fa" : "#3b82f6" },
      },
      tooltip: {
        backgroundColor: bgColor,
        borderColor: isDark ? "#60a5fa" : "#3b82f6",
        style: { color: textColor },
      },
      series: chart.series.map((series) => ({
        ...series.options,
        color:
          series.name === "Iphin"
            ? isDark
              ? "#7dd3fc"
              : "#3b82f6"
            : isDark
            ? "#a5b4fc"
            : "#6366f1",
      })),
    },
    true,
    true
  );
};

onMounted(initChart);
watch(() => colorMode.value, updateChartTheme);
</script>
