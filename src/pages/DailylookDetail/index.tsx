import { ReactChild, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DailyLookCard } from './components/DailyLookCard';
import { ImageCarousel } from '../../components/ImageCarousel';
import { useGetDailylookDetail } from '../../hooks/useDailyLook';
import { useParams } from 'react-router-dom';
import { genderFormatted } from '../../utils/statusFormatter/dailylookFormatter';

export default function DailylookDetail() {
  const { dailylookId } = useParams();
  const [imageHeight, setImageHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const { data: dailylookDetail } = useGetDailylookDetail(Number(dailylookId));
  useEffect(() => {
    const handleResize = () => {
      const element = elementRef.current;
      if (element) {
        const width = element.offsetWidth;
        setImageHeight(width);
      }
    };
    if (imageHeight === 0) {
      setTimeout(() => {
        handleResize();
      }, 300);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const getDailyCardList = ()=>{
    const imageElements = dailylookDetail?.data?.imageUrls?.map((image,i) =>{
      if(image.includes('http'))
        return  (
          <div key={image+i}>
            <CardBox >
              <DailyLookCard imageUrl={image} />
            </CardBox>
          </div>
        );
      return <NoImage key={image+i} $imageheight={imageHeight}><DailyLookCard imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfhMEEdvPSR2zIdXgaxhGLRKhw3ft9ZRSnWUdKG8zYBQ1vpj9suG77t1JevKZ3YlpAwU&usqp=CAU'} /></NoImage> as ReactChild;
    }
      
    );
    return imageElements as ReactChild[];
  };


  return (
    <Container ref={elementRef}>
      
      <ImageBox>
        {dailylookDetail?.data?.imageUrls?.length && dailylookDetail?.data?.imageUrls?.length > 0 ? (
          <ImageCarousel>
            {getDailyCardList()}
          </ImageCarousel>          
        ):
          <NoImage $imageheight={imageHeight}><DailyLookCard  imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfhMEEdvPSR2zIdXgaxhGLRKhw3ft9ZRSnWUdKG8zYBQ1vpj9suG77t1JevKZ3YlpAwU&usqp=CAU'} /></NoImage>}
        
        <BottomContent>
          <TagBox>
            {dailylookDetail?.data?.hashTag.map((hash:string)=>{
              return<ImageHashTag key={hash}>{hash}</ImageHashTag>;
            })}
          </TagBox>
          <Writer>{dailylookDetail?.data?.user.name}</Writer>
        </BottomContent>
      </ImageBox>
      <ContentBox>
        <ContentHeader>
          <UserNameBox>
            {dailylookDetail?.data?.user.name}
            <UpdateDate>수정 날짜 : 2023-09-19</UpdateDate>
          </UserNameBox>
          {/* <UpdateButton>글 수정</UpdateButton> */}
        </ContentHeader>
        <ChildInfoContainer>
          <ChildInfoTitle>{dailylookDetail?.data?.user.name} 아이 정보</ChildInfoTitle>
          <ChildInfoBox>
            <ChildInfo>
              <ChildInfoLabel>성별</ChildInfoLabel>
              <ChildInfoValue>{genderFormatted(dailylookDetail?.data?.sex)}</ChildInfoValue>
            </ChildInfo>
            <ChildInfo>
              <ChildInfoLabel>나이</ChildInfoLabel>
              <ChildInfoValue>{dailylookDetail?.data?.age}세</ChildInfoValue>
            </ChildInfo>
          </ChildInfoBox>
          <ChildInfoBox>
            <ChildInfo>
              <ChildInfoLabel>키</ChildInfoLabel>
              <ChildInfoValue>{dailylookDetail?.data?.height}cm</ChildInfoValue>
            </ChildInfo>
            <ChildInfo>
              <ChildInfoLabel>몸무게</ChildInfoLabel>
              <ChildInfoValue>{dailylookDetail?.data?.weight}kg</ChildInfoValue>
            </ChildInfo>
          </ChildInfoBox>
        </ChildInfoContainer>
        <Description>{dailylookDetail?.data?.description}</Description>
        <ClothesInfoContainer>
          {dailylookDetail?.data?.purchaseInfos?.map((v) => {
            return (
              <ClothesInfoBox key={v.link}>
                <ClothesInfoLabel>{v.description}</ClothesInfoLabel>
                <ClothesInfoText>{v.brand}</ClothesInfoText>
              </ClothesInfoBox>
            );
          })}
        </ClothesInfoContainer>
        <HashTagBox>
          {dailylookDetail?.data?.hashTag.map((hash:string)=>{
            return<HashTag key={hash}>{hash}</HashTag>;
          })}
        </HashTagBox>
        <Line />
        <RecommendDailylookContainer>
          <RecommendTitle>추천 데일리 룩</RecommendTitle>
          <RecommendDailylookBox>
            <RecommendCard $heights={imageHeight}>
              <RecommendImage
                loading="lazy"
                src="https://looxloo.com/web/product/extra/small/20230823/e3f2ecf6da392d72512d284be5a95612.jpg"
              />
            </RecommendCard>
            <RecommendCard $heights={imageHeight}>
              <RecommendImage
                loading="lazy"
                src="https://www.yoox.com/images/items/16/16246243CD_14_f.jpg?impolicy=crop&width=387&height=490"
              />
            </RecommendCard>
            <RecommendCard $heights={imageHeight}>
              <RecommendImage
                loading="lazy"
                src="https://looxloo.com/web/product/extra/small/202308/c1b4adb7ab82f4910e017d26304f92ff.jpg"
              />
            </RecommendCard>
            <RecommendCard $heights={imageHeight}>
              <RecommendImage
                loading="lazy"
                src="https://looxloo.com/web/product/extra/small/20230823/3b27d61d4f3200fbf77465e12a34399e.jpg"
              />
            </RecommendCard>
            <RecommendCard $heights={imageHeight}>
              <RecommendImage
                loading="lazy"
                src="https://moomootr4389.cdn-nhncommerce.com/data/goods/22/08/35/1000004452/1000004450_detail_153.jpg"
              />
            </RecommendCard>
          </RecommendDailylookBox>
        </RecommendDailylookContainer>
      </ContentBox>
    </Container>
  );
}
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 34px;
  width: 100%;
`;

const NoImage = styled.div<{$imageheight:number}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({$imageheight})=>`${$imageheight-40}px`};
  height: ${({$imageheight})=>`${$imageheight-40}px`};
`;

const UserNameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 1rem;
`;
const UpdateDate = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral[3]};
`;
const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const UpdateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.yellow[3]};
  border: none;
  font-size: 13px;
  padding: 4px 5px;
  border-radius: 5px;
`;

const ChildInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  border-radius: 10px;
  margin-top: 10px;
`;

const ChildInfoTitle = styled.div`
  font-size: 1rem;
`;
const ChildInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChildInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
`;
const ChildInfoLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
`;
const ChildInfoValue = styled.div`
  padding: 7px 4px;
  font-size: 0.8rem;
  background-color: ${({ theme }) => theme.colors.neutral[1]};
  border-radius: 5px;
  width: 55px;
`;

const Description = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  color: #777474;
  font-size: 0.9rem;
`;

const ClothesInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
`;

const ClothesInfoBox = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const ClothesInfoLabel = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  font-size: 0.9rem;
  padding: 4px 7px;
  width: 55px;
  background-color: ${({ theme }) => theme.colors.yellow[3]};
`;

const ClothesInfoText = styled.div`
  font-size: 0.9rem;
`;

const HashTagBox = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;
const HashTag = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.neutral[3]};
`;
const ImageHashTag = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.neutral[0]};
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral[2]};
  margin-bottom: 20px;
`;
const RecommendDailylookContainer = styled.div``;

const RecommendDailylookBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const RecommendCard = styled.div<{ $heights: number }>`
  background-color: green;
  width: calc(50% - 10px);
  height: ${({ $heights }) => `${$heights / 2 - 30}px`};
  border-radius: 10px;
  overflow: hidden;
`;
const RecommendImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
const RecommendTitle = styled.div`
  font-size: 17px;
  color: 'black';
  margin-bottom: 10px;
`;
const CardBox = styled.div`
  padding-bottom: 40px;
`;
const ImageBox = styled.div`
  display: flex;
  position: relative;
`;
const BottomContent = styled.div`
  display: flex;
  position: absolute;
  bottom: 40px;
  width: 100%;
  padding-bottom: 8px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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
  font-size: 0.9rem;
`;
