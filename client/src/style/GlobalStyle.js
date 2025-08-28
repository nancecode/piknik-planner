// src/style/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Lexend', sans-serif;
    background-color: #fff; /* Optional */
    color: #000; /* Optional */
  }
`;

export default GlobalStyle;
