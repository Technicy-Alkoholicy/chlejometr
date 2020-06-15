import { updateUserData } from '../actions/index.js';

const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: '/graphql'
});

export const party = dispatch => (state = {}, { type }) => {
  switch (type) {
    // case 'LOG_IN': {
    //   fetch({
    //     //(XˣᴰkurwaˣᴰDˣᴰ)ˣᴰ
    //     query: `mutation {
    //       loginUser(email:"${email}" password:"${password}"){
    //         status
    //         username
    //         email
    //       }
    //     }`
    //   }).then(res => {
    //     dispatch(updateUserData(res.data.loginUser));
    //   });
    //   return { ...state };
    // }

    default:
      return state;
  }
};
