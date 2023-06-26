import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import DatePicker from 'react-datepicker'
import enAU from 'date-fns/locale/en-AU'
import 'react-datepicker/dist/react-datepicker.css'
import DefaultLayout from "../Layout/DafaultLayout"

const CreateTripPage = ({ loggedInUser }) => {
    // Authenticate
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) return navigate('/login')
    }, [])


    // DatePicker
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    const handleChange = range => {
        const [startDate, endDate] = range
        setStartDate(startDate)
        setEndDate(endDate)
    }


    // Budget
    const [budget, setBudget] = useState()


    // Location/ Attractions
    const [location, setLocation] = useState('')
    const [attractions, setAttractions] = useState()
    const openCageApiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY
    const googlePlacesApiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY
    const googlePlacesUrl = process.env.REACT_APP_GOOGLE_PLACES_URL

    const getLocation = async location => {
        const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${openCageApiKey}`)
        const locationData = await res.json()
        const latAndLong = locationData.results[0].geometry
        return latAndLong
    }
    
    const getAttractions = async ({ lat, lng }) => {
        const location = {
            latitude: lat,
            longitude: lng
          }
          
          const textQuery = 'attractions'
          const languageCode = 'en'
          const includedType = 'tourist_attraction'
          const priceLevels = ['INEXPENSIVE', 'MODERATE', 'EXPENSIVE', 'VERY_EXPENSIVE']
    
          const request = {
            textQuery,
            languageCode,
            includedType,
            priceLevels,
            locationBias: {
              circle: {
                center: location,
                radius: 1000 // Radius in meters
              }
            }
          }
          
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': googlePlacesApiKey,
              'X-Goog-FieldMask': 'places.displayName,places.priceLevel'
            },
            body: JSON.stringify(request)
          }
          
          return fetch(googlePlacesUrl, options)
            .then(response => response.json())
            .then(data => data.places)
            .catch(error => {
              // Handle any errors here
              console.error(error)
            })
    }

    const getPrice = priceLevel => {
        let newPrice = 0

        if (priceLevel === 'INEXPENSIVE') {
            newPrice = Math.floor(Math.random() * 50)
        } else if (priceLevel === 'MODERATE') {
            newPrice = Math.floor(Math.random() * 150) + 50
        } else if (priceLevel === 'EXPENSIVE') {
            newPrice = Math.floor(Math.random() * 300) + 200
        } else {
            newPrice = Math.floor(Math.random() * 1000) + 500
        }

        return newPrice
    }

    const handleClick = async e => {
        if (location) {
            try {
                const locationData = await getLocation(location)
                const attractionsData = await getAttractions(locationData)
                setAttractions(attractionsData)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <DefaultLayout>
            <h1>Create Trip</h1>

            <h2>Where?</h2>
            <input 
                type="text" 
                value={location}
                onChange={e => setLocation(e.target.value)}
            />

            <h2>When?</h2>
            <DatePicker 
                selected={startDate} 
                onChange={handleChange} 
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                maxDate={maxDate}
                selectsRange
                locale={enAU}
                dateFormat="MMMM d, yyyy"
            />
            
            <h2>Budget?</h2>
            <label htmlFor="budget">Trip Budget (AUD)</label>
            <input 
                type="number" 
                name="budget"
                step="1000"
                min="0"
                max="999999"
                value={budget}
                onChange={e => setBudget(e.target.value)}
            />

            <button onClick={handleClick}>Search Attractions</button>

            <ul>
                {attractions ? attractions.map((attraction, i) => 
                    <li key={i}>
                        <p>{attraction.displayName.text}</p>
                        <p>${getPrice(attraction.priceLevel)}pp</p>
                    </li>
                ) : null}
            </ul>


        </DefaultLayout>
    )
}

export default CreateTripPage