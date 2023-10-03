import styled from 'styled-components';
import { modalGatherAtom } from '../../recolil/atom';
import { useRecoilState } from 'recoil';
import QuitSvg from '../../assets/svg/quit.svg';

export const CodyExplainModal = () => {
  const [modalGather, setModalGather] = useRecoilState(modalGatherAtom);

  return (
    <>
      {modalGather.codyExplain && (
        <Wrap>
          <ModalBox>
            <QuitImg
              src={QuitSvg}
              onClick={() => {
                setModalGather({
                  ...modalGather,
                  codyExplain: false,
                });
              }}
            />
            <ContentWrap></ContentWrap>
          </ModalBox>
        </Wrap>
      )}
    </>
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
  width: 300px;
  height: 450px;
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
  width: 16px;
  height: 16px;
  top: 10px;
  right: 10px;
  position: absolute;
  cursor: pointer;
  z-index: 30;
`;

const ContentWrap = styled.div`
  width: 260px;
  height: 385px;
  margin-top: 15px;
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  justify-content: center;
  background-size: 260px;
  background-image: url('img/설명.png');
`;
