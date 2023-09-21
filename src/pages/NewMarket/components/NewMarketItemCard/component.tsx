/* eslint-disable max-len */
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withCommas from '../../../../utils/withCommas';

interface IResellItemProps {
  brandName: string;
  productName: string;
  price: number;
  imgUrl: string;
  isActive?: boolean;
}
const Component = ({ brandName, productName, price, imgUrl, isActive = false }: IResellItemProps) => {
  const [imageHeight, setImageHeight] = useState(0);
  const navigate = useNavigate();
  const elementRef = useRef<HTMLDivElement>(null);
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
    // 컴포넌트가 마운트될 때 이벤트 리스너를 추가하고,
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ProductCard ref={elementRef} height={imageHeight.toString()} onClick={() => navigate('new-detail')}>
      <HangerImageBox
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <HangerImage src={isActive ? '/img/activehanger.png' : '/img/hanger.png'} />
      </HangerImageBox>
      <ProductImage height={imageHeight.toString()} src={imgUrl} />
      <TextContainer>
        <BrandText>{brandName}</BrandText>
        <ProductName>{productName}</ProductName>
        <Price>{withCommas(price)}원</Price>
      </TextContainer>
    </ProductCard>
  );
};
export default Component;
// Styling

const ProductImage = styled.img<{ height: string }>`
  height: ${({ height }) => `${height}px`};
  width: 100%;
  border-radius: 10px;
`;
const HangerImage = styled.img``;
const HangerImageBox = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
`;
const ProductCard = styled.div<{ height: string }>`
  width: calc(100% / 3 - 12px);
  position: relative;
  overflow: 'hidden';
  height: ${({ height }) => `${Number(height) * 1.4}px`};
  margin: 0;
  cursor: pointer;
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
