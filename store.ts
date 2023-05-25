import { createStore } from "./createStore";

const initialState = {
  count: 7,
};

const numStore = createStore({
  name: "test-store",
  initialState,
  reducers: {
    add(state, action) {
      state.count += action.payload;
    },

    divide(state, action) {
      state.count /= action.payload;
    },
  },
});

export const { getStore, dispatch } = numStore;
