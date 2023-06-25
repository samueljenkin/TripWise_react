import { Navigate } from 'react-router-dom'
import DefaultLayout from "../Layout/DafaultLayout";

const CreateTripPage = ({ loggedInUser }) => {
    if (!loggedInUser) {
        return <Navigate replace to='/login' />
    } else {
        return (
            <DefaultLayout>
                <h1>Create Trip Page</h1>
            </DefaultLayout>
        )
    }
}

export default CreateTripPage