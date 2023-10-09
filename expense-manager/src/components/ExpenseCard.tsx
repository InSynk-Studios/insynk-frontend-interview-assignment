import { Link } from "react-router-dom";
import "../styles/ExpenseCard.css";

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

interface Props {
  date: string;
  data: Expense[];
}

const ExpenseCard = ({ date, data }: Props) => {

  const total: number = data.reduce((acc, expense) => {
    return expense.date === date ? acc + expense.amount : acc;
  }, 0);

  return (
    <div className="exchange-card-container">
      <div className="card-container-block">
        <p className="card-container-block-text">{date}</p>
        <p className="card-container-block-text">{total}</p>
      </div>
      <hr className="hr-total" />
      {data.map((expense,index) => (
        <Link key={index} to={`/edit/${expense.date}/${expense.category.name}`}>
          <div className="card-container-block-inner" >
            <p className={`${expense.type === ExpenseTypeEnum.CashIn ? "card-container-block-inner-cashin" : ""}`}>{expense.category.name}</p>
            <p className={`${expense.type === ExpenseTypeEnum.CashIn ? "card-container-block-inner-cashin" : ""}`}>{expense.amount}</p>
          </div>
          <hr className={`${expense.type === ExpenseTypeEnum.CashIn ? "hr-work" : ""}`} />
        </Link>
      ))}
    </div>
  );
};

export default ExpenseCard;
