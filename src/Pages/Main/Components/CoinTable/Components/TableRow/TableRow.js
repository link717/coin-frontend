import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Toast from "../../../../../Components/Toast/Toast";
import {
  addBookmark,
  deleteBookmark,
} from "../../../../../../store/modules/CheckBookmark";

function CoinInfo({ data, format }) {
  const {
    id,
    market_cap_rank: rank,
    name,
    symbol,
    current_price: currentPrice,
    price_change_percentage_1h_in_currency: change1h,
    price_change_percentage_24h_in_currency: change24h,
    price_change_percentage_7d_in_currency: change7d,
    total_volume: totalVolume,
  } = data;

  const bookmarkedCoins = useSelector((store) => store.setBookmarkDataRedeucer);
  const isBookmarked = bookmarkedCoins.some((coin) => coin.id === id);
  const [openToast, setOpenToast] = useState(false);
  const isPositive1h = Number(change1h) > 0 ? true : false;
  const isPositive24h = Number(change24h) > 0 ? true : false;
  const isPositive7d = Number(change7d) > 0 ? true : false;

  const history = useHistory();
  const dispatch = useDispatch();

  const goToDetail = (id) => {
    history.push(`detail/${id}`);
  };

  const filterBookmark = (id) => {
    const coins = bookmarkedCoins.filter((coin) => coin.id !== id);
    setTimeout(() => {
      dispatch(deleteBookmark(coins));
    }, 600);
  };

  const handleBookmark = () => {
    if (!isBookmarked) {
      dispatch(addBookmark(data));
    } else {
      setOpenToast(true);
      filterBookmark(id);
      setTimeout(() => {
        setOpenToast(false);
      }, 600);
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
          <span>{Number(rank)}</span>
        </div>
      </td>
      <td>
        <button onClick={() => goToDetail(id)}>{name}</button>
        <Toast openToast={openToast} />
      </td>
      <td>{symbol?.toUpperCase()}</td>
      <td>
        {format}
        {Number(currentPrice).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <Percentage positive={isPositive1h}>
        {Number(change1h)?.toFixed(2)}%
      </Percentage>
      <Percentage positive={isPositive24h}>
        {Number(change24h)?.toFixed(2)}%
      </Percentage>
      <Percentage positive={isPositive7d}>
        {Number(change7d)?.toFixed(2)}%
      </Percentage>
      <td colspan="2">
        {format}
        {Number(totalVolume).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </CoinInfoContainer>
  );
}

export default CoinInfo;

const CoinInfoContainer = styled.tr`
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.mainGrey};

  td {
    position: relative;
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
