import { getStore, dispatch, numStore } from "./store";

const { name } = getStore();

numStore.subscribe("someCallbackId", () => {
  console.log(name, "someCallbackId");
});

numStore.subscribe("someCallbackId123", () => {
  console.log(name, "someCallbackId123");
});
numStore.unSubscribe("someCallbackId");
numStore.unSubscribe("someCallbackId123123123");

dispatch({ type: "add", payload: 10 });
