import "./Portfolio.css";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { CryptoState } from "../../CryptoContext/CryptoContext";

const Portfolio = () => {
  const portfolioCoin = useSelector((state) => state.addCoinReducer);
  const { symbol } = useContext(CryptoState);

  return (
    <div className="main_container">
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
        ].map((coin) => {
          return <span>{coin}</span>;
        })}
      </div>
      <div className="all_cards">
        {portfolioCoin.map((coin) => {
          return (
            <div key={coin?.id} className="portfolio_cards">
              <img
                src={coin?.image}
                alt={coin?.name}
                height="30px"
                width="30px"
              />
              <span>{coin?.name}</span>
              <span>{coin?.symbol}</span>
              <span>{coin?.current_price.toFixed(2)} {symbol}</span>
              <span>{coin?.price_change_percentage_24h.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
