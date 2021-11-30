import { MessageType } from "@/constants";
import { PUSH_MESSAGE, RESET_MESSAGE_STATE_SUCCESS } from "../mutation-types";

export interface IMessageState {
  type: MessageType | null;
  content: string | null;
  id: number | null;
}

export const initialMessageState = {
  type: null,
  content: null,
  id: null,
};

// <----payload---->
interface IMessagePayload {
  type: MessageType;
  content: string;
}

export const message = {
  state: (): IMessageState => initialMessageState,
  mutations: {
    [PUSH_MESSAGE](state: IMessageState, _data: IMessagePayload): void {
      state.content = _data.content;
      state.id = new Date().getTime();
      state.type = _data.type;
    },
    [RESET_MESSAGE_STATE_SUCCESS](state: IMessageState): void {
      state.id = null;
      state.content = null;
      state.type = null;
    },
  },
};
