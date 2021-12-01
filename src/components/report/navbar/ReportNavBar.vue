<template>
  <n-space
    justify="space-between"
    style="padding: 10px 30px; border-bottom: 1px solid #efeff4"
  >
    <n-space align="center" v-if="existCurrentWallet">
      <select-wallet-btn />
    </n-space>
    <n-date-picker
      v-model:value="date"
      type="month"
      @update:value="onDateChange"
    />
    <n-button color="green" ghost strong round @click="onExportReport">
      <template #icon>
        <n-icon>
          <import-export-filled />
        </n-icon>
      </template>
      Export report
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import SelectWalletBtn from "../../SelectWalletBtn.vue";
import { useStore } from "vuex";
import { GET_ALL_TRANSACTION, GET_REPORT } from "@/store/action-types";
import { ImportExportFilled } from "@vicons/material";

export default defineComponent({
  name: "ReportNavBar",
  components: { SelectWalletBtn, ImportExportFilled },
  setup() {
    const store = useStore();

    const currentWallet = computed(() => store.state.wallet.currentWallet);
    const existCurrentWallet = computed(() => currentWallet.value?.id);

    const date = ref(new Date().getTime());

    const onDateChange = (value: number | null) => {
      if (value)
        store.dispatch(GET_ALL_TRANSACTION, {
          month: new Date(value).getMonth() + 1,
          year: new Date(value).getFullYear(),
        });
    };

    const onExportReport = () => {
      store.dispatch(GET_REPORT);
    };

    return {
      existCurrentWallet,
      date,
      onDateChange,
      onExportReport,
    };
  },
});
</script>
