import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSpots, fetchSpots } from '../../store/spot';
import './HomeSpots.css'



const SpotComponent = () => {
    const dispatch = useDispatch();
    const spotList = useSelector((state => Object.values(state.spots)));
    console.log(spotList)
    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    return (
        <div className="spot-list">

            {spotList?.map(spot => (
                <div key={spot.id} className="spot">
                <img src={spot.previewImage} alt={spot.name} />
                <div className="spot-info">
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
