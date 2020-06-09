import bcrypt from 'bcrypt';
import User from '../../models/user.js';

const responseTemplate = (status, username, email) => ({ status, username, email })

export default (req, res, next) => ({
  login: ({ email, password }) => {
    return User.findOne({ email }).then(({ _doc }) => {
      if (bcrypt.compareSync(password, _doc.password)) {
        req.session.email = _doc.email;
        req.session.loggined = true;
        return responseTemplate('SUCCESS', _doc.username, _doc.email);
      }
      return responseTemplate('WRONG_EMAIL_OR_PASSWORD');
    });
  },
  register: ({ username, email, password }) => {
    return User.findOne({ email })
      .then(isUserAlreadyExist => {
        if (isUserAlreadyExist) return responseTemplate('EMAIL_IS_ENGAGED');
        console.log(username);

        const newUser = {
          username,
          email,
          password: bcrypt.hashSync(password, 3),
          characters: [],
          campaigns: []
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
  }
});
////https://stackoverflow.com/questions/37059523/graphql-get-all-fields-from-nested-json-object