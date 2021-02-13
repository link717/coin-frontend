import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Toast from "../../../../../Components/Toast/Toast";
import {
  addBookmark,
  deleteBookmark,
} from "../../../../../../store/modules/CheckBookmark";

function TableRow({ data, format }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookmarkedCoins = useSelector((store) => store.setBookmarkDataRedeucer);
  const [openToast, setOpenToast] = useState("defalut");

  const handlePriceForm = (price) => {
    return Number(price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePercentForm = (percentage) => {
    return Number(percentage).toFixed(1);
  };

  const fetchData = {
    id: data.id,
    name: data.name,
    symbol: data.symbol.toUpperCase(),
    rank: data.market_cap_rank,
    currentPrice: handlePriceForm(data.current_price),
    percentage1h: handlePercentForm(
      data.price_change_percentage_1h_in_currency
    ),
    percentage24h: handlePercentForm(
      data.price_change_percentage_24h_in_currency
    ),
    percentage7d: handlePercentForm(
      data.price_change_percentage_7d_in_currency
    ),
    totalVolume: handlePriceForm(data.total_volume),
  };

  const isBookmarked = bookmarkedCoins.some((coin) => coin.id === fetchData.id);
  const isPositive1h = Number(fetchData.percentage1h) >= 0 ? true : false;
  const isPositive24h = Number(fetchData.percentage24h) >= 0 ? true : false;
  const isPositive7d = Number(fetchData.percentage7d) >= 0 ? true : false;

  const goToDetail = (id) => {
    history.push(`detail/${id}`);
  };

  const filterBookmark = (id) => {
    const coins = bookmarkedCoins.filter((coin) => coin.id !== id);
    dispatch(deleteBookmark(coins));
  };

  const handleBookmark = () => {
    if (!isBookmarked) {
      setOpenToast("checked");
      dispatch(addBookmark(data));
      setTimeout(() => {
        setOpenToast("defalut");
      }, 600);
    } else {
      setOpenToast("unchecked");
      filterBookmark(fetchData.id);
      setTimeout(() => {
        setOpenToast("default");
      }, 600);
    }
  };

  return (
    <>
      {fetchData.id && (
        <TableRowContainer>
          <td>
            <div>
              <Bookmark
                onClick={() => handleBookmark()}
                bookmarked={isBookmarked}
              ></Bookmark>
              <span>{fetchData.rank}</span>
            </div>
          </td>
          <td>
            <button onClick={() => goToDetail(fetchData.id)}>
              {fetchData.name}
            </button>
            <Toast openToast={openToast} />
          </td>
          <td>{fetchData.symbol}</td>
          <td>
            {format}
            {fetchData.currentPrice}
          </td>
          <Percentage positive={isPositive1h}>
            {fetchData.percentage1h}%
          </Percentage>
          <Percentage positive={isPositive24h}>
            {fetchData.percentage24h}%
          </Percentage>
          <Percentage positive={isPositive7d}>
            {fetchData.percentage7d}%
          </Percentage>
          <td colSpan="2">
            {format}
            {fetchData.totalVolume}
          </td>
        </TableRowContainer>
      )}
    </>
  );
}

export default TableRow;

const TableRowContainer = styled.tr`
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
