import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import QuitSvg from '../../assets/svg/quit.svg';
import { childrenInfoAtom, modalGatherAtom, wearArrayAtom, wearArrayProps } from '../../recolil/atom';
import { ModalBtn } from './SimplePopup';
import { TitleAndSelectBox } from '../TitleAndSelectBox';
import dumClothJson from '../../data/dum_cloth.json';
import { useEffect, useRef, useState } from 'react';

export const ClothPropertyModal = () => {
  const [modalGather, setModalGather] = useRecoilState(modalGatherAtom);
  const contentRef = useRef<any>(null);
  const [childrenInfo, setChildrenInfo] = useRecoilState(childrenInfoAtom);
  const [clothJsonList, setClothJsonList] = useState<any>(dumClothJson);
  const [wearArray, setWearArray] = useRecoilState(wearArrayAtom);
  const [colorList, setColorList] = useState<string[]>([]);

  const makeClothFunc = () => {
    let newArray: wearArrayProps[] = [];
    newArray = [...wearArray];

    const colorIndex = clothJsonList.colorList.findIndex((val: any) => val.color === contentRef.current.children[0].children[1].innerText);
    const scaleIndex = clothJsonList.scaleList.findIndex((val: any) => val.size === contentRef.current.children[1].children[1].innerText);

    newArray.push({
      clothId: clothJsonList.clothId,
      position: [2, 2, 0],
      img: clothJsonList.colorList[colorIndex].img,
      scale: clothJsonList.scaleList[scaleIndex].scale,
      type: clothJsonList.type,
      size: clothJsonList.scaleList[scaleIndex].size,
      color: clothJsonList.colorList[colorIndex].color,
    });
    setWearArray(newArray);
    setTimeout(() => {
      setModalGather({
        ...modalGather,
        clothProperty: false,
      });
    }, 100);
    console.log(contentRef.current.children[0].children[1].innerText, contentRef.current.children[1].children[1].innerText);
  }; //todo : 상의면 위쪽 아니면 아래쪽

  useEffect(() => {
    clothJsonList.colorList.forEach((val: { color: string; img: any }) => {
      colorList.push(val.color);
    });
    return () => {
      setColorList([]);
    };
  }, []);

  return (
    <>
      {modalGather.clothProperty && (
        <Wrap>
          <ModalBox>
            <QuitImg
              src={QuitSvg}
              onClick={() => {
                setModalGather({
                  ...modalGather,
                  clothProperty: false,
                });
              }}
            />
            <ContentWrap ref={contentRef}>
              <TitleAndSelectBox $title="색상" $titleWidth="64px" $content={colorList[0]} $list={colorList} $contentSize="l" />
              <TitleAndSelectBox $title="사이즈" $titleWidth="64px" $content={'s'} $list={['s', 'm', 'l']} $contentSize="l" />
            </ContentWrap>

            <ModalBtn onClick={makeClothFunc}>선택</ModalBtn>
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
  width: 225px;
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
  width: 100%;
  margin: 15px auto auto auto;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
