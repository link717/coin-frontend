import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function Title() {
  const [selectedId, setSelectedId] = useState(0);
  const history = useHistory();
  const goToPages = (path, id) => {
    setSelectedId(id);
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

export default Title;

const MENUS = [
  { id: 0, name: "가상자산 시세 목록", path: "/main" },
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
  box-shadow: ${(props) =>
    props.selectedId ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "none"};
  color: ${(props) =>
    props.selectedId
      ? ({ theme }) => theme.black
      : ({ theme }) => theme.deepGrey};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
