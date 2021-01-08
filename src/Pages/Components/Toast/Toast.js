import React from "react";
import styled from "styled-components";
import { themes } from "../../../Styles/theme";

function Toast({ openToast }) {
  return (
    <ToastContainer openToast={openToast}>
      <p>북마크가 해제되었습니다.</p>
    </ToastContainer>
  );
}

export default Toast;

const ToastContainer = styled.div`
  display: ${(props) => (props.openToast ? "block" : "none")};
  position: absolute;
  top: 40px;
  z-index: 10;
  animation: toast 0.4s linear 1;

  p {
    padding: 15px 30px;
    background-color: ${({ theme }) => theme.deepGrey};
    border-radius: 5px;
    ${({ theme }) => theme.shadow};
    color: ${({ theme }) => theme.white};
  }

  @keyframes toast {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
