const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { User, Spot, SpotImage, Sequelize, Review, ReviewImage, Booking} = require('../../db/models');
const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: Spot }
            ]
    })
    res.json(bookings)
})

module.exports = router
