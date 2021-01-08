import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Title from "./Components/TableColumn/TableColumn";
import CoinInfo from "./Components/TableRow/TableRow";

function CoinTable({ coinDatas }) {
  const format =
    useSelector((store) => store.setCurrencyRedeucer) === "krw" ? "\\" : "$";

  return (
    <CoinTableContainer>
      <thead>
        <Title />
      </thead>
      <tbody>
        {coinDatas?.map((data) => (
          <CoinInfo key={data.id} data={data} format={format} />
        ))}
      </tbody>
    </CoinTableContainer>
  );
}

export default CoinTable;

const CoinTableContainer = styled.table`
  ${({ theme }) => theme.tableStyle};
`;
