import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import DefaultLayout from "../Layout/DafaultLayout"

const ViewTripsPage = ({ loggedInUser }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) return navigate('/login')
    }, [])

    return (
        <DefaultLayout>
            <h1>View Trips Page</h1>
        </DefaultLayout>
    )
}

export default ViewTripsPage