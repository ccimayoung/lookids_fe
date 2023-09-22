import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { SearchBox } from '../../components/SearchBox';
import { useRecoilState } from 'recoil';
import { modalStatus, selectedCategoryAtom, selectedSeasonsAtom } from '../../recolil/atom';
import { Option } from '../../components/Dropdown/component';
import { FilterIcon, MenuBoxArrow } from '../../components/GlobalIcon';
import { Dropdown } from '../../components/Dropdown';
import { NewMarketItemCard } from './components/NewMarketItemCard';
import { NewMarketCarousel } from '../../components/NewMarketCarousel';

export interface IAppProps {}

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

export default function NewMarket() {
  const contentsRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsModalOpen] = useRecoilState(modalStatus);
  const [selectItem, setSelectItem] = useState(0);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState<boolean>(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [selectedTarget, setSelectedTarget] = useRecoilState<Option | null>(selectedSeasonsAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState<Option | null>(selectedCategoryAtom);

  const handleOptionSelectTarget = (option: Option | null) => {
    setSelectedTarget(option);
  };
  const handleOptionSelectCategory = (option: Option | null) => {
    setSelectedCategory(option);
  };
  const handleDropdownAllClose = () => {
    setIsTargetDropdownOpen(false);
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
      <TrendItemCarouselBox>
        <TrendThim>
          요즘 핫한 신상
          <IndigatorBox>{selectItem + 1} / 4</IndigatorBox>
        </TrendThim>
        <NewMarketCarousel setSelectItem={setSelectItem}>
          <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" />
          <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" />
          <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" />
          <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" />
        </NewMarketCarousel>
      </TrendItemCarouselBox>
      <ContentContainer>
        <CategoryContainer>
          <Content ref={contentsRef}>
            <SearchBox
              placeholder="신상을 검색해보세요!"
              isCamera={false}
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
              <FilterIcon /> 필터
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
          <NewMarketItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            isActive={true}
            imgUrl={'https://ae01.alicdn.com/kf/Sdd4c439b63744832b6115c365eca76a46/-.jpg_220x220.jpg_.webp'}
          />
          <NewMarketItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg'}
          />
          <NewMarketItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            isActive={true}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
          <NewMarketItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://ae01.alicdn.com/kf/Sdd4c439b63744832b6115c365eca76a46/-.jpg_220x220.jpg_.webp'}
          />
          <NewMarketItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg'}
          />
          <NewMarketItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
          <NewMarketItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
          <NewMarketItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
        </ProductContainer>
      </ContentContainer>
      {/* <FloatingButton onClick={() => navigate('resell-post')}>
        <AddIcon color={themeApp.colors.neutral[4]} />
      </FloatingButton> */}
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
const TrendThim = styled.div`
  border-radius: 10px;
  display: flex;
  font-size: 20px;
  bottom: 0;
  position: absolute;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
  padding-bottom: 7px;
  padding-left: 7px;
  background: linear-gradient(195deg, rgba(255, 255, 255, 0) 60%, rgba(80.75, 48.45, 0, 0.5) 79%, rgba(57.37, 47.94, 0, 0.93) 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 600;
  width: calc(100% - 40px);
  height: 100%;
  z-index: 1;
`;
const TrendItemCarouselBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 275px;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
`;
const IndigatorBox = styled.div`
  min-width: 40px;
  min-height: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000b3;
  color: white;
  margin-right: 10px;
  margin-bottom: 3px;
  font-size: 10px;
`;
const NewMarketImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
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
  top: 100px;
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
  gap: 5px;
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
