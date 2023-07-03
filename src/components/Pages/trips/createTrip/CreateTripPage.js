import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import DefaultLayout from "../../../layout/DefaultLayout"
import Location from './Location'
import Dates from './Dates'
import Budget from './Budget'
import Search from './Search'
import Results from './Results'

const CreateTripPage = ({ loggedInUser }) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (!loggedInUser) return navigate('/sign-up')
	}, [])

	const [tripId, setTripId] = useState()
	const [location, setLocation] = useState('')
	const [startDate, setStartDate] = useState()
	const [endDate, setEndDate] = useState()
	const [budget, setBudget] = useState(0)
	const [attractions, setAttractions] = useState()
	const [totalCost, setTotalCost] = useState(0)

	const getTripId = () => {
		fetch('/api/attractions')
			.then(res => res.json())
			.then(attractions => {
				if (attractions.length > 0) {
					const tripIds = attractions.map(attraction => attraction.trip_id)
					const maxTripId = Math.max(...tripIds)
					setTripId(maxTripId + 1)
				} else {
					setTripId(1)
				}
			})
	}

	useEffect(getTripId, [])

	return (
		<DefaultLayout>
			<h1>Create Trip #{tripId}</h1>
			<p>Total cost: ${totalCost}</p>

			<div className="search">
				<Location
					location={location}
					setLocation={setLocation}
				/>

				<Dates
					startDate={startDate}
					endDate={endDate}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
				/>

				<Budget
					budget={budget}
					setBudget={setBudget}
				/>

				<Search
					location={location}
					startDate={startDate}
					endDate={endDate}
					budget={budget}
					setAttractions={setAttractions}
				/>
			</div>

			<div className="results">
				<Results
					attractions={attractions}
					tripId={tripId}
					budget={budget}
					totalCost={totalCost}
					setTotalCost={setTotalCost}
				/>
			</div>
		</DefaultLayout>
	)
}

export default CreateTripPage