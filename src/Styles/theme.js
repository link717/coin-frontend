import { css } from "styled-components";

export const themes = {
  flex: (justify = null, align = null, direction = null) => css`
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
    flex-direction: ${direction};
  `,

  container: css`
    min-width: 750px;
    width: 70%;
  `,

  shadow: css`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  `,

  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)",
  lightGrey: "rgb(245, 245, 246)",
  mainGrey: "rgb(225, 226, 225)",
  deepGrey: "rgb(97, 97, 97)",
  negative: "rgb(51, 102, 255)",
  positive: "rgb(254, 65, 92)",
  bookmark: "rgb(255, 249, 63)",

  tableStyle: css`
    width: 100%;
    table-layout: fixed;

    thead {
      background-color: ${({ theme }) => theme.lightGrey};

      th {
        padding: 5px 15px;
        color: ${({ theme }) => theme.deepGrey};
        font-size: 14px;
      }
    }
  `,
};
