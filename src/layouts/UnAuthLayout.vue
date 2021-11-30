<template>
  <layout>
    <Header />
    <slot></slot>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Layout from "./Layout.vue";
import Header from "@/components/Header.vue";
import { onBeforeMount } from "vue";
import router from "@/router";
import { useStore } from "vuex";
import { GET_ME } from "@/store/action-types";

export default defineComponent({
  name: "UnAuthLayout",
  components: { Layout, Header },
  setup() {
    const store = useStore();

    onBeforeMount(async () => {
      await store.dispatch(GET_ME);
      if (store.state.auth.isAuth) router.push("/");
    });

    store.watch(
      (state) => state.auth.isAuth,
      (isAuth) => {
        if (isAuth) router.push("/");
      }
    );
  },
});
</script>
