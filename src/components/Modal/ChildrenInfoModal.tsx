import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import QuitSvg from '../../assets/svg/quit.svg';
import { ReactComponent as PhotoUploadSvg } from '../../assets/svg/photoUpload.svg';
import { modalGatherAtom } from '../../recolil/atom';
import { ModalBtn } from './SimplePopup';

export const ChildrenInfoModal = () => {
  const [modalGather, setModalGather] = useRecoilState(modalGatherAtom);

  return (
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
        <ModalBtn>모델 생성</ModalBtn>
      </ModalBox>
    </Wrap>
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
  margin-top: 15px;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral[1]};
  cursor: pointer;
`;
