import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSpots, fetchSpots, fetchSpotById } from '../../store/spot';
import './HomeSpots.css'



const SpotComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const spotList = useSelector((state => Object.values(state.spots)));
    const SpotRating = ({ rating }) => {
        if (rating) {
           // const fullStars = Math.floor(rating);
           // const halfStar = (rating - fullStars) >= 0.5;
           // const emptyStars = 5 - fullStars - halfStar;
           // const fullStarIcon = '⭐️'.repeat(fullStars);
            const fullStarIcon = '⭐️';
          //  const halfStarIcon = halfStar ? '½⭐️' : '';
           // const emptyStarIcon = '☆'.repeat(emptyStars);
            return (
                <span className="spot-rating">
                  <span role="img" aria-label="star">{fullStarIcon}</span> {rating.toFixed(1)}
                </span>
                )
      } else {
        return <span className='spot-rating'>New</span>
      };}

    console.log(spotList)
    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    const handleSpotClick = (spotId) => {
        dispatch(fetchSpotById(spotId))
        history.push(`/spots/${spotId}`)
    }

    return (
        <div className="spot-list">

            {spotList?.map(spot => (
                <div key={spot.id} className="spot" onClick={() => handleSpotClick(spot.id)}>
                <img src={spot.previewImage} alt={spot.name} />
                <div className="spot-info">
                  <SpotRating rating={spot.avgRating} />
                  <h2>{spot.name}</h2>
                  <p>{spot.city}, {spot.state}</p>
                  <p>Price: ${spot.price}/night</p>
                </div>
              </div>

            ))}
        </div>
    )
}

export default SpotComponent
