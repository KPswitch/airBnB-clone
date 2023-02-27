const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');
const router = express.Router();


router.delete('/:spotImageId', requireAuth, async (req, res) => {
    //const id = parseInt(req.params.spotImageId)

    const image = await SpotImage.findByPk(req.params.spotImageId);
    if(image){
    const spot = await Spot.findByPk(image.spotId);
    if (spot.ownerId === req.user.id){
        await image.destroy();
        res.status(200).json("Successfully deleted")
    } else res.status(404).json('Can not delete images you do not own')} else
    res.status(404).json("image does not exist")
})

module.exports = router
