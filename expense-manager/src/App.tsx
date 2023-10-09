import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Categories from "./pages/Category";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/addexpense" element={<AddExpense />} />
        <Route path="/edit/:date/:category" element={<EditExpense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
