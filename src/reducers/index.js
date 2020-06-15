import { combineReducers } from 'redux';

import { user } from './user';
import { party } from './party';

import { createStore } from 'redux';

const store = createStore(() => {});

({
  user: user(store.dispatch),
  party: party(store.dispatch)
}
  |> combineReducers
  |> store.replaceReducer);

export { store };
