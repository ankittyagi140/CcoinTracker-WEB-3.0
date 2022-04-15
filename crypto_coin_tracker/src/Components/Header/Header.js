import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { CryptoState } from "../../CryptoContext/CryptoContext";
import { useContext } from "react";
import { useMoralis } from "react-moralis";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = useContext(CryptoState);
  const { authenticate, isAuthenticated, logout } = useMoralis();

  const handleMetamaskLogin = async () => {
    await authenticate({ signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
      })
      .cath((err) => console.error(err));
  };

  const handleLogout = async () => {
    isAuthenticated && (await logout());
    if (!isAuthenticated) {
      console.log("logged out");
    }
  };

  const handlePortfolio = () => {
    isAuthenticated ? navigate("portfolio") : authenticate();
  };

  return (
    <NavBar>
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
        <button onClick={handlePortfolio} className="launch_app">
          Portfolio
        </button>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="launch_app">
            Log Out
          </button>
        ) : (
          <button className="launch_app" onClick={handleMetamaskLogin}>
            Connect
            <img src="../metamask.svg" height="30" width="40" alt="#" />
          </button>
        )}
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
    </NavBar>
  );
};
export default Header;
const NavBar = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #cde4eb36;
  box-shadow: #0983e5a3 0px 3px 6px;
  @media (max-width: 680px) {
    flex-direction: column;
  }
`;
const Logo = styled.div`
  color: #006f8f;
  font-size: 24px;
  font-family: Montserrat;
  cursor: pointer;
  font-weight: bold;
`;
const Navitems = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 680px) {
    margin-top: 10px;
    flex-direction: column;
  }
`;
