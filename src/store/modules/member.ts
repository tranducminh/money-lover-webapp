import { IMember } from "../entity.interface";
import axios from "@/utils/axios";
import { CREATE_MEMBER, DELETE_MEMBER, GET_ALL_MEMBER } from "../action-types";
import { Commit, Dispatch } from "vuex";
import { RootState } from "..";
import {
  GET_ALL_MEMBER_SUCCESS,
  PUSH_MESSAGE,
  RESET_MEMBER_STATE_SUCCESS,
} from "../mutation-types";
import { MessageType } from "@/constants";

export interface IMemberState {
  list: IMember[];
}

export const initialMemberState = {
  list: [],
};

// <----payload---->
export interface ICreateMemberPayload {
  user_role: number;
  email: string;
}

export const member = {
  setup: (): IMemberState => initialMemberState,
  mutations: {
    [GET_ALL_MEMBER_SUCCESS](state: IMemberState, _data: IMember[]): void {
      state.list = [..._data];
    },
    [RESET_MEMBER_STATE_SUCCESS](state: IMemberState): void {
      state.list = [];
    },
  },
  actions: {
    /**
     * get all member of the current wallet
     *
     */
    async [GET_ALL_MEMBER]({
      commit,
      rootState,
    }: {
      commit: Commit;
      rootState: RootState;
    }): Promise<void> {
      try {
        const res = await axios.get(
          `/wallets/${rootState.wallet.currentWallet?.id}/members`
        );
        commit(GET_ALL_MEMBER_SUCCESS, res.data.data.members);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * add new member to the current wallet
     *
     */
    async [CREATE_MEMBER](
      {
        commit,
        dispatch,
        rootState,
      }: {
        commit: Commit;
        dispatch: Dispatch;
        rootState: RootState;
      },
      payload: ICreateMemberPayload
    ): Promise<void> {
      try {
        debugger;
        await axios.post(
          `/wallets/${rootState.wallet.currentWallet?.id}/members`,
          payload
        );
        dispatch(GET_ALL_MEMBER);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Create member successfully",
        });
      } catch (error: any) {
        const message = error.response.data.data?.message;
        debugger;
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: message,
        });
      }
    },

    /**
     * remove member to the current wallet
     *
     */
    async [DELETE_MEMBER](
      {
        commit,
        dispatch,
        rootState,
      }: {
        commit: Commit;
        dispatch: Dispatch;
        rootState: RootState;
      },
      _id: number
    ): Promise<void> {
      try {
        await axios.delete(
          `/wallets/${rootState.wallet.currentWallet?.id}/members/${_id}`
        );
        dispatch(GET_ALL_MEMBER);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Delete member successfully",
        });
      } catch (error) {
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: "Delete member unsuccessfully",
        });
      }
    },
  },
};
