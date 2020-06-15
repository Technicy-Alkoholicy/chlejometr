export const socketioInit = gameToken => ({
  type: 'SOCKETIO_INIT',
  gameToken
});

export const logIn = (email, password) => ({
  type: 'LOG_IN',
  email,
  password
});

export const signUp = (username, email, password) => ({
  type: 'SIGN_UP',
  username,
  email,
  password
});

export const changeUserData = (value, optionToChange) => ({
  type: 'CHANGE_USER_DATA',
  value,
  optionToChange
});

export const getUserInfo = () => ({
  type: 'GET_USER_INFO'
});

export const updateUserData = data => ({
  type: 'UPDATE_USER_DATA',
  data
});

export const getInfoAboutParties = () => ({
  type: 'GET_INFO_ABOUT_PARTIES'
});

export const createParty = value => ({
  type: 'CREATE_PARTY',
  value
});

// export const changeActiveInLoginPage = whatActive => ({
//   type: 'CHANGE_ACTIVE_IN_LOGIN_PAGE',
//   whatActive
// });

// export const addCharacter = () => ({
//   type: 'ADD_CHARACTER'
// });

// export const addCampaign = () => ({
//   type: 'ADD_CAMPAIGN'
// });

// export const editToggle = () => ({
//   type: 'EDIT_TOGGLE'
// });

// export const changeTitle = (value, whatChange) => ({
//   type: 'CHAGE_TITLE',
//   value,
//   whatChange
// });

// export const changePlayerName = (value, index) => ({
//   type: 'CHAGE_PLAYER_NAME',
//   value,
//   index
// });

// export const addChampion = () => ({
//   type: 'ADD_CHAMPION'
// });

// export const removeChampion = index => ({
//   type: 'REMOVE_CHAMPION',
//   index
// });

// export const editUsernameToggle = () => ({
//   type: 'EDIT_USERNAME_TOGGLE'
// });

// export const editEmailToggle = () => ({
//   type: 'EDIT_EMAIL_TOGGLE'
// });

// export const changeProfileData = (value, whatChange) => ({
//   type: 'CHANGE_PROFILE_DATA',
//   value,
//   whatChange
// });

// export const saveUsername = () => ({
//   type: 'SAVE_USERNAME'
// });

// export const changePassword = () => ({
//   type: 'CHANGE_PASSWORD'
// });

// export const isActiveModuleToggle = whatChange => ({
//   type: 'IS_ACTIVE_MODULE_TOGGLE',
//   whatChange
// });
