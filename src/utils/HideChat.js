import { createGlobalStyle } from "styled-components";

const HideChat = createGlobalStyle`
  #ChommentStream { display: none; }
  main { padding-left: var(--app-padding) !important; }
`;

export default HideChat;
