import { useSelector } from "react-redux";
import "./Top.css";

export const Top = () => {
  const headerObserverState = useSelector(
    (state) => state.intersectionObserverReducer
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {!headerObserverState && (
        <div className="scroll_to_top" onClick={scrollToTop}>
          <img
            height="40px"
            width="40px"
            src="../images/scroll_to_top.svg"
          ></img>
        </div>
      )}
    </>
  );
};
