const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);

  creds.password = hash;

  db('users')
  .insert(creds)
  .then(ids=> {
      res.status(201).json({message:'user added', ids});
  })
  .catch(err => console.log(err) && res.status(500).json(err))
}

function login(req, res) {
  const creds = req.body;

  db('users')
  .where({ username: creds.username })
  .first()
  .then(user => {
      if (user && bcrypt.compareSync(creds.password,user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: 'welcome user', token})
      } else {
          res.status(401).json({ message: 'the password or username was incorrect'})
      }
  })
  .catch(err => res.status(500).json({ message: 'error', err}))
}

function getJokes(req, res) {
  axios
    .get(
      'https://safe-falls-22549.herokuapp.com/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', err });
    });
}
