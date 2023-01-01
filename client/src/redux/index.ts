import { Store, combineReducers, createStore } from 'redux';
import todo from './todo';
import auth from './auth';

const rootReducer = combineReducers({ auth, todo });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export const getStore = (() => {
  let store: Store | null = null;
  return () => {
    if (!store) store = createStore(rootReducer);
    return store;
  };
})();
