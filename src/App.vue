<template>
  <n-config-provider>
    <n-loading-bar-provider>
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
} from "naive-ui";

export default defineComponent({
  name: "App",
  components: { NLoadingBarProvider, NMessageProvider, NConfigProvider },
});
</script>

<style>
#app {
  font-family: "v-sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

label {
  font-weight: bold;
}

.bold {
  font-weight: bold;
}

a {
  text-decoration: none;
}
</style>
