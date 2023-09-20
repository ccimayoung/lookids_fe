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

function Layout() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalStatus);
  const themeApp = useTheme();
  return (
    <BackgroundContainer>
      <LayoutContainer>
        {/* 레이아웃의 상단 내용 */}
        <Header>
          {/* 상단 내용 */}
          <HeaderLogo />
        </Header>

        {/* 중첩된 라우트를 표시할 위치 */}
        <Main isModalOpen={isModalOpen}>
          {/* Outlet을 사용하여 중첩된 라우트를 렌더링 */}
          <Outlet />
        </Main>

        {/* 레이아웃의 하단 내용 */}
        <Footer>
          <NavStyled>
            <NavLinkStyled to="/">
              <IconBox>
                <TrendIcon color={themeApp.colors.neutral[4]} />
                트렌드
              </IconBox>
            </NavLinkStyled>
            <NavLinkStyled to="/resell-market">
              <IconBox>
                <ResellMarketIcon color={themeApp.colors.neutral[4]} />
                중고마켓
              </IconBox>
            </NavLinkStyled>
            <NavLinkStyled to="/new-market">
              <IconBox>
                <NewMarketIcon color={themeApp.colors.neutral[4]} />
                신상마켓
              </IconBox>
            </NavLinkStyled>
            <NavLinkStyled to="/community">
              <IconBox>
                <CommunityIcon color={themeApp.colors.neutral[4]} />
                커뮤니티
              </IconBox>
            </NavLinkStyled>
            <NavLinkStyled to="/coordinaton-room">
              <IconBox>
                <MyClosetIcon color={themeApp.colors.neutral[4]} />
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

const LayoutContainer = styled.div`
  max-width: 575px;
  min-width: 395px;
  height: 100%;
  padding-top: 48px;
  padding-bottom: 70px;
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
const IconBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
  height: 51px;
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
const Main = styled.main<{ isModalOpen: boolean }>`
  overflow: ${({ isModalOpen }) => (isModalOpen ? 'hidden' : 'auto')};
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
const NavStyled = styled.nav`
  display: flex;
  background-color: red;
  border-top: ${({ theme }) => `1px solid ${theme.colors.neutral[2]}`};
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
  &.active {
  }
`;
