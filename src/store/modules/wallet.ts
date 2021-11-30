import { MessageType } from "@/constants";
import axios from "@/utils/axios";
import { chain } from "lodash";
import { Commit, Dispatch } from "vuex";
import {
  CREATE_WALLET,
  DELETE_WALLET,
  FREEZE_WALLET,
  GET_ALL_CATEGORY,
  GET_ALL_MEMBER,
  GET_ALL_TRANSACTION,
  GET_ALL_WALLET,
  LOAD_WALLET_PAGE,
  SET_CURRENT_WALLET,
  UN_FREEZE_WALLET,
  UPDATE_WALLET,
} from "../action-types";
import { IWalletGroupByTeam, IWallet } from "../entity.interface";
import { WALLET_LIST_TEAM_NAME } from "../getter-types";
import {
  GET_ALL_WALLET_SUCCESS,
  PUSH_MESSAGE,
  RESET_WALLET_STATE_SUCCESS,
  SET_CURRENT_WALLET_SUCCESS,
} from "../mutation-types";

export interface IWalletState {
  list: IWallet[];
  currentWallet: IWallet | null;
}

export const initialWalletState = {
  list: [],
  currentWallet: null,
};

// <----payload---->
export interface IUpdateWalletPayload {
  name?: string;
  is_freezed?: boolean;
  team_id?: number;
}

export interface ICreateWalletPayload {
  team_id: number;
  name: string;
}

export const wallet = {
  state: (): IWalletState => initialWalletState,
  mutations: {
    [GET_ALL_WALLET_SUCCESS](state: IWalletState, _data: IWallet[]): void {
      state.list = [..._data];
    },

    [SET_CURRENT_WALLET_SUCCESS](state: IWalletState, _data: IWallet): void {
      state.currentWallet = { ..._data };
    },

    [RESET_WALLET_STATE_SUCCESS](state: IWalletState): void {
      state.list = [];
      state.currentWallet = null;
    },
  },
  actions: {
    async [GET_ALL_WALLET]({ commit }: { commit: Commit }): Promise<void> {
      const res = await axios.get("/wallets");
      commit(GET_ALL_WALLET_SUCCESS, res.data.data.wallets);
    },

    [SET_CURRENT_WALLET](
      { state, commit }: { state: IWalletState; commit: Commit },
      _id: number
    ): void {
      const wallet = state.list.find((_wallet: IWallet) => _wallet.id === _id);
      commit(SET_CURRENT_WALLET_SUCCESS, wallet);
    },

    /**
     * get wallet list
     * update current wallet
     * get transaction list of this wallet
     *
     */
    async [LOAD_WALLET_PAGE]({
      state,
      commit,
      dispatch,
    }: {
      state: IWalletState;
      commit: Commit;
      dispatch: Dispatch;
    }): Promise<void> {
      const res = await axios.get("/wallets");
      commit(GET_ALL_WALLET_SUCCESS, res.data.data.wallets);

      if (res.data.data.wallets.length > 0) {
        const currentWallet = state.currentWallet?.id
          ? res.data.data.wallets.find(
              (wallet: IWallet) => wallet.id == state.currentWallet?.id
            )
          : res.data.data.wallets[0];
        commit(SET_CURRENT_WALLET_SUCCESS, currentWallet);
        dispatch(GET_ALL_TRANSACTION);
        dispatch(GET_ALL_CATEGORY);
        dispatch(GET_ALL_MEMBER);
      }
    },

    /**
     * freeze wallet
     * update current wallet
     *
     */
    async [FREEZE_WALLET]({
      state,
      commit,
    }: {
      state: IWalletState;
      commit: Commit;
    }): Promise<void> {
      try {
        const res = await axios.put(`/wallets/${state.currentWallet?.id}`, {
          is_freezed: true,
        });

        commit(SET_CURRENT_WALLET_SUCCESS, res.data.data.wallet);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Freeze wallet successfully",
        });
      } catch (error) {
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: "Freeze wallet unsuccessfully",
        });
      }
    },

    /**
     * un freeze the wallet
     * update current wallet
     *
     */
    async [UN_FREEZE_WALLET]({
      state,
      commit,
    }: {
      state: IWalletState;
      commit: Commit;
    }): Promise<void> {
      try {
        const res = await axios.put(`/wallets/${state.currentWallet?.id}`, {
          is_freezed: false,
        });

        commit(SET_CURRENT_WALLET_SUCCESS, res.data.data.wallet);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Unfreeze wallet successfully",
        });
      } catch (error) {
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: "Unfreeze wallet unsuccessfully",
        });
      }
    },

    /**
     * update the wallet
     */
    async [UPDATE_WALLET](
      {
        state,
        commit,
      }: {
        state: IWalletState;
        commit: Commit;
      },
      payload: IUpdateWalletPayload
    ): Promise<void> {
      try {
        const res = await axios.put(
          `/wallets/${state.currentWallet?.id}`,
          payload
        );

        commit(SET_CURRENT_WALLET_SUCCESS, res.data.data.wallet);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Update wallet successfully",
        });
      } catch (error) {
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: "Update wallet unsuccessfully",
        });
      }
    },

    /**
     * delete the wallet
     */
    async [DELETE_WALLET]({
      state,
      commit,
      dispatch,
    }: {
      state: IWalletState;
      commit: Commit;
      dispatch: Dispatch;
    }): Promise<void> {
      try {
        await axios.delete(`/wallets/${state.currentWallet?.id}`);

        commit(SET_CURRENT_WALLET_SUCCESS, null);
        dispatch(LOAD_WALLET_PAGE);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Delete wallet successfully",
        });
      } catch (error) {
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: "Delete wallet unsuccessfully",
        });
      }
    },

    /**
     * create the wallet
     */
    async [CREATE_WALLET](
      {
        commit,
        dispatch,
      }: {
        commit: Commit;
        dispatch: Dispatch;
      },
      payload: ICreateWalletPayload
    ): Promise<void> {
      try {
        await axios.post(`/wallets`, payload);

        dispatch(LOAD_WALLET_PAGE);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Create wallet successfully",
        });
      } catch (error) {
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: "Create wallet unsuccessfully",
        });
      }
    },
  },

  getters: {
    [WALLET_LIST_TEAM_NAME](state: IWalletState): IWalletGroupByTeam[] {
      return chain(state.list)
        .groupBy("team.name")
        .map((value, key) => ({ name: key, wallets: value }))
        .value();
    },
  },
};
