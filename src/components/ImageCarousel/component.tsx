import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { DailyLookCard } from '../../pages/DailylookDetail/components/DailyLookCard';
import styled from 'styled-components';
interface CustomThumbnailProps {
  index: number;
  isSelected: boolean;
  onClick: (index: number) => void;
}

function Component() {
  const [selentItem, setSelectItem] = useState(0);
  function CustomThumbnail({
    index,
    isSelected,
    onClick,
  }: CustomThumbnailProps) {
    return (
      <IndicatorPoint
        onClick={() => onClick(index)}
        isSelected={isSelected}
      ></IndicatorPoint>
    );
  }
  return (
    <Carousel
      showThumbs={false}
      showArrows={false}
      showIndicators={true}
      showStatus={false}
      selectedItem={selentItem}
      onChange={(index, item) => setSelectItem(index)}
      renderIndicator={(e, isSelected, index, label) => {
        console.log(label);
        return (
          <CustomThumbnail
            key={index}
            index={index}
            isSelected={isSelected}
            onClick={(index) => {
              setSelectItem(index);
            }}
          />
        );
      }}
    >
      <CardBox>
        <DailyLookCard />
      </CardBox>
      <CardBox>
        <DailyLookCard />
      </CardBox>
      <CardBox>
        <DailyLookCard />
      </CardBox>
    </Carousel>
  );
}

export default Component;

const CardBox = styled.div`
  padding-bottom: 35px;
`;

const IndicatorPoint = styled.div<{ isSelected: boolean }>`
  display: inline-block;
  background-color: ${({ isSelected }) => (isSelected ? '#FFD600' : '#D9D9D9')};
  width: 10px;
  height: 10px;
  border: none;
  margin: 0 5%;
  border-radius: 50%;
  cursor: pointer;
`;
