import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { MARKET_API } from "../../Config/urls";
import SelectBox from "./Components/SelectBox/SelectBox";
import CoinTable from "./Components/CoinTable/CoinTable";
import { setPage } from "../../store/modules/CheckPage";
import { setCoinData } from "../../store/modules/CheckCoinData";

function Main() {
  const view = useSelector((store) => store.setViewRedeucer);
  const currency = useSelector((store) => store.setCurrencyRedeucer);
  const count = useSelector((store) => store.setCountRedeucer);
  const page = useSelector((store) => store.setPageRedeucer);
  const coinDatas = useSelector((store) => store.setCoinDataRedeucer);
  const [initialFetch, setInitialFetch] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const COIN_API = `${MARKET_API}?vs_currency=${currency}&order=market_cap_desc&per_page=${count}&page=${page}&price_change_percentage=1h%2C24h%2C7d`;
        const { data } = await axios.get(COIN_API);
        if (page === 1) {
          setInitialFetch(data);
          dispatch(setCoinData(data));
        } else {
          dispatch(setCoinData([...initialFetch, ...data]));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoinData();
  }, [currency, count, page]);

  const handlefetchMore = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div>
      <SelectBox currency={currency} count={count} />
      <TableContainer>
        <CoinTable coinDatas={coinDatas} />
      </TableContainer>
      <AddButton onClick={handlefetchMore}>+ 더보기</AddButton>
    </div>
  );
}

export default Main;

const TableContainer = styled.div`
  ${({ theme }) => theme.flex("center", null, null)};
  ${({ theme }) => theme.container};
  margin: 0 auto;
  overflow-y: hidden;
  table-layout: fixed;
`;

const AddButton = styled.button`
  display: block;
  width: 100px;
  height: 50px;
  margin: 10px auto 50px;
  text-align: center;
`;
