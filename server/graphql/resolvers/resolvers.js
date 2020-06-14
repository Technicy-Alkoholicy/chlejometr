const ObjectId = require('mongodb').ObjectID;

import bcrypt from 'bcrypt';

import User from '../../models/user.js';
import Party from '../../models/party.js';

const responseTemplate = (status, username, email) => ({ status, username, email })

export default (req, res, next) => {
  const { userId, email, loggined } = req.session
  return {

    // register and login
    loginUser: async ({ email, password }) => {
      return User.findOne({ email }).then(async ({ _doc }) => {
        if (bcrypt.compareSync(password, _doc.password)) {
          req.session.email = email
          req.session.userId = await User.findOne({ email }).then(({ _doc }) => _doc._id)
          req.session.loggined = true;
          return responseTemplate('SUCCESS', _doc.username, _doc.email);
        }
        return responseTemplate('WRONG_EMAIL_OR_PASSWORD');
      });
    },
    registerUser: async ({ username, email, password }) => {
      return User.findOne({ email })
        .then(async isUserAlreadyExist => {
          if (isUserAlreadyExist) return responseTemplate('EMAIL_IS_ENGAGED');

          const newUser = {
            username,
            email,
            password: bcrypt.hashSync(password, 3),
            weight: null,
            gender: null,
            height: null,
            age: null,
            private: false,
            parties: [],
            friends: []
          };

          await User.create(newUser).then(async () => {
            req.session.email = email
            req.session.userId = await User.findOne({ email }).then(({ _doc }) => _doc._id)
            req.session.loggined = true;
          })



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
        return User.findOne({ email }).then(user => user)
      } else if (id) {
        return User.findOne({ _id: id }).then(user => user)
      } else {
        return User.findOne({ _id: userId }).then(user => user)
      }
    },
    uppdateUserData: async ({ email, username, weight, gender, height, age, isPrivate }) => {
      let user = await User.findOne({ _id: userId })

      user.email = email || user.email
      user.username = username || user.username
      user.weight = weight || user.weight
      user.gender = gender || user.gender
      user.height = height || user.height
      user.age = age || user.age
      user.isPrivate = isPrivate || user.isPrivate

      await user.save()

      return true
    },

    //party
    parties: async () => {
      const user = await User.findOne({ _id: userId })
      console.log(user, userId);

      return user.parties.map(partyId => Party.findOne({ _id: partyId }))
    },
    party: async ({ partyId }) => Party.findOne({ _id: partyId }),
    createParty: async ({ name }) => {
      const newParty = {
        name,
        owner: userId,
        isPartyOver: false,
        members: [userId],
        membersShots: [{ userId, shots: [] }]
      };

      await Party.create(newParty).then(async ({ _id }) => {
        const user = await User.findOne({ _id: userId })
        user.parties.push(_id)
        user.save()
      })

      return true
    },
    joinParty: async ({ partyId }) => {
      const party = await Party.findOne({ _id: ObjectId(partyId) })
      if (party.name) {
        party.members = [...party.members, userId]
        party.membersShots.push({ userId, shots: [] })
        await party.save();

        return true
      }
      return false
    },
    endParty: async ({ partyId }) => {
      const party = await Party.findOne({ _id: ObjectId(partyId) })
      if (party) {
        party.isPartyOver = true
        await party.save();

        return true
      }
      return false
    },

    //shots
    addShot: async ({ partyId, size, percent }) => {
      try {
        const party = await Party.findOne({ _id: ObjectId(partyId) })

        party.membersShots.find(memberShots => memberShots.userId.toString() === req.session.userId).shots.push({
          size, percent, date: new Date()
        })

        await party.save();

        return true
      } catch {
        return false
      }
    },
    shots: async ({ partyId }) => {
      try {
        const party = await Party.findOne({ _id: ObjectId(partyId) })
        return party.membersShots.find(memberShots => memberShots.userId.toString() === userId).shots
      } catch{
        return []
      }

    },
  }
}