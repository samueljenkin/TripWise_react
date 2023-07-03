import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/layout/NavBar'
import HomePage from './components/pages/HomePage'
import CreateTripPage from './components/pages/trips/createTrip/CreateTripPage'
import CreateBudgetPage from './components/pages/budget/BudgetPage'
import ViewTripsPage from './components/pages/trips/viewTrips/ViewTripsPage'
import LoginPage from './components/pages/auth/LoginPage'
import SignUpPage from './components/pages/auth/SignUpPage'
import LogOutPage from './components/pages/auth/LogOutPage'

function App() {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  function getLoggedInUser() {
    fetch('/api/sessions')
      .then(res => res.json())
      .then(username => setLoggedInUser(username))
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