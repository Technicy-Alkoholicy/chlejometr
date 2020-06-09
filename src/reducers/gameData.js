import { updateData } from '../actions/index.js';

const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: '/graphql'
});

export const gameData = dispatch => (
  state = {
    username: 'Lipson',
    password: 'kebab',
    email: 'lipax22@gmail.com',
    newUsername: 'Lipson',
    newEmail: 'lipax22@gmail.com',
    currentPassword: '', //for check password
    newPassword: '',
    newPassword2: '',
    errorText: '',
    isEmailEditing: false,
    isUsernameEditing: false,
    isLogInActive: true,
    characters: [{ name: 'Ragnar' }, { name: 'Otto von Duk' }, { name: 'Bruno' }],
    campaigns: [{ name: 'Kroczący w ciemności' }, { name: 'SWAT' }],
    isLogged: true,
    db: {
      id: 0,
      name: 'cechy specjalne',
      isBigSection: true,
      idCounter: 0,
      content: [
        [
          {
            id: 0,
            content: '35',
            style: '',
            type: 'text' //textArea, checkbox, number
          }
        ]
      ]
    },
    campaing: {
      isGameMaster: true,
      isEditMode: true,
      name: 'Kroczący w Ciemności',
      about:
        'Kampania w uniwersum warhammera. Przygody pewnej grupy włóczącej się bez celu po świecie.',
      gameMasterName: 'Garion',
      nextGameDate: 'Game is planed for 31.03.2220r.',
      npc: [{ name: 'NPC 1' }, { name: 'NPC 2' }, { name: 'NPC 3' }],
      players: [
        { name: 'Otto von Duk' },
        { name: 'Arsen' },
        { name: 'Olaf' },
        { name: 'Bruno' },
        { name: 'Ragnar' },
        { name: 'Jordan' },
        { name: 'Jordan' }
      ]
    },
    modules: [
      { name: 'Roll History', tags: ['dices'], isActive: true, isOfficial: true },
      { name: 'Chat', tags: ['other'], isActive: true, isOfficial: true },
      {
        name: 'WH Crit Calculator',
        tags: ['warHammer', 'dices'],
        isActive: false,
        isOfficial: true
      },
      { name: 'WH initiative table', tags: ['warHammer'], isActive: false, isOfficial: true },
      { name: 'example', tags: ['examples'], isActive: false, isOfficial: false }
    ]
  },
  { type, whatActive, value, whatChange, index, email, password, username, data }
) => {
  switch (type) {
    case 'LOG_IN': {
      fetch({
        query: `{
          login(email: "${email}", password:"${password}"){
            status
            username
            email
          }
        }`
      }).then(res => {
        if (res.data.login.status === "SUCCESS") {
          dispatch(
            updateData({
              email: res.data.login.email,
              username: res.data.login.username
            })
          );
        }
      });

      return { ...state };
    }

    case 'REGISTER': {
      fetch({
        query: `mutation{
          register(username:"${username}" email: "${email}", password:"${password}"){
            status
            username
            email
          }
        }`
      }).then(res => {
        console.log(res);
        if (res.data.register.status === "SUCCESS") {
          dispatch(updateData({ email, username }));
        }
      });

      return { ...state };
    }

    case 'UPDATE_DATA': ({ ...state, ...data })

    case 'CHANGE_ACTIVE_IN_LOGIN_PAGE': {
      if (whatActive === 1) state.isLogInActive = true;
      else state.isLogInActive = false;
      return { ...state };
    }

    case 'ADD_CHARACTER': {
      state.characters.push({ name: 'New Character' });
      return { ...state };
    }

    case 'ADD_CAMPAIGN': {
      state.campaigns.push({ name: 'New Campaign' });
      return { ...state };
    }

    case 'EDIT_TOGGLE': {
      state.campaing.isEditMode = !state.campaing.isEditMode;
      return { ...state };
    }

    case 'CHAGE_TITLE': {
      state.campaing[whatChange] = value;
      return { ...state };
    }

    case 'CHAGE_PLAYER_NAME': {
      state.campaing.players[index].name = value;
      return { ...state };
    }

    case 'ADD_CHAMPION': {
      state.campaing.players.push({ name: 'New Champion' });
      return { ...state };
    }

    case 'REMOVE_CHAMPION': {
      state.campaing.players.splice(index, 1);
      return { ...state };
    }

    case 'EDIT_USERNAME_TOGGLE': {
      state.isUsernameEditing = !state.isUsernameEditing;
      return { ...state };
    }

    case 'EDIT_EMAIL_TOGGLE': {
      state.isEmailEditing = !state.isEmailEditing;
      return { ...state };
    }

    case 'CHANGE_PROFILE_DATA': {
      state[whatChange] = value;
      return { ...state };
    }

    case 'SAVE_USERNAME': {
      state.username = state.newUsername;
      state.isUsernameEditing = !state.isUsernameEditing;
      return { ...state };
    }

    case 'CHANGE_PASSWORD': {
      // let { password, currentPassword, newPassword, newPassword2, errorText } = state;

      // if (state.newPassword === '' || state.newPassword2 === '') {
      //   state.errorText = 'Password must be longer';
      // } else if (password === currentPassword && newPassword === newPassword2) {
      //   password = newPassword;
      //   errorText = 'Password has been changed';
      // } else if (password !== currentPassword) {
      //   errorText = 'Incorrect password';
      // } else if (newPassword !== newPassword2) {
      //   errorText = 'Passwords must match';
      // } else {
      //   errorText = `Password HASN'T been changed`;
      // }

      // currentPassword = '';
      // newPassword = '';
      // newPassword2 = '';
      if (state.newPassword === '' || state.newPassword2 === '') {
        state.errorText = 'Password must be longer';
      } else if (
        state.password === state.currentPassword &&
        state.newPassword === state.newPassword2
      ) {
        state.password = state.newPassword;
        state.errorText = 'Password has been changed';
      } else if (state.password !== state.currentPassword) {
        state.errorText = 'Incorrect password';
      } else if (state.newPassword !== state.newPassword2) {
        state.errorText = 'Passwords must match';
      } else {
        state.errorText = `Password HASN'T been changed`;
      }

      state.currentPassword = '';
      state.newPassword = '';
      state.newPassword2 = '';

      return { ...state };
    }

    case 'IS_ACTIVE_MODULE_TOGGLE': {
      whatChange.isActive = !whatChange.isActive;
      return { ...state };
    }

    default:
      return state;
  }
};
