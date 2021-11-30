import { Commit } from "vuex";
import { GET_ALL_CATEGORY } from "../action-types";
import { ICategory, IOption } from "../entity.interface";
import axios from "@/utils/axios";
import { RootState } from "..";
import {
  GET_ALL_CATEGORY_SUCCESS,
  RESET_CATEGORY_STATE_SUCCESS,
} from "../mutation-types";
import { CATEGORY_LIST_BY_OPTION } from "../getter-types";

export interface ICategoryState {
  list: ICategory[];
}

export const initialCategoryState = {
  list: [],
};

export const category = {
  state: (): ICategoryState => initialCategoryState,
  mutations: {
    [GET_ALL_CATEGORY_SUCCESS](
      state: ICategoryState,
      _data: ICategory[]
    ): void {
      state.list = [..._data];
    },
    [RESET_CATEGORY_STATE_SUCCESS](state: ICategoryState): void {
      state.list = [];
    },
  },
  actions: {
    async [GET_ALL_CATEGORY]({
      commit,
      rootState,
    }: {
      commit: Commit;
      rootState: RootState;
    }): Promise<void> {
      try {
        const res = await axios.get(
          `/wallets/${rootState.wallet?.currentWallet?.id}/categories`
        );
        commit(GET_ALL_CATEGORY_SUCCESS, res.data.data.categories);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    [CATEGORY_LIST_BY_OPTION](state: ICategoryState): IOption[] {
      return state.list.map((category) => ({
        label: category.name,
        value: category.id,
      }));
    },
  },
};
