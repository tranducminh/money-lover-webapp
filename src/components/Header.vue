<template>
  <div class="header-container">
    <div class="header">
      <n-grid x-gap="12" :cols="3">
        <n-gi>
          <logo />
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi class="flex-end" v-if="!isAuth">
          <router-link to="/signup" style="display: block">
            <div class="logo">
              <n-icon size="20" color="#18a058">
                <edit-note-outlined />
              </n-icon>
              <span class="logo-text">Signup</span>
            </div>
          </router-link>
          <router-link to="/login" style="display: block">
            <div class="logo">
              <n-icon size="20" color="#18a058">
                <log-in-outlined />
              </n-icon>
              <span class="logo-text">Login</span>
            </div>
          </router-link>
        </n-gi>
        <n-gi class="flex-end" v-if="isAuth">
          <div class="logo">
            <n-icon size="20" color="#18a058">
              <account-circle-outlined />
            </n-icon>
            <span class="logo-text">{{ name }}</span>
          </div>
          <div class="logo">
            <n-button text color="#18a058" @click="logout">
              <template #icon>
                <n-icon size="20" color="#18a058">
                  <log-out-outlined />
                </n-icon>
              </template>
              Logout
            </n-button>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Logo from "./Logo.vue";
import {
  LogInOutlined,
  EditNoteOutlined,
  LogOutOutlined,
  AccountCircleOutlined,
} from "@vicons/material";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      isAuth: computed(() => store.state.auth.isAuth),
      name: computed(() => store.state.auth.name),
      logout() {
        store.dispatch("logout");
        router.push("/login");
      },
    };
  },

  components: {
    Logo,
    LogInOutlined,
    EditNoteOutlined,
    LogOutOutlined,
    AccountCircleOutlined,
  },
});
</script>

<style scoped>
.header-container {
  width: 100%;
  border-bottom: 1px solid #efeff4;
}
.header {
  padding: 10px 30px;
  width: 80%;
  margin: 0 auto;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.logo {
  display: flex;
  margin-left: 30px;
  align-items: center;
}
.logo-text {
  color: #18a058;
  font-size: 15px;
  font-weight: bold;
  margin-left: 5px;
}
</style>
