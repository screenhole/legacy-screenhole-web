import { createGlobalStyle } from "styled-components";

const HideChat = createGlobalStyle`
  #Chat { display: none; }
  main { padding-left: var(--app-padding) !important; }
`;

export default HideChat;
