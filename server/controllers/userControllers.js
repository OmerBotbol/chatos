const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const reg = '[a-zA-Z0-9]$';
  if (
    email === '' ||
    password === '' ||
    !email.match(reg) ||
    !password.match(reg)
  )
    return res.status(403).send('Invalid email or password');
  const exists = await models.Users.findOne({ where: { email: email } });
  if (exists) return res.status(409).send('Email exists');
  const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  models.Users.create({
    username,
    email,
    password: hashedPassword,
  }).then(() => {
    res.status(201).json({
      email,
      username,
      image,
    });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await models.Users.findOne({ where: { email: email } });
  if (!userData) return res.status(404).json({ error: "User doesn't exists" });
  const isPasswordCorrect = bcrypt.compareSync(password, userData.password);
  if (!isPasswordCorrect)
    return res.status(403).json({ error: 'Incorrect password' });
  const accessToken = jwt.sign(
    { id: userData.id, username: userData.username },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: '15m',
    }
  );
  const refreshToken = jwt.sign(
    { id: userData.id, username: userData.username },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: '7d',
    }
  );
  res.send({
    accessToken,
    refreshToken,
    user: {
      id: userData.id,
      username: userData.username,
    },
  });
};

const updateAccessToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).send('refresh token is required');
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Invalid Refresh token' });
    }
    const newAccessToken = jwt.sign(
      { id: decoded.id, username: decoded.username, image: decoded.image },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '15m',
      }
    );
    res.json({
      accessToken: newAccessToken,
      id: decoded.id,
      username: decoded.username,
    });
  });
};

module.exports = { createUser, login, updateAccessToken };
