import { useContext } from 'react'
import { TiDelete } from 'react-icons/ti'
import { AppContext } from './AppContext'

const ExpenseItem = ({ id, name, cost }) => {
  const { dispatch } = useContext(AppContext)

  const handleDeleteExpense = () => {
    dispatch({
      type: 'DELETE_EXPENSE',
      payload: id
    })
  }

  return (
    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
      {name}
      <div>
        <span style={{ backgroundColor: '#001B2E' }} className="badge badge-primary badge-pill mr-3">
          ${cost}
        </span>
        <TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete>
      </div>
    </li>
  )
}

export default ExpenseItem