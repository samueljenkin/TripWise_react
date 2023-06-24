import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/Layout/NavBar'
import HomePage from './components/Pages/HomePage'
import CreateTripPage from './components/Pages/CreateTripPage'
import CreateBudgetPage from './components/Pages/CreateBudgetPage'
import ViewTripsPage from './components/Pages/ViewTripsPage'
import LoginPage from './components/Pages/LoginPage'
import SignUpPage from './components/Pages/SignUpPage'

function App() {
  const [loggedInUser, setLoggedInUser] = useState('')

  // update function
  function getLoggedInUser() {
    // const find = async () => {
    //   const res = await fetch('/api/sessions')
    //   const user = await res.json()
    //   console.log(user)
    // }
    // find()
    fetch('/api/sessions')
    .then(res => res.json())
    .then(data => {
        if (data) {
            setLoggedInUser(data.user.name)
        } 
    })
  }

  function updateLoggedInUser(user) {
    setLoggedInUser(user)
  }

  useEffect(getLoggedInUser, [])


  return (
    <>
      <NavBar />
      <p>{loggedInUser}</p>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create/trip' element={<CreateTripPage />} />
        <Route path='/create/budget' element={<CreateBudgetPage />} />
        <Route path='/view/trips' element={<ViewTripsPage />} />
        <Route path='/login' element={<LoginPage updateLoggedInUser={updateLoggedInUser}/>} />
        <Route path='/signUp' element={<SignUpPage updateLoggedInUser={updateLoggedInUser} />} />
      </Routes>
    </>
  );
}

export default App;