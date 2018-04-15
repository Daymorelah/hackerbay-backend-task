import crypto from 'crypto';

function encrypt(text) {
  const cipher = crypto.createCipher('aes192', 'my secrete');
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
function decrypt(text) {
  const decipher = crypto.createDecipher('aes192', 'my secrete');
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'username already exists',
        },
        validate: {
          notEmpty: {
            msg: 'field must not be empty',
          },
        },
      },
      password: {
        type: DataTypes.STRING(1234),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'field must not be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'email already exists',
        },
        validate: {
          notEmpty: {
            msg: 'field must not be empty',
          },
          isEmail: {
            args: true,
            msg: 'Please enter a valid email',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          /* eslint-disable no-param-reassign */
          user.password = encrypt(user.password);
        },
        beforeUpdate(user) {
          if (user.password) {
            user.password = encrypt(user.password);
            user.updateAt = Date.now();
          }
        },
      },
    },
  ); // end of define method
  User.associate = () => {};
  User.prototype.verifyPassword = (bodyPassword, dataBasePassword) => {
    const decrypted = decrypt(dataBasePassword);
    return decrypted === bodyPassword;
  };
  return User;
};
