import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Title from "./Components/Title/Title";
import CoinInfo from "./Components/CoinInfo/CoinInfo";

function CoinTable({ coinDatas }) {
  const currency =
    useSelector((store) => store.setCurrencyRedeucer) === "krw" ? "\\" : "$";

  return (
    <CoinTableContainer>
      <thead>
        <Title />
      </thead>
      <tbody>
        {coinDatas?.map((data) => (
          <CoinInfo data={data} currencyUnit={currency} />
        ))}
      </tbody>
    </CoinTableContainer>
  );
}

export default CoinTable;

const CoinTableContainer = styled.table`
  width: 100%;
  table-layout: fixed;

  thead {
    background-color: ${({ theme }) => theme.lightGrey};

    th {
      padding: 5px 15px;
      color: ${({ theme }) => theme.deepGrey};
      font-size: 14px;
    }
  }
`;
