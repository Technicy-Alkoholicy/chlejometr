export const socketioInit = gameToken => ({
  type: 'SOCKETIO_INIT',
  gameToken
});

export const logIn = (email, password, history) => ({
  type: 'LOG_IN',
  email,
  password,
  history
});

export const errorSignUp = (email, password) => ({
  type: 'ERROR_SIGN_UP',
  email,
  password
});

export const logOut = () => ({
  type: 'LOG_OUT'
});

export const signUp = (username, email, password, history) => ({
  type: 'SIGN_UP',
  username,
  email,
  password,
  history
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

export const wrongLoginData = () => ({
  type: 'WRONG_LOGIN_DATA'
});

export const wrongSignUpData = status => ({
  type: 'WRONG_SIGN_UP_DATA',
  status
});

export const getInfoAboutParties = () => ({
  type: 'GET_INFO_ABOUT_PARTIES'
});

export const createParty = value => ({
  type: 'CREATE_PARTY',
  value
});

export const setPartyId = value => ({
  type: 'SET_PARTY_ID',
  value
});

export const checkIsUserLogged = history => ({
  type: 'CHECK_IS_USER_LOGGED',
  history
});

//------------------------------------------party.js-----------------------------------------------------------

export const getInfoAboutCurrentParty = (value, username, weight, gender) => ({
  type: 'GET_INFO_ABOUT_CURRENT_PARTY',
  value,
  username,
  weight,
  gender
});

export const updatePartyData = data => ({
  type: 'UPDATE_PARTY_DATA',
  data
});

export const updateShotData = (value, mlValue, percentValue, username, weight, gender) => ({
  type: 'UPDATE_SHOT_DATA',
  value,
  mlValue,
  percentValue,
  username,
  weight,
  gender
});

export const countAlcoholDrunk = (username, weight, gender) => ({
  type: 'COUNT_ALOCOHOL_DRUNK',
  username,
  weight,
  gender
});

export const finishParty = (value, history, parties) => ({
  type: 'FINISH_PARTY',
  value,
  history,
  parties
});

export const leaveParty = (value, history, parties) => ({
  type: 'LEAVE_PARTY',
  value,
  history,
  parties
});
