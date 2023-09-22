import React, { useEffect, useRef, useState } from 'react';
import { CustomCarousel } from '../../components/CustomCarousel';
import { styled, useTheme } from 'styled-components';
import { SearchBox } from '../../components/SearchBox';
import { useRecoilState } from 'recoil';

import { Option } from '../../components/Dropdown/component';
import { AddIcon, FilterIcon, MenuBoxArrow } from '../../components/GlobalIcon';
import { Dropdown } from '../../components/Dropdown';
import { FloatingButton } from '../../components/FloatingButton';
import { useNavigate } from 'react-router';
import { ResellItemCard } from './components/ResellItemCard';
import { modalResllStatus, selectedResllCategoryAtom, selectedResllSalesStatusAtom, selectedResllSeasonsAtom } from './atom/atom';

export interface IAppProps {}

const seasonsOptions = [
  { label: '전체', value: 0 },
  { label: '봄', value: 1 },
  { label: '여름', value: 2 },
  { label: '가을', value: 3 },
  { label: '겨울', value: 4 },
];
const targetOptions = [
  { label: '전체', value: 0 },
  { label: '베이비', value: 1 },
  { label: '키즈(남)', value: 2 },
  { label: '키즈(여)', value: 3 },
];
const categoryOptions = [
  { label: '전체', value: 0 },
  { label: '상의', value: 1 },
  { label: '하의', value: 2 },
  { label: '아우터', value: 3 },
  { label: '악세사리', value: 4 },
  { label: '신발', value: 5 },
  { label: '기타', value: 6 },
];

export default function ResellMarket() {
  const contentsRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const themeApp = useTheme();
  const navigate = useNavigate();
  const [imageHeight, setImageHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsModalOpen] = useRecoilState(modalResllStatus);
  const [isSalesStatusDropdownOpen, setIsSalesStatusDropdownOpen] = useState<boolean>(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState<boolean>(false);
  const [selectedSalesStatus, setSelectedSalesStatus] = useRecoilState<Option | null>(selectedResllSalesStatusAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState<Option | null>(selectedResllCategoryAtom);
  const [selectedTarget, setSelectedTarget] = useRecoilState<Option | null>(selectedResllSeasonsAtom);

  const handleOptionSelectSalesStatus = (option: Option | null) => {
    setSelectedSalesStatus(option);
  };
  const handleOptionSelectCategory = (option: Option | null) => {
    setSelectedCategory(option);
  };
  const handleOptionSelectTarget = (option: Option | null) => {
    setSelectedTarget(option);
  };
  const handleDropdownAllClose = () => {
    setIsTargetDropdownOpen(false);
    setIsSalesStatusDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
  };

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 요소의 너비를 가져옵니다.
    const element = elementRef.current;
    const handleResize = () => {
      if (element) {
        const width = element.offsetWidth;
        setImageHeight(width);
      }
    };
    if (imageHeight === 0) {
      handleResize();
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (!isOpen) handleDropdownAllClose();
  }, [isOpen]);

  return (
    <Container>
      <BestSellerText>이 달의 베스트 셀러</BestSellerText>
      <CustomCarousel />
      <ContentContainer>
        <CategoryContainer>
          <Content ref={contentsRef}>
            <SearchBox
              placeholder="오른쪽 이미지 검색도 이용해보세요!"
              onClick={() => {
                if (contentsRef.current) {
                  contentsRef.current?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </Content>

          <ContentsHeader>
            <Total>전체 0개</Total>
            <FilterButton
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(true);
              }}
            >
              <FilterIcon />
              필터
            </FilterButton>
          </ContentsHeader>
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
                    <CategoryBox>계절</CategoryBox>
                    <Dropdown
                      options={seasonsOptions}
                      select={selectedSalesStatus}
                      onSelect={handleOptionSelectSalesStatus}
                      isOpen={isSalesStatusDropdownOpen}
                      setIsOpen={setIsSalesStatusDropdownOpen}
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
                  <CategoryItem>
                    <CategoryBox>대상</CategoryBox>
                    <Dropdown
                      options={targetOptions}
                      select={selectedTarget}
                      onSelect={handleOptionSelectTarget}
                      isOpen={isTargetDropdownOpen}
                      setIsOpen={setIsTargetDropdownOpen}
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
        <ProductContainer>
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://ae01.alicdn.com/kf/Sdd4c439b63744832b6115c365eca76a46/-.jpg_220x220.jpg_.webp'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://ae01.alicdn.com/kf/Sdd4c439b63744832b6115c365eca76a46/-.jpg_220x220.jpg_.webp'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
        </ProductContainer>
      </ContentContainer>
      <FloatingButton onClick={() => navigate('resell-post')}>
        <AddIcon color={themeApp.colors.neutral[4]} />
      </FloatingButton>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: 'auto';
`;
const BestSellerText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin-bottom: 20px;
`;
const Content = styled.div`
  width: 100%;
  border-top: ${({ theme }) => `1px solid ${theme.colors.neutral[2]}`};
  padding-top: 20px;
  background-color: white;
  position: sticky;
  top: 0;
`;
const ContentContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 20px;
`;
const ProductContainer = styled.div`
  min-height: 90vh;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 18px;
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
  top: 90px;
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
  flex-direction: column;
  align-items: flex-end;
  background-color: white;
  position: sticky;
  justify-content: center;
  padding-bottom: 10px;
  gap: 10px;
  top: 0;
  z-index: 2;
  width: 100%;
`;

const CategorySelectMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 10px;
  width: 100%;
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

const ContentsHeader = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
`;
const Total = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: flex;
`;
