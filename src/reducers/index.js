import { combineReducers } from 'redux';

import { gameData } from './gameData';

import { createStore } from 'redux';

const store = createStore(() => {});

({
  gameData: gameData(store.dispatch)
}
  |> combineReducers
  |> store.replaceReducer);

export { store };
