import { Commit, Dispatch } from "vuex";
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  GET_ALL_TRANSACTION,
  LOAD_WALLET_PAGE,
  SET_CURRENT_TRANSACTION,
  UPDATE_TRANSACTION,
} from "../action-types";
import {
  GET_ALL_TRANSACTION_SUCCESS,
  PUSH_MESSAGE,
  RESET_TRANSACTION_STATE_SUCCESS,
  SET_CURRENT_TRANSACTION_SUCCESS,
  SET_TRANSACTION_FILTER,
} from "../mutation-types";
import axios from "@/utils/axios";
import { RootState } from "..";
import { CategoryType, MessageType } from "@/constants";
import { chain } from "lodash";
import {
  TRANSACTION_LIST_BY_DATE,
  TRANSACTION_LIST_FOR_REPORT,
} from "../getter-types";
import {
  ITransaction,
  ITransactionByDate,
  ITransactionForReport,
} from "../entity.interface";
import { formatDate } from "@/utils";

export interface ITransactionState {
  list: ITransaction[];
  filter: {
    year: number;
    month: number;
  };
  currentTransaction?: ITransaction;
}

export const initialTransactionState = {
  list: [],
  filter: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
};

// <----payload---->
export interface ITransactionFilterPayload {
  year?: number;
  month?: number;
}

export interface ICreateTransactionPayload {
  category_id: number;
  amount: number;
  note: string;
  date: Date;
  debt_exp: Date | null;
}

export interface IUpdateTransactionPayload {
  category_id: number;
  amount: number;
  note: string;
  date: Date;
  debt_exp: Date | null;
}

export const transaction = {
  state: (): ITransactionState => initialTransactionState,
  mutations: {
    [GET_ALL_TRANSACTION_SUCCESS](
      state: ITransactionState,
      _data: ITransaction[]
    ): void {
      state.list = [..._data];
    },

    [SET_TRANSACTION_FILTER](
      state: ITransactionState,
      _data: ITransactionFilterPayload
    ): void {
      state.filter.month = _data.month || initialTransactionState.filter.month;
      state.filter.year = _data.year || initialTransactionState.filter.year;
    },

    [SET_CURRENT_TRANSACTION_SUCCESS](
      state: ITransactionState,
      _data: ITransaction
    ): void {
      state.currentTransaction = { ..._data };
    },

    [RESET_TRANSACTION_STATE_SUCCESS](state: ITransactionState): void {
      delete state.currentTransaction;
      state.list = [];
      state.filter = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      };
    },
  },
  actions: {
    /**
     * get transaction list of current wallet by the filter
     *
     */
    async [GET_ALL_TRANSACTION](
      {
        commit,
        rootState,
        state,
      }: { commit: Commit; rootState: RootState; state: ITransactionState },
      payload: ITransactionFilterPayload
    ): Promise<void> {
      try {
        const currentWalletId = rootState.wallet?.currentWallet?.id;
        const _year = payload?.year || state.filter.year;
        const _month = payload?.month || state.filter.month;
        const res = await axios.get(
          `/wallets/${currentWalletId}/transactions?year=${_year}&month=${_month}`
        );
        commit(GET_ALL_TRANSACTION_SUCCESS, res.data.data.transactions);
        commit(SET_TRANSACTION_FILTER, { year: _year, month: _month });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * set current transaction
     */
    [SET_CURRENT_TRANSACTION](
      { commit }: { commit: Commit },
      payload: ITransaction
    ): void {
      commit(SET_CURRENT_TRANSACTION_SUCCESS, payload);
    },

    /**
     * create new transaction for current wallet
     */
    async [CREATE_TRANSACTION](
      {
        commit,
        dispatch,
        rootState,
      }: {
        commit: Commit;
        dispatch: Dispatch;
        rootState: RootState;
      },
      payload: ICreateTransactionPayload
    ): Promise<void> {
      try {
        await axios.post(
          `/wallets/${rootState.wallet?.currentWallet?.id}/transactions`,
          payload
        );
        dispatch(LOAD_WALLET_PAGE);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Create transaction successfully",
        });
      } catch (error) {
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: "Create transaction failed",
        });
      }
    },

    /**
     * create new transaction for current wallet
     */
    async [UPDATE_TRANSACTION](
      {
        commit,
        dispatch,
        rootState,
        state,
      }: {
        commit: Commit;
        dispatch: Dispatch;
        rootState: RootState;
        state: ITransactionState;
      },
      payload: IUpdateTransactionPayload
    ): Promise<void> {
      try {
        const res = await axios.put(
          `/wallets/${rootState.wallet?.currentWallet?.id}/transactions/${state.currentTransaction?.id}`,
          payload
        );
        const data = res.data.data.transaction;
        commit(SET_CURRENT_TRANSACTION_SUCCESS, {
          ...data,
          date: formatDate(data.date),
          debt_exp: data.debt_exp ? formatDate(data.debt_exp) : null,
        });
        dispatch(GET_ALL_TRANSACTION);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Update transaction successfully",
        });
      } catch (error) {
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: "Update transaction failed",
        });
      }
    },

    /**
     * delete transaction
     */
    async [DELETE_TRANSACTION]({
      commit,
      dispatch,
      rootState,
      state,
    }: {
      commit: Commit;
      dispatch: Dispatch;
      rootState: RootState;
      state: ITransactionState;
    }): Promise<void> {
      try {
        await axios.delete(
          `/wallets/${rootState.wallet?.currentWallet?.id}/transactions/${state.currentTransaction?.id}`
        );
        dispatch(GET_ALL_TRANSACTION);
        commit(PUSH_MESSAGE, {
          type: MessageType.SUCCESS,
          content: "Delete transaction successfully",
        });
      } catch (error) {
        commit(PUSH_MESSAGE, {
          type: MessageType.ERROR,
          content: "Delete transaction failed",
        });
      }
    },
  },

  getters: {
    [TRANSACTION_LIST_BY_DATE](state: ITransactionState): ITransactionByDate {
      let inflow = 0;
      let outflow = 0;
      state.list.forEach((transaction) => {
        transaction.date = formatDate(transaction.date);

        if (transaction.debt_exp) {
          transaction.debt_exp = formatDate(transaction.debt_exp);
        }
      });
      const transactions = chain(state.list)
        .groupBy("date")
        .map((items: ITransaction[], key: string) => {
          let total = 0;
          items.forEach((item) => {
            switch (item.category.main_type) {
              case CategoryType.EXPENSE:
              case CategoryType.BACK_DEBT:
              case CategoryType.LOAN:
                total -= item.amount;
                outflow -= item.amount;
                item.amount = -item.amount;
                break;

              case CategoryType.INCOME:
              case CategoryType.DEBT:
              case CategoryType.RECOVER_DEBT:
                total += item.amount;
                inflow += item.amount;
                break;

              default:
                break;
            }
          });
          return {
            date: key,
            total,
            items,
          };
        })
        .value();
      return {
        inflow,
        outflow,
        transactions,
      };
    },
    [TRANSACTION_LIST_FOR_REPORT](
      state: ITransactionState
    ): ITransactionForReport[] {
      state.list.forEach((transaction) => {
        transaction.date = formatDate(transaction.date);
      });
      return chain(state.list)
        .groupBy("date")
        .map((items: ITransaction[], key: string) => {
          let inflow = 0;
          let outflow = 0;
          items.forEach((item) => {
            switch (item.category.main_type) {
              case CategoryType.EXPENSE:
              case CategoryType.BACK_DEBT:
              case CategoryType.LOAN:
                outflow += item.amount;
                break;

              case CategoryType.INCOME:
              case CategoryType.DEBT:
              case CategoryType.RECOVER_DEBT:
                inflow += item.amount;
                break;

              default:
                break;
            }
          });
          return {
            date: key,
            inflow,
            outflow,
          };
        })
        .value();
    },
  },
};
