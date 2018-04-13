import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';

dotenv.config();

const userModel = models.User;
const secrete = process.env.SECRETE;

export default {
  signUp(req, res) {
    if (req.body.username && req.body.password && req.body.email) {
      userModel.findOne({ where: { username: req.body.username } })
        .then((existingUser) => {
          if (existingUser) {
            res.status(201).send({ message: 'Username already exist' });
          } else {
            userModel.create({
              username: req.body.username,
              password: req.body.password,
              email: req.body.email,
            })
              .then((newUser) => {
                const token = jwt.sign(
                  {
                    userId: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                  },
                  secrete,
                  { expiresIn: '10h' },
                );
                res.status(200).send({
                  token,
                  message: `user ${newUser.username} has been created`,
                });
              })
              .catch(error => res.status(400).send({ message: error.message }));
          }
        })
        .catch(error => res.status(400).send({ message: error.message }));
    } else {
      res.status(400).send({ message: 'Incomplete registration details' });
    }
  },
  signIn(req, res) {
    if (req.body.username && req.body.password) {
      userModel.findOne({ where: { username: req.body.username } })
        .then((foundUser) => {
          if (!foundUser) {
            res.status(201).send({ message: 'Username or password does not exist' });
          } else if (!foundUser.verifyPassword(req.body.password, foundUser.password)) {
            res.status(201).send({ message: 'Username or password does not exist' });
          } else {
            const token = jwt.sign({
              userId: foundUser.id,
              username: foundUser.username,
              email: foundUser.email,
            }, secrete, { expiresIn: '10h' });
            res.status(200).send({
              token,
              message: 'Login successfull',
            });
          }
        })
        .catch(error => res.status(400).send({ message: error.message }));
    } else {
      res.status(400).send({ message: 'Incomplete login details' });
    }
  },
};
