import { LOGOUT_SUCCESS, PUSH_MESSAGE, AUTH_SUCCESS } from "../mutation-types";
import axios from "@/utils/axios";
import { Commit } from "vuex";
import { GET_ME, LOGIN, LOGOUT, SIGNUP } from "../action-types";
import { MessageType } from "@/constants";

export interface IAuthState {
  isAuth: boolean;
  name: string | null;
  id: number | null;
  email: string | null;
}

export const initialAuthState = {
  isAuth: false,
  name: null,
  id: null,
  email: null,
};

// <----payload---->
interface IUserPayload {
  id: number;
  name: string;
  email: string;
}

interface ILoginPayload {
  email: string;
  password: string;
}

interface ISignupPayload {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}

export const auth = {
  state: (): IAuthState => initialAuthState,
  mutations: {
    [AUTH_SUCCESS](state: IAuthState, _data: IUserPayload): void {
      state.isAuth = true;
      state.name = _data.name;
      state.id = _data.id;
      state.email = _data.email;
    },
    [LOGOUT_SUCCESS](state: IAuthState): void {
      state = { ...initialAuthState };
    },
  },
  actions: {
    /**
     * login function
     * set token to the local storage
     *
     */
    async [LOGIN](
      { commit }: { commit: Commit },
      payload: ILoginPayload
    ): Promise<void> {
      try {
        const res = await axios.post("/login", { ...payload });
        commit(AUTH_SUCCESS, res.data.data.user);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Login successfully",
        });
        localStorage.setItem("token", res.data.data.token);
      } catch (error: any) {
        const errorData = error.response.data;
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: errorData.data.message,
        });
      }
    },

    /**
     * signup function
     * set token to the local storage
     *
     */
    async [SIGNUP](
      { commit }: { commit: Commit },
      payload: ISignupPayload
    ): Promise<void> {
      try {
        const res = await axios.post("/signup", { ...payload });
        commit(AUTH_SUCCESS, res.data.data.user);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Signup successfully",
        });
      } catch (error: any) {
        const errorData = error.response.data;
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: errorData.data.message,
        });
      }
    },

    /**
     * logout function
     * remove token from the local storage
     *
     */
    [LOGOUT]({ commit }: { commit: Commit }): void {
      localStorage.removeItem("token");
      commit(LOGOUT_SUCCESS);
    },

    /**
     * authenticate by existed token
     *
     */
    async [GET_ME]({ commit }: { commit: Commit }): Promise<void> {
      try {
        const res = await axios.get("/me");
        commit(AUTH_SUCCESS, res.data.data.user);
      } catch (error) {
        commit(LOGOUT_SUCCESS);
      }
    },
  },
};
