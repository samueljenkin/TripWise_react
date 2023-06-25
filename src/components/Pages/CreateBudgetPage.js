import { Navigate } from 'react-router-dom'
import DefaultLayout from "../Layout/DafaultLayout"

const CreateBudgetPage = ({ loggedInUser }) => {
    if (!loggedInUser) {
        return <Navigate replace to='/login' />
    } else {
        return (
            <DefaultLayout>
                <h1>Create Budget Page</h1>
            </DefaultLayout>
        )
    }
}

export default CreateBudgetPage