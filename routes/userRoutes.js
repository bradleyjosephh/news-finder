const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  const { name, username, email, } = req.body
  User.register(new User({ name, username, email }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

router.get('/users', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})


router.put('/users/:id', async function (req, res) {
  await User.findByIdAndUpdate(req.params.id, req.body)
  res.sendStatus(200)
})


module.exports = router