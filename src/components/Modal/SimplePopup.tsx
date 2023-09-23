import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { simpleModalAtom } from '../../recolil/atom';

export const SimplePopup = () => {
  const [simpleModal, setSimpleModal] = useRecoilState(simpleModalAtom);

  useEffect(() => {
    if (simpleModal.simplePopup) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'unset';
    }
  }, [simpleModal.simplePopup]);

  return (
    <>
      {simpleModal.simplePopup && (
        <Wrap onClick={simpleModal.onClick}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ContentBox>
              {simpleModal.content.map((v: string[], index: number) => {
                return <ContentFont key={index}>{v[0] === 'span' ? <span>{v[1]}</span> : v[1]}</ContentFont>;
              })}
            </ContentBox>
            <ModalBtn onClick={simpleModal.onClick}>{simpleModal.btnContent}</ModalBtn>
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
  width: 220px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border: 2px solid ${({ theme }) => theme.colors.yellow[3]};
  z-index: 40;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 25px;
  flex-direction: column;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  margin-top: 30px;
`;

const ContentFont = styled.p`
  white-space: pre-line;
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[4]};
  /* background-color: pink; */

  & > span:nth-of-type(1) {
    font-family: 'SHSB';
    font-size: 16px;
    color: ${({ theme }) => theme.colors.neutral[4]};
  }
`;

export const ModalBtn = styled.div`
  width: 100px;
  height: 26px;
  background-color: ${(props) => props.theme.colors.yellow[4]};
  border: 1px solid ${({ theme }) => theme.colors.yellow[4]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 30px;
`;
