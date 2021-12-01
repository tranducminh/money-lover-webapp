<template>
  <LineChart :chartData="inflowData" :options="inflowOptions" />
  <n-divider />
  <LineChart :chartData="outflowData" :options="outflowOptions" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useStore } from "vuex";
import { TRANSACTION_LIST_FOR_REPORT } from "@/store/getter-types";
import { ITransactionForReport } from "@/store/entity.interface";

export default defineComponent({
  name: "Home",
  components: { LineChart },
  setup() {
    Chart.register(...registerables);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const randomColor = require("randomcolor");
    const store = useStore();

    const transactions = computed(
      () => store.getters[TRANSACTION_LIST_FOR_REPORT]
    );

    const inflowOptions = ref({
      responsive: true,
      plugins: {
        legend: false,
        title: {
          display: true,
          text: "Inflow Chart",
        },
      },
    });

    const outflowOptions = ref({
      responsive: true,
      plugins: {
        legend: false,
        title: {
          display: true,
          text: "Outflow Chart",
        },
      },
    });

    const inflowData = computed(() => {
      const labels = transactions.value.map(
        (item: ITransactionForReport) => item.date
      );
      const data = transactions.value.map(
        (item: ITransactionForReport) => item.inflow
      );
      const backgroundColor = randomColor({
        count: 10,
        hue: "green",
      });
      return {
        labels: labels.reverse(),
        datasets: [
          { data: data.reverse(), backgroundColor: backgroundColor.reverse() },
        ],
      };
    });

    const outflowData = computed(() => {
      const labels = transactions.value.map(
        (item: ITransactionForReport) => item.date
      );
      const data = transactions.value.map(
        (item: ITransactionForReport) => item.outflow
      );
      const backgroundColor = randomColor({
        count: 10,
        hue: "red",
      });
      return {
        labels: labels.reverse(),
        datasets: [
          { data: data.reverse(), backgroundColor: backgroundColor.reverse() },
        ],
      };
    });

    return { inflowData, outflowData, outflowOptions, inflowOptions };
  },
});
</script>
