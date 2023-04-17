import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSpotById } from '../../store/spot'
import { fetchReviews, createReview, deleteReview, getReviews} from '../../store/review'
import AddReviewForm from '../ReviewForm'
import './SpotById.css'



const SpotDetails = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spots[id])
    const reviewz = useSelector(state => state.reviews)
    const [numReviews, setNumReviews] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [reviewIdToDelete, setReviewIdToDelete] = useState(null);
    const openModal = () => {
        setShowModal(true);
      }
      const closeModal = () => {
        setShowModal(false);
      }
      const handleDeleteClick = (reviewId) => {
        setReviewIdToDelete(reviewId);
        setShowConfirmationModal(true);
      };
      const handleConfirmDelete = () => {
        dispatch(deleteReview(reviewIdToDelete)).then(() => {

          const updatedReviews = Object.values(reviewz).filter((review) => review.id !== reviewIdToDelete);
          dispatch(getReviews(updatedReviews));
          //dispatch(fetchReviews(id)).then((reviews) => setNumReviews(reviews.length));
        });
        setShowConfirmationModal(false);
      };
      const handleCancelDelete = () => {
        setShowConfirmationModal(false);
      };
      const ConfirmationModal = () => (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button className="confirm-delete-button" onClick={handleConfirmDelete}>
              Yes (Delete Review)
            </button>
            <button className="cancel-delete-button" onClick={handleCancelDelete}>
              No (Keep Review)
            </button>
          </div>
        </div>
      );
      // const handleDeleteClick = (reviewId) => {
      //   if (window.confirm('Are you sure you want to delete this review?')) {
      //     dispatch(deleteReview(reviewId)).then(() => {
      //       dispatch(fetchReviews(id)).then((reviews) => setNumReviews(reviews.length));
      //     });
      //   }
      // };

      const DeleteButton = ({ reviewId, userId }) => {
        return sessionUser && sessionUser.id === userId ? (
          <button className="delete-button" onClick={() => handleDeleteClick(reviewId)}>
            Delete
          </button>
        ) : null;
      };


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



              const previewImage = spot?.SpotImages?.find(image => image.previewImage);
              const imageUrl = previewImage ? previewImage.url : "";
              const images = spot?.SpotImages?.filter(image => !image.previewImage)
              // const reviewsArr = Object.values(reviewz)?.map(obj =>obj.review)
              const reviewsArr = Object.values(reviewz)
              const reviewOwners = reviewsArr.map((review) => review.userId)


              //const reviewOwners = Object.values(reviewz)?.map(obj=>obj.userId)
              const formatReview = (review) => {

                const content = review.review;
                return (
                  <div key={review.id} className="review">


                    <p>{content}</p>
                  <DeleteButton reviewId={review.id} userId={review.userId} />
                  </div>
                );
              }
              useEffect(() => {
                dispatch(fetchSpotById(id));
              dispatch(fetchReviews(id)).then(reviews => setNumReviews(reviews.length))
               // dispatch(fetchReviews(id))
            }, [dispatch, id])
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
      {sessionUser && !reviewOwners.includes(sessionUser.id) && spot.ownerId !== sessionUser.id && (
        <div>
          <button onClick={openModal}>Post Your Review</button>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <AddReviewForm spotId={spot.id} closeModal={closeModal} />
          </div>
        </div>
      )}

      {reviewsArr.reverse().map(review => formatReview(review))}
      {showConfirmationModal && <ConfirmationModal />}


      </div>
      <div>

      </div>

      </div>

    )
}
export default SpotDetails;
