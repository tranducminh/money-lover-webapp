import { Commit, createStore } from "vuex";
import { auth, IAuthState, initialAuthState } from "./modules/auth";
import { message, IMessageState, initialMessageState } from "./modules/message";
import {
  transaction,
  ITransactionState,
  initialTransactionState,
} from "./modules/transaction";
import { wallet, IWalletState, initialWalletState } from "./modules/wallet";
import {
  category,
  ICategoryState,
  initialCategoryState,
} from "./modules/category";
import { WalletTab } from "@/constants";
import { UPDATE_WALLET_TAB } from "./action-types";
import { UPDATE_WALLET_TAB_SUCCESS } from "./mutation-types";
import { initialTeamState, ITeamState, team } from "./modules/team";

export interface RootState {
  auth: IAuthState;
  message: IMessageState;
  wallet: IWalletState;
  transaction: ITransactionState;
  category: ICategoryState;
  walletTab: WalletTab;
  team: ITeamState;
}

export default createStore({
  state: {
    auth: initialAuthState,
    message: initialMessageState,
    wallet: initialWalletState,
    transaction: initialTransactionState,
    category: initialCategoryState,
    walletTab: WalletTab.TRANSACTION,
    team: initialTeamState,
  },
  mutations: {
    [UPDATE_WALLET_TAB_SUCCESS](state: RootState, tab: WalletTab): void {
      state.walletTab = tab;
    },
  },
  actions: {
    [UPDATE_WALLET_TAB]({ commit }: { commit: Commit }, tab: WalletTab): void {
      commit(UPDATE_WALLET_TAB_SUCCESS, tab);
    },
  },
  getters: {},
  modules: {
    auth,
    message,
    wallet,
    transaction,
    category,
    team,
  },
});
