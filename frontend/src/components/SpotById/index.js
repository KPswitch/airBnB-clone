import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSpotById } from '../../store/spot'
import { fetchReviews } from '../../store/review'
import './SpotById.css'



const SpotDetails = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spots[id])
    const reviewz = useSelector(state => state.reviews)
    const [numReviews, setNumReviews] = useState(0);

    //const reviews = useSelector(state => state.reviews);
    //console.log(reviews)

    const SpotRating = ({ rating }) => {
      if (rating) {
        const fullStarIcon = '⭐️';
        return (
          <span className="spot-rating">
                  <span role="img" aria-label="star">{fullStarIcon}</span> {rating.toFixed(1)}
                </span>
                )
              } else {
                return <span className='spot-rating'>New</span>
              };}

    const formatDate = (dateString) => {
      const dateObj = new Date(dateString);
      const month = dateObj.toLocaleString('default', { month: 'long' });
      const year = dateObj.getFullYear();
      const date = dateObj.getDate();
      return `${month} ${date}, ${year}`;
    }

    const formatReview = (review) => {
      //const user = review.userId;
      //const firstName = user.firstName;
      const date = formatDate(reviewz.createdAt);
      const content = review.review;
      return (
        <div key={review.id} className="review">
          <p>firstName</p>
          <p>{date}</p>
          <p>{content}</p>
          <p>{review}</p>
        </div>
      );
    }


              const previewImage = spot?.SpotImages?.find(image => image.previewImage);
              const imageUrl = previewImage ? previewImage.url : "";
              const images = spot?.SpotImages?.filter(image => !image.previewImage)
              const reviewsArr = Object.values(reviewz).map(obj =>obj.review)
              //const reviewsArr = Object.values(reviewz).map(({review, createdAt, userId}) => ({review, createdAt, userId}));

              console.log("test here")
              console.log(reviewsArr)
              console.log(reviewz)
             // const reviewCount = reviews.length

              //console.log(reviewCount)

              useEffect(() => {
                dispatch(fetchSpotById(id));
              dispatch(fetchReviews(id)).then(reviews => setNumReviews(reviews.length))
               // dispatch(fetchReviews(id))
            }, [dispatch, id])


            //const reviews = useSelector(state => state.reviews[id])
            const reviewCount = numReviews?.length



    if(!spot) {
        return <div>Spot not Found</div>
    }

    const handleReserveClick = () => {
        alert("Feature coming soon")
      }

    return (
        <div>
        <h1>{spot.name}</h1>
        <p>{spot.city}, {spot.state}, {spot.country}</p>
        <div className="image-wrapper">
        <img src={imageUrl} alt={spot.name} className="large-image" />
        <div className="small-image">
        { images?.map(image => <img key={image.id} src={image.url} alt={spot.name} />)}
    </div>
      </div>
      <div className ='details-container'>
        <div className='hosted-by'>

      <h2>Hosted by  </h2>
      <p>{spot.description}</p>
        </div>
      <div className="callout-box">
        <p>Price: ${spot.price}/night</p>
        <SpotRating rating={spot.AvgStarRating} />
        <p>{reviewsArr.length} Reviews</p>

        <button onClick={handleReserveClick}>Reserve</button>
      </div>

      </div>
      <div style={{ borderBottom: '1px solid black', paddingBottom: '10px'}}></div>
      <div>
      <SpotRating rating={spot.AvgStarRating} />
      <h2>
      {reviewsArr.length} Reviews
      </h2>
      {reviewsArr.map(review => formatReview(review))}
      </div>
      <div>

      </div>

      </div>

    )
}
export default SpotDetails;
