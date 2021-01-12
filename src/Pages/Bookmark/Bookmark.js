import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setView } from "../../store/modules/CheckView";
import { setCurrency } from "../../store/modules/CheckCurrency";
import { setCount } from "../../store/modules/CheckCount";
import CoinTable from "../Main/Components/CoinTable/CoinTable";

function Bookmark() {
  const dispatch = useDispatch();
  const bookmarkedCoins = useSelector(
    (store) => store.setBookmarkDataRedeucer
  ).sort((a, b) => Number(a.market_cap_rank) - b.market_cap_rank);

  dispatch(setView("all"));
  dispatch(setCurrency("krw"));
  dispatch(setCount("50"));

  return (
    <BookmarkTableContainer>
      <CoinTable coinDatas={bookmarkedCoins} />
    </BookmarkTableContainer>
  );
}

export default Bookmark;

const BookmarkTableContainer = styled.div`
  ${({ theme }) => theme.flex("center", null, null)};
  ${({ theme }) => theme.container};
  margin: 55px auto;
`;
