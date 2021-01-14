import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import SelectBox from "./Components/SelectBox/SelectBox";
import CoinTable from "./Components/CoinTable/CoinTable";
import Loading from "../Components/Loading/Loading";
import { setPage } from "../../store/modules/CheckPage";
import { setCoinData } from "../../store/modules/CheckCoinData";
import { MARKET_API } from "../../Config/urls";

function Main() {
  const view = useSelector((store) => store.setViewRedeucer);
  const currency = useSelector((store) => store.setCurrencyRedeucer);
  const count = useSelector((store) => store.setCountRedeucer);
  const page = useSelector((store) => store.setPageRedeucer);
  const coinDatas = useSelector((store) => store.setCoinDataRedeucer).sort(
    (a, b) => a.market_cap_rank - b.market_cap_rank
  );
  const bookmarkedCoins = useSelector(
    (store) => store.setBookmarkDataRedeucer
  ).sort((a, b) => Number(a.market_cap_rank) - Number(b.market_cap_rank));
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setIsLoading(true);
        const coinUrl = `${MARKET_API}?vs_currency=${currency}&order=market_cap_desc&per_page=${count}&page=${page}&price_change_percentage=1h%2C24h%2C7d`;
        const { data } = await axios.get(coinUrl);
        if (data) {
          setIsLoading(false);
          if (page === 1) {
            dispatch(setCoinData(data));
          } else {
            dispatch(setCoinData([...coinDatas, ...data]));
          }
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchCoinData();
  }, [count, currency, page]);

  const handlefetchMore = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div>
      <SelectBox currency={currency} view={view} count={Number(count)} />
      <TableContainer>
        {isLoading && view === "all" ? <Loading /> : null}
        <CoinTable coinDatas={view === "all" ? coinDatas : bookmarkedCoins} />
      </TableContainer>
      {!isLoading && view === "all" ? (
        <AddButton onClick={handlefetchMore}>+ 더보기</AddButton>
      ) : null}
    </div>
  );
}

export default Main;

const TableContainer = styled.div`
  ${({ theme }) => theme.flex("center", null, null)};
  ${({ theme }) => theme.container};
  margin: 0 auto;
`;

const AddButton = styled.button`
  display: block;
  width: 100px;
  height: 50px;
  margin: 10px auto 50px;
  text-align: center;
`;
