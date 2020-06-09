import { updateData } from '../actions/index.js';

const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: '/graphql'
});

export const gameData = dispatch => (state = {}, { type }) => {
  switch (type) {
    // case 'CHAGE_PLAYER_NAME': {
    //   state.campaing.players[index].name = value;
    //   return { ...state };
    // }

    default:
      return state;
  }
};
