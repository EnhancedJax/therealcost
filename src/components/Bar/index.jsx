// BarComponent.js
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const BarContainer = styled.div`
  display: flex;
  width: ${(props) =>
    props.total * 20}px; /* Assuming each square is 20px wide */
  height: 20px; /* Height of the bar */
  border: 1px solid #000;
  position: relative;
`;

const BarFill = styled.div`
  background-color: #4caf50;
  width: ${(props) => props.percent}%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Square = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  box-sizing: border-box;
`;

const Bar = ({ percent, total }) => {
  return (
    <BarContainer total={total}>
      <BarFill percent={percent} />
      {Array.from({ length: total }).map((_, index) => (
        <Square key={index} />
      ))}
    </BarContainer>
  );
};

Bar.propTypes = {
  percent: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Bar;
