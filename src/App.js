import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/Layout/NavBar'
import HomePage from './components/Pages/HomePage'
import CreateTripPage from './components/Pages/CreateTripPage'
import CreateBudgetPage from './components/Pages/CreateBudgetPage'
import ViewTripsPage from './components/Pages/ViewTripsPage'
import LoginPage from './components/Pages/LoginPage'
import SignUpPage from './components/Pages/SignUpPage'
import LogOutPage from './components/Pages/LogOutPage'

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
          <Route path='/login' element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
          <Route path='/sign-up' element={<SignUpPage setLoggedInUser={setLoggedInUser} />} />
          <Route path='/log-out' element={<LogOutPage setLoggedInUser={setLoggedInUser} />} />
        </Routes>
      </>
    )
}

export default App;