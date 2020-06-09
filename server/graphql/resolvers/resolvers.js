import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import Party from '../../models/party.js';

const responseTemplate = (status, username, email) => ({ status, username, email })

export default (req, res, next) => ({

  // register and login

  loginUser: ({ email, password }) => {
    return User.findOne({ email }).then(({ _doc }) => {
      if (bcrypt.compareSync(password, _doc.password)) {
        req.session.email = _doc.email;
        req.session.loggined = true;
        return responseTemplate('SUCCESS', _doc.username, _doc.email);
      }
      return responseTemplate('WRONG_EMAIL_OR_PASSWORD');
    });
  },
  registerUser: ({ username, email, password }) => {
    return User.findOne({ email })
      .then(isUserAlreadyExist => {
        if (isUserAlreadyExist) return responseTemplate('EMAIL_IS_ENGAGED');
        console.log(username);

        const newUser = {
          username,
          email,
          password: bcrypt.hashSync(password, 3),
          parties: [],
          weight: null,
          gender: null,
          height: null,
          age: null,
          private: null
        };

        User.create(newUser);

        req.session.email = email;
        req.session.loggined = true;

        return responseTemplate('SUCCESS', username, email);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },

  //users

  users: () => {
    return User.find()
      .then(user => user)
  },
  user: ({ email, id }) => {
    if (email) {
      return User.findOne({ email })
        .then(user => user)
    }
  },

  //party

  createParty: () => true,
  joinParty: () => true,
  endParty: () => true

});