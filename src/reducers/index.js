import { combineReducers } from 'redux';

import { user } from './user';

import { createStore } from 'redux';

const store = createStore(() => {});

({
  user: user(store.dispatch)
}
  |> combineReducers
  |> store.replaceReducer);

export { store };
