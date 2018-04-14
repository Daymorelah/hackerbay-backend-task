import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import jsonPatch from 'json-patch';
import imageDownloader from 'image-downloader';
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
            res.status(200).send({ message: 'Username already exist' });
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
                res.status(201).send({
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
            res.status(404).send({ message: 'Username or password does not exist' });
          } else if (!foundUser.verifyPassword(req.body.password, foundUser.password)) {
            res.status(404).send({ message: 'Username or password does not exist' });
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
  list(req, res) {
    return userModel.all({ attributes: ['username', 'email'] })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(404).send(error.message));
  },
  applyPatch(req, res) {
    const { jsonObject, jsonPatchObject } = req.body;
    try {
      const newJsonObject = jsonPatch.apply(JSON.parse(jsonObject), JSON.parse(jsonPatchObject));
      res.status(201).send({ newJsonObject });
    } catch (error) {
      if (JSON.parse(jsonPatchObject)[0].op === 'test') {
        res.status(400).send({ Message: error.message });
      } else {
        res.status(400).send({ 'Error type': error.name, Message: error.message });
      }
    }
  },
  createThumbnail(req, res) {
    const { imageUrl } = req.body;
    const options = {
      url: imageUrl,
      dest: path.resolve(__dirname, 'server', 'image'),
      timeout: 4000,
    };
    imageDownloader.image(options)
      .then(({ filename, image}) => {

      }).catch( error => res.status(401).send(error.message));
  },
};
