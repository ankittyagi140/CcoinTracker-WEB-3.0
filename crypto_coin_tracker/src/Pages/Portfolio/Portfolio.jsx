import { useSelector } from 'react-redux';
import './Portfolio.css'

const Portfolio=()=>{

const coinData = useSelector(state=>state)
console.log(coinData)
    return <div>my portfolio</div>
}
export default Portfolio;