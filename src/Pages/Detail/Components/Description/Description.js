import React, { useState } from "react";
import styled from "styled-components";

function Description({ text }) {
  const description = text.ko ? text.ko : text.en ? text.en : null;
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  function createMarkup() {
    return { __html: description };
  }

  return (
    <>
      {description && (
        <DescriptionContainer>
          <ToggleBTN onClick={handleToggle}>
            <span>설명보기</span>
            <div></div>
          </ToggleBTN>
          <div>
            <TextArea
              toggle={isToggled}
              dangerouslySetInnerHTML={createMarkup()}
            ></TextArea>
          </div>
        </DescriptionContainer>
      )}
    </>
  );
}

export default Description;

const DescriptionContainer = styled.div`
  ${({ theme }) => theme.flex("center", null, "column")};
  ${({ theme }) => theme.container};
  width: 100%;
  margin: 0 auto 50px;
`;

const ToggleBTN = styled.button`
  ${({ theme }) => theme.flex("center", null, null)};
  margin: 20px auto;
  font-size: 14px;

  span {
    padding: 4px;
  }

  div:last-child {
    margin: auto 0;
    /* transform: rotate(45deg); */

    ::after {
      content: "\f150";
      color: ${({ theme }) => theme.deepGrey};
      font-family: "Font Awesome\ 5 Free";
      font-size: 18px;
      font-weight: 600;
    }
  }
`;

const TextArea = styled.pre`
  display: ${(props) => (!props.toggle ? "none" : "block")};
  padding-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.lightGrey};
  white-space: pre-wrap;
`;
