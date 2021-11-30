import { Commit } from "vuex";
import { RootState } from "..";
import { GET_ALL_TEAM } from "../action-types";
import { IOption, ITeam } from "../entity.interface";
import { GET_ALL_TEAM_SUCCESS } from "../mutation-types";
import axios from "@/utils/axios";
import { TEAM_LIST_BY_OPTION } from "../getter-types";

export interface ITeamState {
  list: ITeam[];
}

export const initialTeamState = {
  list: [],
};

export const team = {
  state: (): ITeamState => initialTeamState,
  mutations: {
    [GET_ALL_TEAM_SUCCESS](state: ITeamState, _data: ITeam[]): void {
      state.list = [..._data];
    },
  },
  actions: {
    async [GET_ALL_TEAM]({ commit }: { commit: Commit }): Promise<void> {
      try {
        const res = await axios.get(`/teams`);
        commit(GET_ALL_TEAM_SUCCESS, res.data.data.teams);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    [TEAM_LIST_BY_OPTION](state: ITeamState): IOption[] {
      return state.list.map((team) => ({
        label: team.name,
        value: team.id,
      }));
    },
  },
};
