import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  create,
  NButton,
  NSpace,
  NForm,
  NFormItem,
  NInput,
  NRow,
  NCol,
  NGrid,
  NGi,
  NGridItem,
  NImage,
  NLayout,
  NLayoutSider,
  NMenu,
  NIcon,
} from "naive-ui";
import "vfonts/Lato.css";

const naive = create({
  components: [
    NButton,
    NSpace,
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NGrid,
    NGi,
    NGridItem,
    NImage,
    NLayout,
    NLayoutSider,
    NMenu,
    NIcon,
  ],
});

createApp(App).use(store).use(router).use(naive).mount("#app");
