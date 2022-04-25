import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { CryptoState } from "../../CryptoContext/CryptoContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import SelectedButton from "../SelectedButton/SelectedButton";
import Modal from "../Modal/Modal";
import InputField from "../InputField/InputField";
import { headerObserver } from "../../Redux/Actions/CoinHolding";

const Header = () => {
  const headerElement = useRef();
  const navigate = useNavigate();
  const { currency, setCurrency } = useContext(CryptoState);
  const { authenticate, isAuthenticated, logout, authError } = useMoralis();
  const undatedPortfolio = useSelector((state) => state.addCoinReducer);
  const [loginForm, setLoginForm] = useState(false);
  const [login, setLogin] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [input_form_data, setInput_form_data] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const dispatch = useDispatch();

  //intersection observer of home page logo
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      dispatch(headerObserver(entry.isIntersecting));
    });
    observer.observe(headerElement.current);
  }, []);

  const login_button = () => {
    setLoginForm(true);
  };

  const closeModal = () => {
    setLoginForm(false);
  };

  const handelChange = (e) => {
    const { value, name } = e.target;
    setInput_form_data({ ...input_form_data, [name]: value });
  };

  const form_submit = (e) => {
    e.preventDefault();
    setFormErrors(validite(input_form_data));
    setIsSubmit(true);
  };

  const validite = (values) => {
    const errors = {};
    const regex = /^([^\s\@])+\@(([^\s\@\.])+\.)+([^\s\.]{2,})+$/;
    if (!input_form_data.email) {
      errors.email = `email is required!`;
    } else if (!regex.test(values.email)) {
      errors.email = `this is not a valid email!`;
    }
    if (!input_form_data.password) {
      errors.password = `password is required!`;
    }
    if (!input_form_data.confirm_password) {
      errors.confirm_password = `confirm password is required!`;
    }
    if (values.password.length < 10) {
      errors.password = `password must be greater than 10 digit`;
    } else if (input_form_data.password != input_form_data.confirm_password) {
      errors.same_password = `password and confirm password does not match!`;
    }
    return errors;
  };

  const handleSignupForm = () => {
    setLogin(false);
    setSignUp(true);
  };

  const handleLoginForm = () => {
    setSignUp(false);
    setLogin(true);
  };

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

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(input_form_data);
    }
  }, [formErrors, undatedPortfolio.length]);

  return (
    <>
      <NavBar >
        {authError && (
          <span className="error_message">{`${authError?.message}`}</span>
        )}
        <div className="nav_items">
          <Logo
          ref={headerElement}
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
                <img src="../metamask.svg" height="20" width="40" alt="#" />
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
            <SelectedButton className="launch_app" onClick={login_button}>
              LogIn
            </SelectedButton>
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
      {loginForm && (
        <Modal onClick={closeModal}>
          {login && (
            <form className="formLogin" onSubmit={form_submit}>
              <div className="login">
                <div>Log-In Form </div>
                <div className="login-form">
                  <InputField
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    onChange={handelChange}
                    value={input_form_data.email}
                  />
                  <p className="red">{formErrors.email}</p>
                  <InputField
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handelChange}
                    value={input_form_data.password}
                  />
                  <p className="red">{formErrors.password}</p>

                  <SelectedButton className="launch_app">Submit</SelectedButton>
                  <p>
                    Not Registered?
                    <a onClick={handleSignupForm}> Sign up </a>
                    first
                  </p>
                </div>
              </div>
            </form>
          )}
          {signUp && (
            <form className="formLogin">
              <div className="login">
                <div>Sign Up Form </div>
                <div className="login-form">
                  <InputField
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    onChange={handelChange}
                    value={input_form_data.email}
                  />
                  <p className="red">{formErrors.email}</p>
                  <InputField
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handelChange}
                    value={input_form_data.password}
                  />
                  <p className="red">{formErrors.password}</p>

                  <InputField
                    type="password"
                    name="confirm_password"
                    placeholder="Enter your connfirm Password"
                    onChange={handelChange}
                    value={input_form_data.confirm_password}
                  />
                  <p className="red">{formErrors.confirm_password}</p>
                  <p className="red">{formErrors.same_password}</p>
                  <SelectedButton className="launch_app">Submit</SelectedButton>
                  <a onClick={handleLoginForm}> Log In</a>
                </div>
              </div>
            </form>
          )}
        </Modal>
      )}
    </>
  );
};
export default Header;
const NavBar = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  margin: auto;
  display: flex;
  padding: 10px;
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
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 680px) {
    margin-top: 10px;
    flex-direction: column;
  }
  @media (max-width: 880px) {
    width: 70%;
  }
`;
