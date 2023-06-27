import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import DefaultLayout from "../Layout/DafaultLayout"
import CreateTripLocation from './CreateTripLocation'
import CreateTripDate from './CreateTripDate'
import CreateTripBudget from './CreateTripBudget'
import CreateTripSearch from './CreateTripSearch'
import CreateTripResults from './CreateTripResults'

const CreateTripPage = ({ loggedInUser }) => {
  const navigate = useNavigate()

	useEffect(() => {
		if (!loggedInUser) return navigate('/login')
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
				<CreateTripLocation 
					location={location}
					setLocation={setLocation}
				/>

				<CreateTripDate 
					startDate={startDate}
					endDate={endDate}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
				/>
				
				<CreateTripBudget 
					budget={budget}
					setBudget={setBudget}
				/>

				<CreateTripSearch
					location={location}
					startDate={startDate}
					endDate={endDate}
					budget={budget}
					setAttractions={setAttractions}
				/>
			</div>

			<div className="results">
				<CreateTripResults
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