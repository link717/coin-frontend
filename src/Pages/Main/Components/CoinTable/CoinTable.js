import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TableColumn from "./Components/TableColumn/TableColumn";
import TableRow from "./Components/TableRow/TableRow";

function CoinTable({ coinDatas }) {
  const format =
    useSelector((store) => store.setCurrencyRedeucer) === "krw" ? "\\" : "$";

  return (
    <CoinTableContainer>
      <thead>
        <TableColumn />
      </thead>
      <tbody>
        {coinDatas.length > 0 &&
          coinDatas.map((data) => (
            <TableRow key={data.id} data={data} format={format} />
          ))}
      </tbody>
    </CoinTableContainer>
  );
}

export default CoinTable;

const CoinTableContainer = styled.table`
  ${({ theme }) => theme.tableStyle};
`;
