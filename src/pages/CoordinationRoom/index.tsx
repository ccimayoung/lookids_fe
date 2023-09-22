import * as React from 'react';
import { CanvasWrapper } from './three/CanvasWrapper';
import styled, { useTheme } from 'styled-components';
import { PhotoBox } from '../../components/PhotoBox';
import { GrayCircle, MenuBtn } from '../../components/MenuBtn';
import { ReactComponent as CartSvg } from '../../assets/svg/cart.svg';
import { ReactComponent as BodySvg } from '../../assets/svg/body.svg';
import { ReactComponent as QuestionSvg } from '../../assets/svg/question.svg';
import { ReactComponent as SaveSvg } from '../../assets/svg/save.svg';
import { useRecoilState } from 'recoil';
import { childrenInfoAtom, modalGatherAtom, simpleModalAtom, wearArrayAtom } from '../../recolil/atom';
import { ChildrenInfoModal } from '../../components/Modal/ChildrenInfoModal';
import { divProps } from '../../components/props';

export interface IAppProps {}

export default function CoordinationRoom() {
  const [selectedMenu, setSelectedMenu] = React.useState<string>('상의');
  const [modalGather, setModalGather] = useRecoilState(modalGatherAtom);
  const [simpleModal, setSimpleModal] = useRecoilState(simpleModalAtom);
  const [childrenInfo, setChildrenInfo] = useRecoilState(childrenInfoAtom);

  return (
    <Wrapper>
      <TopWrap>
        <CanvasWrapper />
        <SettingBtnWrap>
          <Circle onClick={() => setModalGather({ ...modalGather, closetQuestion: true })}>
            <QuestionSvg />
          </Circle>
          <Circle onClick={() => setModalGather({ ...modalGather, closetBody: true })}>
            <BodySvg />
          </Circle>
          <Circle
            onClick={() =>
              setSimpleModal({
                simplePopup: true,
                content: [['p', '저장완료']],
                btnContent: '확인',
                onClick: () => {
                  setSimpleModal({
                    ...simpleModal,
                    simplePopup: false,
                  });
                },
              })
            }
          >
            <SaveSvg />
          </Circle>
          <Circle>
            <CartSvg
              onClick={() =>
                setSimpleModal({
                  simplePopup: true,
                  content: [['p', '장바구니에 담겼습니다']],
                  btnContent: '장바구니 이동',
                  onClick: () => {
                    setSimpleModal({
                      ...simpleModal,
                      simplePopup: false,
                    });
                  },
                })
              }
            />
          </Circle>
        </SettingBtnWrap>
        <CodyWrap>
          <PhotoBox $codyId={'샘플코디1'} $boxSize="s" $type="cody" $img={'img/샘플옷.png'} />
          <PhotoBox $codyId={'샘플코디2'} $boxSize="s" $type="cody" $img={'img/샘플옷2.png'} />
          <PhotoBox $codyId={'샘플코디3'} $boxSize="s" $type="cody" $img={'img/샘플옷.png'} />
          <PhotoBox $codyId={'샘플코디4'} $boxSize="s" $type="cody" $img={'img/샘플옷.png'} />
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
          <PhotoBox $clothId={'top1'} $boxSize="s" $work="cloth" $wear={true} $type={'상의'} $img={'img/top1.png'} $size="s" $color="줄무늬" />
          <PhotoBox $clothId={'top2'} $boxSize="s" $work="cloth" $wear={true} $type={'상의'} $img={'img/top2.png'} $size="m" $color="블랙" />
          <PhotoBox $clothId={'top3'} $boxSize="s" $work="cloth" $wear={true} $type={'상의'} $img={'img/top3.png'} $size="l" $color="퍼플" />
        </RowDiv>
        <RowDiv>
          <PhotoBox $clothId={'skirt1'} $boxSize="s" $work="cloth" $wear={true} $type={'치마'} $img={'img/skirt1.png'} $size="s" $color="하늘" />
          <PhotoBox $clothId={'top5'} $boxSize="s" $work="cloth" $wear={true} $type={'상의'} $img={'img/top2.png'} $size="s" $color="줄무늬" />
          <PhotoBox $clothId={'top6'} $boxSize="s" $work="cloth" $wear={true} $type={'상의'} $img={'img/top3.png'} $size="s" $color="줄무늬" />
        </RowDiv>
      </ClothWrap>
      <ChildrenInfoModal />
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
  position: relative;
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
`;

const ClothWrap = styled.div`
  margin-top: 20px;
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;
  background-color: ${({ theme }) => theme.colors.yellow[1]};
  border-radius: 10px;
  padding: 5px;
`;

export const RowDiv = styled.div<divProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: ${(props) => props.$cGap};
  align-items: center;
`;

const SettingBtnWrap = styled.div`
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 7px;
  position: absolute;
  top: 5px;
  left: 5px;
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid ${({ theme }) => theme.colors.neutral[1]};
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
`;
