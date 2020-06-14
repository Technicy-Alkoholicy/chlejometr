import { updateUserData } from '../actions/index.js';

const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: '/graphql'
});

export const user = dispatch => (
  state = {
    email: '',
    username: ''
  },
  { type, email, password, username, data, value, optionToChange }
) => {
  switch (type) {
    case 'LOG_IN': {
      fetch({
        //(XˣᴰkurwaˣᴰDˣᴰ)ˣᴰ
        query: `mutation {
          loginUser(email:"${email}" password:"${password}"){
            status
            username
            email
          }
        }`
      }).then(res => {
        dispatch(updateUserData(res.data.loginUser));
      });
      return { ...state };
    }

    case 'SIGN_UP': {
      fetch({
        query: `mutation {
          registerUser(username:"${username}" email:"${email}" password:"${password}"){
            status
            username
            email
          }
        }`
      }).then(res => {
        dispatch(updateUserData(res.data.registerUser));
      });
      return { ...state };
    }

    case 'UPDATE_USER_DATA': {
      return { ...state, ...data };
    }

    case 'CHANGE_USER_DATA': {
      if (optionToChange === 'age' || optionToChange === 'height' || optionToChange === 'weight') {
        fetch({
          query: `mutation {
            uppdateUserData(${optionToChange}:${value})
          }
          `
        });
      } else {
        fetch({
          query: `mutation {
          uppdateUserData(${optionToChange}:"${value}")
        }
        `
        });
      }
    }

    case 'GET_USER_INFO': {
      fetch({
        query: `
        query {
          user(email:"${state.email}"){
            email,
            username,
            weight,
            gender,
            height,
            age,
          }
        }`
      }).then(res => {
        dispatch(updateUserData(res.data.user));
        console.log(res.data);
      });
      return { ...state };
    }

    default:
      return state;
  }
};
