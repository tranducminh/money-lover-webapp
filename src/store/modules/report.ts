import { Commit, Dispatch } from "vuex";
import {
  GET_ALL_TRANSACTION,
  GET_ALL_WALLET,
  GET_REPORT,
  LOAD_REPORT_PAGE,
} from "../action-types";
import {
  RESET_REPORT_STATE_SUCCESS,
  SET_CURRENT_REPORT_URL,
} from "../mutation-types";
import axios from "@/utils/axios";
import { RootState } from "..";

export interface IReportState {
  currentUrl: string;
}

export const initialReportState = {
  currentUrl: "",
};

export const report = {
  state: (): IReportState => initialReportState,
  mutations: {
    [RESET_REPORT_STATE_SUCCESS](state: IReportState): void {
      state.currentUrl = "";
    },
    [SET_CURRENT_REPORT_URL](state: IReportState, url: string): void {
      state.currentUrl = url;
    },
  },
  actions: {
    async [LOAD_REPORT_PAGE]({
      dispatch,
    }: {
      dispatch: Dispatch;
    }): Promise<void> {
      await dispatch(GET_ALL_WALLET);
      dispatch(GET_ALL_TRANSACTION);
    },

    /**
     * export report for month
     *
     */
    async [GET_REPORT]({
      rootState,
      commit,
    }: {
      rootState: RootState;
      commit: Commit;
    }): Promise<void> {
      try {
        const currentWalletId = rootState.wallet.currentWallet?.id;
        const currentWalletName = rootState.wallet.currentWallet?.name;
        const currentYear = rootState.transaction.filter.year;
        const currentMonth = rootState.transaction.filter.month;
        const name = `${currentWalletName}_${currentWalletId}_${currentYear}${currentMonth}_${new Date().getTime()}`;

        await axios.get(
          `/wallets/${currentWalletId}/reports?year=${currentYear}&month=${currentMonth}&name=${name}`
        );
        commit(SET_CURRENT_REPORT_URL, `http://localhost:3000/${name}.xlsx`);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
