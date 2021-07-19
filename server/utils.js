const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token || token.length < 10)
    return res.status(401).send('Access Token Required');
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).send('Invalid Access Token');
    }
    req.data = decoded;
    next();
  });
};

module.exports = { validateToken };
