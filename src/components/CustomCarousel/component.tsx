import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface IItemProps {
  selecteditem: number;
  itemindex: number;
}
interface IItemWrapProps {
  itemheight: number;
}

// 스타일드 컴포넌트를 사용하여 스타일링
const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ItemWrapper = styled.div<IItemWrapProps>`
  display: flex;
  width: 100%;
  height: ${({ itemheight }) => `${itemheight}px`};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
const Items = styled.div<IItemProps>`
  width: ${({ selecteditem, itemindex }) => (selecteditem === itemindex ? '100%' : '70%')}; /* 다음 아이템 및 이전 아이템 크기 조절 */
  height: ${({ selecteditem, itemindex }) => (selecteditem === itemindex ? '100%' : '70%')};
  transition: height 0.3s ease-in-out;
  background-color: #d9d9d9;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  /* 다른 스타일링 속성 추가 가능 */
`;
const ItemsBottom = styled.div`
  background-color: #000000b3;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  color: white;
  font-size: 10px;
  position: absolute;
  bottom: 0;
`;

const Component = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [sreenWidth, setSreenWidth] = useState(window.innerWidth);
  const [itemHeight, setItemHeight] = useState(window.innerWidth > 595 ? 595 * 0.4 : window.innerWidth * 0.4);
  const [image, setImage] = useState(['/img/thirdMedal.png', '/img/firstMedal.png', '/img/secondMedal.png']);
  useEffect(() => {
    const handleResize = () => {
      setSreenWidth(window.innerWidth);
      setItemHeight(window.innerWidth > 595 ? 595 * 0.4 : window.innerWidth * 0.4);
    };
    // 컴포넌트가 마운트될 때 이벤트 리스너를 추가하고,
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <CarouselContainer>
      <Carousel
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        centerMode
        centerSlidePercentage={40}
        selectedItem={selectedItem}
        width={sreenWidth > 595 ? 595 : sreenWidth}
        onChange={(index) => setSelectedItem(index)}
        onClickItem={(index) => {
          setSelectedItem(index);
        }}
      >
        {[0, 1, 2].map((itemIndex) => (
          <ItemWrapper key={itemIndex} itemheight={itemHeight}>
            <Items data-item-index={itemIndex} selecteditem={selectedItem} itemindex={itemIndex}>
              <MedalIconBox>
                <MedalIcon src={image[itemIndex]} />
              </MedalIconBox>
              <ItemsBottom>맘맘님</ItemsBottom>
            </Items>
          </ItemWrapper>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default Component;

const MedalIconBox = styled.div`
  position: absolute;
  top: 7px;
  left: 7px;
`;
const MedalIcon = styled.img``;
