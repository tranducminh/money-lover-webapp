<template>
  <un-auth-layout>
    <div class="container">
      <div style="text-align: center">
        <p class="title">Signup</p>
      </div>
      <n-grid x-gap="35" :cols="2">
        <n-grid-item>
          <img style="max-width: 100%" src="../assets/login.svg" />
        </n-grid-item>
        <n-grid-item>
          <n-form :model="data" ref="formRef" :rules="rules">
            <n-form-item path="email" label="Email">
              <n-input
                v-model:value="data.email"
                @keydown.enter.prevent
                placeholder="Email"
              />
            </n-form-item>
            <n-form-item path="name" label="Name">
              <n-input
                v-model:value="data.name"
                @keydown.enter.prevent
                placeholder="Name"
              />
            </n-form-item>
            <n-form-item path="password" label="Password">
              <n-input
                v-model:value="data.password"
                type="password"
                @keydown.enter.prevent
                placeholder="Password"
              />
            </n-form-item>
            <n-form-item
              path="passwordConfirmation"
              label="Password confirmation"
            >
              <n-input
                v-model:value="data.passwordConfirmation"
                type="password"
                @keydown.enter.prevent
                placeholder="Password confirmation"
              />
            </n-form-item>
            <n-row :gutter="[0, 24]">
              <n-col :span="24">
                <div style="display: flex; justify-content: center">
                  <n-button @click="handleSignup" round type="primary">
                    <p class="bold">Signup</p>
                  </n-button>
                </div>
              </n-col>
            </n-row>
          </n-form>
        </n-grid-item>
      </n-grid>
    </div>
  </un-auth-layout>
</template>
<script lang="ts">
import UnAuthLayout from "@/layouts/UnAuthLayout.vue";
import { SIGNUP } from "@/store/action-types";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Signup",
  components: { UnAuthLayout },
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const data = ref({
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    });

    return {
      formRef,
      data,
      rules: {
        email: [
          {
            required: true,
            validator(rule: any, value: string) {
              if (!value) {
                return new Error("Email is required");
              }
              return true;
            },
            trigger: ["input", "blur"],
          },
        ],
        name: [
          {
            required: true,
            validator(rule: any, value: string) {
              if (!value) {
                return new Error("Name is required");
              }
              return true;
            },
            trigger: ["input", "blur"],
          },
        ],
        password: [
          {
            required: true,
            validator(rule: any, value: string) {
              if (!value) {
                return new Error("Password is required");
              }
              return true;
            },
            trigger: ["input", "blur"],
          },
        ],
        passwordConfirmation: [
          {
            required: true,
            validator(rule: any, value: string) {
              if (!value) {
                return new Error("Password confirmation is required");
              }
              return true;
            },
            trigger: ["input", "blur"],
          },
        ],
      },
      handleSignup(e: any) {
        e.preventDefault();
        store.dispatch(SIGNUP, data.value);
      },
    };
  },
});
</script>
<style lang="css" scoped>
.container {
  max-width: 60%;
  margin: 0 auto;
}
.title {
  font-size: 40px;
  font-weight: bold;
}
</style>
