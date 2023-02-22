const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');

const router = express.Router();



router.get('/', async (req, res) => {
      const spots = await Spot.findAll();
      //console.log(spots)
      return res.json(spots);
    }
  );

  router.post('/', requireAuth, async (req, res) => {

    const {address, city, state, country, lat, lng, name, description, price} = req.body
     const newSpot = await Spot.create({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng:lng,
        name: name,
        description: description,
        price: price
    })
    const userId = req.user.id;
    const user = await User.getCurrentUserById(userId);
    await user.addSpot(newSpot)

    res.status(201).json(newSpot)
  })

  router.post('/:spotid/images', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotid)
    const {url, previewImage} = req.body;
    if (spot && spot.ownerId === req.user.id){
        const image = await SpotImage.create({
            url: url,
            previewImage: previewImage
        })
        if (previewImage == true) {
            spot.previewImage = url
        }
        await spot.addSpotImage(image)
        res.status(201).json(image)
    }
    else {
        res.status(404).json('You can only add images to spots you own.')
    }
  })

  router.get('/current', requireAuth, async (req, res) => {

        const spots = await Spot.findAll({
            where: {
                ownerId: req.user.id
            }
        })
        res.json(spots)
  } )

module.exports = router;
