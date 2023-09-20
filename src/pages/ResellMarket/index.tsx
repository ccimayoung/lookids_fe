import React, { useEffect, useRef, useState } from 'react';
import { CustomCarousel } from '../../components/CustomCarousel';
import { styled } from 'styled-components';
import { SearchBox } from '../../components/SearchBox';
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
import { FilterIcon, MenuBoxArrow } from '../../components/GlobalIcon';
import { Dropdown } from '../../components/Dropdown';

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

export default function ResellMarket() {
  const contentsRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsModalOpen] = useRecoilState(modalStatus);
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

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    console.log('현재 스크롤 위치:', scrollTop);
    // 원하는 작업을 수행하거나 스크롤 위치를 설정하세요.
  };
  return (
    <Container onScroll={handleScroll}>
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
        <ProductContainer>
          <ProductCard ref={elementRef} height={imageHeight.toString()}>
            <ProductImage
              height={imageHeight.toString()}
              src="data:image/jpeg;base64,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"
            />
            <TextContainer>
              <BrandText>맘맘님</BrandText>
              <ProductName>밀크웨이 맨투맨</ProductName>
              <Price>8,000원</Price>
            </TextContainer>
          </ProductCard>
          <ProductCard height={imageHeight.toString()}>
            <ProductImage
              height={imageHeight.toString()}
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVFRgVFhIYGBgYGBgYEhgZGRgYGBkSGBgZHBgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjErIys0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDYxNDQ0NDQ0NDQ0MTE0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBQYEBwj/xABGEAACAQIEAgYFCgMHAwUBAAABAgADEQQSITEFQQYiUWGBkRNScaGxBxQVMmJyssHR8CNC4RYzU3OSosIkY4I0Q3SD0iX/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAoEQEBAAIBBAIBAgcAAAAAAAAAAQIRAxITITFBUQQikQUyYYGhsfD/2gAMAwEAAhEDEQA/AI1pSVU2kiJHlZtyMVZ00VkarJ6aSCbLOLHU9JYATlxo0gjzXpKlmnP0PNsZR+8w/wBjSw6UpK3ol/6yh/mf8Wl+G56fRPAh1B90fCWAXbxnD0fHUHsHwllb4mZiJqO0VYlKOWUOhCEgIQhAJAu58PhJ5D/N4fmZRNCEJASKsNDJY1xofZAZRkkjpSWGkaRakFg0MniJziiJzhaWEIQghCEAhCEAhCEDyhREYR6RGE0yVZMkiUSanAnE5sWOrOoTnxI0gef9KllJ0XNsXQP/AHF99x+cv+la6GZvgDWxNE9lRPxCPhuPpHgB6o9ktrfGU3AT1V/fbLv9ZmJS0o8RlOPEoWEI2o1gT2AnykGI6adP6WDY0KSipXABe5slMEXGYjUkixyjkdSNAfM+I9OeI1TdsSyjcCmTSC+wqAfMxOD8AfHu2JrVWUVHZ2CgXJZr6E3AGpG02NDoJgQBdHb2u35WkuWM8OuPHbFDwTp5j6Vi7tVXsc5rW1NnsDra12v4T1jo9x+hjUFWkTsM6Noyk6gHzmPp9DMIoZkRgbHd3YbcgxNvCVHyUu1PGPSv1WpupW/81NxY29l/OJlL6Zyx09ihCErAhCECOnJZCu/jJoaRiKwigRWgKI2OEQwlEIQhBCEIBCEIBCEIHlYMaTHxpErJVk1MyJVElQQOgSHEjSSqD2yLEXtAw3SwdUzJ8Ia1ekf+6n4xNb0r+qZjuHG1an/mJ+NYjcfTHAR1R3D8zLm3xlT0d+p4fmZbn85IlCRwjRvFEodEYaH2GLObiCZqVQa603Gm+qnbvkWe3i+F40MHTWjkN6KolXqjSpluw+sOw+M0lXpVTTCriSjZWICiwBzG+4JsNATvKdejSVKrPmGViSwPbYAkczoO3nL1cBTNEYf0JyA6aAKCCCGsDtecLY9E6t2X+xeBdJhUqig6FWdcy3AAsQCL2Y7hh5xejnDQnFapVeqqNryzVAjW79zGcM4JSSoj+jQZTcEDUnl7JoFUGuHzBVW7O1wAAurFj2WNtYwy18MyZZS9XhqYTB8U6fUWcUsNnqm4FR0S6hSwXMGPIXY3trbS+sfU4xUDCzMSWsup7Qb9g6pXznW5aZx4rZtuYTk4biC6At9YaGdc1Ltzs1dI+ZkshY6+UlEKBAwimQAiGKIhlSiEIQghCEAhCEAhCEDywRCY0NBjKycDJknOGj0eB2rIcTsY4PIMS+kDG9K/qmYzAf3tP/MT8Ymy6TtdTMZhfrp/mJ+IRG4+m+jx6nh/yMuT+cpOjp6ngfxGXTn4iSJThvE7f3yjQ+sTPqfaPhKiUGBNtTKnjfHsNhaZqVqlgP5R1nJOwCjX8hzniPS7pxicWWGcpSuQtJSR1b6ZyD1jbe+nYBC6eg8f49gvnAFLE03ZgRUVDmClbDMWXqjkLXvp7bMSkB1/SNvf6x+G1vCeUdDab1MTmA6qqcx5a2AH77J6nR4cmW9tDyudD7Jw5Jq+Hr4relWcd6RehVmUFsouezuueVzpMFxDpdjcV/DrVroxW6IiIpC7KcqhmAtoGJm86TcPptQZWORLakaG/K3abzzHB4ZFqXzHKFaxO4NiBN8WtMc18x6V0M4pgkwmR6ZFYsWNVVUkuRcKSSCwC26ovz5y24diKNi2UBrgOdyDpYHs3HmJ5zgKTVWORspU+kIOYrmfOpFwugyldD2ac7WdY1MlRGOV1B9G6nrJmBIQn1SSosdsw2IE3ljK5453F6/wjHBTbkeze8n4b0owOIsKeJQsTlCNdHLAkFcjgNe4PKeMcC6e1qa5KlIVGW4LZ8h0NusMpB8JS8VxVOrXerTDpnbPluNKh+sQR2tc+MmONnimdl8x9J5tZOplVwnEmpSpud3RS33rdb33lmphiHXimJEMKcsRjBY1zLEp8QQMaplQ+EIl5AsIkICwiQgeSZ40vI80aZUTipHK85sp7Y9QZNjq9JOevUi5TIqqG0bGY6QtdTMjhvrr99fxCa3jw0MyVIdYfeHxljUfTXR8dQfc/Od+LqMp02lXwlstEHNY5DY/a12kGG6QI1UUCbOz23DEaAkHTq6XM53KQkt9LrD1CbEg785X9JscaOFxVUEgpScoRuHyWS3fmIkWP4slDK71FVb2YE3uwFiRa+hNtvzj+JYnDYhHoPZkq02VwGGYKRbMBe/O9/ZEzlXpr5uxFZnOd2Z35liWJ5m5PtvIApc3vYgC4lt0jwKYfEPRQlxSVKbOdC7hFLNlv1Rc2CjYKNzcyqVrN7dJ19nppeAY5sMSURWU2zKe0bEHlL+v00xBHUpIneczfmBM5hFp5FZqhuVJsoGhsLA+/wAu+T0alIBc1Mk6Z7NpbPc2H3dN95LjLd2Eyyk1KZxPiVbEHNVqFvVWwCj2KPjvKxrXsedtuVtSfhLF8VTsB6MGzE30BIOa3Ijmumo6s43IIDBbDrX1vroL7DulnhN7QYbE1Kbh0NmBuDYG++4O4tpbvjqfEqgZiWLZkKksbn6uVb37LKPASJbHnIcSNDbYSqjqVizsQLXN9PWO5+M6aLa66H3TjbcEdk6aJBtraB9D9CK2fB0j2Ar5G/5zSoZhvkurlsLlN+obX7SeXkF85uEnO+0h4ikRBHQpFjG3kixjbyxKfEiwhBCEIBEiwgEIQgeOLHERqx5lQoWSokRRJqayBypG1Kek6VWI66QjFdIqehmKpfXH3h8RN/0lTqmefowDb8x8ZY3H0zwsH0CFaYdsoyg2Avfckx+H4fTe9TIq4hbhnyjMrnuO69ndJ+Bj+En3PzicYpOgNembMinMDsyd/eN5nSbY/G8P+cPQchT6FwxDah7ezv1vbe2kmwvRIrVfEK5szkimNAqE335jT9Np1YBbAS8o4gKjZhoFLn7qi5HwmJx4xOu2+XzlxvEZ8TXcj61VyPZna3uAlfYSR3zszEWzEtYbAsb298RUHcO+d23fgdRb97gfnJ1U7/r+7e2c2CNv333naBf6t9Lcudzbn3/vnGXNUQ7fu+mnvE66VCyob6FGZxY6a3uDbUey+3eJA+f1TpytyG2vs08pYrSORaZVlbIBe2tilwTc6jbs3vA4GwQO375cvaPOTcG6OPjK4w6OqllchmByjIpPLvAHjfukxoVVOqllvfT61gb2sT3cppvk2RTjkYXuPSXuLfWV/wBB5wKTEfJjxantQSoBsadRNvY5U+6TcN+TbidRwGw4orpmeo6WtzsqFmJ8Ld4n0BCTa7UfR/gyYOilBGLWuXYixZja5tyGlrd0tkhW3EahmaRMIsYpi3hdnrGneCxTKlLCEIQQhCAQhCAQhCB40DHRQpvYrbtkgB7JWT0nTSEgRT2Tqpg9nvgTqIxxJVv2RrAwMd0rxpohXCZwSQylVYbb9YGUOH6Wqu2FXTsWmvwSanpKnUbxnmL09Tr2zNxl9uuOdk8f6elUel/FGA9Hg8Va2mUVSLd2VJ2U+NcacWOCxRBFjmFexv23UCer8GH8JPuJ+ETtdQRYgEHcHUEeyTox+v8AK92/9HiHEOP4/D5fTYY0s18mcut7b21EjxnGeImlUJokL6NyzBn6tMrqx622vObbpxwHCticCxw63esKNQr1b0rFwCB9rnvqZ3fKKadHh2JsijNTWmoFluXZV001sLm3PLHbx+juZPndCfdJEU9sadCNI4H4Tqy7sJa3fynUrsL5ee/78ZxYQ7DsGp7p0GqDoPqjc98MlqYpxz90uqlaotnKkrlUK4sQEAAANhcbf1mcqtoT2eU1vCMXTNMKGG3PSxJ39msCHD43ObA/DwP77Zovk/ZBxBb3uyNlttmCE6jssXtKGvgqZcWBRuZXQhjtcbEG1pedD6TU8fRZ9QVqEsB1dKbknu2vY9ptJR7HCU1TpBTGysfISL+0a/4Z/wBX9JkXFfcSJDKmpx8H+T3yEcb+yPfJVjRLFmfHHz6i++IePv6i+/8AWVGjWLM2OkL+qnv/AFi/2ib1V9/6wNJCZwdIX9Rff+sX+0D+qvvlGihM5/aB/UX3wHSB/UX3wNHCZ36ff1V98X6ef1V9/wCsDQwmc+nqnqr5H9YQm1Z0mwoZFqgaqcrntU7E+w6eMziibjFUc6OnrKbfeGo94ExKwlSIJOkhpydYHQsCIII4iEZbpPojeyeY1P5vGeodKh/Db2Ty5x9Ye2I3H1Xwgfwk+4v4RO6cnDh/DUfZX3ATrgZvpYl6mC/+Uv4HP5TDfLXxQM1DCq2q3rVB3kFUB8PSHxE3vSUD0mDJNgMSDf8A+t954N0k4qcViq1e9w7nJv8A3S9VN9uoq+N4k8iirjUC8VRy/domJuWAHbJGXS3Lc9/efMzTSZNeqBpz750Mg8BsOQkFGwG9zJ1hkx0G19JCEKarcjs5j2TpYRjg7DLbv1PlIO7DcZYhQ2pUFQ3PLpofIbzY9FOJZqmh3SoGHtRgPfaYFcC7Xte45hbHTUi3PTkZa9AeJXxJRiBnRgnewINte7NpLfS6j08wixJhCXheAgYCRbxIolCxYRQICRRFtFAhABFhaKZQloQjxCG2iR0IGhU2MxnEKOSq68gxt90m49xE2MqOKYSm9TMWYEqL2tqRp8LTNyk81qY2+IoUk9OWH0ZTG5f4flEOFprux7rn+kx3cWuzUCxxnQEp+t7461P93juT6v7J279z92N6VN1G9k8xpC7gdrD4z2njB4eF/jnq8/7z/jKnguE4JWq5aFNXqIM+oqiwVlGa76HUrJ3dfF/Z0x4v6x63gh1F9g+EouneLenhSlNmWrWdKGHKOyMK1RhZgykHqqGa2xy2Ok68DVxD6gjKNCDYfASrxV8RxOjTNiuDpNXqW+r84q9SmPaFDsJrHLq+GMselSdL+GMtbCUlxNazrUDlqjPdkNJc/XJsTnIIGkruO9BsLh8TTanTPo3RgVc51WopXbNc6qdvsmaDpmf+twv2U/HXoj/jLrpTqiDmXFvYFe/xEuXpeP8Amjy3inQT0zPUolEFKk1QoFOaoygkBFGg2AJ+0NDMGBqfbYfvwnvXB3IxCW9Zge8ZGvbtH5iYzpjwFH4jURAqM6IaYCgKbItwANiSCbjsmuH9Xin5F6bvTAFCNreN4KlRjYZe695o6+DaiTTexK9gNtQCNx4eE4MUqizKNiCe7X4T1Thmt7eO893rTlThzk6trryYC47v6yw4Vw1TmLtzsAugvtc894750tz3XsO07n9986uFnQgnYa+w7max48fbGfLl62tcLRQBVCgWI2tbTmLbHUiVWD+Th0IatiaYBY2SkwaplGoZjsnLa8ucJQ1Gtj/T9ZtOMIi+iyqATTDMRuxa2/kfOc/ydzWnT8a73Kr1FhbXx384sS0dPM9BICEWVCWiwi2gII8CNEesqARbRQIQCEIQEtFiCBhCQiQjSu96WUE5r27ogLZHew6gvbXXS+8nxA0PsklBM1KqoFyUNh2nK08uXHJlJI9WPJbjbfbjpcRestmAGugFz4++cHEHu5HqgDx5yw4bgXS10Og/3dk5F4TiCSSguSSesNzN8eP6raxyZTpkjnWPnanB6v2R4/0kq8Fqesvvnd53nfTZupKP5M3tjrHnScDzU/lPSuNdCWxAsa4T/wAM3/ITj6M/J580rGscSKhyMiL6PJlZmU5r52vopG3OYym8bHTDKSyt7wpwEYk2AuSewAm5lP0CQvTq41h1sZWaqt9xh1OSiv8ApW//AJTl6VNWXBvSpg58QyYdGW5CiswV2PYApbWarBUqdKmlJSAqIqILj6qgAfCZ45rHVXPzdsT0wf8A/oUh2Jhf9+Kb/wDE1vF8KalMhRdlIdPapNwPaLjxmG6VYhTxJOsPr4NCezru/wADeeiU66c2E3ZuJLq7jK4Bf+ophiylWNgRa17sFIOouS3nHdL8Ci1qGIy3fWmq7AtYlSW5aZx3kidHEF9HxHD10GZayPh8TlubZTmou1tgGLLc+sI35RaObC39Woh8CGX4kS8c1dHLn1TevTL8X4P6dy6BrlVA0WwsdbgnUzMcY4XVpb08yHTPlOXXSzDl4mXHCekFZLh6bOpYDMik5ToLWGnf2+2V/E+J1KmdDohcggg5iFPVDHbT2CevCZy6vp4uS8dnVN7ZzhfD3rYg0xe9tTuAgA1PuE2/A+jiKL1buTtbQDtG/Wv3zL8Mx60qzqwNnCXItcZX3ueVr3myxfH6SZVRs5LANZhfJexYWB99pnPrl1i3x9uzeab5sqHYAtUaw0PUsAtvVAz7a38JccXqhmQ72pKD7QWBmdw2NaoUZhYAgAA3trdjewvzO01qcYFh1eUxzS9MmXteG49VuM8KfNAGXP0qh3QRPpCkd6Y8hOLvtUwlt86oH/2x5Q9Lhz/JAqgIS2/6Y/yw9Hhj2+cIqgY5ZaDC4c8z5xRgqB/nPnKKwtAyz+jaZ2qH3Q+il/xPcIFXeJLQ8IH+IPL+sPog/wCIvlCK2BEsfoh/XX3xDwmp2r5n9IFbaE7voip9nzP6QlErcXQiwXfTbt0nVwxwue50Av4azJLik9Yec0uGGj/cM4cnjKPRxz9NWVOuCLiSekEqcE2k6SZ1cHWawjWrTljoVIaxiekMjvGM4gdIwy1hlYsBfN1WKm421Gto/wChjyxVcDs/hN72pkzgbFIEds4AUXJuLAd55Tiw/HAQQtUE9gcH85J5as0yvEmqU+JNTSqx9JisNSd2Wmz5GooWy9TKCL6ELPQaPCSfrYqs2vM015fZQTyjHY62NWqzbY5mY3vpTCrvPWsDi763uN/OWppBxrhTfN6voGcVQhamxdmJddQtiba2y7c5DxLELi+GtVXUPRFQdzJZyPAqR4S2q48LpblflMrwDFejq4vBE9Uh6+Fv/h1QcyDuDkxL5SzcVHRVaXoyy31NqgY3HpABsNtra+HKT43gtEu9Z0vfW1yBoBy8JicPi6qOMmdCSBa1wSdbFTofHsl3SrY5EGc9TMCb2LbGyNY2CkgD8xPXePLdsvt5ZyYdMlnpTPwUHFgamkER23VgjhygIvcHSx15GW+J6P08qnDgKRo5cuBl7gb6985qHEwMQDUyqjgBradZAAtj2WZtDprLXiPGKYKGiyVOtdhnJsVIK/VOuvI9klucy1Fk47ju1zYekUqJSJBZWYMRexYX2vvL4CZzhjk1Va+vWJ030a/s/rL/ADm9reOtpy/Kyxxs3W/xcbljbjPk+KJA9W24PgCfcIiYlT2+IYfETz9eP29Pby+nRFBnOMSnrDXaSemXtHnNSxLjZ8JQTFDRiuO2KGEqaSB44OZEGEUSomFU9scK7dpkF4ogdAxDdpjxi37Zywg07Bjn7Y4cQftnFGkwmlh9It2xJW3iymjqKXAuoBtqBbfnLrAakjtUxYT5+Ht9DP0iwRsJ1MwhCe54Plyvj0Byi5bsA18zYe+OVqrbIFH2mF/Jb/GEJwzzsejDCXRfm9QnV/BQB7zeKuCS+oLfeJYeRNh4QhPPc8q9EwxhMXhadRHpMt0emysNrqdCNLW3nnvEPk4pk3w9YqfVcZh4MLEe+EJ24bdOHJ7UNLhdb0dK1IVFp1nWuc4W3WUEi5BOgM3PDumODF1NQqVAFsj2sNtgeQhCei+3GenF0n6b+hqKtJFcNTDZiWWxLMLWy67TOVultV6lPEejUPSuLgmz0yOsjA+YMIQO7hnFmRzmUmnVIzENYhQxuQCDc+0bXHMEbWoyVKZFwykXuVK3sbqTbXs5QhPZySSx4uK27jD8dwlPEPSajoqg+lI0AUsLFQVBJ7fYLTmxfDPm4RlfOGOmmU6AEX1hCdJ7jFk6VtwdlQqTyLFj2Aju37ZpaFWm/wBU5htexGvjCE+f/EZNx7/4b6pxCxPRjshCfLr6kBo90T5mOYEIQGnhy+qvkI36OT1R5AQhNxkpwHef9TfrD5mw2Y+d/jEhLM8vsuOP0PmtT1/h+kX0L+t7okJZy5fbNwx+iii/rDyP6w9DV+yfH+kSE3OXL7YvFj9HfxBuB5yBq7j+U6b6j9YsJ0nJk59rFD88+yfd+sIQjvZHZxf/2Q=="
            />
            <TextContainer>
              <BrandText>맘맘님</BrandText>
              <ProductName>밀크웨이 맨투맨</ProductName>
              <Price>8,000원</Price>
            </TextContainer>
          </ProductCard>
          <ProductCard height={imageHeight.toString()}>
            <ProductImage
              height={imageHeight.toString()}
              src="data:image/jpeg;base64,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"
            />
            <TextContainer>
              <BrandText>맘맘님</BrandText>
              <ProductName>밀크웨이 맨투맨</ProductName>
              <Price>8,000원</Price>
            </TextContainer>
          </ProductCard>
          <ProductCard height={imageHeight.toString()}>
            <ProductImage
              height={imageHeight.toString()}
              src="data:image/jpeg;base64,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"
            />
            <TextContainer>
              <BrandText>맘맘님</BrandText>
              <ProductName>밀크웨이 맨투맨</ProductName>
              <Price>8,000원</Price>
            </TextContainer>
          </ProductCard>
          <ProductCard height={imageHeight.toString()}>
            <ProductImage
              height={imageHeight.toString()}
              src="data:image/jpeg;base64,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"
            />
            <TextContainer>
              <BrandText>맘맘님</BrandText>
              <ProductName>밀크웨이 맨투맨</ProductName>
              <Price>8,000원</Price>
            </TextContainer>
          </ProductCard>
        </ProductContainer>
      </ContentContainer>
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
const ProductImage = styled.img<{ height: string }>`
  height: ${({ height }) => `${height}px`};
  width: 100%;
  border-radius: 10px;
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
  top: 100px;
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

const ProductCard = styled.div<{ height: string }>`
  width: calc(100% / 3 - 12px);
  overflow: 'hidden';
  height: ${({ height }) => `${Number(height) * 1.4}px`};
  margin: 0;
`;
const BrandText = styled.div`
  color: ${({ theme }) => theme.colors.neutral[3]};
  font-size: 8px;
`;
const ProductName = styled.div`
  color: ${({ theme }) => theme.colors.neutral[5]};
  font-size: 10px;
  font-weight: 600;
`;
const Price = styled.div`
  color: ${({ theme }) => theme.colors.neutral[5]};
  font-size: 8px;
  font-weight: 600;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
`;
