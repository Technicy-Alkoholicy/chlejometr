import {
  updatePartyData,
  getInfoAboutCurrentParty,
  countAlcoholDrunk,
  updateUserData
} from '../actions/index.js';

const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: '/graphql'
});

export const party = dispatch => (
  state = {
    alcoholDrunk: 0,
    alcoholInBood: 0,
    timeToSober: 0,
    isDataNeedUpdate: false
  },
  { type, value, data, mlValue, percentValue, username, history, parties, weight, gender }
) => {
  switch (type) {
    //(XˣᴰkurwaˣᴰDˣᴰ)ˣᴰ
    case 'GET_INFO_ABOUT_CURRENT_PARTY': {
      fetch({
        query: `query{
          party(partyId:"${value}"){
            name
            createdDate
            startedDate
            finishedDate

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
        if (
          res.data.party.membersShots[
            res.data.party.membersShots.findIndex(member => member.user.username === username)
          ].shots.length > 0
        )
          dispatch(countAlcoholDrunk(username, weight, gender));
      });
      state.currentPartyId = value;
      return { ...state };
    }

    case 'COUNT_ALOCOHOL_DRUNK': {
      let alcoholDrunk = 0;

      //counting drunk etanol
      state.membersShots[
        state.membersShots.findIndex(member => member.user.username === username)
      ].shots.forEach(shot => {
        alcoholDrunk += (shot.percent * shot.size) / 100;
      });
      alcoholDrunk = Math.floor(alcoholDrunk);

      state.alcoholDrunk = alcoholDrunk;

      //counting alcohol in blood
      const member =
        state.membersShots[
          state.membersShots.findIndex(member => member.user.username === username)
        ];

      const dateOfFirstShot = [...member.shots[0].date].splice(0, 10).join('') * 1;
      const dateOfLastShot =
        [...member.shots[member.shots.length - 1].date].splice(0, 10).join('') * 1;
      const hourOfFirstShot = [...member.shots[0].date].splice(11, 2).join('') * 1;
      const hourOfLastShot =
        [...member.shots[member.shots.length - 1].date].splice(11, 2).join('') * 1;
      const minOfFirstShot = [...member.shots[0].date].splice(14, 2).join('') * 1;
      const minOfLastShot =
        [...member.shots[member.shots.length - 1].date].splice(14, 2).join('') * 1;

      let time = 0;
      if (hourOfFirstShot === hourOfLastShot && minOfFirstShot === minOfLastShot) {
        time = 1;
      } else if (dateOfFirstShot === dateOfLastShot) {
        const hours = hourOfLastShot - hourOfFirstShot;
        const min = minOfLastShot - minOfFirstShot;
        time = Math.round((hours + min / 60) * 10) / 10;
      } else {
        const hours = 24 - hourOfFirstShot + hourOfLastShot;
        const min = minOfLastShot - minOfFirstShot;
        time = Math.round((hours + min / 60) * 10) / 10;
      }

      if (time < 1) time = 1;

      const etanol = (alcoholDrunk * (789 / 1000)) / 10;

      let alcoholInBood = 0;
      if (gender === 'male')
        alcoholInBood =
          Math.round(((0.806 * etanol * 1.2) / (0.58 * weight) - 0.015 * time) * 10 * 100) / 100;
      else if (gender === 'female')
        alcoholInBood =
          Math.round(((0.806 * etanol * 1.2) / (0.49 * weight) - 0.017 * time) * 10 * 100) / 100;
      state.alcoholInBood = alcoholInBood;

      //counting time to sober
      state.timeToSober = 1 + Math.round(((alcoholInBood * (40 / 0.1)) / 60) * 10) / 10;

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
        dispatch(getInfoAboutCurrentParty(value, username, weight, gender));
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

    case 'LEAVE_PARTY': {
      fetch({
        query: `mutation{
          leaveParty(partyId:"${value}")
        }`
      }).then(() => {
        console.log(parties[parties.findIndex(party => party._id === value)]);

        parties.splice(
          parties.findIndex(party => party._id === value),
          1
        );
        history.push('/home');
        dispatch(updateUserData(state));
      });

      return { ...state };
    }

    default:
      return state;
  }
};
