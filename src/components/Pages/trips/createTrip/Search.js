const Search = ({ location, startDate, endDate, budget, setAttractions }) => {
  const getPrice = attraction => {
    switch (attraction.priceLevel) {
      case 'INEXPENSIVE':
        return 0
      case 'MODERATE':
        return Math.floor(Math.random() * 50) + 10
      case 'EXPENSIVE':
        return Math.floor(Math.random() * 150) + 50
      default:
        return Math.floor(Math.random() * 300) + 200
    }
  }

  const handleClick = () => {
    fetch('/api/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location: location })
    })
      .then(res => res.json())
      .then(attractions => {
        const attractionsWithPrice = attractions.map(attraction => ({
          ...attraction,
          priceLevel: getPrice(attraction)
        }))

        setAttractions(attractionsWithPrice)
      })
  }

  return (
    <section className="search">
      <button 
        onClick={handleClick} 
        disabled={!location || !startDate || !endDate || !budget}
      >
        Search
      </button>
    </section>
  )
}

export default Search