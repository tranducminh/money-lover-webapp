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
import { RESET_ROOT_STATE, UPDATE_WALLET_TAB } from "./action-types";
import { initialTeamState, ITeamState, team } from "./modules/team";
import {
  RESET_AUTH_STATE_SUCCESS,
  RESET_CATEGORY_STATE_SUCCESS,
  RESET_MEMBER_STATE_SUCCESS,
  RESET_MESSAGE_STATE_SUCCESS,
  RESET_REPORT_STATE_SUCCESS,
  RESET_TEAM_STATE_SUCCESS,
  RESET_TRANSACTION_STATE_SUCCESS,
  RESET_WALLET_STATE_SUCCESS,
  UPDATE_WALLET_TAB_SUCCESS,
} from "./mutation-types";
import { IMemberState, initialMemberState, member } from "./modules/member";
import { initialReportState, IReportState, report } from "./modules/report";

export interface RootState {
  auth: IAuthState;
  message: IMessageState;
  wallet: IWalletState;
  transaction: ITransactionState;
  category: ICategoryState;
  walletTab: WalletTab;
  team: ITeamState;
  member: IMemberState;
  report: IReportState;
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
    member: initialMemberState,
    report: initialReportState,
  },
  mutations: {
    [UPDATE_WALLET_TAB_SUCCESS](state: RootState, tab: WalletTab): void {
      state.walletTab = tab;
    },
  },
  actions: {
    [RESET_ROOT_STATE]({ commit }: { commit: Commit }): void {
      commit(RESET_AUTH_STATE_SUCCESS);
      commit(RESET_CATEGORY_STATE_SUCCESS);
      commit(RESET_MEMBER_STATE_SUCCESS);
      commit(RESET_MESSAGE_STATE_SUCCESS);
      commit(RESET_TEAM_STATE_SUCCESS);
      commit(RESET_TRANSACTION_STATE_SUCCESS);
      commit(RESET_WALLET_STATE_SUCCESS);
      commit(RESET_REPORT_STATE_SUCCESS);
    },
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
    member,
    report,
  },
});
