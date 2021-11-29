<template>
  <n-space
    justify="space-between"
    style="padding: 10px 30px; border-bottom: 1px solid #efeff4"
  >
    <n-space align="center" v-if="currentWallet?.id">
      <select-wallet-btn />
      <option-btn />
    </n-space>
    <n-space v-else>
      <create-wallet-btn v-if="walletTab == 'transaction'" />
    </n-space>
    <n-radio-group
      :value="walletTab"
      name="walletTab"
      v-if="currentWallet?.id"
      @update:value="onChangeTab"
    >
      <n-radio-button key="transaction" value="transaction">
        Transactions
      </n-radio-button>
      <n-radio-button v-if="currentWallet?.id" key="member" value="member">
        Members
      </n-radio-button>
    </n-radio-group>
    <n-space v-if="currentWallet?.id">
      <create-transaction-btn v-if="walletTab == 'transaction'" />
      <create-member-btn v-else />
    </n-space>
  </n-space>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import OptionBtn from "./OptionBtn.vue";
import CreateTransactionBtn from "./CreateTransactionBtn.vue";
import CreateWalletBtn from "./CreateWalletBtn.vue";
import CreateMemberBtn from "./CreateMemberBtn.vue";
import SelectWalletBtn from "./SelectWalletBtn.vue";
import { useStore } from "vuex";
import { UPDATE_WALLET_TAB } from "@/store/action-types";

export default defineComponent({
  name: "WalletNavBar",
  components: {
    CreateTransactionBtn,
    CreateWalletBtn,
    SelectWalletBtn,
    CreateMemberBtn,
    OptionBtn,
  },
  setup() {
    const store = useStore();

    const wallets = computed(() => store.state.wallet.list);
    const currentWallet = computed(() => store.state.wallet.currentWallet);
    const walletTab = computed(() => store.state.walletTab);

    const onChangeTab = (value: string) => {
      store.dispatch(UPDATE_WALLET_TAB, value);
    };

    return {
      wallets,
      currentWallet,
      walletTab,
      onChangeTab,
    };
  },
});
</script>

<style scoped>
.n-radio-button--checked {
  background-color: #18a058 !important;
  color: #ffffff !important;
}
</style>
