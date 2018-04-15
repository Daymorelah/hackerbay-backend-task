import User from '../../models';

const usermodel = User.User;

module.exports = {
  clearUSerdb() {
    usermodel.destroy({ truncate: true });
  },
  userDetails: {
    username: 'John Doe',
    password: 'johndoe',
    email: 'johndoe@wemail.com',
  },
  existingUsername: {
    username: 'John Doe',
    password: 'chicken',
    email: 'chicken@wemail.com',
  },
  existingEmail: {
    username: 'Jane Smith',
    password: 'janedoe',
    email: 'janedoe@wemail.com',
  },
  signinWithNullUsername: {
    username: null,
    password: 'mypassword',
  },
  signinWithNullPassword: {
    username: 'John Doe',
    password: null,
  },
  invalidEmail: {
    username: 'will smith',
    password: 'willsmith',
    email: 'williwilli',
  },
  validSignin: {
    username: 'John Doe',
    password: 'johndoe',
  },
  unexistingUsername: {
    username: 'Shonda rhymes',
    password: 'shonda',
  },
  unmatchingPassword: {
    username: 'John Doe',
    password: 'doejohn',
  },
  /* eslint-disable quote-props,quotes,comma-dangle,key-spacing,object-curly-spacing */
  jsonObject: {"car":"Honda"},
  jsonPatchObject:
    [{"op":"add", "path":"/phone", "value":"sony"}],
  invalidJsonPatchObject:
    [{ "ops": "add", "path": "/phone", "value": "sony" }],
  failTestOperation:
      [{ "op": "test", "path": "/car", "value": "Toyota" }],
};
