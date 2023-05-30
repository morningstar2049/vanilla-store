type CreateStoreType = (args: CreateStoreArgsType) => {
  dispatch: DispatchType;
  subscribe: (id: string, callback: CallbackType) => void;
  getStore: () => InitialStateType;
  unSubscribe: (id: string) => void;
};

type CreateStoreArgsType = {
  initialState: InitialStateType;
  name: string;
  reducers: ReducersType;
};

type InitialStateType = {
  [key: string]: any;
};

type DispatchType = (action: ActionType) => void;

type ReducersType = {
  [key: string]: ReducerFuncType;
};

type ReducerFuncType = (state: InitialStateType, action: ActionType) => void;

type CallbackType = () => void;

type ActionType = { type: string; payload: any };

type SubscribeCallbacks = { id: string; callback: CallbackType }[];

export const createStore: CreateStoreType = ({
  initialState,
  name,
  reducers,
}) => {
  const currentState = structuredClone(initialState);
  let subscribeCallbacks: SubscribeCallbacks = [];

  const subscribe = (id: string, callback: CallbackType) => {
    if (subscribeCallbacks.some((item) => item.id === id)) {
      throw new Error("Id already exists! Pass a unique id.");
    }
    subscribeCallbacks.push({ id, callback });
  };

  const unSubscribe = (id: string) => {
    if (!subscribeCallbacks.some((item) => item.id === id)) {
      throw new Error("The callback with that Id does not exist!");
    }
    subscribeCallbacks = subscribeCallbacks.filter((item) => item.id !== id);
  };
  const callSubscribe: CallbackType = () => {
    for (let item of subscribeCallbacks) {
      item.callback();
    }
  };

  const dispatch: DispatchType = (reducerAction) => {
    reducers[reducerAction.type](currentState, reducerAction);
    callSubscribe();
  };

  const getStore = () => currentState;

  return {
    dispatch,
    subscribe,
    getStore,
    unSubscribe,
  };
};
