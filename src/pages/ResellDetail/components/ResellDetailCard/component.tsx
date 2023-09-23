/* eslint-disable max-len */
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Component = ({ image }: { image: string }) => {
  const [imageHeight, setImageHeight] = useState(0);
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
    <Wrap $imageheight={imageHeight} ref={elementRef}>
      <ImageBox>
        <DailyLookImage alt="데일리룩 이미지" src={image} />
      </ImageBox>
    </Wrap>
  );
};

// Styling
const Wrap = styled.div<{ $imageheight: number }>`
  display: flex;
  height: 100%;
  max-height: ${({ $imageheight }) => ($imageheight ? `${$imageheight}px` : 'calc(100vw - 40px)')};
  min-height: 300px;
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.grey[5]}`};
  border-radius: 10px;
  overflow: hidden;
`;

const DailyLookImage = styled.img`
  object-fit: fill;
  width: 100%;
`;
const ImageBox = styled.div`
  display: flex;
  width: 100%;
`;
export default Component;
