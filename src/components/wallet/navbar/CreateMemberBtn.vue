<template>
  <n-button color="green" ghost strong round @click="showModal = true">
    <template #icon>
      <n-icon>
        <add-round />
      </n-icon>
    </template>
    Create member
  </n-button>
</template>
<script>
import { defineComponent, ref } from "vue";
import { AddRound } from "@vicons/material";

export default defineComponent({
  name: "CreateMemberBtn",
  components: { AddRound },
  setup() {
    const showModal = ref(false);

    return { showModal };
  },
});
</script>
