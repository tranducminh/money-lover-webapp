<template>
  <auth-layout>
    <wallet-nav-bar />
    <n-scrollbar style="max-height: 100vh" v-if="walletTab == 'transaction'">
      <wallet-transaction />
    </n-scrollbar>
    <n-scrollbar style="max-height: 100vh" v-if="walletTab == 'member'">
      <wallet-member />
    </n-scrollbar>
  </auth-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from "vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import WalletNavBar from "@/components/wallet/navbar/WalletNavBar.vue";
import WalletTransaction from "@/components/wallet/transaction/WalletTransaction.vue";
import WalletMember from "@/components/wallet/member/WalletMember.vue";
import { useStore } from "vuex";
import { LOAD_WALLET_PAGE } from "@/store/action-types";

export default defineComponent({
  name: "Wallet",
  components: {
    AuthLayout,
    WalletNavBar,
    WalletTransaction,
    WalletMember,
  },
  setup() {
    const store = useStore();

    const walletTab = computed(() => store.state.walletTab);

    onBeforeMount(() => {
      store.dispatch(LOAD_WALLET_PAGE);
    });

    return { walletTab };
  },
});
</script>
