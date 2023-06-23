import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Layout/NavBar'
import HomePage from './components/Pages/HomePage'
import CreateTripPage from './components/Pages/CreateTripPage'
import CreateBudgetPage from './components/Pages/CreateBudgetPage'
import ViewTripsPage from './components/Pages/ViewTripsPage'


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create/trip' element={<CreateTripPage />} />
        <Route path='/create/budget' element={<CreateBudgetPage />} />
        <Route path='/view/trips' element={<ViewTripsPage />} />
      </Routes>
    </>
  );
}

export default App;
