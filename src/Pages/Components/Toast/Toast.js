import React from "react";
import styled from "styled-components";

function Toast({ openToast }) {
  return (
    <>
      {openToast === "checked" && (
        <ToastContainer openToast={openToast}>
          <p>북마크가 설정되었습니다.</p>
        </ToastContainer>
      )}
      {openToast === "unchecked" && (
        <ToastContainer openToast={openToast}>
          <p>북마크가 해제되었습니다.</p>
        </ToastContainer>
      )}
    </>
  );
}

export default Toast;

const ToastContainer = styled.div`
  display: "block";
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
    font-size: 14px;
    white-space: nowrap;
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
