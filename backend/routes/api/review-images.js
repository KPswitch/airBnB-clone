const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage} = require('../../db/models');
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    //const id = parseInt(req.params.spotImageId)

    const image = await ReviewImage.findByPk(req.params.imageId);
    if(image){
    const review = await Review.findByPk(image.reviewId);
    if (review.userId === req.user.id){
        await image.destroy();
        res.status(200).json("Successfully deleted")
    } else res.status(404).json('Can not delete images you do not own')} else
    res.status(404).json("image does not exist")
})

module.exports = router
