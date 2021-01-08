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
  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)",
  lightGrey: "rgb(245, 245, 246)",
  mainGrey: "rgb(225, 226, 225)",
  deepGrey: "rgb(97, 97, 97)",
  negative: "rgb(254, 65, 92)",
  positive: "rgb(51, 102, 255)",
  bookmark: "rgb(255, 249, 63)",
};
