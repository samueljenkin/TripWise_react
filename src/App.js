import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/Layout/NavBar'
import HomePage from './components/Pages/HomePage'
import CreateTripPage from './components/Pages/CreateTrip/CreateTripPage'
import CreateBudgetPage from './components/Pages/CreateBudgetPage'
import ViewTripsPage from './components/Pages/ViewTrips/ViewTripsPage'
import LoginPage from './components/Pages/User/LoginPage'
import SignUpPage from './components/Pages/User/SignUpPage'
import LogOutPage from './components/Pages/User/LogOutPage'

function App() {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  function getLoggedInUser() {
    fetch('/api/sessions')
      .then(res => res.json())
      .then(data => data.user ? setLoggedInUser(data.user.username) : null)
      .finally(() => setIsLoading(false))
  }

  useEffect(getLoggedInUser, [])

  return isLoading ? <div>Loading...</div> :
    (
      <>
        <NavBar loggedInUser={loggedInUser} />
        <Routes>
          <Route path='/' element={<HomePage loggedInUser={loggedInUser} />} />
          <Route path='/create-trip' element={<CreateTripPage loggedInUser={loggedInUser} />} />
          <Route path='/create-budget' element={<CreateBudgetPage loggedInUser={loggedInUser} />} />
          <Route path='/view-trips' element={<ViewTripsPage loggedInUser={loggedInUser} />} />
          <Route 
            path='/login' 
            element={<LoginPage loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} 
          />
          <Route 
            path='/sign-up' 
            element={<SignUpPage loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} 
          />
          <Route 
            path='/log-out' 
            element={<LogOutPage loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} 
          />
        </Routes>
      </>
    )
}

export default App;