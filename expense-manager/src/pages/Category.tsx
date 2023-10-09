import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import { toast } from "react-toastify";
import '../styles/Category.css';

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
const CategoryComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setnewCategory] = useState<string>("")
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {

    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
    } else {
      setExpenses([]);
    }

    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories([
        { isMain: true, order: 1, name: 'Food' },
        { isMain: true, order: 2, name: 'Transportation' },
        { isMain: true, order: 3, name: 'Work' },
        { isMain: true, order: 4, name: 'Traveling' },
      ]);
    }
  }, []);

  const saveCategoriesToLocalStorage = (categories: Category[]): void => {
    localStorage.setItem('categories', JSON.stringify(categories));
  };
  const saveExpensesToLocalStorage = (expense: Expense[]): void => {
    localStorage.setItem('expenses', JSON.stringify(expense));
  };

  const handleAddCategory = (): void => {
    if (newCategory.trim() !== '') {
      const newCategoryAdd: Category = {
        isMain: false,
        order: categories.length + 1,
        name: newCategory,
      };

      const updatedCategories = [...categories, newCategoryAdd];
      setCategories(updatedCategories);
      saveCategoriesToLocalStorage(updatedCategories);
      setnewCategory("")
      toast("Added Successfully");
    }
  };

  const handleDeleteCategory = (order: number): void => {
    const updatedCategories = categories.filter(category => category.order !== order);
    const deletedCategory = categories.find(category => category.order === order);
    if(deletedCategory){
      const updatedExpenses = expenses.filter(expense => expense.category.name !== deletedCategory.name);
      setCategories(updatedCategories);
      setExpenses(updatedExpenses);
      saveExpensesToLocalStorage(updatedExpenses);
      saveCategoriesToLocalStorage(updatedCategories);
      toast("Deleted Successfully");
    }
  };

  return (
    <div className="category-container">
      <div className="category-nav">
        <p className=''>Category</p>
      </div>
      <div className="category-item-container">
        {categories.map((category, index) => (
          
          <div className='category-inside-container' key={index}>
            <p>{category.name}</p>
            {category.isMain ?  <></> : <button className='delete-btn-category' onClick={() => handleDeleteCategory(category.order)}>X</button>}
            <hr />
          </div>
        ))}
        <div className="add-div-input">
          <input
            className="input-category"
            type="text"
            value={newCategory}
            placeholder="New Category"
            onChange={(e) => setnewCategory(e.currentTarget.value)}
          />
          <button className='add-btn-category' onClick={handleAddCategory}>Add</button>
        </div>
      </div>
      <BottomNav disabledBtn={false} />
    </div>
  );
};

export default CategoryComponent;
