import { NavLink, Outlet } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import {
  CommunityIcon,
  HeaderLogo,
  MyClosetIcon,
  NewMarketIcon,
  ResellMarketIcon,
  TrendIcon,
} from '../components/GlobalIcon';
import { modalStatus } from '../recolil/atom';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

function Layout() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalStatus);
  const themeApp = useTheme();

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    // 컴포넌트가 마운트된 후에 요소의 너비를 가져옵니다.
    const handleResize = () => {
      if (window.innerWidth < 595) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    if (isMobile === null) {
      handleResize();
    }
    // 컴포넌트가 마운트될 때 이벤트 리스너를 추가하고,
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <BackgroundContainer>
      <LayoutContainer
        mobile={isMobile !== null ? isMobile.toString() : 'false'}
      >
        {/* 레이아웃의 상단 내용 */}
        <Header>
          {/* 상단 내용 */}
          <HeaderLogo />
        </Header>

        {/* 중첩된 라우트를 표시할 위치 */}
        <Main ismodal={isModalOpen.toString()}>
          {/* Outlet을 사용하여 중첩된 라우트를 렌더링 */}
          <Outlet />
        </Main>

        {/* 레이아웃의 하단 내용 */}
      </LayoutContainer>
    </BackgroundContainer>
  );
}

export default Layout;

const LayoutContainer = styled.div<{ mobile: string }>`
  max-width: 595px;
  min-width: 320px;
  width: 100%;
  height: 100%;
  padding-top: 48px;
  padding-bottom: 70px;
  margin-right: ${({ mobile }) => (mobile !== 'false' ? '0px' : '100px')};
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey[0]};
`;

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.grey[5]};
`;

const Main = styled.main<{ ismodal: string }>`
  overflow: ${({ ismodal }) => (ismodal !== 'false' ? 'hidden' : 'auto')};
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
