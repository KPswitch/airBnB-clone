const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const validateSignup = [
  check('firstName')
  .notEmpty()
  .withMessage('First Name is required'),
  check('lastName')
  .notEmpty()
  .withMessage('Last Name is required'),
  check('email')
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage('Please provide a valid email.'),
  check('username')
  .exists({ checkFalsy: true })
  .isLength({ min: 4 })
  .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
  .not()
  .isEmail()
  .withMessage('Username cannot be an email.'),
  check('password')
  .exists({ checkFalsy: true })
  .isLength({ min: 6 })
  .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const router = express.Router();


router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { username, email, firstName, lastName, password} = req.body;
      const checkEmail = await User.findOne({
        where: {
          email: email
        }
      })
      const checkUser = await User.findOne ({
        where: {
          username: username
        }
      })
      if(checkEmail) {
        const err = new Error("User already exists");
        err.status = 403
        err.errors = {
          email: 'User with that email already exists'

        };
        return next(err);
      };
      if(checkUser) {
        const err = new Error("User already exists");
        err.status = 403
        err.errors = {
          email: 'User with that username already exists'

        };
        return next(err);
      }
      const user = await User.signup({ username, email, firstName, lastName, password });

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    }
  );

  router.get(
    '/',
    requireAuth,
    async (req, res, next) => {
      try {
        const users = await User.findAll();
        return res.json(users);
      } catch (err) {
        next(err);
      }
    }
  );



module.exports = router;
