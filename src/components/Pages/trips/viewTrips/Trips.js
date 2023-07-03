const Trips = ({ tripIds, setCurrentTripId }) => {
  const handleClick = e => {
    const tripId = Number(e.target.value)
    setCurrentTripId(tripId)
  }

  return (
    <section className="list">
      <ul>
        {tripIds.length > 0 ? 
          tripIds.map((tripId, i) => 
            <li key={i}>
              <button onClick={handleClick} value={tripId}>
                Trip {tripId}
              </button>
            </li>
          ) : <li>No trips available. Make one <a href='/create-trip'>here</a>.</li> 
        }
      </ul>
    </section>
  )
}

export default Trips