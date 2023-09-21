import React, { useState } from 'react';
import { styled } from 'styled-components';
import withCommas from '../../utils/withCommas';
import { Dropdown } from '../../components/Dropdown';
import { useRecoilState } from 'recoil';
import { Option } from '../../components/Dropdown/component';
import { selectedColorAtom, selectedSizeAtom } from './atom/atom';

export interface IAppProps {}
const ColorOptions = [
  { label: '전체', value: 0 },
  { label: '상의', value: 1 },
  { label: '하의', value: 2 },
  { label: '아우터', value: 3 },
  { label: '악세사리', value: 4 },
  { label: '신발', value: 5 },
  { label: '기타', value: 6 },
];
const sizeOptions = [
  { label: '90호', value: 0 },
  { label: '100호', value: 1 },
  { label: '110호', value: 2 },
  { label: '120호', value: 3 },
  { label: '130호', value: 4 },
];

export default function NewMarketDetail() {
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useRecoilState<Option | null>(selectedColorAtom);
  const handleOptionSelectColor = (option: Option | null) => {
    setSelectedColor(option);
  };
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useRecoilState<Option | null>(selectedSizeAtom);
  const handleOptionSelectSize = (option: Option | null) => {
    setSelectedSize(option);
  };

  const handleDropdownAllClose = () => {
    setIsSizeDropdownOpen(false);
    setIsColorDropdownOpen(false);
  };
  return (
    <Container>
      <ProductContainer>
        <ProductImageBox>
          <ProductImage src="https://static.luck-d.com/product/5011/main_carousel/IAB_STUDIO_10TH_ANNIVERSARY_TSHIRTS_PACK__65269.webp" />
        </ProductImageBox>
        <ProductInfoBox>
          <ProductTextBox>
            <BrandName>케어베어</BrandName>
            <ProductName>퀄팅 패딩 점퍼</ProductName>
            <Price>{withCommas(123000)}원</Price>
          </ProductTextBox>
          <DropdownBox>
            <ColorItem>
              <ColorBox>색상</ColorBox>
              <Dropdown
                options={ColorOptions}
                select={selectedColor}
                onSelect={handleOptionSelectColor}
                isOpen={isColorDropdownOpen}
                setIsOpen={setIsColorDropdownOpen}
                allClose={handleDropdownAllClose}
              />
            </ColorItem>
            <ColorItem>
              <ColorBox>색상</ColorBox>
              <Dropdown
                options={sizeOptions}
                select={selectedSize}
                onSelect={handleOptionSelectSize}
                isOpen={isSizeDropdownOpen}
                setIsOpen={setIsSizeDropdownOpen}
                allClose={handleDropdownAllClose}
              />
            </ColorItem>
          </DropdownBox>
          <ButtonBox>
            <ButtonStyle>장바구니</ButtonStyle>
            <ButtonStyle>구매하기</ButtonStyle>
          </ButtonBox>
        </ProductInfoBox>
      </ProductContainer>
      <Line />
      <DetailDescription src="/img/detaildescription.png" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const ProductContainer = styled.div`
  height: 25vh;
  display: flex;
`;
const ProductImageBox = styled.div`
  width: 25vh;
  margin-right: 10px;
`;
const ProductTextBox = styled.div`
  gap: 3px;
`;
const ProductInfoBox = styled.div`
  flex: 1;
  position: relative;
`;
const ProductImage = styled.img`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
const BrandName = styled.div`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.neutral[3]};
`;
const ProductName = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral[5]};
`;
const Price = styled.div`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.neutral[5]};
`;

const ColorBox = styled.div`
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;
const ColorItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
const DropdownBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 14px;
`;

const ButtonBox = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0px;
  justify-content: space-between;
  gap: 15px;
`;

const ButtonStyle = styled.button`
  border: none;
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.yellow[3]};
  color: ${({ theme }) => theme.colors.neutral[5]};
`;

const Line = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.neutral[2]};
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DetailDescription = styled.img``;
