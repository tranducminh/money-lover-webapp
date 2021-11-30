<template>
  <n-space
    justify="space-between"
    style="padding: 10px 30px; border-bottom: 1px solid #efeff4"
  >
    <n-space align="center" v-if="existCurrentWallet">
      <select-wallet-btn />
      <option-btn v-if="isOwner" />
    </n-space>
    <n-space v-else>
      <create-wallet-btn v-if="isTransactionTab" />
    </n-space>
    <n-radio-group
      :value="walletTab"
      name="walletTab"
      v-if="existCurrentWallet"
      @update:value="onChangeTab"
    >
      <n-radio-button
        :key="WalletTab.TRANSACTION"
        :value="WalletTab.TRANSACTION"
      >
        Transactions
      </n-radio-button>
      <n-radio-button :key="WalletTab.MEMBER" :value="WalletTab.MEMBER">
        Members
      </n-radio-button>
    </n-radio-group>
    <n-space v-if="existCurrentWallet">
      <create-transaction-btn v-if="isTransactionTab && !isObserver" />
      <create-member-btn v-if="isMemberTab && !isObserver" />
    </n-space>
  </n-space>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import OptionBtn from "./OptionBtn.vue";
import CreateTransactionBtn from "./CreateTransactionBtn.vue";
import CreateWalletBtn from "./CreateWalletBtn.vue";
import CreateMemberBtn from "./CreateMemberBtn.vue";
import SelectWalletBtn from "../../SelectWalletBtn.vue";
import { useStore } from "vuex";
import { UPDATE_WALLET_TAB } from "@/store/action-types";
import { UserRole, WalletTab } from "@/constants";

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
    const isOwner = computed(() => currentWallet.value?.role == UserRole.OWNER);
    const isObserver = computed(
      () => currentWallet.value?.role == UserRole.OBSERVER
    );
    const isTransactionTab = computed(
      () => walletTab.value == WalletTab.TRANSACTION
    );
    const isMemberTab = computed(() => walletTab.value == WalletTab.MEMBER);
    const existCurrentWallet = computed(() => currentWallet.value?.id);

    const onChangeTab = (value: string) => {
      store.dispatch(UPDATE_WALLET_TAB, value);
    };

    return {
      wallets,
      isOwner,
      isObserver,
      isTransactionTab,
      isMemberTab,
      existCurrentWallet,
      walletTab,
      UserRole,
      WalletTab,
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
