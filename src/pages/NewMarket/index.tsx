import { ReactChild, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { SearchBox } from '../../components/SearchBox';
import { useRecoilState } from 'recoil';
import { modalStatus, selectedCategoryAtom, selectedSeasonsAtom } from '../../recolil/atom';
import { Option } from '../../components/Dropdown/component';
import { FilterIcon, MenuBoxArrow } from '../../components/GlobalIcon';
import { Dropdown } from '../../components/Dropdown';
import { NewMarketItemCard } from './components/NewMarketItemCard';
import { NewMarketCarousel } from '../../components/NewMarketCarousel';
import { INewMarketItemProps, useGetNewMarketHotList, useGetNewMarketList } from '../../hooks/useNewMarket';

export interface IAppProps { }

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

export default function NewMarket() {
  const contentsRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsModalOpen] = useRecoilState(modalStatus);
  const [query, setQuery] = useState<string>();
  const [selectItem, setSelectItem] = useState(0);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState<boolean>(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [selectedTarget, setSelectedTarget] = useRecoilState<Option | null>(selectedSeasonsAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState<Option | null>(selectedCategoryAtom);

  const { data: getNewMarketList, refetch: newMarketRefetch } = useGetNewMarketList({
    category: selectedCategory?.value || '',
    kidType: selectedTarget?.value || '',
    query: query || ''
  });
  const { data: getNewMarketHotList } = useGetNewMarketHotList();

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
          <IndigatorBox>{selectItem + 1} / {getNewMarketHotList?.data?.lookidsProducts?.length
            && getNewMarketHotList?.data?.lookidsProducts?.length || 0}</IndigatorBox>
        </TrendThim>
        {getNewMarketHotList?.data?.lookidsProducts?.length
          && getNewMarketHotList?.data?.lookidsProducts?.length > 1
          ? <NewMarketCarousel setSelectItem={setSelectItem}>
            {getNewMarketHotList?.data?.lookidsProducts.map((image, index) => {
              return <NewMarketImage key={image.id} src={image.productImageUrls} /> as ReactChild;
            })}

            {/* <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" />
          <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" />
          <NewMarketImage src="https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg" /> */}
          </NewMarketCarousel> : 
          <NewMarketImage key={getNewMarketHotList?.data?.lookidsProducts[0].id} 
            src={getNewMarketHotList?.data?.lookidsProducts[0].productImageUrls} />
        }
      </TrendItemCarouselBox>
      <ContentContainer>
        <CategoryContainer>
          <Content ref={contentsRef}>
            <form onSubmit={(e) => {
              e.preventDefault();
              newMarketRefetch();
            }}>
              <SearchBox
                placeholder="신상을 검색해보세요!"
                isCamera={false}
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => {
                  if (contentsRef.current) {
                    contentsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            </form>
          </Content>

          <ContentsHeader>
            <Total>전체 {getNewMarketList?.data?.lookidsProducts?.length
              && getNewMarketList?.data?.lookidsProducts?.length || 0}개</Total>
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
          {getNewMarketList?.data?.lookidsProducts?.map((newMarket: INewMarketItemProps) => {
            return <NewMarketItemCard
              key={newMarket.id}
              {...newMarket}
              isActive={true}
            />;
          })}


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
