import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Toast from "../Components/Toast/Toast";
import CoinTable from "../Main/Components/CoinTable/CoinTable";

function Bookmark() {
  const bookmarkedCoins = useSelector(
    (store) => store.setBookmarkDataRedeucer
  ).sort((a, b) => Number(a.market_cap_rank) - b.market_cap_rank);

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
