<template>
  <n-button
    color="green"
    ghost
    strong
    round
    @click="showModal = true"
    :disabled="isFreezed"
  >
    <template #icon>
      <n-icon>
        <add-round />
      </n-icon>
    </template>
    Create transaction
  </n-button>
  <n-modal v-model:show="showModal" preset="dialog" title="Add new transaction">
    <template #header>
      <div>Create transaction</div>
    </template>
    <n-form :model="data" ref="formRef" :rules="rules">
      <n-form-item path="date" label="Date">
        <n-date-picker v-model:value="data.date" type="date" clearable />
      </n-form-item>
      <n-form-item path="category_id" label="Category">
        <n-select v-model:value="data.category_id" :options="options" />
      </n-form-item>
      <n-form-item path="debt" label="Debt expiration" v-if="showDebtExp">
        <n-date-picker v-model:value="data.debt_exp" type="date" clearable />
      </n-form-item>
      <n-form-item path="amount" label="Amount">
        <n-input-number
          v-model:value="data.amount"
          step="5"
          keydown.enter.prevent
          placeholder="Amount"
        >
          <template #prefix>$</template>
        </n-input-number>
      </n-form-item>
      <n-form-item path="note" label="Note">
        <n-input
          v-model:value="data.note"
          @keydown.enter.prevent
          placeholder="Note"
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: center">
            <n-button
              @click="handleSubmit"
              type="primary"
              :disabled="
                data.category_id == null ||
                data.amount == null ||
                data.date == null
              "
            >
              <p class="bold">Submit</p>
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-modal>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { AddRound } from "@vicons/material";
import { useStore } from "vuex";
import { CATEGORY_LIST_BY_OPTION } from "@/store/getter-types";
import { CREATE_TRANSACTION } from "@/store/action-types";
import { CategoryType } from "@/constants";
import { ICategory } from "@/store/entity.interface";

export default defineComponent({
  name: "CreateTransactionBtn",
  components: { AddRound },
  setup() {
    const store = useStore();

    const isFreezed = computed(
      () => store.state.wallet.currentWallet.is_freezed
    );
    const options = computed(() => store.getters[CATEGORY_LIST_BY_OPTION]);
    const showDebtExp = computed(() => {
      const category = store.state.category.list.find(
        (item: ICategory) => item.id == data.value.category_id
      );
      return category && category.mainType === CategoryType.DEBT;
    });

    const data = ref({
      category_id: null,
      amount: null,
      note: "",
      date: new Date().getTime(),
      debt_exp: null,
    });
    const showModal = ref(false);
    const rules = {
      date: [
        {
          required: true,
          validator(rule: any, value: string) {
            if (!value) {
              return new Error("Date is required");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      category_id: [
        {
          required: true,
          validator(rule: any, value: number) {
            if (!value) {
              return new Error("Category is required");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      amount: [
        {
          required: true,
          validator(rule: any, value: string) {
            if (!value) {
              return new Error("Amount is required");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
    };

    const handleSubmit = (e: any) => {
      e.preventDefault();
      store.dispatch(CREATE_TRANSACTION, {
        ...data.value,
        date: new Date(data.value.date),
        debt_exp: data.value.debt_exp
          ? new Date(data.value.debt_exp || 0)
          : null,
      });
      data.value = {
        category_id: null,
        amount: null,
        note: "",
        date: new Date().getTime(),
        debt_exp: null,
      };
      showModal.value = false;
    };

    return {
      showModal,
      isFreezed,
      data,
      options,
      showDebtExp,
      rules,
      handleSubmit,
    };
  },
});
</script>
