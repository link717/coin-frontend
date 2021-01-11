import React from "react";
import styled from "styled-components";

function CoinInfo({
  currency,
  rank,
  webSite,
  currentPrice,
  percentage24h,
  marketCap,
  totalVolume,
}) {
  const currencyUnit = currency === "krw" ? "\\" : "$";
  const isPositiveCurrency =
    Number(percentage24h[`${currency}`]) >= 0 ? true : false;
  const isPositiveBTC = Number(percentage24h["btc"]) >= 0 ? true : false;

  return (
    <CoinInfoContainer>
      <CoinInfoLeft>
        <tbody>
          <tr>
            <th scope="row">시가총액 Rank</th>
            <td>{`Rank #${rank}`}</td>
          </tr>
          <tr>
            <th scope="row">웹사이트</th>
            <td>
              <a href={webSite} target="_blank" rel="noopener noreferrer">
                {webSite}
              </a>
            </td>
          </tr>
        </tbody>
      </CoinInfoLeft>
      <CoinInfoRight>
        <div>
          <div>
            <big>
              {currencyUnit}
              {currentPrice[`${currency}`]}
            </big>
            <small>{currentPrice["btc"]} BTC</small>
          </div>
          <div>
            <PercentSpan positive={isPositiveCurrency}>
              {percentage24h[`${currency}`]}%
            </PercentSpan>
            <PercentSmall positive={isPositiveBTC}>
              {percentage24h["btc"]}%
            </PercentSmall>
          </div>
        </div>
        <div>
          <div>
            <span>
              시가총액
              <br />
            </span>
            <span>
              {currencyUnit}
              {marketCap && marketCap[`${currency}`]}
            </span>
          </div>
          <div>
            <span>
              24시간 거래대금
              <br />
              {currencyUnit}
              {totalVolume && totalVolume[`${currency}`]}
            </span>
          </div>
        </div>
      </CoinInfoRight>
    </CoinInfoContainer>
  );
}

export default CoinInfo;

const CoinInfoContainer = styled.div`
  ${({ theme }) => theme.flex("space-between", null, null)};
`;

const CoinInfoLeft = styled.table`
  width: 50%;
  margin-top: 30px;
  border: 2px solid ${({ theme }) => theme.mainGrey};
  border-collapse: collapse;
  line-height: 3.5;
  text-indent: 1em;

  tbody {
    th {
      background-color: ${({ theme }) => theme.lightGrey};
      border-bottom: 2px solid ${({ theme }) => theme.mainGrey};
      text-align: left;
    }

    tr {
      border: 2px solid ${({ theme }) => theme.mainGrey};
    }

    td {
      a {
        all: unset;
        color: ${({ theme }) => theme.black};
        cursor: pointer;
      }
    }
  }
`;

const CoinInfoRight = styled.div`
  ${({ theme }) => theme.flex("space-between", null, "column")};
  width: 50%;
  margin-top: 30px;
  text-align: right;

  > div {
    ${({ theme }) => theme.flex("flex-end", "flex-end", null)};
    line-height: 2.5;

    div {
      ${({ theme }) => theme.flex(null, null, "column")};
      margin-left: 10px;

      big {
        height: 35px;
        font-weight: 700;
      }

      span {
        font-size: 13px;
        font-weight: 700;
        line-height: 1.2;
      }

      small {
        font-size: 11px;
        line-height: 1.2;
      }
    }
  }
`;

const PercentSpan = styled.span`
  color: ${(props) =>
    props.positive
      ? ({ theme }) => theme.positive
      : ({ theme }) => theme.negative};
`;

const PercentSmall = styled.small`
  color: ${(props) =>
    props.positive
      ? ({ theme }) => theme.positive
      : ({ theme }) => theme.negative};
`;
