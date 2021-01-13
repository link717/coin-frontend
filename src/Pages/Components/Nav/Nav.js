import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setPage } from "../../../store/modules/CheckPage";

function Nav() {
  const [selectedId, setSelectedId] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const goToPages = (path, id) => {
    setSelectedId(id);
    dispatch(setPage(1));
    history.push(path);
  };

  return (
    <NavContainer>
      {MENUS.map((menu) => (
        <Button
          key={menu.id}
          selectedId={selectedId === menu.id ? true : false}
          onClick={() => goToPages(menu.path, menu.id)}
        >
          {menu.name}
        </Button>
      ))}
    </NavContainer>
  );
}

export default Nav;

const MENUS = [
  { id: 0, name: "가상자산 시세 목록", path: "/" },
  {
    id: 1,
    name: "북마크 목록",
    path: "/bookmark",
  },
];

const NavContainer = styled.div`
  ${({ theme }) => theme.flex("center", null, null)};
  ${({ theme }) => theme.container};
  margin: 40px auto 20px;
`;

const Button = styled.button`
  width: 50%;
  padding: 15px;
  background-color: ${(props) =>
    props.selectedId
      ? ({ theme }) => theme.white
      : ({ theme }) => theme.mainGrey};
  ${(props) => (props.selectedId ? ({ theme }) => theme.shadow : "none")};
  color: ${(props) =>
    props.selectedId
      ? ({ theme }) => theme.black
      : ({ theme }) => theme.deepGrey};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
