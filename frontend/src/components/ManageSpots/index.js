import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchSpots, fetchSpotById, deleteSpot } from "../../store/spot";
import updateSpotComponent from "../UpdateSpotForm";

import "./ManageSpots.css"
import UpdateSpotComponent from "../UpdateSpotForm";



const ManageSpotsComponent = () => {
    const dispatch = useDispatch()
    const history =  useHistory()
    const spots = useSelector(state => Object.values(state.spots));
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false)
    const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [spotIdToUpdate, setSpotIdToUpdate] = useState(null);
  const [spotToDelete, setSpotToDelete] = useState(null);

  const handleDeleteClick = (spot) => {
    setSpotToDelete(spot);
    setShowModal(true);
  };
  const handleDeleteSpot = (spot) => {
    dispatch(deleteSpot(spot.id));
    setShowModal(false);
  };


    const userSpots = spots.filter(spot => spot.ownerId === user.id);
    const SpotRating = ({ rating }) => {
        if (rating) {
         const fullStarIcon = '⭐️';
            return (
                <span className="spot-rating">
                  <span role="img" aria-label="star">{fullStarIcon}</span> {rating}
                </span>
                )
      } else {
        return <span className='spot-rating'>New</span>
      };}

      useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

      const handleSpotClick = (spotId) => {
          if (!user || !spots || !spots.length) {
              return (
                <div>
                  <h1>Manage Spots</h1>
                  <p>You have not posted any spots yet.</p>
                  <NavLink to="/spots/new">Create a New Spot</NavLink>
                </div>
              );
            }
        if(!isUpdateClicked){
            setSpotIdToUpdate(null);
            setShowModal(false);
            dispatch(fetchSpotById(spotId))
            history.push(`/spots/${spotId}`)
        } else {
            setIsUpdateClicked(false);
            setSpotIdToUpdate(spotId);
            setShowModal(true);
        }


    }
    const handleUpdateClick = (spotId) => {
        setIsUpdateClicked(true)
        setSpotIdToUpdate(spotId);

      setShowModal(true)
    };

    const handleCloseModal = () => {
        setIsUpdateClicked(false)
        setSpotIdToUpdate(null)
      setShowModal(false)
    }

    const spotToUpdate = spotIdToUpdate ? userSpots.find(spot => spot.id === spotIdToUpdate) : null;
    const ModalContent = () => {
        if (spotIdToUpdate) {
          return <UpdateSpotComponent data={spotToUpdate} />;
        } else if (spotToDelete) {
          return (
            <>
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to remove this spot?</p>
              <button onClick={() => handleDeleteSpot(spotToDelete)}>
                Yes (Delete Spot)
              </button>
              <button
                onClick={() => {
                  setSpotToDelete(null);
                  setShowModal(false);
                }}
              >
                No (Keep Spot)
              </button>
            </>
          );
        }
    }
      return (
        <div >
          <h1>Manage Spots</h1>
            <div className="spot-list">

          {userSpots.map(spot => (
             <div key={spot.id} className="spot">
                <img src={spot.previewImage} alt={spot.name} onClick={() => handleSpotClick(spot.id)} />
                <div className="spot-info" onClick={() => handleSpotClick(spot.id)}>
                  <span>{spot.city}, {spot.state}</span>
                  <SpotRating rating={spot.avgRating} />
                  <h2>{spot.name}</h2>
                  <p>Price: ${spot.price}/night</p>
                </div>

              <div>
                <button onClick={ () => handleUpdateClick(spot.id)}>Update</button>
                {spotIdToUpdate && (
            <div className="modal-overlay">
              <div className="modal">
                <button onClick={handleCloseModal}>Close</button>
                <UpdateSpotComponent data={spotToUpdate} />
              </div>
            </div>
                  )}
                <button onClick={() => handleDeleteClick(spot)}>Delete</button>
                {/* {showModal && (
                    <div className="modal-overlay">
                    <div className="modal">
                    <button onClick={handleCloseModal}> Close </button>
                    <ModalContent  />
                    </div>
                    </div>
                )} */}
              </div>
            </div>
          ))}
          {showModal && spotToDelete && (
              <div className="modal-overlay">
        <div className="modal">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to remove this spot?</p>
          <button onClick={() => handleDeleteSpot(spotToDelete)}>Yes (Delete Spot)</button>
          <button onClick={() => {
            setSpotToDelete(null);
            setShowModal(false);
          }}>No (Keep Spot)</button>
        </div>
      </div>
    )}
            </div>
      {/* {showModal && !spotIdToUpdate && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={handleCloseModal}>Close</button>
            <UpdateSpotComponent />
          </div>
        </div>
      )} */}
        </div>
      );
}


export default ManageSpotsComponent
