import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

export const InjectGlobalStyle = createGlobalStyle`
  ${styledNormalize}
  body {
    background-color: #222034;
  }
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;
