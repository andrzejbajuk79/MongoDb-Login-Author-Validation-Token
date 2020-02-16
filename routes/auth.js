const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {
 //Validate data

 const {error} = registerValidation(req.body);
 //Getting Error message
 if (error) return res.status(400).send(error.details[0].message);

 //Hash Password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(req.body.password, salt);

 //checking if user exist
 const emailExist = await User.findOne({email: req.body.email});

 if (emailExist) return res.status(200).send('Email already exist');
 //Create new User
 const user = new User({
  name: req.body.name,
  email: req.body.email,
  password: hashedPassword,
 });
 try {
  const savedUser = await user.save();
  res.send({user: user._id});
 } catch (err) {
  res.status(400).send(err);
 }
});

//Login

router.post('/login', async (req, res) => {
 const {error} = loginValidation(req.body);
 //Getting Error message
 if (error) return res.status(400).send(error.details[0].message);
 //checking if email exist
 const user = await User.findOne({email: req.body.email});
 if (!user) return res.status(200).send('Zly Email ');

 //password is correct
 const validPass = await bcrypt.compare(req.body.password, user.password);
 if (!validPass) return res.status(400).send('Zle haslo');

 //Creatte and assign token
 const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
 res.header('auth-token', token).send(token);

 // res.send('Logged in!!!');
});

module.exports = router;
