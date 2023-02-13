import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { OPTIONS } from "./selectBoxData";
import { setView } from "../../../../store/modules/CheckView";
import { setCurrency } from "../../../../store/modules/CheckCurrency";
import { setCount } from "../../../../store/modules/CheckCount";
import { setPage } from "../../../../store/modules/CheckPage";

function SelectBox({ view, currency, count }) {
  const dispatch = useDispatch();
  const handleOptions = (e) => {
    const category = e.target.name;
    const type = e.target.value;

    switch (category) {
      case "view":
        return dispatch(setView(type));
      case "currency":
        dispatch(setPage(1));
        return dispatch(setCurrency(type));
      case "count":
        dispatch(setPage(1));
        return dispatch(setCount(type));
      default:
    }
  };

  return (
    <SelectBoxContainer>
      {OPTIONS.map((option) => (
        <select key={option.id} name={option.category} onChange={handleOptions}>
          {option.subCategories.map((subCategory, idx) => (
            <option key={idx} value={subCategory.type}>
              {subCategory.name}
            </option>
          ))}
        </select>
      ))}
    </SelectBoxContainer>
  );
}

export default SelectBox;

const SelectBoxContainer = styled.div`
  ${({ theme }) => theme.flex("flex-end", null, null)};
  ${({ theme }) => theme.container};
  margin: 0 auto;
  padding-bottom: 15px;

  select {
    ${({ theme }) => theme.selectStyle}
  }
`;
