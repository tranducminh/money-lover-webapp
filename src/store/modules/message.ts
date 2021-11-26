import { PUSH_MESSAGE } from "../mutation-types";

export enum Type {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

interface MessageState {
  type: Type | null;
  content: string | null;
  id: number | null;
}

interface MessagePayload {
  type: Type;
  content: string;
}

export const message = {
  state: (): MessageState => ({
    type: null,
    content: null,
    id: null,
  }),
  mutations: {
    [PUSH_MESSAGE](state: MessageState, _data: MessagePayload): void {
      state.content = _data.content;
      state.id = new Date().getTime();
      state.type = _data.type;
    },
  },
  actions: {},
};
