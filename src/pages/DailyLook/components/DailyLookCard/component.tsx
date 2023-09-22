/* eslint-disable max-len */
import styled, { useTheme } from 'styled-components';
import { LikeHeart } from '../../../../components/GlobalIcon';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDailylookList } from '../..';

const Component = ({ hashTag, user, imageUrls }: IDailylookList) => {
  const themeApp = useTheme();
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
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
    <Wrap
      imageheight={imageHeight}
      ref={elementRef}
      onClick={() => {
        navigate('dailylook/1');
      }}
    >
      <LikeButton
        onClick={(event) => {
          event.stopPropagation();
          setIsLike(!isLike);
        }}
      >
        <LikeHeart color={isLike ? themeApp.colors.pink[300] : themeApp.colors.grey[0]} />
      </LikeButton>
      <ImageBox>
        <DailyLookImage alt="데일리룩 이미지" loading="lazy" src={imageUrls[0]} />
      </ImageBox>
      <BottomContent>
        <TagBox>
          {hashTag
            .split('#')
            .slice(1)
            .map((v) => (
              <Tag>#{v}</Tag>
            ))}
          {/* <Tag>#강쥐</Tag>
          <Tag>#댕댕이</Tag>
          <Tag>#귀엽다</Tag> */}
        </TagBox>
        <Writer>{user.name}</Writer>
      </BottomContent>
    </Wrap>
  );
};

// Styling
const Wrap = styled.article<{ imageheight: number }>`
  display: flex;
  position: relative;
  height: ${({ imageheight }) => (imageheight ? `${imageheight}px` : '335px')};
  max-height: max-content;
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.grey[5]}`};
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const DailyLookImage = styled.img`
  object-fit: cover;
  width: 100%;
`;
const ImageBox = styled.div`
  display: flex;
  width: 100%;
`;
const Tag = styled.article`
  font-size: 12px;
  color: white;
`;
const BottomContent = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 8px;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  height: 12%;
  background-color: #000000b3;
`;
const TagBox = styled.div`
  display: flex;
  gap: 10px;
`;
const Writer = styled.div`
  color: white;
  font-size: 13px;
`;
const LikeButton = styled.button`
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
export default Component;
