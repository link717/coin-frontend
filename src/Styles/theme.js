import { css } from "styled-components";

export const themes = {
  flex: (justify = null, align = null, direction = null) => css`
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
    flex-direction: ${direction};
  `,
};
