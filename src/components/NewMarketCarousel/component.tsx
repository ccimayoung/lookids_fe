import React, { ReactChild, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
interface CustomThumbnailProps {
  index: number;
  isSelected: boolean;
  onClick: (index: number) => void;
}
interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: ReactChild[];
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
  setSelectItem?: React.Dispatch<React.SetStateAction<number>> | undefined;
}
function Component({ children, className, autoplay = true, speed = 2000, loop = true, setSelectItem }: sliderProps) {
  const settings = useMemo<Settings>(
    () => ({
      dots: false,
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
    }),
    [autoplay, loop, speed],
  );

  return (
    <SlideWrapper className={className}>
      <Slider {...settings} beforeChange={(current, next) => setSelectItem && setSelectItem(next)}>
        {children}
      </Slider>
    </SlideWrapper>
  );
}

export default Component;

const SlideWrapper = styled.section`
  width: 100%;
  position: relative;
`;
