<template>
  <n-button ghost color="green" @click="onClickBtn">Add wallet</n-button>
  <n-modal v-model:show="showModal" preset="dialog" title="Create wallet">
    <template #header>
      <div>Create wallet</div>
    </template>
    <n-form :model="data" ref="formRef" :rules="rules">
      <n-form-item path="team_id" label="Team">
        <n-select v-model:value="data.team_id" :options="options" />
      </n-form-item>
      <n-form-item path="name" label="Name">
        <n-input
          v-model:value="data.name"
          @keydown.enter.prevent
          placeholder="Name"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <div>
        <n-button ghost color="green" @click="handleSubmit">Submit</n-button>
      </div>
    </template>
  </n-modal>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { TEAM_LIST_BY_OPTION } from "@/store/getter-types";
import { CREATE_WALLET, GET_ALL_TEAM } from "@/store/action-types";

export default defineComponent({
  name: "CreateWalletBtn",
  setup() {
    const store = useStore();
    const options = computed(() => store.getters[TEAM_LIST_BY_OPTION]);

    const data = ref({
      team_id: null,
      name: null,
    });
    const showModal = ref(false);

    const onClickBtn = () => {
      showModal.value = true;
      store.dispatch(GET_ALL_TEAM);
    };

    const handleSubmit = (e: any) => {
      e.preventDefault();
      store.dispatch(CREATE_WALLET, data.value);
      data.value = {
        team_id: null,
        name: null,
      };
      showModal.value = false;
    };

    return {
      showModal,
      options,
      data,
      onClickBtn,
      handleSubmit,
    };
  },
});
</script>
