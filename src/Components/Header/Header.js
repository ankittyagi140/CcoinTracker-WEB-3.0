import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { CryptoState } from "../../CryptoContext/CryptoContext";
import { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = useContext(CryptoState);
  const { authenticate, isAuthenticated, logout, authError } = useMoralis();
  const undatedPortfolio = useSelector((state) => state.addCoinReducer);

  const handleMetamaskLogin = async () => {
    const result = await new Promise((res) => {
      setTimeout(() => {
        res(authenticate());
      }, 1);
    });
    result && console.log(`Log-In Success full ${result.user}`);
  };

  const handleLogout = async () => {
    if (isAuthenticated) {
      await new Promise((res) => {
        res(logout());
      });
      isAuthenticated && navigate("/");
      console.log("logged out");
    }
  };

  const callAgain = async () => {
    const result = await new Promise((res) => {
      setTimeout(() => {
        res(authenticate());
      }, 1);
    });
    result && navigate("portfolio");
  };

  const handlePortfolio = () => {
    isAuthenticated ? navigate("portfolio") : callAgain();
  };

  useEffect(() => {
    if (undatedPortfolio.length > 0) {
      document.title = `ccointracker (${undatedPortfolio.length})`;
    }
  }, [undatedPortfolio.length]);

  return (
    <NavBar>
      {authError && (
        <span className="error_message">{`${authError?.message}`}</span>
      )}
      <div className="nav_items">
        <Logo
          aria-label="logo home page"
          tabIndex="0"
          onClick={() => {
            navigate("/");
          }}
        >
          Crypto@Tech
        </Logo>
        <Navitems>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="launch_app">
              Log Out
            </button>
          ) : (
            <button className="launch_app" onClick={handleMetamaskLogin}>
              Connect
              <img src="../metamask.svg" height="20" width="40" alt="#" />
            </button>
          )}
          <button onClick={handlePortfolio} className="launch_app">
            {`Portfolio ${undatedPortfolio.length}`}
          </button>
          <select
            className="drop-down"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
          >
            <option value={"USD"}>USD</option>
            <option value={"INR"}>INR</option>
          </select>
        </Navitems>
      </div>
    </NavBar>
  );
};
export default Header;
const NavBar = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  margin: auto;
  display: flex;
  padding: 20px;
  background: #000;
`;
const Logo = styled.div`
  color: #fff;
  font-size: 24px;
  font-family: Montserrat;
  cursor: pointer;
  font-weight: bold;
  :hover {
    color: gold;
  }
`;
const Navitems = styled.div`
  width: 45%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 680px) {
    margin-top: 10px;
    flex-direction: column;
  }
  @media (max-width: 880px) {
    width: 55%;
  }
`;
