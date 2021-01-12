import React, { useState } from "react";
import styled from "styled-components";

function Calculator({ currency, symbol, currentPrice }) {
  const [leftInput, setLeftInput] = useState(null);
  const [rightInput, setRightInput] = useState(null);

  const checkFraction = (value) => {
    const valueToString = String(value);
    if (valueToString.includes(".")) {
      return valueToString.substring(valueToString.indexOf(".")).length > 8;
    } else return false;
  };

  const handleCryptoForm = (deleteCommaValue, price) => {
    const crypto = deleteCommaValue / price;
    if (checkFraction(crypto)) {
      return crypto.toFixed(8);
    } else {
      return crypto;
    }
  };

  const handleCurrencyForm = (deleteCommaValue, price) => {
    return (deleteCommaValue * price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    const price = [...currentPrice[`${currency}`]]
      .filter((str) => str !== ",")
      .join("");

    if (name === "left") {
      const check8Digits = checkFraction(value)
        ? Number(value).toFixed(8)
        : value;
      return (
        setLeftInput(check8Digits),
        setRightInput(handleCurrencyForm(value, price))
      );
    } else {
      const deleteCommaValue = [...value].filter((str) => str !== ",").join("");
      const addCommaValue = Number(deleteCommaValue).toLocaleString();

      if (!isNaN(deleteCommaValue)) {
        return (
          setLeftInput(handleCryptoForm(deleteCommaValue, price)),
          setRightInput(addCommaValue)
        );
      } else {
        return setRightInput(0);
      }
    }
  };

  return (
    <CalulatorContainer>
      <span>가격 계산</span>
      <div>
        <PriceConvertor onInput={handleInputValue}>
          <div>
            <span>{symbol}</span>
            <input type="number" name="left" value={leftInput} />
          </div>
          <Arrow></Arrow>
          <div>
            <span>{currency.toUpperCase()}</span>
            <input type="text" name="right" value={rightInput} />
          </div>
        </PriceConvertor>
      </div>
    </CalulatorContainer>
  );
}

export default Calculator;

const CalulatorContainer = styled.div`
  ${({ theme }) => theme.flex("center", null, "column")};
  ${({ theme }) => theme.container};
  width: 100%;
  padding: 20px 20px 30px;
  margin: 25px auto 0;
  background-color: ${({ theme }) => theme.mainGrey};

  > span {
    font-size: 14px;
    font-weight: 700;
  }
`;

const PriceConvertor = styled.div`
  ${({ theme }) => theme.flex("center", null, null)};
  margin-top: 20px;

  div {
    ${({ theme }) => theme.flex(null, null, null)};
    height: 50px;

    span {
      width: 100px;
      height: 100%;
      padding: 16px 10px 0;
      background-color: ${({ theme }) => theme.lightGrey};
      border: 1px solid ${({ theme }) => theme.mainGrey};
      font-weight: 700;
    }

    input {
      width: 230px;
      height: 100%;
      border: 1px solid ${({ theme }) => theme.mainGrey};
      text-indent: 1em;
      outline: none;
    }
  }
`;

const Arrow = styled.button`
  ::before {
    height: 100%;
    padding: 5px 10px;
    content: "\f362";
    font-family: "Font Awesome\ 5 Free";
    font-size: 22px;
    font-weight: 600;
  }
`;
