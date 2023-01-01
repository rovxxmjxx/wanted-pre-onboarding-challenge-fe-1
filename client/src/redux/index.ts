import { Store, combineReducers, createStore } from 'redux';
import todo from './todo';

const rootReducer = combineReducers({ todo });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export const getStore = (() => {
  let store: Store | null = null;
  return () => {
    if (!store) store = createStore(rootReducer);
    return store;
  };
})();
