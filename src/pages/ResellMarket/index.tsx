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
import { selectedResllCategoryAtom, selectedResllSalesStatusAtom, selectedResllSeasonsAtom } from './atom/atom';
import { useGetResellList } from '../../hooks/useResell';
import { modalStatus } from '../../recolil/atom';
import { saleStatus } from '../../utils/statusFormatter/dailylookStatus';

export interface IAppProps {}

const saleStatusOptions = [
  { label: '전체', value: '' },
  { label: '판매중', value: saleStatus.SALE },
  { label: '판매완료', value: saleStatus.DONE },
];
const targetOptions = [
  { label: '전체', value: '' },
  { label: '베이비', value: 'BABY' },
  { label: '키즈(남)', value: 'BOY' },
  { label: '키즈(여)', value: 'GIRL' },
];
const categoryOptions = [
  { label: '전체', value: '' },
  { label: '상의', value: 'TOP' },
  { label: '하의', value: 'BOTTOM' },
  { label: '아우터', value: 'OUTER' },
  { label: '악세사리', value: 'ACCESSORY' },
  { label: '신발', value: 'SHOES' },
  { label: '기타', value: 'ETC' },
];

export default function ResellMarket() {
  const contentsRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const themeApp = useTheme();
  const navigate = useNavigate();
  const [imageHeight, setImageHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsModalOpen] = useRecoilState(modalStatus);
  const [serchText, setSearchText] = useState<string>();
  const [isSalesStatusDropdownOpen, setIsSalesStatusDropdownOpen] = useState<boolean>(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState<boolean>(false);
  const [selectedSalesStatus, setSelectedSalesStatus] = useRecoilState<Option | null>(selectedResllSalesStatusAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState<Option | null>(selectedResllCategoryAtom);
  const [selectedTarget, setSelectedTarget] = useRecoilState<Option | null>(selectedResllSeasonsAtom);
  const { data: resellList, refetch: resellListRefetch } = useGetResellList({
    saleStatus: selectedSalesStatus?.value,
    category: selectedCategory?.value,
    searchKeyword: serchText,
    target: selectedTarget?.value,
  });
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
    resellListRefetch();
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                resellListRefetch();
              }}
            >
              <SearchBox
                placeholder="오른쪽 이미지 검색도 이용해보세요!"
                onChange={(e) => setSearchText(e.target.value)}
                onClick={() => {
                  if (contentsRef.current) {
                    contentsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            </form>
          </Content>

          <ContentsHeader>
            <Total>전체 {resellList?.data?.resellProductResponse?.length || 0}개</Total>
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
                    <CategoryBox>판매상태</CategoryBox>
                    <Dropdown
                      options={saleStatusOptions}
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
                  <FilterComplateButton
                    onClick={() => {
                      setIsOpen(false);
                      setIsModalOpen(false);
                    }}
                  >
                    확인
                  </FilterComplateButton>
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
        <ProductContainer
          $isscroll={(resellList?.data?.resellProductResponse?.length && resellList?.data?.resellProductResponse?.length > 0) || false}
        >
          {resellList?.data?.resellProductResponse?.length && resellList?.data?.resellProductResponse?.length > 0 ? (
            resellList?.data?.resellProductResponse?.map((v, i) => {
              console.log(v);
              return (
                <ResellItemCard
                  resellProductId={v.resellProductId}
                  key={v.productName + v.userId + i}
                  brandName={v.sellerNickname}
                  productName={v.productName}
                  price={v.productPrice}
                  imgUrl={v.productImage}
                />
              );
            })
          ) : (
            <NonProduct>등록된 상품이 없습니다.</NonProduct>
          )}
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
const NonProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  flex: 1;
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
const ProductContainer = styled.div<{ $isscroll: boolean }>`
  min-height: ${({ $isscroll }) => ($isscroll ? '80vh' : '40vh')};
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 18px;
`;

const ThemeBlack = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000aa;
`;
const ThemeWhite = styled.div`
  position: absolute;
  z-index: 1000;
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
  z-index: 2000;
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
  gap: 10px;
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
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
`;
const FilterComplateButton = styled.button`
  width: 25%;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.yellow[3]};
  color: ${({ theme }) => theme.colors.neutral[5]};
  font-weight: 600;
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  border-radius: 5px;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;
