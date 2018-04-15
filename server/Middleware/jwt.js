import jwt from 'jsonwebtoken';

const secrete = process.env.SECRETE;

export default {
  checkToken(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'] || req.query.token;
    if (!token) {
      return res.status(403).send({ message: 'User not authorized' });
    }
    return jwt.verify(token, secrete, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Token Authentication failed' });
      }
      req.decoded = decoded;
      return next();
    });
  },
};
