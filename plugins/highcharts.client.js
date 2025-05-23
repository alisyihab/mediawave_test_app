import { defineNuxtPlugin } from "#app";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";

if (typeof HighchartsMap === "function") {
  HighchartsMap(Highcharts);
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("Highcharts", Highcharts);
});
