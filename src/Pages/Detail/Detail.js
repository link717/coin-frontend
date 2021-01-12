import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import CoinInfo from "./Components/CoinInfo/CoinInfo";
import Toast from "../../Pages/Components/Toast/Toast";
import Loading from "../Components/Loading/Loading";
import Calculator from "./Components/Calculator/Calculator";
import Description from "./Components/Description/Description";
import { addBookmark, deleteBookmark } from "../../store/modules/CheckBookmark";
import { SERVER_API } from "../../Config/urls";
import { OPTIONS } from "../Main/Components/SelectBox/selectBoxData";

function Detail({ match }) {
  const coinId = match.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [detailData, setDetailData] = useState({});
  const bookmarkedCoins = useSelector((store) => store.setBookmarkDataRedeucer);
  const data = useSelector((store) => store.setCoinDataRedeucer).find(
    (coin) => coin.id === detailData.id
  );

  const isBookmarked = bookmarkedCoins.some((coin) =>
    coin ? coin.id === detailData.id : false
  );

  const [openToast, setOpenToast] = useState("defalut");
  const [currency, setCurrency] = useState("krw");

  const handlePriceForm = (price) => {
    return Number(price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePercentForm = (percentage) => {
    return Number(percentage).toFixed(1);
  };

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setIsLoading(true);
        const detailUrl = `${SERVER_API}/${coinId}`;
        const { data } = await axios.get(detailUrl);
        const fetchData = {
          id: data.id,
          name: data.localization.ko,
          symbol: data.symbol.toUpperCase(),
          image: data.image.thumb,
          rank: data.market_cap_rank,
          webSite: data.links.homepage[0],
          currentPrice: {
            krw: handlePriceForm(data.market_data.current_price.krw),
            usd: handlePriceForm(data.market_data.current_price.usd),
            btc: data.market_data.current_price.btc,
          },
          percentage24h: {
            krw: handlePercentForm(
              data.market_data.price_change_percentage_24h_in_currency.krw
            ),
            usd: handlePercentForm(
              data.market_data.price_change_percentage_24h_in_currency.usd
            ),
            btc: handlePercentForm(
              data.market_data.price_change_percentage_24h_in_currency.btc
            ),
          },
          marketCap: {
            krw: handlePriceForm(data.market_data.market_cap.krw),
            usd: handlePriceForm(data.market_data.market_cap.usd),
          },
          totalVolume: {
            krw: handlePriceForm(data.market_data.total_volume.krw),
            usd: handlePriceForm(data.market_data.total_volume.usd),
          },
          description: { ko: data.description.ko, en: data.description.en },
        };

        if (fetchData) {
          setIsLoading(false);
          setDetailData(fetchData);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchCoinData();
  }, []);

  const filterBookmark = (detailData) => {
    const coins = bookmarkedCoins.filter((coin) => coin.id !== detailData.id);
    dispatch(deleteBookmark(coins));
  };

  const dispatch = useDispatch();
  const handleBookmark = () => {
    if (!isBookmarked) {
      setOpenToast("checked");
      dispatch(addBookmark(data));
      setTimeout(() => {
        setOpenToast("defalut");
      }, 600);
    } else {
      setOpenToast("unchecked");
      filterBookmark(detailData);
      setTimeout(() => {
        setOpenToast("default");
      }, 600);
    }
  };

  const handleCurrency = (e) => {
    const type = e.target.value;
    setCurrency(type);
  };

  return (
    <DetailContainer>
      {isLoading ? <Loading /> : null}
      {detailData.id && (
        <>
          <HeaderContainer>
            <div>
              <Bookmark
                onClick={() => handleBookmark()}
                bookmarked={isBookmarked}
              ></Bookmark>
              <img src={detailData.image} alt={detailData.name} />
              <h3>
                {detailData.name}
                {detailData.symbol && `(${detailData.symbol})`}
                <Toast openToast={openToast} />
              </h3>
            </div>
            <select name="currency" onChange={handleCurrency}>
              {OPTIONS[1].subCategories.map((currency, idx) => (
                <option key={idx} value={currency.type}>
                  {currency.name}
                </option>
              ))}
            </select>
          </HeaderContainer>
          <CoinInfo
            currency={currency}
            rank={detailData.rank}
            webSite={detailData.webSite}
            currentPrice={detailData.currentPrice}
            percentage24h={detailData.percentage24h}
            marketCap={detailData.marketCap}
            totalVolume={detailData.totalVolume}
          />
          <Calculator
            currency={currency}
            symbol={detailData.symbol}
            currentPrice={detailData.currentPrice}
          />
          <Description text={detailData.description} />
        </>
      )}
    </DetailContainer>
  );
}

export default Detail;

const DetailContainer = styled.div`
  ${({ theme }) => theme.flex("center", null, "column")};
  ${({ theme }) => theme.container};
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  ${({ theme }) => theme.flex("space-between", null, null)};
  width: 100%;
  margin-top: 20px;

  > div {
    ${({ theme }) => theme.flex(null, "center", null)};
  }

  h3 {
    position: relative;
  }

  img {
    margin: 0 4px;
  }

  select {
    ${({ theme }) => theme.selectStyle}
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
