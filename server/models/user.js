import crypto from 'crypto';

const cipher = crypto.createCipher('aes192', 'my secrete');
const decipher = crypto.createDecipher('aes192', 'my secrete');

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
        type: DataTypes.STRING,
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
          let encrypted = cipher.update(user.password, 'utf8', 'hex');
          encrypted += cipher.final('hex');
          user.password = encrypted;
        },
        beforeUpdate(user) {
          if (user.password) {
            let encrypted = cipher.update(user.password, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            user.password = encrypted;
            user.updateAt = Date.now();
          }
        },
      },
    },
  ); // end of define method
  User.associate = () => {};
  User.prototype.verifyPassword = (bodyPassword, basePassword) => {
    let decrypted = decipher.update(basePassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted === bodyPassword;
  };
  return User;
};
