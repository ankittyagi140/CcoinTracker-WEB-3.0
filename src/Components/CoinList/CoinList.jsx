import { useContext, useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext/CryptoContext";
import { CoinData } from "../../Config/api";
import axios from "axios";
import "./CoinList.css";
import SelectedButton from "../SelectedButton/SelectedButton";
import { useDispatch } from "react-redux";
import {
  Container,
  LinearProgress,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { addCoin } from "../../Redux/Actions/CoinHolding";
import { useMoralis } from "react-moralis";

const CoinList = () => {
  const dispatch = useDispatch();
  const [sortedList, setSortedList] = useState([]);
  const [flag, setFlag] = useState(false);
  const { currency, symbol } = useContext(CryptoState);
  const [coinSummary, setCoinSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  let [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState(true);
  const { authenticate, isAuthenticated } = useMoralis();

  const fetchCoinData = async (currency) => {
    const { data } = await new Promise((res) => {
      try {
        res(axios.get(CoinData(currency)));
      } catch (err) {
        console.error(err);
      }
    });
    setCoinSummary(data);
  };

  const handelSearch = () => {
    return coinSummary.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  const handelSort = (e) => {
    if (e.target.innerText === `+ (24-h)%`) {
      if (!flag) {
        setSortedList(
          coinSummary.sort(
            (a, b) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          )
        );
        setFlag(true);
      } else {
        alert("plese Reset the filter and try again");
      }
    }
    if (e.target.innerText === `+ Price Change`) {
      if (!flag) {
        setSortedList(
          coinSummary.sort((a, b) => b.price_change_24h - a.price_change_24h)
        );
        setFlag(true);
      } else {
        alert("plese Reset the filter and try again");
      }
    }
    if (e.target.innerText === `+ Volume(24-h)`) {
      if (!flag) {
        setSortedList(
          coinSummary.sort((a, b) => b.total_volume - a.total_volume)
        );
        setFlag(true);
      } else {
        alert("plese Reset the filter and try again");
      }
    }
    if (e.target.innerText === `- Market Cap`) {
      if (!flag) {
        setSortedList(coinSummary.sort((a, b) => a.market_cap - b.market_cap));
        setFlag(true);
      } else {
        alert("plese Reset the filter and try again");
      }
    }
    if (e.target.innerText === `- Price Change`) {
      if (!flag) {
        setSortedList(
          coinSummary.sort((a, b) => a.price_change_24h - b.price_change_24h)
        );
        setFlag(true);
      } else {
        alert("plese Reset the filter and try again");
      }
    }
    if (e.target.innerText === `- Volume(24-h)`) {
      if (!flag) {
        setSortedList(
          coinSummary.sort((a, b) => a.total_volume - b.total_volume)
        );
        setFlag(true);
      } else {
        alert("plese Reset the filter and try again");
      }
    }
    if (e.target.innerText === `- (24-h)%`) {
      if (!flag) {
        setSortedList(
          coinSummary.sort(
            (a, b) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          )
        );
        setFlag(true);
      } else {
        alert("plese Reset the filter and try again");
      }
    }
  };
  const handelReset = () => {
    if (flag) {
      setSortedList(
        coinSummary.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
      );
      setFlag(false);
    } else {
      alert("please select a filter first");
    }
  };

  const callAgain = async (coin) => {
    const result = await new Promise((res) => {
      setTimeout(() => {
        res(authenticate());
      }, 1);
    });
    if (result) {
      dispatch(addCoin(coin));
      navigate("portfolio");
    }
  };

  const addCoinToPortfolio = (coin) => {
    isAuthenticated ? dispatch(addCoin(coin)) : callAgain(coin);
  };

  useEffect(() => {
    setLoading(true);
    fetchCoinData(currency);
    setLoading(false);
  }, [currency]);

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <Container className="coin_summary_contaner">
        <p
          style={{
            margin: "15px 0 10px 0px",
            fontFamily: "Montserrat",
            fontSize: "32px",
            fontWeight: "600",
            color: "#006f8f",
            textAlign: "center",
          }}
        >
          Now you can track your favourite Coins with market cap
        </p>
        <TextField
          style={{ margin: "20px", width: "100%" }}
          varient="outlined"
          label="Search for you favourite coin.."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onClick={() => {
            window.scroll(0, 400);
          }}
        />
        {!sortValue && (
          <Container className="filter_container">
            <SelectedButton onClick={handelSort}>{`+ (24-h)%`}</SelectedButton>
            <SelectedButton
              onClick={handelSort}
            >{`+ Price Change`}</SelectedButton>
            <SelectedButton
              onClick={handelSort}
            >{`+ Volume(24-h)`}</SelectedButton>
            <SelectedButton onClick={handelSort}>{`- (24-h)%`}</SelectedButton>
            <SelectedButton
              onClick={handelSort}
            >{`- Price Change`}</SelectedButton>
            <SelectedButton
              onClick={handelSort}
            >{`- Volume(24-h)`}</SelectedButton>
            <SelectedButton
              onClick={handelSort}
            >{`- Market Cap`}</SelectedButton>
            <button className="reset_button" onClick={handelReset}>
              Reset
            </button>
          </Container>
        )}
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ Color: "gold" }}></LinearProgress>
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {[
                    "Rank",
                    "Coin",
                    "Price",
                    "(24-h)%",
                    "Price Change",
                    "Volume(24-h)",
                    "Circulating Supply",
                    `Market Cap ${symbol}`,
                    <span
                      onClick={() => {
                        setSortValue(!sortValue);
                      }}
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      #
                    </span>,
                  ].map((element) => {
                    return (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "500",
                          fontFamily: "Montserrat",
                        }}
                        key={element}
                      >
                        {element}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {(handelSearch() || sortedList)
                  .map((row) => {
                    const profit = row?.price_change_percentage_24h.toFixed(2);
                    const priceChange = row?.price_change_24h.toFixed(2);
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row?.market_cap_rank}
                        </TableCell>
                        <TableCell
                          style={{
                            display: "flex",
                            gap: "15",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate(`coins/${row?.id}`);
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row?.name}
                            style={{ height: "45px" }}
                          />
                          <CoinName>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >
                              {row?.name}
                            </span>
                          </CoinName>
                        </TableCell>
                        <TableCell>
                          <CoinPrice>
                            <span>
                              {row?.current_price}
                              {symbol}
                            </span>
                          </CoinPrice>
                        </TableCell>
                        <TableCell>
                          {profit > 0 ? (
                            <span
                              style={{ color: "green" }}
                            >{`+${profit}%`}</span>
                          ) : (
                            <span style={{ color: "red" }}>{`${profit}%`}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {priceChange > 0 ? (
                            <span style={{ color: "green" }}>
                              {`+${priceChange}${symbol}`}
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              {priceChange}
                              {symbol}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span>
                            {numFormatter(row?.total_volume)} {symbol}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span>
                            {numFormatter(row?.circulating_supply)}{" "}
                            {row?.symbol.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span>{numFormatter(row?.market_cap)}</span>
                        </TableCell>
                        <TableCell>
                          <span
                            className="add_portfolio"
                            onClick={() => addCoinToPortfolio(row)}
                          >
                            Add Coin
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                  .slice((page - 1) * 20, (page - 1) * 20 + 20)}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          className="pagination_component"
          count={parseInt(handelSearch()?.length / 20)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 500);
          }}
        />
      </Container>
    </div>
  );
};
export default CoinList;

const CoinName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  margin: 5px;
  font-size: 12px;
`;
const CoinPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #ffffff;
  margin: 5px;
  font-size: 12px;
`;
