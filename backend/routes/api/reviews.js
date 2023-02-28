const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage} = require('../../db/models');
const router = express.Router();



router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    if(review && req.user.id == review.userId){
        const {url} = req.body;
        const newImage = await ReviewImage.create({
            reviewId: review.id,
            url: url
        })
        res.json(newImage)
    } else res.status(404).json("review does not exist")
})

router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: User,
            attributes: ['firstName', 'lastName']
        },
        include: {
            model: Spot,
            attributes: ['id']
        },
        include: {
            model: ReviewImage,
        }

    })
    res.json(reviews);
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    const findReview = await Review.findByPk(req.params.reviewId);
    if(findReview && findReview.userId === req.user.id){
        const {review, stars} = req.body
        await findReview.update({
            review: review,
            stars: stars
        },{
            where: {
                id: req.params.reviewId
            }
        })
        res.json(findReview)
    }
    else {
        res.status(404).json('Review does not exist')
    }
})

router.delete('/:reviewId', requireAuth, async (req, res) => {

    const review = await Review.findByPk(req.params.reviewId);
    if(review){
    //const spot = await Spot.findByPk(booking.spotId);
    if (review.userId === req.user.id){
        await review.destroy();
        res.status(200).json("Successfully deleted")
    } else res.status(404).json('Can not delete reviews you do not own')} else
    res.status(404).json("Review couldn't be found")
})



module.exports = router;
