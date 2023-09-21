import React, { useEffect, useState } from 'react';
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

export interface IAppProps {}
const genderOptions = [
  { label: '전체', value: 0 },
  { label: '남', value: 1 },
  { label: '여', value: 2 },
];
const heightOptions = [
  { label: '전체', value: 0 },
  { label: '70cm 이하', value: 1 },
  { label: '71~90cm', value: 2 },
  { label: '91~110cm', value: 3 },
  { label: '110cm', value: 4 },
];
const weightOptions = [
  { label: '전체', value: 0 },
  { label: '10kg 이하', value: 1 },
  { label: '11-15kg', value: 2 },
  { label: '16-20kg', value: 3 },
  { label: '21-30kg', value: 4 },
  { label: '30kg 이상', value: 5 },
];
const seasonsOptions = [
  { label: '전체', value: 0 },
  { label: '봄', value: 1 },
  { label: '여름', value: 2 },
  { label: '가을', value: 3 },
  { label: '겨울', value: 4 },
];
const categoryOptions = [
  { label: '전체', value: 0 },
  { label: '베이비', value: 1 },
  { label: '키즈(남)', value: 2 },
  { label: '키즈(여)', value: 3 },
];

export default function DailyLook() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsModalOpen] = useRecoilState(modalStatus);
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
  };
  useEffect(() => {
    if (!isOpen) handleDropdownAllClose();
  }, [isOpen]);
  return (
    <Container>
      <Contents>
        <AdBannerBox>
          <EventBannerImg src={'/img/eventbanner.png'} />
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
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
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
`;

const EventBannerImg = styled.img`
  object-fit: fill;
  width: 100%;
  height: 90px;
`;
const ThemeBlack = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000aa;
`;
const ThemeWhite = styled.div`
  position: absolute;
  z-index: 2;
  top: 30px;
  right: 0;
  width: 50%;
  height: 25vh;
  display: flex;
  align-items: flex-end;
  background-color: transparent;
`;
const ArrowBox = styled.div`
  position: absolute;
  top: 0;
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
  z-index: 2;
  width: 100%;
  margin-top: 40px;
`;

const CategorySelectMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 10px;
  width: 100%;
  height: calc(25vh - 10px);
  background-color: white;
  border-radius: 10px;
  gap: 4px;
`;
const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
