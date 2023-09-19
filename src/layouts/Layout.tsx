import { NavLink, Outlet } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { HeaderLogo } from '../components/GlobalIcon';

function Layout() {
  const themeApp = useTheme();
  console.log(themeApp.colors.grey[5]);
  return (
    <BackgroundContainer>
      <LayoutContainer>
        {/* 레이아웃의 상단 내용 */}
        <Header>
          <HeaderLogo />
          {/* 상단 내용 */}
        </Header>

        {/* 중첩된 라우트를 표시할 위치 */}
        <main>
          {/* Outlet을 사용하여 중첩된 라우트를 렌더링 */}
          <Outlet />
        </main>

        {/* 레이아웃의 하단 내용 */}
        <Footer>
          <NavStyled>
            <NavLinkStyled to="/">트렌드</NavLinkStyled>
            {/* <NavLinkStyled to="/applicant">가입자</NavLinkStyled> */}
            <NavLinkStyled to="/new-market">신상마켓</NavLinkStyled>
            <NavLinkStyled to="/resell-market">중고마켓</NavLinkStyled>
            <NavLinkStyled to="/coordinaton-room">코디룸</NavLinkStyled>
            <NavLinkStyled to="/mypage">커뮤니티</NavLinkStyled>
          </NavStyled>
        </Footer>
      </LayoutContainer>
    </BackgroundContainer>
  );
}

export default Layout;

const LayoutContainer = styled.div`
  max-width: 765px;
  min-width: 395px;
  height: 100%;
  padding-top: 48px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey[0]};
`;

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 100px;

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
  padding-left: 7px;
`;
const NavStyled = styled.nav`
  display: flex;
  background-color: red;
`;
const NavLinkStyled = styled(NavLink)`
  color: ${({ theme }) => theme.colors.grey[2]};
  background-color: ${({ theme }) => theme.colors.grey[8]};
  text-decoration: none;
  font-weight: bold;
  flex: 1;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
  &.active {
    background-color: ${({ theme }) => theme.colors.grey[2]};
    color: ${({ theme }) => theme.colors.grey[0]};
  }
`;
