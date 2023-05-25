type CreateStoreType = (args: CreateStoreArgsType) => {
  dispatch: DispatchType;
  subscribe: () => void;
  getStore: () => InitialStateType;
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

type CallbackType = (newStore: {}) => void;

type ActionType = { type: string; payload: any };

export const createStore: CreateStoreType = ({
  initialState,
  name,
  reducers,
}) => {
  const currentState = structuredClone(initialState);

  const dispatch: DispatchType = (reducerAction) => {
    reducers[reducerAction.type](currentState, reducerAction);
  };

  const subscribe = () => {}; //TODO

  const getStore = () => {
    return currentState;
  };

  return {
    dispatch,
    subscribe,
    getStore,
  };
};
