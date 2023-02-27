const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { User, Spot,Booking} = require('../../db/models');
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

router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if(booking) {
    if(booking.userId === req.user.id){
        const {startDate, endDate} = req.body;
        await booking.update({
            startDate: startDate,
            endDate: endDate
        },
        )
        res.json(booking)

        }}
        else res.status(404).json('Booking couldnt be found')
    })

    router.delete('/:bookingId', requireAuth, async (req, res) => {
        //const id = parseInt(req.params.spotImageId)

        const booking = await Booking.findByPk(req.params.bookingId);
        if(booking){
            if( new Date(booking.startDate) < new Date()) res.status(403).json("Bookings that have been started can't be deleted")
        const spot = await Spot.findByPk(booking.spotId);
        if (spot.ownerId === req.user.id || booking.userId === req.user.id){
            await booking.destroy();
            res.status(200).json("Successfully deleted")
        } else res.status(404).json('Can not delete images you do not own')} else
        res.status(404).json("Booking couldn't be found")
    })

module.exports = router
