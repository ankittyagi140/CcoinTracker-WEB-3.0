
// const HocMillion = (NewComponent) => {
//   const HighOrderFunction = () => {
//       const num = coinData?.market_data?.ath?.usd;
//     if (num > 999 && num < 1000000) {
//         return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
//       } else if (num > 1000000) {
//         return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
//       } else if (num < 900) {
//         return num; // if value < 1000, nothing to do
//       }
//     return <NewComponent name="ankit" ></NewComponent>;
//   };
//   return HighOrderFunction;
// };
// export default HocMillion;
// //coinData?.market_data?.ath?.usd