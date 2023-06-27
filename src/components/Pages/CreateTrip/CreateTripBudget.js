const CreateTripBudget = ({ budget, setBudget }) => {
  return (
    <section className="budget">
      <label htmlFor="">Budget: </label>
      <input 
        type="number" 
        step="100"
        min="0"
        max="999999"
        value={budget}
        onChange={e => setBudget(e.target.value)}
      />
    </section>
  )
}

export default CreateTripBudget