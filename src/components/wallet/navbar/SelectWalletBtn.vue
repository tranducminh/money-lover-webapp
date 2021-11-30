<template>
  <n-button @click="activate(menuOptions)" dashed>
    <template #icon>
      <n-icon>
        <account-balance-wallet-outlined />
      </n-icon>
    </template>
    <p style="font-weight: bold; margin-right: 5px">
      {{ currentWallet.name }}/
    </p>
    <p
      style="color: green; font-weight: bold; margin-right: 5px"
      v-if="currentWallet.total > 0"
    >
      +{{ formatter.format(currentWallet.total) }}
    </p>
    <p
      style="color: red; font-weight: bold; margin-right: 5px"
      v-else-if="currentWallet.total < 0"
    >
      {{ formatter.format(currentWallet.total) }}
    </p>
    <p style="font-weight: bold; margin-right: 5px" v-else>
      {{ formatter.format(currentWallet.total) }}
    </p>
    <n-icon>
      <keyboard-arrow-down-filled />
    </n-icon>
  </n-button>

  <n-drawer v-model:show="active" :width="502" placement="right">
    <n-drawer-content>
      <template #header>
        <p>Select wallets</p>
      </template>
      <n-space vertical>
        <div v-for="team in teams" :key="team.name">
          <p>{{ team.name }}</p>
          <n-space vertical style="padding-left: 20px">
            <n-space
              v-for="wallet in team.wallets"
              :key="wallet.id"
              class="wallet-option"
              :class="{ active: wallet.id === currentWallet.id }"
              @click="onSelectWallet(wallet.id)"
            >
              <n-icon size="20">
                <account-balance-wallet-outlined />
              </n-icon>
              {{ wallet.name }}
            </n-space>
          </n-space>
        </div>
      </n-space>
      <n-space justify="flex-end" style="margin-top: 20px">
        <create-wallet-btn />
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import {
  AccountBalanceWalletOutlined,
  KeyboardArrowDownFilled,
} from "@vicons/material";
import { useStore } from "vuex";
import CreateWalletBtn from "./CreateWalletBtn.vue";
import { LOAD_WALLET_PAGE, SET_CURRENT_WALLET } from "@/store/action-types";
import { formatCurrency } from "@/utils";
import { WALLET_LIST_TEAM_NAME } from "@/store/getter-types";

export default defineComponent({
  name: "SelectWalletBtn",
  components: {
    AccountBalanceWalletOutlined,
    KeyboardArrowDownFilled,
    CreateWalletBtn,
  },
  setup() {
    const store = useStore();

    const teams = computed(() => store.getters[WALLET_LIST_TEAM_NAME]);
    const wallets = computed(() => store.state.wallet.list);
    const currentWallet = computed(() => store.state.wallet.currentWallet);

    const active = ref(false);

    const activate = () => {
      active.value = true;
    };

    const onSelectWallet = (walletId: number) => {
      store.dispatch(SET_CURRENT_WALLET, walletId);
      store.dispatch(LOAD_WALLET_PAGE);
      active.value = false;
    };

    return {
      active,
      teams,
      wallets,
      currentWallet,
      formatter: formatCurrency,
      onSelectWallet,
      activate,
    };
  },
});
</script>

<style scoped>
.wallet-option {
  padding: 5px;
  border: 1px solid #ffffff;
  padding-left: 20px;
  align-items: center;
  margin-bottom: 5px !important;
}
.wallet-option:hover {
  cursor: pointer;
  border: 1px solid #18a058;
  border-radius: 10px;
  color: #18a058;
}
.active {
  border: 1px solid #18a058;
  border-radius: 10px;
  color: #18a058;
}
</style>
