import { useState } from "react"
import { useDispatch } from "react-redux"
import { createSpot } from "../../store/spot"



const CreateSpotComponent = () => {
    const dispatch = useDispatch()



    return (
        <h1>Create New Spot </h1>
    )

}

export default CreateSpotComponent
