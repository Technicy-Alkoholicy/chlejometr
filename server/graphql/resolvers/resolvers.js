const ObjectId = require('mongodb').ObjectID;

// import { PubSub }
import bcrypt from 'bcrypt';

import User from '../../models/user.js';
import Party from '../../models/party.js';

const responseTemplate = (status, username, email) => ({ status, username, email })

export default (req, res, next) => {
  const { userId, email, username, isLoggined } = req.session

  const userResolver = async ({ username, id }) => {
    let user
    if (username) {
      user = await User.findOne({ username })
    } else if (id) {
      user = await User.findOne({ _id: id })
    } else {
      user = await User.findOne({ _id: userId })
    }

    // user.parties.forEach
    console.log(user);

    return user
  }

  const partiesResolver = async () => {
    if (!isLoggined) return null

    const user = await User.findOne({ _id: userId })
    return user.parties.map(partyId => {
      return Party.findOne({ _id: partyId }).then(async res => ({
        _id: res._id,
        name: res.name,
        owner: await User.findOne({ _id: res.owner }),
        isPartyOver: res.isPartyOver,
        members: res.members.map(async id => await User.findOne({ _id: id })),
        membersShots: res.membersShots.map(async memberShots => ({
          user: await User.findOne({ _id: memberShots.userId }),
          shots: memberShots.shots
        }))
      }))
    })
  }

  const partyResolver = async ({ partyId }) => {
    return Party.findOne({ _id: partyId }).then(async res => ({
      _id: res._id,
      name: res.name,
      owner: await User.findOne({ _id: res.owner }),
      isPartyOver: res.isPartyOver,
      members: res.members.map(async id => await User.findOne({ _id: id })),
      membersShots: res.membersShots.map(async memberShots => ({
        user: await User.findOne({ _id: memberShots.userId }),
        shots: memberShots.shots
      }))
    }))
  }

  return {
    // register and login
    loginUser: async ({ email, password }) => {
      return User.findOne({ email }).then(async ({ _doc }) => {
        if (bcrypt.compareSync(password, _doc.password)) {
          req.session.email = email
          req.session.username = _doc.username
          req.session.userId = _doc._id
          req.session.isLoggined = true;
          return responseTemplate('SUCCESS', _doc.username, _doc.email);
        }
        return responseTemplate('WRONG_EMAIL_OR_PASSWORD');
      });
    },
    registerUser: async ({ username, email, password }) => {
      const checkEmail = await User.findOne({ email })
      const checkUsername = await User.findOne({ username })

      if (checkUsername && checkEmail) return responseTemplate('USERNAME_AND_EMAIL_ARE_ENGAGED');
      if (checkUsername) return responseTemplate('USERNAME_IS_ENGAGED');
      if (checkEmail) return responseTemplate('EMAIL_IS_ENGAGED');

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

      await User.create(newUser)

      req.session.email = email
      req.session.username = username
      req.session.userId = await User.findOne({ email }).then(({ _doc }) => _doc._id)
      req.session.isLoggined = true;

      return responseTemplate('SUCCESS', username, email);

    },
    logOut: async () => {
      req.session.email = ""
      req.session.userId = ""
      req.session.isLoggined = "";

      return true
    },
    isUserLogined: () => {
      if (isLoggined) {
        return responseTemplate("USER_IS_LOGINED", username, email)
      } else {
        return responseTemplate("USER_IS_NOT_LOGINED")
      }
    },
    //user
    users: () => {
      return User.find()
        .then(user => user)
    },
    user: userResolver,
    uppdateUserData: async ({ passwordToChange, email, username, weight, gender, height, age, isPrivate }) => {
      let user = await User.findOne({ _id: userId })

      if (!isLoggined) return null
      if (email || username || password) {
        if (!bcrypt.compareSync(passwordToChange, user.password)) return false
      }


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

    //friends
    inviteFriend: async ({ friendUsername }) => {
      const friend = await User.findOne({ username: friendUsername })

      friend.friendInvitations = [...friend.friendInvitations, userId]
      console.log(friend);
      await friend.save()

      return true
    },

    //party
    parties: partiesResolver,
    party: partyResolver,
    createParty: async ({ name }) => {
      if (!isLoggined) return null

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
      if (!isLoggined) return null

      const party = await Party.findOne({ _id: ObjectId(partyId) })
      const user = await User.findOne({ _id: userId })

      if (party.name) {
        party.members = [...party.members, userId]
        party.membersShots.push({ userId, shots: [] })
        party.save();

        user.parties.push(partyId)
        user.save()

        return true
      }
      return false
    },
    endParty: async ({ partyId }) => {
      if (!isLoggined) return null

      const party = await Party.findOne({ _id: ObjectId(partyId) })
      if (party) {
        party.isPartyOver = true
        await party.save();

        return true
      }
      return false
    },
    leaveParty: async ({ partyId }) => {
      const party = await Party.findOne({ _id: partyId })
      const memberIndex = party.members.findIndex(member => member === userId)
      party.members.splice(memberIndex, 1)
      await party.save()

      const user = await User.findOne({ _id: userId })
      const partyIndex = user.parties.findIndex(party => party === partyId)
      user.parties.splice(partyIndex, 1)
      await user.save()

      return true
    },
    kickFromParty: async ({ partyId, userId, username }) => {
      const party = await Party.findOne({ _id: partyId })
      const memberIndex = party.members.findIndex(member => member === userId)
      party.members.splice(memberIndex, 1)
      party.save()

      const user = userId ? await User.findOne({ _id: userId }) : await User.findOne({ username })
      const partyIndex = user.parties.findIndex(party => party === partyId)
      user.parties.splice(partyIndex, 1)
      user.save()

      return true
    },

    //shots
    addShot: async ({ partyId, size, percent }) => {
      if (!isLoggined) return null

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
      if (!isLoggined) return null

      try {
        const party = await Party.findOne({ _id: ObjectId(partyId) })
        return party.membersShots.find(memberShots => memberShots.userId.toString() === userId).shots
      } catch{
        return []
      }

    },
  }
}