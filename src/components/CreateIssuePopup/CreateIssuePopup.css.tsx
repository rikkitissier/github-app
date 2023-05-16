import styled, { createGlobalStyle } from "styled-components";

export const PopupBodyStyle = createGlobalStyle`
  body {
    margin: 0;
    --HSUIKitFontSize: 14px;
  }
`;

export const PopupUI = styled("div")`
  background: var(--appBgColor);
  padding: 40px;
  min-height: 100vh;
`;
