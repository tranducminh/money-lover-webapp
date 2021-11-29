<template>
  <div id="container">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { MessageType } from "@/constants";
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
          case MessageType.ERROR:
            modal.error(message.content);
            break;
          case MessageType.SUCCESS:
            modal.success(message.content);
            break;
          case MessageType.INFO:
            modal.info(message.content);
            break;
          case MessageType.WARNING:
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
<style lang="css" scoped>
#container {
  height: 100vh;
}
</style>
