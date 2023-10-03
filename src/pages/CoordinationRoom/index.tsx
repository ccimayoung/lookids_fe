import React, { useEffect, useState } from 'react';
import { CanvasWrapper } from './three/CanvasWrapper';
import styled, { useTheme } from 'styled-components';
import { PhotoBox } from '../../components/PhotoBox';
import { GrayCircle, MenuBtn } from '../../components/MenuBtn';
import { ReactComponent as CartSvg } from '../../assets/svg/cart.svg';
import { ReactComponent as BodySvg } from '../../assets/svg/body.svg';
import { ReactComponent as QuestionSvg } from '../../assets/svg/question.svg';
import { ReactComponent as RefreshSvg } from '../../assets/svg/refresh.svg';
import { ReactComponent as SaveSvg } from '../../assets/svg/save.svg';
import { useRecoilState } from 'recoil';
import {
  childrenInfoAtom,
  getCaptureAtom,
  modalGatherAtom,
  showPhotoAtom,
  simpleModalAtom,
  wantKidRefreshAtom,
  wearArrayAtom,
} from '../../recolil/atom';
import { ChildrenInfoModal } from '../../components/Modal/ChildrenInfoModal';
import {
  clothCategoryListProps,
  divProps,
  oneClothProps,
} from '../../components/props';
import { ClothPropertyModal } from '../../components/Modal/ClothPropertyModal';
import html2canvas from 'html2canvas';
import { useMutation } from '@tanstack/react-query';
import {
  closetClothListApi,
  getCodyApi,
  getKidInfoApi,
} from '../../apis/closet';
import { CodyExplainModal } from '../../components/Modal/CodyExplainModal';

export default function CoordinationRoom() {
  const [selectedMenu, setSelectedMenu] = useState<string>('topList');
  const [modalGather, setModalGather] = useRecoilState(modalGatherAtom);
  const [simpleModal, setSimpleModal] = useRecoilState(simpleModalAtom);
  const [childrenInfo, setChildrenInfo] = useRecoilState(childrenInfoAtom);
  const [getCapture, setGetCapture] = useRecoilState(getCaptureAtom);
  const [showPhoto, setShowPhoto] = useRecoilState(showPhotoAtom);
  const [clothList, setClothList] = useState<clothCategoryListProps | any>(
    null,
  );
  const [wearArray, setWearArray] = useRecoilState(wearArrayAtom);
  const [wantKidRefresh, setWantKidRefresh] =
    useRecoilState(wantKidRefreshAtom);

  const codyListCumm = useMutation(() => getCodyApi(), {
    onSuccess: (res: any) => {
      console.log(res);
      if (res.data) {
        const data = res.data;
        if (data.codeList?.length > 0) {
          const newList: any[] = [];
          data.codeList.forEach((val: any) => {
            newList.push(val.codyImg);
          });
          setShowPhoto(newList);
        }
      }
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  //todo : 튜토리얼

  const clothListCumm = useMutation(() => closetClothListApi(), {
    onSuccess: (res: any) => {
      console.log(res);
      if (res.data) {
        const data = res.data;
        setClothList(data);
      }
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const kidInfoCumm = useMutation(() => getKidInfoApi(), {
    onSuccess: (res: any) => {
      console.log(res);
      if (res.data) {
        const data = res.data;
        setChildrenInfo({
          img: data.image,
          gender: data.sex === 'BOY' ? '남' : '여',
          age: data.age,
          height: data.height,
          weight: data.weight,
        });
      }
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  useEffect(() => {
    clothListCumm.mutate();
    kidInfoCumm.mutate();
    codyListCumm.mutate();
  }, []);

  useEffect(() => {
    if (wantKidRefresh) {
      setTimeout(() => {
        kidInfoCumm.mutate();
      }, 1500);
    }
    setWantKidRefresh(false);
  }, [wantKidRefresh]);

  return (
    <Wrapper>
      <TopWrap>
        <CanvasWrapper />
        <SettingBtnWrap>
          <Circle
            onClick={() =>
              setModalGather({ ...modalGather, codyExplain: true })
            }
          >
            <QuestionSvg />
          </Circle>
          <Circle
            onClick={() => setModalGather({ ...modalGather, closetBody: true })}
          >
            <BodySvg />
          </Circle>
          <Circle onClick={() => setWearArray([])}>
            <RefreshSvg />
          </Circle>
          <Circle
            onClick={() => {
              setGetCapture(true);
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
              });
            }}
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
          {showPhoto.length > 0 ? (
            <>
              {[...showPhoto].reverse().map((val: any, index: number) => {
                return (
                  <PhotoBox
                    key={index}
                    $codyId={'샘플코디1'}
                    $boxSize="s"
                    $type="cody"
                    $img={val}
                  />
                );
              })}
              <PhotoBox
                $codyId={'샘플코디2'}
                $boxSize="s"
                $type="cody"
                $img={'img/샘플옷2.png'}
              />
              <PhotoBox
                $codyId={'샘플코디3'}
                $boxSize="s"
                $type="cody"
                $img={'img/샘플옷.png'}
              />
            </>
          ) : (
            <>
              <PhotoBox
                $codyId={'샘플코디2'}
                $boxSize="s"
                $type="cody"
                $img={'img/샘플옷2.png'}
              />
              <PhotoBox
                $codyId={'샘플코디3'}
                $boxSize="s"
                $type="cody"
                $img={'img/샘플옷.png'}
              />
            </>
          )}
        </CodyWrap>
      </TopWrap>
      <ClothWrap>
        <RowDiv>
          <MenuBtn
            $size="s"
            $content="상의"
            $active={selectedMenu === 'topList'}
            $setSelectedMenu={setSelectedMenu}
            $menuFiled={'topList'}
          />
          <MenuBtn
            $size="s"
            $content="하의"
            $active={selectedMenu === 'bottomList'}
            $setSelectedMenu={setSelectedMenu}
            $menuFiled={'bottomList'}
          />
          <MenuBtn
            $size="s"
            $content="아우터"
            $active={selectedMenu === 'outerList'}
            $setSelectedMenu={setSelectedMenu}
            $menuFiled={'outerList'}
          />
          <MenuBtn
            $size="s"
            $content="신발"
            $active={selectedMenu === 'shoesList'}
            $setSelectedMenu={setSelectedMenu}
            $menuFiled={'shoesList'}
          />
          <MenuBtn
            $size="s"
            $content="악세사리"
            $active={selectedMenu === 'accessoryList'}
            $setSelectedMenu={setSelectedMenu}
            $menuFiled={'accessoryList'}
          />
          <MenuBtn
            $size="s"
            $content="기타"
            $active={selectedMenu === 'etcList'}
            $setSelectedMenu={setSelectedMenu}
            $menuFiled={'etcList'}
          />
        </RowDiv>
        <ListWrap>
          {clothList && clothList[selectedMenu]?.length > 0
            ? clothList[selectedMenu].map(
                (cloth: oneClothProps, index: number) => {
                  return (
                    <RowDiv key={cloth.clothId}>
                      <PhotoBox
                        $cloth={cloth}
                        $boxSize="s"
                        $work="cloth"
                        $wear={true}
                        $type={cloth.type}
                        $img={cloth.colorList[0].img}
                      />
                    </RowDiv>
                  );
                },
              )
            : null}
        </ListWrap>
      </ClothWrap>
      <ChildrenInfoModal />
      <CodyExplainModal />
      {clothList && clothList[selectedMenu]?.length > 0 ? (
        <>
          <ClothPropertyModal clothList={clothList[selectedMenu]} />
        </>
      ) : null}
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

const ListWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, auto));
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
