const Location = ({ location, setLocation }) => {
  return (
    <section className="location">
      <label htmlFor="">Where: </label>
      <input 
        type="text" 
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
    </section>
  )
}

export default Location