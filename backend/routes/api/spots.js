const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { User, Spot, SpotImage, Sequelize, Review, ReviewImage, Booking} = require('../../db/models');

let schema;
if (process.env.NODE_ENV === 'production'){
  schema = process.env.SCHEMA
}
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
      ownerId: req.user.id,
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
    const spot = await Spot.findByPk(req.params.spotid)
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

  router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
      include: [
        {
          model: Review,
          attributes: [[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']]
        },
        {
          model: User,
          attributes: ['firstName', 'lastName']
       }],
       attributes: {
        include: [
          [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating',],
          [Sequelize.literal(`(SELECT url FROM ${schema ? `"${schema}"."SpotImages"` : 'SpotImages'}
          WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."previewImage" = true LIMIT 1)`), 'previewImage']
        ]
      }}
    );
    if(spot.id === null) res.status(404).json('No spot exist with given id.');
    res.json(spot);
  });

  router.put('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if(spot && spot.ownerId === req.user.id){
      const {address, city, state, country, lat, lng, name, description, price} = req.body;
     await spot.update({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng:lng,
        name: name,
        description: description,
        price: price
    }, {
      where: {
        id: req.params.spotId
      }})
    res.json(spot)
    } else {
      res.status(404).json('Spot does not exist')
    }
  })

  router.post('/:spotId/reviews', requireAuth, async (req, res) => {
      const spot = await Spot.findByPk(req.params.spotId);
      if(!spot) res.status(404).json('Spot doesnt exist');
     const existingReview = await Review.findOne({
      where:{
        userId: req.user.id,
        spotId: parseInt(req.params.spotId) }
      })
      if(existingReview) res.status(403).json('Review already exists');
      else {
      const {review, stars} = req.body;
      const newReview = await Review.create(
       { userId: req.user.id,
        spotId: req.params.spotId,
        review: review,
        stars: stars });
      res.json(newReview)}
  })

  router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot) res.status(404).json('Spot does not exist')
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
            model: Spot,
        },
        include: {
            model: User,
            attributes: ['firstName', 'lastName']
        },
        include: {
            model: ReviewImage,
        }

    })
    res.json(reviews);
})

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot) res.status(404).json('Spot does not exist')
    const {startDate, endDate} = req.body;
    const checkBooking = await Booking.findOne({
      where: {
        spotId: parseInt(req.params.spotId),
        startDate: {
          [Op.lt]: new Date(endDate)
        },
        endDate: {
          [Op.gt]: new Date(startDate)
        }
      }
    });
    if (checkBooking) {
      res.status(403).json('Booking already exists for this spot on requested dates');
    }
    if(spot.ownerId === req.user.id) res.status(400).json('You cant book spots that you own')

    else {
      const newBooking = await Booking.create({
        spotId: parseInt(req.params.spotId),
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
      })
      res.json(newBooking)
    }

})

router.get('/:spotIdForBooking/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotIdForBooking);
  if(!spot) res.status(404).json('Spot does not exist');
  if(spot.ownerId !== req.user.id){
    const booked = await Booking.scope('forGuest').findAll()
    res.json(booked)
  };
  if(spot.ownerId === req.user.id) {
    const booked = await Booking.scope({ method: ["forOwner", req.user.id]}).findAll()
    res.json(booked)
  }

})


module.exports = router;
