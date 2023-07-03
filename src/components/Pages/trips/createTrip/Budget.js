const Budget = ({ budget, setBudget }) => {
  return (
    <section className="budget">
      <label htmlFor="">Budget (per day per person): </label>
      <input 
        type="number" 
        step="10"
        min="0"
        max="999999"
        value={budget}
        onChange={e => setBudget(e.target.value)}
      />
    </section>
  )
}

export default Budget