import {
  LOGIN_SUCCESS,
  LOGOUT,
  PUSH_MESSAGE,
  SIGNUP_SUCCESS,
} from "../mutation-types";
import axios from "@/utils/axios";
import { Type } from "./message";

interface AuthState {
  isAuth: boolean;
  name: string | null;
  id: number | null;
  email: string | null;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}

export const auth = {
  state: (): AuthState => ({
    isAuth: true,
    name: null,
    id: null,
    email: null,
  }),
  mutations: {
    [LOGIN_SUCCESS](state: AuthState, _data: UserData): void {
      state.isAuth = true;
      state.name = _data.name;
      state.id = _data.id;
      state.email = _data.email;
    },
    [SIGNUP_SUCCESS](state: AuthState, _data: UserData): void {
      state.isAuth = true;
      state.name = _data.name;
      state.id = _data.id;
      state.email = _data.email;
    },
    [LOGOUT](state: AuthState): void {
      state.isAuth = false;
      state.name = null;
      state.email = null;
      state.id = null;
    },
  },
  actions: {
    login(context: any, _data: LoginPayload): void {
      axios
        .post("/login", { ..._data })
        .then((res) => {
          context.commit(LOGIN_SUCCESS, res.data.data.user);
          context.commit(PUSH_MESSAGE, {
            type: Type.SUCCESS,
            content: "Login successfully",
          });
          localStorage.setItem("token", res.data.data.token);
        })
        .catch((error) => {
          const errorData = error.response.data;
          context.commit(PUSH_MESSAGE, {
            type: Type.ERROR,
            content: errorData.data.message,
          });
        });
    },
    signup(context: any, _data: SignupPayload): void {
      axios
        .post("/signup", { ..._data })
        .then((res) => {
          context.commit(SIGNUP_SUCCESS, res.data.data.user);
          context.commit(PUSH_MESSAGE, {
            type: Type.SUCCESS,
            content: "Signup successfully",
          });
        })
        .catch((error) => {
          const errorData = error.response.data;
          context.commit(PUSH_MESSAGE, {
            type: Type.ERROR,
            content: errorData.data.message,
          });
        });
    },
    logout(context: any): void {
      localStorage.removeItem("token");
      context.commit(LOGOUT);
    },
  },
  getters: {},
};
