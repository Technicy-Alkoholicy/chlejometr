import {
  updatePartyData,
  getInfoAboutCurrentParty,
  countAlcoholDrunk,
  getInfoAboutParties,
  updateUserData
} from '../actions/index.js';

const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: '/graphql'
});

export const party = dispatch => (
  state = {
    alcoholDrunk: 0,
    isDataNeedUpdate: false
  },
  { type, value, data, mlValue, percentValue, username, history, parties }
) => {
  switch (type) {
    //(XˣᴰkurwaˣᴰDˣᴰ)ˣᴰ
    case 'GET_INFO_ABOUT_CURRENT_PARTY': {
      fetch({
        query: `query{
          party(partyId:"${value}"){
            name
            owner{
              username
            }
            membersShots{
              user{
                username
              }
              shots{
                percent
                size
                date
              }
            }
          }
        }`
      }).then(res => {
        dispatch(updatePartyData(res.data.party));
        dispatch(countAlcoholDrunk(username));
      });
      state.currentPartyId = value;
      return { ...state };
    }

    case 'COUNT_ALOCOHOL_DRUNK': {
      state.alcoholDrunk = 0;

      state.membersShots[
        state.membersShots.findIndex(member => member.user.username === username)
      ].shots.forEach(shot => {
        state.alcoholDrunk += (shot.percent * shot.size) / 100;
      });
      state.alcoholDrunk = Math.floor(state.alcoholDrunk);

      return { ...state };
    }

    case 'UPDATE_PARTY_DATA': {
      return { ...state, ...data };
    }

    case 'UPDATE_SHOT_DATA': {
      fetch({
        query: `mutation{
          addShot(partyId:"${value}" size:${mlValue} percent: ${percentValue})
        }`
      }).then(() => {
        dispatch(getInfoAboutCurrentParty(value, username));
      });

      return { ...state };
    }

    case 'FINISH_PARTY': {
      fetch({
        query: `mutation{
          endParty(partyId:"${value}")
        }`
      }).then(() => {
        parties[parties.findIndex(party => party._id === value)].isPartyOver = true;
        dispatch(updateUserData(state));
        history.push('/home');
      });

      return { ...state };
    }

    default:
      return state;
  }
};
