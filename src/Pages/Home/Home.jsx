import React from 'react'
import { Suspense } from "react";
import Banner from "../../Components/Banner/Banner";
const CoinList = React.lazy(() => import("../../Components/CoinList/CoinList"));

const Home = () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={<div>...Loading</div>}>
        <CoinList />
      </Suspense>
    </div>
  );
};
export default Home;
