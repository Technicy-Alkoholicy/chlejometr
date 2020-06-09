const ObjectId = require('mongodb').ObjectID;

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

        const newUser = {
          username,
          email,
          password: bcrypt.hashSync(password, 3),
          weight: null,
          gender: null,
          height: null,
          age: null,
          private: null,
          parties: [],
          friends: []
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

  //user

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
  parties: async () => Party.find(),
  party: async ({ partyId }) => Party.findOne({ _id: partyId }),
  createParty: async ({ name }) => {
    const email = req.session.email
    const id = await User.findOne({ email }).then(({ _doc }) => _doc._id)

    const newParty = {
      name,
      owner: id,
      isPartyOver: false,
      members: [id],
      membersShots: [{ userId: id, shots: [] }]
    };

    Party.create(newParty);

    return true
  },
  joinParty: async ({ partyId }) => {
    const email = req.session.email
    const id = await User.findOne({ email }).then(({ _doc }) => _doc._id)

    const doc = await Party.findOne({ _id: ObjectId(partyId) })
    if (doc.name) {
      doc.members = [...doc.members, id]
      await doc.save();

      return true
    }
    return false
  },
  endParty: async ({ partyId }) => {
    const doc = await Party.findOne({ _id: ObjectId(partyId) })
    if (doc) {
      doc.isPartyOver = true
      await doc.save();

      return true
    }
    return false
  }

});