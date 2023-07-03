import DatePicker from 'react-datepicker'
import enAU from 'date-fns/locale/en-AU'
import 'react-datepicker/dist/react-datepicker.css'

const Dates = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  const handleChange = range => {
      const [startDate, endDate] = range
      setStartDate(startDate)
      setEndDate(endDate)
  }

  return (
    <section className="date">
      <label htmlFor="">When: </label>
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
    </section>
  )
}

export default Dates