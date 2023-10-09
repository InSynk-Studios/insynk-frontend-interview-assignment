
import '../styles/BottomNav.css'
import { useNavigate } from 'react-router-dom'

const BottomNav = ({disabledBtn} : {disabledBtn:boolean}) => {
  const navigate = useNavigate();

  const btnOneClick = () => {
    navigate("/")
  }
  const btnTwoClick = () => {
    navigate("/category")
  }

  return (
    <div className="bottom-nav-container">
      <button onClick={btnOneClick} className={disabledBtn ? 'bottom-nav-btn' : 'btn-nav-container bottom-nav-btn'}>Expense</button>
      <button onClick={btnTwoClick} className={disabledBtn ? 'btn-nav-container bottom-nav-btn' : 'bottom-nav-btn'}>Category</button>
    </div>
  )
}

export default BottomNav;