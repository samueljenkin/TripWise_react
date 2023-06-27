import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import DefaultLayout from "../Layout/DafaultLayout"

const ViewTripsPage = ({ loggedInUser }) => {
    const navigate = useNavigate()
    const [tripData, setTripData] = useState([])
    const [tripIds, setTripIds] = useState([])
    const [currentTripId, setCurrentTripId] = useState()

    useEffect(() => {
        if (!loggedInUser) return navigate('/login')
    }, [loggedInUser])


    const getUsersTripData = () => {
        fetch('/api/attractions')
            .then(res => res.json())
            .then(attractions => {
                setTripData(attractions)
                const tripIds = attractions.map(attraction => attraction.trip_id)
                const uniqueTripIds = [...new Set(tripIds)]
                setTripIds(uniqueTripIds)
            })
    }

    useEffect(getUsersTripData, [])

    
    const handleClick = e => {
        const tripId = e.target.value
        setCurrentTripId(tripId)
    }
    
    const getTripCost = tripId => {
        return tripData
            .filter(attraction => attraction.trip_id == tripId)
            .reduce((totalCost, attraction) => totalCost + attraction.price_level, 0)
    }

    return (
        <DefaultLayout>
            <h1>View Trips Page</h1>

            <ul>
                {tripIds.length > 0 ? tripIds.map((tripId, i) => 
                    <li key={i}>
                        <button 
                            onClick={handleClick}
                            value={tripId}
                        >
                            Trip {tripId}
                        </button>
                    </li>
                ) : <li>No trips available. Make one <a href='/create-trip'>here</a>.</li> }
            </ul>
            
            {currentTripId &&
                <>
                    <h2>Trip {currentTripId}</h2>
                    <p>Total cost: ${getTripCost(currentTripId)}</p>
                </>
            }
            <ul>
                {tripData &&
                    tripData
                        .filter(attraction => attraction.trip_id == currentTripId)
                        .map((attraction, i) => 
                            <li key={i}>
                                <p><a href={attraction.website_uri}>{attraction.display_name}</a></p>
                                <p>Cost: {attraction.price_level === 0 ? 'Free' : `$${attraction.price_level}`}</p>
                                <p>Rating: {attraction.rating}</p>
                            </li>
                        )
                }
            </ul>
        </DefaultLayout>
    )
}

export default ViewTripsPage