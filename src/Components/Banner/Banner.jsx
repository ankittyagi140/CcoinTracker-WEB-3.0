import React from "react";
import styled from "styled-components";
import "./Banner.css";
import Carousel from "../Carousel/Carousel";

function Banner() {
  return (
    <ContainerBanner>
      <div className="container_items">
        <Carousel />
      </div>
    </ContainerBanner>
  );
}

export default Banner;

const ContainerBanner = styled.div`
  /*height: 50vh;*/
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background: #fff;
`;
