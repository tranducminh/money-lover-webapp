<template>
  <n-button
    color="#4e9ab9"
    style="margin-right: 10px"
    ghost
    strong
    @click="showModal = true"
  >
    Edit
  </n-button>
  <n-modal v-model:show="showModal" preset="dialog" title="Edit transaction">
    <template #header>
      <div>Edit transaction</div>
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
import { useStore } from "vuex";
import { CATEGORY_LIST_BY_OPTION } from "@/store/getter-types";
import { UPDATE_TRANSACTION } from "@/store/action-types";
import { CategoryType } from "@/constants";
import { ICategory } from "@/store/entity.interface";

export default defineComponent({
  name: "EditTransactionBtn",
  props: ["transaction"],
  setup(props) {
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

    const showModal = ref(false);
    const data = ref({
      category_id: props.transaction.category.id,
      amount: Math.abs(props.transaction.amount),
      note: props.transaction.note,
      date: new Date(props.transaction.date).getTime(),
      debt_exp: props.transaction.debt_exp
        ? new Date(props.transaction.debt_exp).getTime()
        : null,
    });
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
      store.dispatch(UPDATE_TRANSACTION, {
        ...data.value,
        date: new Date(data.value.date),
        debt_exp: data.value.debt_exp
          ? new Date(data.value.debt_exp || 0)
          : null,
      });
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
