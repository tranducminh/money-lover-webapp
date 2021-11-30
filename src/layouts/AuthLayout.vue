<template>
  <layout>
    <Header />
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        v-if="isAuth"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="23"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
        />
      </n-layout-sider>
      <n-layout>
        <slot></slot>
      </n-layout>
    </n-layout>
  </layout>
</template>
<script lang="ts">
import { h, ref, defineComponent, computed, onBeforeMount } from "vue";
import { NIcon } from "naive-ui";
import {
  BookmarkBorderFilled,
  AccountBalanceWalletOutlined,
  CollectionsBookmarkOutlined,
  AccountCircleOutlined,
} from "@vicons/material";
import { CaretDownOutline } from "@vicons/ionicons5";
import Header from "../components/Header.vue";
import { useStore } from "vuex";
import { RouterLink } from "vue-router";
import router from "@/router";
import Layout from "./Layout.vue";
import { GET_ME } from "@/store/action-types";

interface Option {
  label: string;
  key: string;
  href: string;
}
const menuOptions = [
  {
    label: "Transactions",
    key: "transactions",
    href: "/",
  },
  {
    label: "Reports",
    key: "reports",
    href: "/reports",
  },
  {
    label: "Account",
    key: "account",
    // href: "",
  },
] as Option[];

export default defineComponent({
  name: "AuthLayout",
  components: { Header, Layout },

  setup() {
    const store = useStore();

    store.watch(
      (state) => state.auth.isAuth,
      (isAuth) => {
        if (!isAuth) router.push("/login");
      }
    );

    onBeforeMount(async () => {
      await store.dispatch(GET_ME);
      if (!store.state.auth.isAuth) router.push("/login");
    });

    return {
      isAuth: computed(() => store.state.auth.isAuth),
      menuOptions,
      collapsed: ref(false),
      renderMenuLabel(option: any) {
        if ("href" in option) {
          return h(RouterLink, { to: option.href }, option.label);
        }
        return option.label;
      },
      renderMenuIcon(option: Option) {
        if (option.key === "transactions")
          return h(NIcon, null, {
            default: () => h(AccountBalanceWalletOutlined),
          });
        if (option.key === "reports")
          return h(NIcon, null, {
            default: () => h(CollectionsBookmarkOutlined),
          });
        if (option.key === "account")
          return h(NIcon, null, { default: () => h(AccountCircleOutlined) });
        return h(NIcon, null, { default: () => h(BookmarkBorderFilled) });
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
    };
  },
});
</script>
