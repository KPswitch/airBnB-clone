const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models')
const router = express.Router();



router.get('/', async (req, res) => {
      const spots = await Spot.findAll();
      //console.log(spots)
      return res.json(spots);
    }
  );

  router.post('/', async (req, res) => {

    const {address, city, state, country, lat, lng, name, description, price} = req.body
    await spot.create
  })

module.exports = router;
