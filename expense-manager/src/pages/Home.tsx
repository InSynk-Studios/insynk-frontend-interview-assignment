import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import ExpenseCard from "../components/ExpenseCard";
import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";

import "../styles/HomePage.css";

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

const Home = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    } else {
      setExpenses([]);
    }
  }, []);

    // Group expenses by date
    const groupedExpenses: { [date: string]: Expense[] } = {};
    expenses.forEach(expense => {
      if (groupedExpenses[expense.date]) {
        groupedExpenses[expense.date].push(expense);
      } else {
        groupedExpenses[expense.date] = [expense];
      }
    });
    

  const btnClickNav = () => {
    navigate("/addexpense");
  };

  return (
    <div className="home-page">
      <TopNav titleBtn="Add" titleText="Expenses" btnFunc={btnClickNav} />
      <div className="expense-div">
      {Object.keys(groupedExpenses).map(date => (
          <ExpenseCard key={date} date={date}  data={groupedExpenses[date]} />
        ))}

      </div>
      <BottomNav disabledBtn={true} />
    </div>
  );
};

export default Home;
