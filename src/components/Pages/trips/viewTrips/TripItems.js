const TripItems = ({ tripData, currentTripId }) => {
  const getCurrentTrip = attraction => attraction.trip_id === currentTripId

  const getTripCost = () => tripData
      .filter(getCurrentTrip)
      .reduce((totalCost, attraction) => totalCost + attraction.price_level, 0)

  return (
    <>
      {currentTripId &&
        <section className="saved">
          <h2>Trip {currentTripId}</h2>
          <p>Total cost: ${getTripCost(currentTripId)}</p>
          <ul>
            {tripData
              .filter(getCurrentTrip)
              .map((attraction, i) => 
                <li key={i}>
                  <p><a href={attraction.website_uri}>{attraction.display_name}</a></p>
                  <p>
                    Cost: {attraction.price_level === 0 ? 
                      'Free' : `$${attraction.price_level}`}
                  </p>
                  <p>Rating: {attraction.rating}</p>
                </li>
              )
            }
          </ul>
        </section>
      }
    </>
  )
}

export default TripItems