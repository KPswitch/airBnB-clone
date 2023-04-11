import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSpotById } from '../../store/spot'
import './SpotById.css'


const SpotDetails = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spots[id])

    useEffect(() => {
        dispatch(fetchSpotById(id))
    }, [dispatch, id])

    if(!spot) {
        return <div>Spot not Found</div>
    }

    return (
        <div>
        <h1>{spot.name}</h1>
        <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
        <div className="image-wrapper">
        <img src={spot.previewImage} alt={spot.name} className="large-image" />

      </div>
        <p>{spot.description}</p>
        <img src={spot.image} alt={spot.name} />
      </div>

    )
}
export default SpotDetails;
