<template>
  <slot></slot>
</template>
<script lang="ts">
import { Type } from "@/store/modules/message";
import { useMessage } from "naive-ui";
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Layout",
  setup() {
    const store = useStore();
    const modal = useMessage();

    store.watch(
      (state) => state.message.id,
      () => {
        const message = store.state.message;
        switch (message.type) {
          case Type.ERROR:
            modal.error(message.content);
            break;
          case Type.SUCCESS:
            modal.success(message.content);
            break;
          case Type.INFO:
            modal.info(message.content);
            break;
          case Type.WARNING:
            modal.warning(message.content);
            break;
          default:
            break;
        }
      }
    );
  },
});
</script>
<style lang=""></style>
