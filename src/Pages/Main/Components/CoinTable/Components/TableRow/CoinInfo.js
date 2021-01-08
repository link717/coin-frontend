import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  deleteBookmark,
} from "../../../../../../store/modules/CheckBookmark";

import styled from "styled-components";

function CoinInfo({ data, currencyUnit }) {
  const {
    id,
    market_cap_rank,
    name,
    symbol,
    current_price,
    price_change_percentage_1h_in_currency: change_1h,
    price_change_percentage_24h_in_currency: change_24h,
    price_change_percentage_7d_in_currency: change_7d,
    total_volume,
  } = data;

  const bookmarkedCoins = useSelector((store) => store.setBookmarkDataRedeucer);

  const isBookmarked = bookmarkedCoins.some((coin) => coin.id === id);
  const isPositive_1h = change_1h > 0 ? true : false;
  const isPositive_24h = change_24h > 0 ? true : false;
  const isPositive_7d = change_7d > 0 ? true : false;

  const history = useHistory();
  const dispatch = useDispatch();

  const goToDetail = (id) => {
    history.push(`/${id}`);
  };

  const filterBookmark = (id) => {
    const coins = bookmarkedCoins.filter((coin) => {
      return coin.id !== id;
    });
    dispatch(deleteBookmark(coins));
  };

  const handleBookmark = () => {
    if (!isBookmarked) {
      dispatch(addBookmark(data));
    } else {
      filterBookmark(id);
    }
  };

  return (
    <CoinInfoContainer>
      <td>
        <div>
          <Bookmark
            onClick={() => handleBookmark()}
            bookmarked={isBookmarked}
          ></Bookmark>
          <span>{market_cap_rank}</span>
        </div>
      </td>
      <td>
        <button onClick={() => goToDetail(id)}>{name}</button>
      </td>
      <td>{symbol?.toUpperCase()}</td>
      <td>
        {currencyUnit}
        {current_price?.toLocaleString()}
      </td>
      <Percentage positive={isPositive_1h}>{change_1h?.toFixed(2)}%</Percentage>
      <Percentage positive={isPositive_24h}>
        {change_24h?.toFixed(2)}%
      </Percentage>
      <Percentage positive={isPositive_7d}>{change_7d?.toFixed(2)}%</Percentage>
      <td colspan="2">
        {currencyUnit}
        {total_volume?.toLocaleString()}
      </td>
    </CoinInfoContainer>
  );
}

export default CoinInfo;

const CoinInfoContainer = styled.tr`
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.mainGrey};

  td {
    font-size: 14px;
    font-weight: bold;
    vertical-align: middle;
    white-space: nowrap;

    :first-child {
      div {
        ${({ theme }) => theme.flex("space-between", null, null)};
        width: 40%;
        margin: 0 auto;
      }
    }

    :nth-child(2) {
      button {
        width: 80%;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    :nth-child(4n) {
      text-align: right;
    }
  }
`;

const Bookmark = styled.button`
  ::before {
    padding: 5px;
    color: ${(props) =>
      props.bookmarked
        ? ({ theme }) => theme.bookmark
        : ({ theme }) => theme.mainGrey};

    content: "\f005";
    font-family: "Font Awesome\ 5 Free";
    font-size: 18px;
    font-weight: 600;
  }
`;

const Percentage = styled.td`
  color: ${(props) =>
    props.positive
      ? ({ theme }) => theme.positive
      : ({ theme }) => theme.negative};
  text-align: center;
`;
