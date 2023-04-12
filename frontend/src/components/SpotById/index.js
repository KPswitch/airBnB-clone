import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSpotById } from '../../store/spot'
import './SpotById.css'


const SpotDetails = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spots[id])
    //const owner = useSelector(state => state.users[spot.ownerId]);

    const previewImage = spot?.SpotImages?.find(image => image.previewImage);
    const imageUrl = previewImage ? previewImage.url : "";
    const images = spot?.SpotImages?.filter(image => !image.previewImage)
    //const hasImages = images && images.length > 0;

    useEffect(() => {
        dispatch(fetchSpotById(id))
    }, [dispatch, id])

    if(!spot) {
        return <div>Spot not Found</div>
    }

    const handleReserveClick = () => {
        alert("Feature coming soon")
      }

    return (
        <div>
        <h1>{spot.name}</h1>
        <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
        <div className="image-wrapper">
        <img src={imageUrl} alt={spot.name} className="large-image" />
        <div className="small-image">
        { images?.map(image => <img key={image.id} src={image.url} alt={spot.name} />)}
    </div>
      </div>
      <p>Hosted by  </p>
      <p>{spot.description}</p>
      <div className="callout-box">
        <p>Price: ${spot.price}/night</p>
        <button onClick={handleReserveClick}>Reserve</button>
      </div>

      </div>

    )
}
export default SpotDetails;
