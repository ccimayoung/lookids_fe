import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
const GlobalStyle = createGlobalStyle`
${normalize}
  *, *::before, *::after {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('/font/Pretendard-Regular.ttf') format('truetype');
    font-weight: normal; /* 보통 글꼴 */
  }

  /* Pretendard-SemiBold.ttf */
  @font-face {
    font-family: 'Pretendard-SemiBold';
    src: url('/font/Pretendard-SemiBold.ttf') format('truetype');
    font-weight: 600; /* Semi-Bold 글꼴 */
  }

  body {    
    overflow: auto;
    font-family: 'Pretendard-Regular', sans-serif; /* 기본 폰트 (보통) */
    font-size: 16px; /* 원하는 폰트 크기 설정 */
    ::-webkit-scrollbar {
      width: 0px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }
`;

export default GlobalStyle;
