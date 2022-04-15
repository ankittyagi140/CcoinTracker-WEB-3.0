import "./Portfolio.css";
import {useSelector}  from 'react-redux'

const Portfolio = () => {
    const coinData = useSelector(state=>state)
  console.log(coinData);
  return <div>my portfolio</div>;
};
export default Portfolio;
