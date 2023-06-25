import { Navigate } from 'react-router-dom'

const LogOutPage = ({ setLoggedInUser }) => {
    fetch('/api/sessions', {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                console.log(res.error)
            } else {
                setLoggedInUser(null)
            }
        })

    return <Navigate replace to='/' />
}

export default LogOutPage