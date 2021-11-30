<template>
  <n-card title="Transactions" style="width: 50%; margin: 30px auto">
    <template #header-extra>
      <n-date-picker
        v-model:value="date"
        type="month"
        @update:value="onDateChange"
      />
    </template>
    <n-row style="border-bottom: 1px solid #efeff4; margin-bottom: 30px">
      <n-col :span="12">
        <n-statistic label="Inflow">
          +{{ formatter.format(transactionFlow.inflow) }}
        </n-statistic>
      </n-col>
      <n-col :span="12">
        <n-statistic label="Outflow">{{
          formatter.format(transactionFlow.outflow)
        }}</n-statistic>
      </n-col>
    </n-row>

    <n-space
      vertical
      style="margin-bottom: 20px"
      v-for="transaction in transactionFlow.transactions"
      v-bind:key="transaction.date"
    >
      <n-space
        justify="space-between"
        style="border: 1px solid #efeff4; padding: 10px 20px"
      >
        <div style="font-size: 18px; font-weight: bold">
          {{ transaction.date }}
        </div>
        <div
          style="font-size: 18px; font-weight: bold"
          v-if="transaction.total < 0"
        >
          {{ formatter.format(transaction.total) }}
        </div>
        <div style="font-size: 18px; font-weight: bold" v-else>
          +{{ formatter.format(transaction.total) }}
        </div>
      </n-space>
      <n-space
        justify="space-between"
        style="border: 1px solid #efeff4; padding: 0 20px"
        v-for="item in transaction.items"
        v-bind:key="item.id"
        class="transaction-item"
        @click="onShowTransaction(item)"
      >
        <p>{{ item.category.name }}</p>
        <p v-if="item.amount < 0">
          {{ formatter.format(item.amount) }}
        </p>
        <p v-else>+{{ formatter.format(item.amount) }}</p>
      </n-space>
    </n-space>
  </n-card>

  <n-modal
    v-model:show="showTransactionModal"
    preset="dialog"
    title="Create wallet"
  >
    <template #header>
      <div>Transaction detail</div>
    </template>
    <div>
      <n-grid x-gap="12" y-gap="12" :cols="3">
        <n-gi> Date: </n-gi>
        <n-gi> {{ currentTransaction.date }} </n-gi>
        <n-gi />
        <n-gi> Type: </n-gi>
        <n-gi> {{ currentTransaction.category.name }} </n-gi>
        <n-gi />
        <n-gi> Amount: </n-gi>
        <n-gi> {{ formatter.format(currentTransaction.amount) }} </n-gi>
        <n-gi />
        <n-gi v-if="currentTransaction.debt_exp"> Expiration: </n-gi>
        <n-gi v-if="currentTransaction.debt_exp">
          {{ currentTransaction.debt_exp }}
        </n-gi>
        <n-gi v-if="currentTransaction.debt_exp" />
        <n-gi> Note: </n-gi>
        <n-gi> {{ currentTransaction.note }} </n-gi>
      </n-grid>
    </div>
    <template #action v-if="!isFreezedWallet">
      <div>
        <edit-transaction-btn :transaction="currentTransaction" />
        <n-popconfirm @positive-click="onDeleteTransaction">
          <template #trigger>
            <n-button ghost color="red">Delete</n-button>
          </template>
          <div>Are you sure to delete this transaction?</div>
        </n-popconfirm>
      </div>
    </template>
  </n-modal>
</template>
<script lang="ts">
import {
  DELETE_TRANSACTION,
  GET_ALL_TRANSACTION,
  SET_CURRENT_TRANSACTION,
} from "@/store/action-types";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { formatCurrency } from "@/utils/index";
import { TRANSACTION_LIST_BY_DATE } from "@/store/getter-types";
import { ITransaction } from "@/store/entity.interface";
import EditTransactionBtn from "./EditTransactionBtn.vue";

export default defineComponent({
  name: "WalletTransaction",
  components: { EditTransactionBtn },
  setup() {
    const store = useStore();

    const transactionFlow = computed(
      () => store.getters[TRANSACTION_LIST_BY_DATE]
    );
    const currentTransaction = computed(
      () => store.state.transaction.currentTransaction
    );
    const isFreezedWallet = computed(
      () => store.state.wallet.currentWallet?.is_freezed
    );

    const showTransactionModal = ref(false);
    const date = ref(new Date().getTime());

    const onDateChange = (value: number | null) => {
      if (value)
        store.dispatch(GET_ALL_TRANSACTION, {
          month: new Date(value).getMonth() + 1,
          year: new Date(value).getFullYear(),
        });
    };

    const onShowTransaction = (item: ITransaction) => {
      store.dispatch(SET_CURRENT_TRANSACTION, item);
      showTransactionModal.value = true;
    };

    const onDeleteTransaction = () => {
      store.dispatch(DELETE_TRANSACTION);
      showTransactionModal.value = false;
    };

    return {
      transactionFlow,
      currentTransaction,
      date,
      showTransactionModal,
      formatter: formatCurrency,
      isFreezedWallet,
      onDateChange,
      onShowTransaction,
      onDeleteTransaction,
    };
  },
});
</script>
<style lang="css" scoped>
.transaction-item:hover {
  cursor: pointer;
  background-color: #f7f7f7;
}
</style>
