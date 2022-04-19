import "./Portfolio.css";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { CryptoState } from "../../CryptoContext/CryptoContext";
import SelectedButton from "../../Components/SelectedButton/SelectedButton";
import { useDispatch } from "react-redux";
import { removeCoin } from "../../Redux/Actions/CoinHolding";

const Portfolio = () => {
  const portfolioCoin = useSelector((state) => state.addCoinReducer);
  const { symbol } = useContext(CryptoState);
  const dispatch = useDispatch();

  const removeCoinData = (coin) => {
    dispatch(removeCoin(coin));
  };

  return (
    <div className="main_container_portfolio">
      <div className="portfolio_title">
        <h2>My Portfolio </h2>
        <h3>Add coins and grow your Portfolio</h3>
        <span>{`Total Number of Coins Added ${portfolioCoin.length} `}</span>
      </div>
      <div className="table_content">
        {[
          "Coin-Symbol",
          "Coin-Name",
          "Symbol",
          "Current Price",
          "% change 24hr",
          "Remove",
        ].map((coin) => {
          return <span key={coin}>{coin}</span>;
        })}
      </div>
      <div className="all_cards">
        {portfolioCoin.map((coin) => {
          return (
            <div key={coin?.id} className="portfolio_cards">
              <span>
                <img
                  src={coin?.image}
                  alt={coin?.name}
                  height="50px"
                  width="50px"
                />
              </span>
              <span>{coin?.name}</span>
              <span>{coin?.symbol}</span>
              <span>
                {coin?.current_price.toFixed(2)} {symbol}
              </span>
              <span>{coin?.price_change_percentage_24h.toFixed(2)}</span>
              <SelectedButton
                className="remove_coin"
                onClick={() => removeCoinData(coin)}
              >
                Remove
              </SelectedButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
