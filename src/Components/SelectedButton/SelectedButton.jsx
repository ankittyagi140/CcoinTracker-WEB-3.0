import "./SelectedButton.css";
const SelectedButton = ({ children, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
export default SelectedButton;
