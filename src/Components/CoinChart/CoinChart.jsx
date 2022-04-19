import { CircularProgress } from "@mui/material";
import "./CoinChart.css";
import { useContext, useEffect, useState } from "react";
import { HistoricalChart } from "../../Config/api";
import { CryptoState } from "../../CryptoContext/CryptoContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { ChartDays } from "../../Config/Data";
import SelectedButton from "../../Components/SelectedButton/SelectedButton";

const CoinChart = () => {
  const { id } = useParams();
  const { currency } = useContext(CryptoState);
  const [coinChart, setCoinChart] = useState();
  const [day, setDay] = useState(1);

  const fetchCoinChart = async () => {
    try {
      const { data } = await new Promise((res) => {
        setTimeout(() => {
          res(axios.get(HistoricalChart(id, day, currency)));
        }, 1);
      });
      setCoinChart(data.prices);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinChart();
    return () => {};
  }, [id, currency, day]);

  return (
    <div className="coin_chart">
      {!coinChart ? (
        <CircularProgress
          style={{ color: "gold" }}
          size={300}
          thickness={1}
        ></CircularProgress>
      ) : (
        <>
          <Line
            data={{
              labels: coinChart.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()}AM`
                    : `${date.getHours()}:${date.getMinutes()} PM`;
                return day === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: coinChart.map((coin) => coin[1]),
                  label: `Price (Past ${day} Days) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
              options: {
                responsive: true,
              },
            }}
          />
          <div className="chart_bg">
            {ChartDays.map((day) => {
              return (
                <SelectedButton
                  className="chart_button"
                  key={day.value}
                  onClick={() => {
                    setDay(day.value);
                  }}
                  selected={day.value === day}
                >
                  {day.label}
                </SelectedButton>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default CoinChart;
