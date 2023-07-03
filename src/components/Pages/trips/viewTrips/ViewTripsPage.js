import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import DefaultLayout from "../../../layout/DefaultLayout"
import Trips from "./Trips"
import TripItems from "./TripItems"

const ViewTripsPage = ({ loggedInUser }) => {
	const navigate = useNavigate()
	const [tripData, setTripData] = useState([])
	const [tripIds, setTripIds] = useState([])
	const [currentTripId, setCurrentTripId] = useState()

	useEffect(() => {
		if (!loggedInUser) return navigate('/sign-up')
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

	return (
		<DefaultLayout>
			<h1>View Trips Page</h1>

			<Trips
				tripIds={tripIds}
				setCurrentTripId={setCurrentTripId}
			/>

			<TripItems
				tripData={tripData}
				currentTripId={currentTripId}
			/>
		</DefaultLayout>
	)
}

export default ViewTripsPage