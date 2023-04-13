import { useState } from "react"
import { useDispatch } from "react-redux"
import { createSpot } from "../../store/spot"



const CreateSpotComponent = () => {
    const dispatch = useDispatch()
    const [spotData, setSpotData] = useState({
        country:'',
        address:'',
        city:'',
        state:'',
        lat:'',
        lng:'',
        description:'',
        title:'',
        price:'',
        previewImage:'',
        imageurl1:'',
        imageurl2:'',
        imageurl3:'',
        imageurl4:'',
    })

    const handleChange = (event) => {
        setSpotData({
          ...spotData,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createSpot(spotData));
        setSpotData({
        country:'',
        address:'',
        city:'',
        state:'',
        lat:'',
        lng:'',
        description:'',
        title:'',
        price:'',
        previewImage:'',
        imageurl1:'',
        imageurl2:'',
        imageurl3:'',
        imageurl4:'',
        });
      };


    return (
        <div>
          <h1>Create New Spot </h1>
          <h3>Where's your place located?</h3>
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
            </form>
          <button type="submit">Create Spot</button>


        </div>
    )

}

export default CreateSpotComponent
