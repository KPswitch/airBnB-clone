import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createSpot } from "../../store/spot"
import './CreateSpot.css'




const CreateSpotComponent = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const userId = user? user.id : null;

    const [spotData, setSpotData] = useState({
        ownerId: userId,
        country:'',
        address:'',
        city:'',
        state:'',
        lat:0,
        lng:0,
        description:'',
        name:'',
        price:'',
        previewImage:'',
        imageurl1:'',
        imageurl2:'',
        imageurl3:'',
        imageurl4:'',

    })
    // const [errors, setErrors] = useState({
    //     description: "",
    //     previewImage: "",
    //   });

    const handleChange = (event) => {
        setSpotData({
          ...spotData,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();


            const newSpot = await dispatch(createSpot(spotData));

            // let errorMessages = {
                //     description: "",
                //     previewImage: "",
                //   };

                // let hasError = false;
                // if (spotData.description.length < 30) {
                    //     errorMessages.description = "Description needs 30 or more characters";
                    //     hasError = true;
                    //   }
                    //   if (!spotData.previewImage) {
                        //     errorMessages.previewImage = "Preview Image URL is required";
                        //     hasError = true;
                        //   }

                        //   if (hasError) {
                            //     setErrors(errorMessages);
                            //     return;
                            //   }
                            // dispatch(createSpot(spotData));
         setSpotData({
                        country:'',
                                address:'',
                                city:'',
                                state:'',
                                lat:0,
                                lng:0,
                                description:'',
                                title:'',
                                price:'',
                                previewImage:'',
        imageurl1:'',
        imageurl2:'',
        imageurl3:'',
        imageurl4:'',
    });
    history.push(`/spots/${newSpot.id}`);

      };


    return (
        <div className="create-container">
          <h1>Create New Spot </h1>
          <h2>Where's your place located?</h2>
          <p>Guest will only get your exact address once they booked a reservation</p>
          <form onSubmit={handleSubmit}>
            <label>
                Country:
                <input
                type="text"
                name="country"
                placeholder='Country'
                value={spotData.country}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <label>
                Address:
                <input
                type="text"
                name="address"
                placeholder='Address'
                value={spotData.address}
                onChange={handleChange}
                />
            </label>
            <br />
            <label>
                City:
                <input
                type="text"
                name="city"
                placeholder='City'
                value={spotData.city}
                onChange={handleChange}
                />
            </label>,
            <label>
                State:
                <input
                type="text"
                name="state"
                placeholder='State'
                value={spotData.state}
                onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Latitude:
                <input
                type="text"
                name="latitude"
                placeholder="optional"
                value={spotData.lat}
                onChange={handleChange}
                />
            </label>,
            <label>
                Longitude:
                <input
                type="text"
                name="longitude"
                placeholder="optional"
                value={spotData.lng}
                onChange={handleChange}
                />
            </label>
            <div style={{ borderBottom: '1px solid black', paddingBottom: '10px'}}></div>
            <h2>Describe your place to guests</h2>
            <p>Mention the best features of your space, any special amentites like fast wifi or parking, and what you love about the neighborhood.</p>
            <label>

                <textarea

                name="description"
                placeholder="Please write at least 30 characters"
                value={spotData.description}
                onChange={handleChange}
                />
            </label>

            <div style={{ borderBottom: '1px solid black', paddingBottom: '10px'}}></div>
            <h2>Create a title for your spot</h2>
            <p>Catch guest' attention with a spot title that highlights what makes your place special.</p>
            <label>
                name:
                <input
                type="text"
                name="name"
                placeholder="name of your spot"
                value={spotData.name}
                onChange={handleChange}
                />
            </label>
            <div style={{ borderBottom: '1px solid black', paddingBottom: '10px'}}></div>
        ,   <h2>Set a price for your spot</h2>
            <p>Competive pricing can help your listing stand out and rank higher in search results</p>
            <label>
                $
                <input
                type="text"
                name="price"
                placeholder="Price per night (USD)"
                value={spotData.price}
                onChange={handleChange}
                />
            </label>
            <div style={{ borderBottom: '1px solid black', paddingBottom: '10px'}}></div>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot</p>
            <label>
                <input
                type="text"
                name="previewImage"
                placeholder="Preview image URL"
                value={spotData.previewImage}
                onChange={handleChange}
                />
            </label>


            <br />
            <label>
                <input
                type="text"
                name="imageurl1"
                placeholder="Image URL"
                value={spotData.imageurl1}
                onChange={handleChange}
                />
            </label>
            <br />
            <label>
                <input
                type="text"
                name="imageurl2"
                placeholder="Image URL"
                value={spotData.imageurl2}
                onChange={handleChange}
                />
            </label>
            <br />
            <label>
                <input
                type="text"
                name="imageurl3"
                placeholder="Image URL"
                value={spotData.imageurl3}
                onChange={handleChange}
                />
            </label>
            <br />
            <label>
                <input
                type="text"
                name="imageurl4"
                placeholder="Image URL"
                value={spotData.imageurl4}
                onChange={handleChange}
                />
            </label>
            <div style={{ borderBottom: '1px solid black', paddingBottom: '10px'}}></div>
          <button type="submit">Create Spot</button>
            </form>



        </div>
    )

}

export default CreateSpotComponent
