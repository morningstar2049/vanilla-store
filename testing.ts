import { getStore, dispatch } from "./store";

const { count } = getStore();

console.log(count);

dispatch({ type: "add", payload: 11 });
console.log(getStore().count);
dispatch({ type: "divide", payload: 3 });

console.log(getStore().count);
