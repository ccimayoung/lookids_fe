import * as React from 'react';
import { CanvasWrapper } from './three/CanvasWrapper';
import styled, { useTheme } from 'styled-components';
import { PhotoBox } from '../../components/PhotoBox';
import { MenuBtn } from '../../components/MenuBtn';

export interface IAppProps {}

export default function CoordinationRoom() {
  const [selectedMenu, setSelectedMenu] = React.useState<string>('상의');

  return (
    <Wrapper>
      <TopWrap>
        <CanvasWrapper></CanvasWrapper>
        <CodyWrap>
          <PhotoBox $boxSize="s" $type="cody" />
          <PhotoBox $boxSize="s" $type="cody" />
          <PhotoBox $boxSize="s" $type="cody" />
          <PhotoBox $boxSize="s" $type="cody" />
        </CodyWrap>
      </TopWrap>
      <ClothWrap>
        <RowDiv>
          <MenuBtn $size="s" $content="상의" $active={selectedMenu === '상의'} $setSelectedMenu={setSelectedMenu} />
          <MenuBtn $size="s" $content="하의" $active={selectedMenu === '하의'} $setSelectedMenu={setSelectedMenu} />
          <MenuBtn $size="s" $content="아우터" $active={selectedMenu === '아우터'} $setSelectedMenu={setSelectedMenu} />
          <MenuBtn $size="s" $content="악세사리" $active={selectedMenu === '악세사리'} $setSelectedMenu={setSelectedMenu} />
          <MenuBtn $size="s" $content="신발" $active={selectedMenu === '신발'} $setSelectedMenu={setSelectedMenu} />
          <MenuBtn $size="s" $content="기타" $active={selectedMenu === '기타'} $setSelectedMenu={setSelectedMenu} />
        </RowDiv>
        <RowDiv>
          <PhotoBox $boxSize="s" $type="cloth" $wear={true} />
          <PhotoBox $boxSize="s" $type="cloth" $wear={true} />
          <PhotoBox $boxSize="s" $type="cloth" $wear={true} />
        </RowDiv>
      </ClothWrap>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  /* height: 100vh; */
  /* background-color: green; */
  padding: 20px;
`;

const TopWrap = styled.div`
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  /* background-color: #93ff93; */
`;

const CodyWrap = styled.div`
  width: 100px;
  height: 320px;
  max-height: 320px;
  row-gap: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  column-gap: 10px;
  /* background-color: #ffe493; */
`;

const ClothWrap = styled.div`
  margin-top: 20px;
  width: 100%;
  min-height: 200px;
  display: grid;
  grid-template-columns: '1fr 1fr 1fr';
  width: 100%;
  row-gap: 10px;
  background-color: ${({ theme }) => theme.colors.yellow[1]};
  border-radius: 10px;
  padding: 5px;
`;

export const RowDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
