import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom'
import DefaultLayout from "../Layout/DafaultLayout";

const ViewTripsPage = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setAuthenticated(localStorage.getItem('authenticated'))
        setLoading(false)
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!authenticated) {
        return <Navigate replace to='/login' />
    } else {
        return (
            <DefaultLayout>
                <h1>View Trips Page</h1>
            </DefaultLayout>
        )
    }
}

export default ViewTripsPage