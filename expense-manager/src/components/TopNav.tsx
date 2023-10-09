import '../styles/TopNav.css'

interface TopNavProps {
  titleText: string;
  titleBtn: string;
  btnFunc: () => void;
}

const TopNav = ({ titleBtn, titleText, btnFunc }: TopNavProps) => {
  return (
    <div className="top-nav-container">
      <p className='top-nav-h1'>{titleText}</p>
      <button className='top-nav-btn' onClick={btnFunc}>{titleBtn}</button>
    </div>
  );
};

export default TopNav;
