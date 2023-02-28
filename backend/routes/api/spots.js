const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
// let schema;
// if (process.env.NODE_ENV === 'production'){
//   schema = process.env.SCHEMA
// }
const env = process.env.NODE_ENV
const schema = process.env.SCHEMA
const tableReview = env ===  "production" ? schema + '."Reviews"' : "Reviews"
const tableImage = env ===  "production" ? schema + '."SpotImages"' : "SpotImages"
const { User, Spot, SpotImage, Sequelize, Review, ReviewImage, Booking} = require('../../db/models');

const router = express.Router();


router.get('/', async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 20;
      const minLat = parseFloat(req.query.minLat) || -90;
      const maxLat = parseFloat(req.query.maxLat) || 90;
      const minLng = parseFloat(req.query.minLng) || -180;
      const maxLng = parseFloat(req.query.maxLng) || 180;
      const minPrice = parseFloat(req.query.minPrice) || 0;
      const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

      if (page < 1 || page > 10) {
        return res.status(400).json({ message: 'Invalid page parameter' });
      }
      if (size < 1 || size > 20) {
        return res.status(400).json({ message: 'Invalid size parameter' });
      }
      if (minLat < -90 || minLat > 90 || maxLat < -90 || maxLat > 90 || minLat > maxLat) {
        return res.status(400).json({ message: 'Invalid latitude parameters' });
      }
      if (minLng < -180 || minLng > 180 || maxLng < -180 || maxLng > 180 || minLng > maxLng) {
        return res.status(400).json({ message: 'Invalid longitude parameters' });
      }
      if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
        return res.status(400).json({ message: 'Invalid price parameters' });
      }
      const spots = await Spot.findAll({
        limit: size,
        offset: (page -1) * size,
        where: {
          lat: { [Op.between]: [minLat, maxLat] },
          lng: { [Op.between]: [minLng, maxLng] },
          price: { [Op.between]: [minPrice, maxPrice] }
        },
        attributes: {
          include: [
              [Sequelize.literal(
                  `(SELECT AVG(stars)
                  FROM ${tableReview}
                  WHERE "spotId" = "Spot".id)`
              ), "avgRating"],
              [Sequelize.literal(
                  `(SELECT "url"
                  FROM ${tableImage}
                  WHERE "spotId" = "Spot".id AND "previewImage" = true Limit 1)`
              ), "previewImage"]
          ]
      }
        // include: [
        //   // {
        //   //   model: Review,
        //   //   attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        //   //   // ,group: ['spotId']
        //   // },
        //   {
        //     model: SpotImage,
        //     attributes: ['url'],
        //     where: {
        //       previewImage: true
        //   }
        // }
        // ]


      });
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
            },
            attributes: {
              include: [
                  [Sequelize.literal(
                      `(SELECT AVG(stars)
                      FROM ${tableReview}
                      WHERE "spotId" = "Spot".id)`
                  ), "avgRating"],
                  [Sequelize.literal(
                      `(SELECT "url"
                      FROM ${tableImage}
                      WHERE "spotId" = "Spot".id AND "previewImage" = true Limit 1)`
                  ), "previewImage"]
              ]
          }
        })
        res.json(spots)
  } )

  router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findAll({
      where:  {id: req.params.spotId},

      attributes: {
        include: [
            [Sequelize.literal(
                `(SELECT AVG(stars)
                FROM ${tableReview}
                WHERE "spotId" = "Spot".id)`
            ), "AvgStarRating"], [
              Sequelize.fn('COUNT', Sequelize.col('reviews.spotId')),
              'numReviews',
            ]],
            },
            include: [
              {
                model: Review,
                attributes: [],
              },
              {
                model: SpotImage,
                attributes: ["id", "url", "previewImage"],
              },
              {
                model: User,
                attributes: ["id", "firstName", "lastName"],
              },
            ],

    }
  );
    //spot.numReviews = spot.Reviews.length;
    if(!spot) res.status(404).json('No spot exist with given id.');
   else res.json(spot);
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

router.delete('/:spotId', requireAuth, async (req, res) => {
  //const id = parseInt(req.params.spotImageId)

  const spot = await Spot.findByPk(req.params.spotId);
  if(spot){
      //if( new Date(booking.startDate) < new Date()) res.status(403).json("Bookings that have been started can't be deleted")
  //const spot = await Spot.findByPk(booking.spotId);
  if (spot.ownerId === req.user.id){
      await spot.destroy();
      res.status(200).json("Successfully deleted")
  } else res.status(404).json('Can not delete spots you do not own')} else
  res.status(404).json("Spot couldn't be found")
})



module.exports = router;
