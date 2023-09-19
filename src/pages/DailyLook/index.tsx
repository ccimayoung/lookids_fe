import React, { useState } from 'react';
import styled from 'styled-components';
import { FilterIcon } from '../../components/GlobalIcon';
import { DailyLookCard } from './components/DailyLookCard';
import { FloatingButton } from '../../components/FloatingButton';

export interface IAppProps {}

export default function DailyLook() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Contents>
        <AdBannerBox>
          <EventBannerImg src={'/img/eventbanner.png'} />
        </AdBannerBox>
        <CategoryContainer>
          <FilterButton onClick={() => setIsOpen(true)}>
            <FilterIcon />
            필터
          </FilterButton>
          {/* <ThemeWhite /> */}
        </CategoryContainer>
        {isOpen && <ThemeBlack />}
        <CardContainer>
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
        </CardContainer>
        <FloatingButton onClick={() => console.log('test')}>버튼</FloatingButton>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  padding: 20px;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  max-width: 400px;
  gap: 20px;
`;

const EventBannerImg = styled.img`
  object-fit: fill;
  width: 100%;
  height: 90px;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff000;
`;
const AdBannerBox = styled.div`
  width: 100%;
  overflow: hidden;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
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
  align-items: center;
  background-color: white;
  position: sticky;
  justify-content: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
  gap: 3px;
  top: 0;
  z-index: 1;
  width: 100%;
  margin-top: 40px;
`;
