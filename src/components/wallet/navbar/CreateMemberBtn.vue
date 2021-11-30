<template>
  <n-button color="green" ghost strong round @click="showModal = true">
    <template #icon>
      <n-icon>
        <add-round />
      </n-icon>
    </template>
    Create member
  </n-button>
  <n-modal v-model:show="showModal" preset="dialog" title="Add new member">
    <template #header>
      <div>Add new member</div>
    </template>
    <n-form :model="data" ref="formRef" :rules="rules">
      <n-form-item path="user_role" label="Role">
        <n-select v-model:value="data.user_role" :options="options" />
      </n-form-item>
      <n-form-item path="email" label="Email">
        <n-input v-model:value="data.email" @keydown.enter.prevent />
      </n-form-item>
    </n-form>
    <template #action>
      <div>
        <n-button ghost color="green" @click="handleSubmit">Submit</n-button>
      </div>
    </template>
  </n-modal>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { AddRound } from "@vicons/material";
import { useStore } from "vuex";
import { UserRole } from "@/constants";
import { CREATE_MEMBER } from "@/store/action-types";

export default defineComponent({
  name: "CreateMemberBtn",
  components: { AddRound },
  setup() {
    const store = useStore();
    const currentRole = computed(() => store.state.wallet.currentWallet?.role);

    const showModal = ref(false);
    const data = ref({ user_role: null, email: null });
    const createOptions = () => {
      if (currentRole.value == UserRole.MANAGER)
        return [
          {
            label: "Observer",
            value: UserRole.OBSERVER,
          },
        ];
      if (currentRole.value == UserRole.OWNER)
        return [
          {
            label: "Manager",
            value: UserRole.MANAGER,
          },
          {
            label: "Observer",
            value: UserRole.OBSERVER,
          },
        ];
      return [];
    };
    const options = computed(() => createOptions());

    const handleSubmit = () => {
      store.dispatch(CREATE_MEMBER, data.value);
      showModal.value = false;
      data.value = { user_role: null, email: null };
    };

    return { showModal, data, options, handleSubmit };
  },
});
</script>
