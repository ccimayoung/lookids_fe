import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderLogo } from '../components/GlobalIcon';

function NoTabLayout() {
  return (
    <BackgroundContainer>
      <LayoutContainer>
        {/* 레이아웃의 상단 내용 */}
        <Header>
          <HeaderLogo />
          {/* 상단 내용 */}
        </Header>

        {/* 중첩된 라우트를 표시할 위치 */}
        <Main>
          {/* Outlet을 사용하여 중첩된 라우트를 렌더링 */}
          <Outlet />
        </Main>

        {/* 레이아웃의 하단 내용 */}
        <Footer />
      </LayoutContainer>
    </BackgroundContainer>
  );
}

export default NoTabLayout;

const LayoutContainer = styled.div`
  max-width: 512px;
  min-width: 395px;
  height: 100%;
  padding-top: 48px;
  padding-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey[0]};
`;

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 100px;
  overflow: hidden;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.grey[5]};
`;
const Footer = styled.footer`
  flex: 1; /* 부모 컴포넌트의 남은 공간을 채우도록 설정 */
  width: 100%; /* 부모 컴포넌트의 100% 너비로 설정 */
  position: absolute;
  background-color: gold;
  bottom: 0;
  margin: 0;
  padding: 0;
`;
const Main = styled.main`
  overflow: auto;
`;
const Header = styled.header`
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[6]};
  margin: 0;
  padding: 0;
  padding-left: 24px;
`;
