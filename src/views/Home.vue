<template>
  <auth-layout></auth-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthLayout from "../layouts/AuthLayout.vue";

export default defineComponent({
  name: "Home",
  components: {
    AuthLayout,
  },
});
</script>
