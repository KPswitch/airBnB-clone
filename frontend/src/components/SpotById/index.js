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


              const previewImage = spot?.SpotImages?.find(image => image.previewImage);
              const imageUrl = previewImage ? previewImage.url : "";
              const images = spot?.SpotImages?.filter(image => !image.previewImage)



              useEffect(() => {
                dispatch(fetchSpotById(id))
              //dispatch(fetchReviews(id))
              }, [dispatch, id])


            //const reviews = useSelector(state => state.reviews[id])



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

        <button onClick={handleReserveClick}>Reserve</button>
      </div>
      </div>

      </div>

    )
}
export default SpotDetails;
