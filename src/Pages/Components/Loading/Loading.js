import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingContainer>
      <span></span>
      <span></span>
      <span></span>
    </LoadingContainer>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  ${({ theme }) => theme.flex("center", "center", null)};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;

  span {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 2px;
    background-color: ${({ theme }) => theme.deepGrey};
    border-radius: 50%;
    animation: loading 1s linear infinite;

    :nth-child(2) {
      animation-delay: 0.2s;
    }

    :nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.2);
    }
  }
`;
