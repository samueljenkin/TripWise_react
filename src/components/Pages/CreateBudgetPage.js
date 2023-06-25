import { useNavigate } from 'react-router-dom'
import DefaultLayout from "../Layout/DafaultLayout"

const CreateBudgetPage = ({ loggedInUser }) => {
    const navigate = useNavigate()

    if (!loggedInUser) return navigate('/login')

    return (
        <DefaultLayout>
            <h1>Create Budget Page</h1>
        </DefaultLayout>
    )
}

export default CreateBudgetPage