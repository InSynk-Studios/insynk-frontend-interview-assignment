import  { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "../styles/Addexpense.css";

interface Category {
  isMain: boolean;
  order: number;
  name: string;
}

enum ExpenseTypeEnum {
  CashIn = "Cash In",
  CashOut = "Cash Out",
}

interface Expense {
  type: ExpenseTypeEnum;
  category: Category;
  date: string;
  amount: number;
  description: string;
}

const AddExpense = () => {
  const navigate = useNavigate();
  const [cashIn, setCashIn] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Expense>({
    type: cashIn ? ExpenseTypeEnum.CashIn : ExpenseTypeEnum.CashOut,
    category: { isMain: true, order: 1, name: "Food" }, // Default category
    date: "",
    amount: 0,
    description: "",
  });



  useEffect(() => {

    setNewExpense(prevExpense => ({
        ...prevExpense,
        type: cashIn ? ExpenseTypeEnum.CashIn : ExpenseTypeEnum.CashOut
      }));
  
    
  }, [cashIn])
  

  useEffect(() => {

    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
    } else {
      setExpenses([]);
    }



    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      // If no data in localStorage, initialize with default categories
      setCategories([
        { isMain: true, order: 1, name: "Food" },
        { isMain: true, order: 2, name: "Transportation" },
        { isMain: true, order: 3, name: "Work" },
        { isMain: true, order: 4, name: "Traveling" },
      ]);
    }
  }, []); 


  const handleAddExpense = () => {

    const isDuplicateDate = expenses.some(expense => expense.date === newExpense.date && expense.category.name === newExpense.category.name);
    if (isDuplicateDate) {
      return alert("same date exist")
    }

    const actualAmount = newExpense.type === ExpenseTypeEnum.CashOut ? -newExpense.amount : newExpense.amount;
    const updatedExpense = {
      ...newExpense,
      amount: actualAmount,
    };

    setExpenses(prevExpenses => [...prevExpenses, updatedExpense]);

    localStorage.setItem('expenses', JSON.stringify([...expenses, updatedExpense]));
    toast("Added Successfully");
  };

  const cancelbtnHandle = () => {
    navigate('/')
  }

  return (
    <div className="add-expense-container">
      <div className="nav-add-expense">
        <h3>Add Expenses</h3>
      </div>
      <div className="add-expense-body">
        {/* Your form fields */}
        {/* Type */}
        <div className="expense-inside-body">
          <p>Type</p>
          <div className="btn-div-add-expense">
            <button
              className={`btn-cash-in-out ${cashIn ? "" : "btn-unselect-cash-in-out"}`}
              onClick={() => setCashIn(true)}
            >
              Cash in
            </button>
            <button
              className={`btn-cash-in-out ${cashIn ? "btn-unselect-cash-in-out" : ""}`}
              onClick={() => setCashIn(false)}
            >
              Cash out
            </button>
          </div>
        </div>
        {/* Category */}
        <div className="expense-inside-body">
          <p>Category</p>
          <div className="btn-div-add-expense">
            <select
              className="select-div-expense"
              value={newExpense.category.name}
              onChange={(e) =>
                setNewExpense({ ...newExpense, category: { ...newExpense.category, name: e.target.value } })
              }
            >
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Amount */}
        <div className="expense-inside-body">
          <p>Amount</p>
          <div className="btn-div-add-expense-text">
            <input
              className="text-div-addexpense"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: +e.target.value })}
            />
            <p className="text-input-symbol-addexpense">$</p>
          </div>
        </div>
        {/* Date */}
        <div className="expense-inside-body">
          <p>Date</p>
          <div className="btn-div-add-expense-text">
            <input
              className="text-div-addexpense"
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            />
          </div>
        </div>
        {/* Description */}
        <div className="expense-inside-body">
          <p>Description</p>
          <div className="btn-div-add-expense-text">
            <textarea
              className="text-div-addexpense"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
          </div>
        </div>
      </div>
      {/* Add and Cancel Buttons */}
      <div className="bottom-nav-addexpense">
        <button className="bottom-nav-btns-addexpense-1" onClick={cancelbtnHandle}>Cancel</button>
        <button className="bottom-nav-btns-addexpense-2" onClick={handleAddExpense}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
