<template>
  <router-link to="/" style="display: block">
    <div class="logo">
      <n-icon size="40" color="#18a058">
        <account-balance-wallet-outlined />
      </n-icon>
      <span class="logo-text">Money Lover</span>
    </div>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { AccountBalanceWalletOutlined } from "@vicons/material";

export default defineComponent({
  name: "Logo",
  components: { AccountBalanceWalletOutlined },
});
</script>
<style scoped>
.logo {
  display: flex;
  align-items: center;
}
.logo-text {
  color: #18a058;
  font-size: 25px;
  font-weight: bold;
}
</style>
