<template>
  <auth-layout>
    <report-nav-bar />
    <n-scrollbar style="max-height: 100vh">
      <div style="width: 60%; margin: 15px auto">
        <report-chart />
      </div>
    </n-scrollbar>
  </auth-layout>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import ReportNavBar from "@/components/report/navbar/ReportNavBar.vue";
import { LOAD_REPORT_PAGE } from "@/store/action-types";
import { useStore } from "vuex";
import ReportChart from "../components/report/ReportChart.vue";

export default defineComponent({
  name: "Report",
  components: { AuthLayout, ReportNavBar, ReportChart },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch(LOAD_REPORT_PAGE);
    });

    store.watch(
      (state) => state.report.currentUrl,
      (url) => {
        if (url !== "") window.location = url;
      }
    );
  },
});
</script>
<style lang=""></style>
