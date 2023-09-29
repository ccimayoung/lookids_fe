import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import QuitSvg from '../../assets/svg/quit.svg';
import { childrenInfoAtom, modalGatherAtom, wantPropertyClothIdAtom, wearArrayAtom, wearArrayProps } from '../../recolil/atom';
import { ModalBtn } from './SimplePopup';
import { TitleAndSelectBox } from '../TitleAndSelectBox';
import { useEffect, useRef, useState } from 'react';
import { clothCategoryListProps, oneClothProps } from '../props';

export const ClothPropertyModal = ({ clothList }: clothCategoryListProps | any) => {
  const [modalGather, setModalGather] = useRecoilState(modalGatherAtom);
  const contentRef = useRef<any>(null);
  // const [childrenInfo, setChildrenInfo] = useRecoilState(childrenInfoAtom);
  // const [clothJsonList, setClothJsonList] = useState<any>(dumClothJson);
  const [wearArray, setWearArray] = useRecoilState(wearArrayAtom);
  const [colorList, setColorList] = useState<string[]>([]);
  const [sizeList, setSizeList] = useState<string[]>([]);
  const [clothInfo, setClothInfo] = useState<oneClothProps | null>(null);
  const [wantPropertyClothId, setWantPropertyClothId] = useRecoilState(wantPropertyClothIdAtom);

  const makeClothFunc = () => {
    if (clothInfo) {
      let newArray: wearArrayProps[] = [];
      newArray = [...wearArray];

      const colorIndex = clothInfo.colorList?.findIndex((val: any) => val.color === contentRef.current.children[0].children[1].innerText);
      const scaleIndex = clothInfo.scaleList?.findIndex((val: any) => val.size === contentRef.current.children[1].children[1].innerText);

      newArray.push({
        clothId: clothInfo.clothId,
        position: [2, 2, 0],
        img: clothInfo.colorList[colorIndex].img,
        scale: clothInfo.scaleList[scaleIndex].scale,
        type: clothInfo.type,
        size: clothInfo.scaleList[scaleIndex].size,
        color: clothInfo.colorList[colorIndex].color,
      });
      setWearArray(newArray);
      setTimeout(() => {
        setModalGather({
          ...modalGather,
          clothProperty: false,
        });
      }, 100);
    }
  }; //todo : 상의면 위쪽 아니면 아래쪽

  useEffect(() => {
    return () => {
      setClothInfo(null);
    };
  }, []);

  useEffect(() => {
    if (modalGather.clothProperty && wantPropertyClothId) {
      const clothIndex = clothList.findIndex((val: any) => val.clothId === wantPropertyClothId);
      console.log(clothIndex, clothList[clothIndex]);
      setClothInfo(clothList[clothIndex]);
      let sizeArray: string[] = [];
      let colorArray: string[] = [];
      clothList[clothIndex]?.scaleList?.forEach((val: { size: string; scale: [number, number] }) => {
        sizeArray.push(val.size);
      });
      setSizeList(sizeArray);
      clothList[clothIndex]?.colorList?.forEach((val: { color: string; img: string }) => {
        colorArray.push(val.color);
      });
      setColorList(colorArray);
    }
  }, [modalGather.clothProperty, wantPropertyClothId, clothInfo]);

  return (
    <>
      {modalGather.clothProperty && clothInfo && (
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
              <TitleAndSelectBox $title="색상" $titleWidth="64px" $content={clothInfo.colorList[0].color} $list={colorList} $contentSize="l" />
              <TitleAndSelectBox $title="사이즈" $titleWidth="64px" $content={clothInfo.scaleList[0].size} $list={sizeList} $contentSize="l" />
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
