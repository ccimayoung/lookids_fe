import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import {
  BasketIcon,
  CommunityIcon,
  HeaderLogo,
  MyClosetIcon,
  NewMarketIcon,
  ProfileIcon,
  ResellMarketIcon,
  TrendIcon,
} from '../components/GlobalIcon';
import { modalStatus } from '../recolil/atom';
import { useRecoilState } from 'recoil';

import { SimplePopup } from '../components/Modal/SimplePopup';
import { useEffect, useRef, useState } from 'react';
import { LoginModal } from '../components/LoginModal';

function Layout() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalStatus);
  const themeApp = useTheme();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  // Detect routing changes and perform actions
  const handlePageChange = () => {
    if (location.pathname.includes('resell-market')) return setActivePage(1);
    if (location.pathname.includes('new-market')) return setActivePage(2);
    if (location.pathname.includes('coordinaton-room')) return setActivePage(4);
    if (location.pathname.includes('community')) return setActivePage(3);
    return setActivePage(0);
  };
  const handleShowDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
    handlePageChange();
  }, [location]);
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
    <BackgroundContainer onClick={() => setIsOpen(false)}>
      <LayoutContainer $mobile={isMobile !== null ? isMobile.toString() : 'false'}>
        {/* 레이아웃의 상단 내용 */}
        <Header>
          {/* 상단 내용 */}
          <HeaderLogo />
          <HeaderRight>
            <BasketIconBox>
              <BasketIcon color={themeApp.colors.neutral[3]} />
            </BasketIconBox>
            <ProfileIconBox onClick={handleShowDropDown}>
              <ProfileIcon color={themeApp.colors.neutral[2]} backColor={themeApp.colors.neutral[1]} />
            </ProfileIconBox>
          </HeaderRight>
          {isOpen && (
            <LoginBox
              onClick={(e) => {
                e.stopPropagation();
                if (token) {
                  console.log(token);
                  localStorage.clear();
                  setIsOpen(false);
                  return console.log('로그아웃');
                }
                setIsOpen(false);
                setShowLoginModal(true);
                return console.log('로그인');
              }}
            >
              {token ? '로그아웃' : '로그인'}
            </LoginBox>
          )}
        </Header>

        {/* 중첩된 라우트를 표시할 위치 */}
        <Main $ismodal={isModalOpen || showLoginModal ? 'true' : 'false'} ref={mainRef}>
          {/* Outlet을 사용하여 중첩된 라우트를 렌더링 */}
          <Outlet />
          <SimplePopup />
          <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </Main>

        {/* 레이아웃의 하단 내용 */}
        <Footer>
          <NavStyled>
            <NavLinkStyled to="/">
              <IconBox $activepage={activePage === 0}>
                <TrendIcon color={activePage === 0 ? themeApp.colors.yellow[3] : themeApp.colors.neutral[4]} />
                트렌드
              </IconBox>
            </NavLinkStyled>
            <NavLinkStyled to="/resell-market">
              <IconBox $activepage={activePage === 1}>
                <ResellMarketIcon color={activePage === 1 ? themeApp.colors.yellow[3] : themeApp.colors.neutral[4]} />
                중고마켓
              </IconBox>
            </NavLinkStyled>
            <NavLinkStyled to="/new-market">
              <IconBox $activepage={activePage === 2}>
                <NewMarketIcon color={activePage === 2 ? themeApp.colors.yellow[3] : themeApp.colors.neutral[4]} />
                신상마켓
              </IconBox>
            </NavLinkStyled>
            <NavLinkStyled to="/community">
              <IconBox $activepage={activePage === 3} style={{ marginTop: '8px' }}>
                <CommunityIcon color={activePage === 3 ? themeApp.colors.yellow[3] : themeApp.colors.neutral[4]} />
                커뮤니티
              </IconBox>
            </NavLinkStyled>
            <NavLinkStyled to="/coordinaton-room">
              <IconBox $activepage={activePage === 4}>
                <MyClosetIcon color={activePage === 4 ? themeApp.colors.yellow[3] : themeApp.colors.neutral[4]} />
                나의 옷장
              </IconBox>
            </NavLinkStyled>
          </NavStyled>
        </Footer>
      </LayoutContainer>
    </BackgroundContainer>
  );
}

export default Layout;

const LayoutContainer = styled.div<{ $mobile: string }>`
  max-width: 595px;
  min-width: 320px;
  width: 100%;
  height: 100%;
  padding-bottom: 70px;
  margin-right: ${({ $mobile }) => ($mobile !== 'false' ? '0px' : '100px')};
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
const IconBox = styled.div<{ $activepage: boolean }>`
  display: flex;
  color: ${({ $activepage, theme }) => ($activepage ? theme.colors.yellow[3] : theme.colors.neutral[4])};
  align-items: center;
  flex-direction: column;
  gap: 5px;
  /* justify-content: space-between; */
  height: 51px;
`;

const Footer = styled.footer`
  flex: 1; /* 부모 컴포넌트의 남은 공간을 채우도록 설정 */
  width: 100%; /* 부모 컴포넌트의 100% 너비로 설정 */
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 0;
`;
const Main = styled.main<{ $ismodal: string }>`
  overflow: ${({ $ismodal }) => ($ismodal !== 'false' ? 'hidden' : 'auto')};
`;
const Header = styled.header`
  display: flex;
  width: 100%;
  position: relative;
  top: 0;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[6]};
  margin: 0;
  padding: 0;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 24px;
`;
const NavStyled = styled.nav`
  display: flex;
  border-top: ${({ theme }) => `1px solid ${theme.colors.neutral[2]}`};
`;
const LoginBox = styled.button`
  background-color: ${({ theme }) => theme.colors.yellow[2]};
  border: none;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  top: 45px;
  z-index: 99;
  right: 20px;
  font-size: 12px;
  width: 100px;
  padding: 7px;
  border-radius: 5px;
`;
const NavLinkStyled = styled(NavLink)`
  color: ${({ theme }) => theme.colors.grey[2]};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  text-decoration: none;
  font-weight: bold;
  flex: 1;
  height: 70px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .community {
    padding-top: 2.5px;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  gap: 5px;
  margin-right: 20px;
`;

const BasketIconBox = styled.button`
  border: none;
  background-color: white;
`;
const ProfileIconBox = styled.button`
  border: none;
  background-color: white;
`;
