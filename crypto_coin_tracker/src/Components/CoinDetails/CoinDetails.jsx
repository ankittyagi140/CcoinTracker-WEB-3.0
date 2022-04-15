import "./CoinDetails.css";
import ReactHtmlParser from 'html-react-parser';


const CoinDetails = ({ coinData }) => {
  return (
    <div className="coin_details">
      <img src={coinData?.image.large} alt={coinData?.name} />
      <span className="coin_span" style={{textTransform:"uppercase"}}>{coinData?.symbol}</span>
      <span className="coin_span">{coinData?.name}</span>
      <span className="coin_span">Rank: {`${coinData?.market_cap_rank}`}</span>
      <span style={{textAlign:"center"}}>{ReactHtmlParser(""+coinData?.description.en.split(". ")[0])}</span>
    </div>
  );
};
export default CoinDetails;
