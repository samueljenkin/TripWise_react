import { useState } from "react"

const Results = ({ attractions, tripId, budget, totalCost, setTotalCost }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClick = e => {
    const attractionIndex = e.target.value
    const attraction = attractions[attractionIndex]
    attraction.tripId = tripId

    fetch('/api/attractions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attraction)
    })
      .then(res => res.json())
      .then(attraction => setTotalCost(totalCost + attraction.price_level))
  }

  return (
    <section className="results">
      <ul>
        {attractions &&
          attractions.map((attraction, i) => 
            <li key={i}>
              <p><a href={attraction.websiteUri}>{attraction.displayName.text}</a></p>
              <p>
                Cost: {attraction.priceLevel === 0 ? 
                  'Free' : `$${attraction.priceLevel}`}
              </p>
              <p>Rating: {attraction.rating}</p>
              <button onClick={toggleDropdown}>{isOpen ? 'Hide Reviews' : 'Show Reviews'}</button>
              {isOpen &&
                <ul>
                  {attraction.reviews.map((review, i) => 
                    <li key={i}>
                      <p>{review.rating} stars - {review.author}</p>
                      {review.text && 
                        <p>{review.text.text}</p>
                      }
                      <p>{review.relativePublishTimeDescription}</p>
                    </li>
                  )}
                </ul>  
              }

              <button 
                value={i}
                onClick={handleClick} 
                disabled={totalCost + attraction.priceLevel > budget}
              >
                Add
              </button>
            </li>
          )
        }
      </ul>
    </section>
  )
}

export default Results