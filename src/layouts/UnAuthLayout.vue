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

export default defineComponent({
  name: "UnAuthLayout",
  components: { Layout, Header },
});
</script>
