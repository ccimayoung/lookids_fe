import React, { ReactChild, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { AddIcon, FilterIcon, MenuBoxArrow } from '../../components/GlobalIcon';
import { DailyLookCard } from './components/DailyLookCard';
import { FloatingButton } from '../../components/FloatingButton';
import { useRecoilState } from 'recoil';
import {
  modalStatus,
  selectedCategoryAtom,
  selectedGenderAtom,
  selectedHeightAtom,
  selectedSeasonsAtom,
  selectedWeightAtom,
} from '../../recolil/atom';
import { Option } from '../../components/Dropdown/component';
import { Dropdown } from '../../components/Dropdown';
import { useNavigate } from 'react-router';
import { useGetDailylookList, useGetEvent } from '../../hooks/useDailyLook';
import { NewMarketCarousel } from '../../components/NewMarketCarousel';
import { Label } from '../../components/Label';
import { Height, Weight } from '../../utils/statusFormatter/dailylookStatus';

export interface IAppProps {}
export interface IDailylookList {
  hashTag: Array<string>;
  user: {
    name: string;
    userId: string;
  };
  imageUrls: Array<string>;
  dailyLookId: number;
}
const genderOptions = [
  { label: '전체', value: '' },
  { label: '남', value: 'BOY' },
  { label: '여', value: 'GIRL' },
];
const heightOptions = [
  { label: '전체', value: '' },
  { label: '70cm 이하', value: Height.HEIGHT_70 },
  { label: '71~90cm', value: Height.HEIGHT_71_90 },
  { label: '91~110cm', value: Height.HEIGHT_91_110 },
  { label: '110cm', value: Height.HEIGHT_110 },
];
const weightOptions = [
  { label: '전체', value: '' },
  { label: '10kg 이하', value: Weight.WEIGHT_10 },
  { label: '11-15kg', value: Weight.WEIGHT_11_15 },
  { label: '16-20kg', value: Weight.WEIGHT_16_20 },
  { label: '21-25kg', value: Weight.WEIGHT_21_25 },
  { label: '26-30kg', value: Weight.WEIGHT_26_30 },
  { label: '30kg 이상', value: Weight.WEIGHT_30 },
];

const seasonsOptions = [
  { label: '전체', value: '' },
  { label: '봄', value: 'SPRING' },
  { label: '여름', value: 'SUMMER' },
  { label: '가을', value: 'AUTUMN' },
  { label: '겨울', value: 'WINTER' },
];
const categoryOptions = [
  { label: '전체', value: '' },
  { label: '상의', value: 'ACCESSORY' },
  { label: '하의', value: 'BOTTOM' },
  { label: '아우터', value: 'ETC' },
  { label: '악세사리', value: 'OUTER' },
  { label: '신발', value: 'SHOES' },
  { label: '기타', value: 'TOP' },
];

export default function DailyLook() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsModalOpen] = useRecoilState(modalStatus);
  const [selectItem, setSelectItem] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const themeApp = useTheme();
  const navigate = useNavigate();
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState<boolean>(false);
  const [isHeightDropdownOpen, setIsHeightDropdownOpen] = useState<boolean>(false);
  const [isWeightDropdownOpen, setIsWeightDropdownOpen] = useState<boolean>(false);
  const [isSeasonsDropdownOpen, setIsSeasonsDropdownOpen] = useState<boolean>(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useRecoilState<Option | null>(selectedGenderAtom);
  const [selectedHeight, setSelectedHeight] = useRecoilState<Option | null>(selectedHeightAtom);
  const [selectedWeight, setSelectedWeight] = useRecoilState<Option | null>(selectedWeightAtom);
  const [selectedSeasons, setSelectedSeasons] = useRecoilState<Option | null>(selectedSeasonsAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState<Option | null>(selectedCategoryAtom);

  const handleOptionSelectGender = (option: Option | null) => {
    setSelectedGender(option);
  };
  const handleOptionSelectHeight = (option: Option | null) => {
    setSelectedHeight(option);
  };
  const handleOptionSelectWeight = (option: Option | null) => {
    setSelectedWeight(option);
  };
  const handleOptionSelectSeasons = (option: Option | null) => {
    setSelectedSeasons(option);
  };
  const handleOptionSelectCategory = (option: Option | null) => {
    setSelectedCategory(option);
  };
  const handleDropdownAllClose = () => {
    setIsGenderDropdownOpen(false);
    setIsHeightDropdownOpen(false);
    setIsWeightDropdownOpen(false);
    setIsSeasonsDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    dailylookListRefetch();
  };

  const { data: dailylookList, refetch: dailylookListRefetch } = useGetDailylookList({
    height: selectedHeight?.value,
    category: selectedCategory?.value,
    season: selectedSeasons?.value,
    sex: selectedGender?.value,
    weight:selectedWeight?.value,
  });
  const { data: getGetEvent } = useGetEvent();
  useEffect(() => {
    if (!isOpen) handleDropdownAllClose();
  }, [isOpen]);
  return (
    <Container>
      <Contents>
        <AdBannerBox>
          {getGetEvent?.data?.events?.length && getGetEvent?.data?.events?.length > 1 ? (
            <NewMarketCarousel setSelectItem={setSelectItem}>
              {getGetEvent?.data?.events.map((event) => {
                return (<EventBannerImg key={event.id} src={event.imageUrl} />) as ReactChild;
              })}

              {/* <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" />
          <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" />
          <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" /> */}
            </NewMarketCarousel>
          ) : (
            <EventBannerImg src={getGetEvent?.data?.events[0].imageUrl} />
          )}
        </AdBannerBox>
        <CategoryContainer>
          <FilterButton
            onClick={() => {
              setIsModalOpen(true);
              setIsOpen(true);
            }}
          >
            <>
              <FilterIcon />
              필터
            </>
          </FilterButton>
          {isOpen && (
            <ThemeBlack
              onClick={() => {
                setIsModalOpen(false);
                setIsOpen(false);
              }}
            >
              <ThemeWhite
                onClick={(event) => {
                  event.stopPropagation();
                  handleDropdownAllClose();
                }}
              >
                <ArrowBox>
                  <MenuBoxArrow />
                </ArrowBox>
                <CategorySelectMenu>
                  <CategoryItem>
                    <CategoryBox>성별</CategoryBox>
                    <Dropdown
                      options={genderOptions}
                      select={selectedGender}
                      onSelect={handleOptionSelectGender}
                      isOpen={isGenderDropdownOpen}
                      setIsOpen={setIsGenderDropdownOpen}
                      allClose={handleDropdownAllClose}
                    />
                  </CategoryItem>
                  <CategoryItem>
                    <CategoryBox>키</CategoryBox>
                    {/* <Label
                      color={themeApp.colors.neutral[0]}
                      height={'26'}
                      text="120"
                      width={'125'}
                      placeholder="120"
                      onClick={() => {}}
                      center={false}
                      value={height?.toString()}
                      onChange={(e) => setHeight(Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')))}
                    /> */}
                    <Dropdown
                      options={heightOptions}
                      select={selectedHeight}
                      onSelect={handleOptionSelectHeight}
                      isOpen={isHeightDropdownOpen}
                      setIsOpen={setIsHeightDropdownOpen}
                      allClose={handleDropdownAllClose}
                    />
                  </CategoryItem>
                  <CategoryItem>
                    <CategoryBox>몸무게</CategoryBox>
                    {/* <Label
                      color={themeApp.colors.neutral[0]}
                      height={'26'}
                      text="31"
                      width={'125'}
                      placeholder="120"
                      onClick={() => {}}
                      center={false}
                      value={weight?.toString()}
                      onChange={(e) => setWeight(Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')))}
                    /> */}
                    <Dropdown
                      options={weightOptions}
                      select={selectedWeight}
                      onSelect={handleOptionSelectWeight}
                      isOpen={isWeightDropdownOpen}
                      setIsOpen={setIsWeightDropdownOpen}
                      allClose={handleDropdownAllClose}
                    />
                  </CategoryItem>
                  <CategoryItem>
                    <CategoryBox>계절</CategoryBox>
                    <Dropdown
                      options={seasonsOptions}
                      select={selectedSeasons}
                      onSelect={handleOptionSelectSeasons}
                      isOpen={isSeasonsDropdownOpen}
                      setIsOpen={setIsSeasonsDropdownOpen}
                      allClose={handleDropdownAllClose}
                    />
                  </CategoryItem>
                  <CategoryItem>
                    <CategoryBox>카테고리</CategoryBox>
                    <Dropdown
                      options={categoryOptions}
                      select={selectedCategory}
                      onSelect={handleOptionSelectCategory}
                      isOpen={isCategoryDropdownOpen}
                      setIsOpen={setIsCategoryDropdownOpen}
                      allClose={handleDropdownAllClose}
                    />
                  </CategoryItem>
                  <FilterComplateButton onClick={()=>{
                    setIsOpen(false);
                    setIsModalOpen(false);
                  }}>확인</FilterComplateButton>
                </CategorySelectMenu>
                
              </ThemeWhite>
              
            </ThemeBlack>
          )}
        </CategoryContainer>
        {isOpen && (
          <ThemeBlack
            onClick={() => {
              setIsModalOpen(false);
              setIsOpen(false);
            }}
          />
        )}
        <CardContainer>
          {dailylookList?.data?.dailyLooks?.length && dailylookList?.data?.dailyLooks?.length > 0
            ? dailylookList?.data?.dailyLooks?.map((v: IDailylookList, index: number) => {
              return (
                <DailyLookCard
                  key={v.user.name + v.user.userId + index}
                  hashTag={v.hashTag}
                  dailyLookId={v.dailyLookId}
                  user={v.user}
                  imageUrls={v.imageUrls}
                />
              );
            })
            : undefined}
        </CardContainer>
      </Contents>
      <FloatingButton onClick={() => navigate('dailylook-post')}>
        <AddIcon color={themeApp.colors.neutral[4]} />
      </FloatingButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  padding: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  gap: 20px;
  min-height: 500px;
`;

const EventBannerImg = styled.img`
  object-fit: fill;
  width: 100%;
  height: 90px;
`;
const ThemeBlack = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000aa;
`;
const ThemeWhite = styled.div`
  position: absolute;
  z-index: 4;
  top: 40px;
  right: 0;
  width: 50%;
  display: flex;
  align-items: flex-end;
  background-color: transparent;
`;
const ArrowBox = styled.div`
  position: absolute;
  top: -10px;
  right: 15px;
`;

const CategoryBox = styled.div`
  font-size: 13px;
  white-space: nowrap;
`;
const AdBannerBox = styled.div`
  width: 100%;
  overflow: hidden;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FilterButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  font-size: 13px;
  background-color: white;
  cursor: pointer;
  gap: 3.3px;
`;
const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  position: sticky;
  justify-content: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
  gap: 3px;
  top: 0;
  z-index: 5;
  width: 100%;
  margin-top: 40px;
`;

const CategorySelectMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 10px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  gap: 10px;
`;
const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const FilterComplateButton = styled.button`
  width: 25%;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  white-space: nowrap;
  background-color: ${({theme})=>theme.colors.yellow[3]};
  color: ${({theme})=>theme.colors.neutral[5]};
  font-weight: 600;
  border: ${({theme})=>`1px solid ${theme.colors.yellow[3]}`};
  border-radius:5px;
  font-size:0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;