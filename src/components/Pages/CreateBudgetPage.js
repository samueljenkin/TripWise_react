import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultLayout from "../Layout/DafaultLayout"

const CreateBudgetPage = ({ loggedInUser }) => {
  const navigate = useNavigate()

	useEffect(() => {
		if (!loggedInUser) return navigate('/sign-up')
	}, [])
    
	return (
			<DefaultLayout>
					<h1>Create Budget Page</h1>
			</DefaultLayout>
	)
}

export default CreateBudgetPage