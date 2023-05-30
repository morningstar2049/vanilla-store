import { getStore, dispatch, numStore } from "./store";

const { count } = getStore();

numStore.subscribe("someCallbackId", () => {
  console.log(getStore().count);
});

dispatch({ type: "add", payload: 11 });
dispatch({ type: "divide", payload: 3 });
