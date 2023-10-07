import {BrowserRouter,Routes,Route} from 'react-router-dom' ;
import Expense from './components/Expense';
import Category from './components/Category';
import AddExpense from './components/AddExpense';
import { Provider } from 'react-redux'
import {store} from './store/store.ts'
import EditExpense from './components/EditExpense.tsx';
function App() {
  return (
    <>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Expense/>} />
              <Route path="/category" element={<Category />} />
              <Route path="/expense/add" element={<AddExpense />} />
              <Route path="/expense/edit" element={<EditExpense/>} />
            </Routes>
          </BrowserRouter>
        </Provider>
    </>
  )
}

export default App
