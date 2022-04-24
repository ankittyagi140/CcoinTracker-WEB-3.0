import "./Modal.css";

const Modal = ({ children, onClick }) => {
  return (
    <div className="modal_container">
      <div className="blur_overlay"></div>
      <div className="modal_content">
        <div className="conter_container">{children}</div>
        <button className="close_button" onClick={onClick}>
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;
