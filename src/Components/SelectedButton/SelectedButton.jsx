import './SelectedButton.css'
const SelectedButton = ({ children, onClick}) => {
  return (
    <button className="chart_button" onClick={onClick}>
      {children}
    </button>
  ); 
};
export default SelectedButton;
