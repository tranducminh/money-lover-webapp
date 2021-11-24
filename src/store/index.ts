import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { message } from "./modules/message";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    auth,
    message,
  },
});
