import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import QuitSvg from '../../assets/svg/quit.svg';
import { ReactComponent as PhotoUploadSvg } from '../../assets/svg/photoUpload.svg';
import { childrenInfoAtom, modalGatherAtom } from '../../recolil/atom';
import { ModalBtn } from './SimplePopup';
import { TitleAndContent } from '../TitleAndContent';
import { TitleAndSelectBox } from '../TitleAndSelectBox';
import { RowDiv } from '../../pages/CoordinationRoom';
import { useRef } from 'react';

export const ChildrenInfoModal = () => {
  const [modalGather, setModalGather] = useRecoilState(modalGatherAtom);
  const firstRef = useRef<any>(null);
  const secondRef = useRef<any>(null);
  const [childrenInfo, setChildrenInfo] = useRecoilState(childrenInfoAtom);

  const getInfoFunc = () => {
    setChildrenInfo({
      img: null,
      gender: firstRef.current.children[0].children[1].innerText,
      age: firstRef.current.children[1].children[1].defaultValue,
      height: secondRef.current.children[0].children[1].defaultValue,
      weight: secondRef.current.children[1].children[1].defaultValue,
    });
    setTimeout(() => {
      setModalGather({
        ...modalGather,
        closetBody: false,
      });
    }, 100);
  };

  return (
    modalGather.closetBody && (
      <Wrap>
        <ModalBox>
          <QuitImg
            src={QuitSvg}
            onClick={() => {
              setModalGather({
                ...modalGather,
                closetBody: false,
              });
            }}
          />
          <PhotoBox>
            <PhotoUploadSvg />
          </PhotoBox>
          <RowDiv $cGap="10px" ref={firstRef}>
            <TitleAndSelectBox $title="성별" $titleWidth="35px" $content={childrenInfo.gender} $list={['남', '여']} $contentSize="s" />
            <TitleAndContent $writeAble={true} $title="나이" $content={childrenInfo.age} $contentSize="s" />
          </RowDiv>
          <RowDiv $cGap="10px" style={{ marginTop: '10px' }} ref={secondRef}>
            <TitleAndContent $writeAble={true} $title="키" $titleWidth="35px" $content={childrenInfo.height} $contentSize="s" $unit="cm" />
            <TitleAndContent $writeAble={true} $title="몸무게" $content={childrenInfo.weight} $contentSize="s" />
          </RowDiv>

          <ModalBtn onClick={getInfoFunc}>모델 생성</ModalBtn>
        </ModalBox>
      </Wrap>
    )
  );
};
const Wrap = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  min-height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;
`;

const ModalBox = styled.div`
  position: relative;
  width: 270px;
  height: 320px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border: 2px solid ${({ theme }) => theme.colors.yellow[3]};
  z-index: 40;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 25px;
  flex-direction: column;
`;

export const QuitImg = styled.img`
  width: 24px;
  height: 24px;
  top: 10px;
  right: 10px;
  position: absolute;
  cursor: pointer;
  z-index: 30;
`;

const PhotoBox = styled.div`
  margin: 15px auto 25px auto;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral[1]};
  cursor: pointer;
`;
