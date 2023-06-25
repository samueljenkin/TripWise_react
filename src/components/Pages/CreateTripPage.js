import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import DatePicker from 'react-datepicker'
import enAU from 'date-fns/locale/en-AU'
import 'react-datepicker/dist/react-datepicker.css'
import DefaultLayout from "../Layout/DafaultLayout"

const CreateTripPage = ({ loggedInUser }) => {
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    if (!loggedInUser) return navigate('/login')

    const handleChange = range => {
        const [startDate, endDate] = range
        setStartDate(startDate)
        setEndDate(endDate)
    }

    return (
        <DefaultLayout>
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
        </DefaultLayout>
    )
}

export default CreateTripPage