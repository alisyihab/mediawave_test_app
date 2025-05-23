<template>
  <div id="map" class="h-96 w-full rounded-lg bg-white dark:bg-dark-card"></div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useColorMode } from "#imports";

const { $L } = useNuxtApp();
const colorMode = useColorMode();
let map = null;
let tileLayer = null;
let markers = [];

const initMap = async () => {
  const res = await fetch("/api/mock/asia-pacific");
  const result = await res.json();

  if (map) map.remove();

  map = $L.map("map", { preferCanvas: true }).setView([10, 120], 4);
  updateMapStyle();

  if (result?.points) {
    markers = result.points.map((point, index) => {
      const breakdownItem = result.breakdown[index];
      const marker = $L
        .circleMarker(point.coords, {
          radius: Math.sqrt(point.count) / 2,
          fillColor: colorMode.value === "dark" ? "#60a5fa" : "#3b82f6",
          color: colorMode.value === "dark" ? "#1d4ed8" : "#1e40af",
          weight: 1,
          fillOpacity: 0.7,
        })
        .addTo(map);

      const tooltipContent = `
        <div class="text-sm font-medium">
          <div class="font-bold">${breakdownItem.country}</div>
          <div>Sales: ${point.count}</div>
          <div>Total: ${point.total || point.count}</div>
        </div>
      `;

      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold">${point.country || "Unknown"}</h3>
          <p>Sales Count: ${point.count}</p>
          ${point.total ? `<p>Total Revenue: $${point.total}</p>` : ""}
        </div>
      `);

      marker.bindTooltip(tooltipContent, {
        permanent: false,
        direction: "top",
        className:
          colorMode.value === "dark" ? "dark-tooltip" : "light-tooltip",
        opacity: 1,
      });

      return marker;
    });
  }
};

const updateMapStyle = () => {
	if (!map) return;

  const isDark = colorMode.value === "dark";

  if (tileLayer) map.removeLayer(tileLayer);

  tileLayer = $L
    .tileLayer(
      isDark
        ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap",
        maxZoom: 19,
      }
    )
    .addTo(map);

  // Update marker styles
  markers.forEach((marker) => {
    marker.setStyle({
      fillColor: isDark ? "#60a5fa" : "#3b82f6",
      color: isDark ? "#1d4ed8" : "#1e40af",
    });
  });
};

onMounted(initMap);
watch(() => colorMode.value, updateMapStyle);
</script>

<style>
/* Tooltip styling */
.light-tooltip,
.dark-tooltip {
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  pointer-events: none;
}

.light-tooltip {
  background: white;
  border: 1px solid #3b82f6;
  color: #1e40af;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.dark-tooltip {
  background: #2f3249;
  border: 1px solid #60a5fa;
  color: #e2e8f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Popup styling */
.leaflet-popup-content-wrapper {
  @apply dark:bg-dark-card dark:text-dark-text-primary;
  border-radius: 8px;
}

.leaflet-popup-content {
  margin: 8px 12px;
}

.leaflet-popup-tip {
  @apply dark:bg-dark-card;
}

/* Map controls */
.dark-map .leaflet-control {
  background-color: rgba(47, 50, 73, 0.9);
  color: #e2e8f0;
  border: 1px solid #3b3f58;
}
</style>
