import React, { ReactChild, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ImageCarousel } from '../../components/ImageCarousel';
import { ResellDetailCard } from './components/ResellDetailCard';
import withCommas from '../../utils/withCommas';
import { Label } from '../../components/Label';
import { formattedDate } from '../../utils/dateFormatter';
import { useNavigate, useParams } from 'react-router';
import { useGetResellDetail } from '../../hooks/useResell';
import { saleStatus } from '../../utils/statusFormatter/dailylookStatus';

export interface IAppProps {}

export default function ResellDetail() {
  const [imageHeight, setImageHeight] = useState(0);
  const [salesStatus, setSalesStatus] = useState(saleStatus.SALE);
  const params = useParams();
  console.log(params?.resellId);
  const elementRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const themeApp = useTheme();
  const { data: getResellDetail } = useGetResellDetail(Number(params?.resellId || 0));
  useEffect(() => {
    const handleResize = () => {
      const element = elementRef.current;
      if (element) {
        const width = element.offsetWidth;
        setImageHeight(width);
      }
    };
    handleResize();
    if (imageHeight === 0) handleResize();
  }, []);
  useEffect(() => {
    console.log(getResellDetail?.data);
  }, [getResellDetail]);

  const getDailyCardList = () => {
    const imageElements = getResellDetail?.data?.imageUrls?.map((image, i) => {
      if (image.includes('http'))
        return (
          <div key={image + i}>
            <CardBox>
              <ResellDetailCard image={image} />
            </CardBox>
          </div>
        );
      return (
        <NoImage key={image + i} $imageheight={imageHeight}>
          <ResellDetailCard
            image={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfhMEEdvPSR2zIdXgaxhGLRKhw3ft9ZRSnWUdKG8zYBQ1vpj9suG77t1JevKZ3YlpAwU&usqp=CAU'
            }
          />
        </NoImage>
      ) as ReactChild;
    });
    return imageElements as ReactChild[];
  };
  return (
    <Container ref={elementRef}>
      {getResellDetail?.data?.imageUrls?.length && getResellDetail?.data?.imageUrls?.length > 0 ? (
        <ImageCarousel>{getDailyCardList()}</ImageCarousel>
      ) : (
        <NoImage $imageheight={imageHeight}>
          <ResellDetailCard
            image={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfhMEEdvPSR2zIdXgaxhGLRKhw3ft9ZRSnWUdKG8zYBQ1vpj9suG77t1JevKZ3YlpAwU&usqp=CAU'
            }
          />
        </NoImage>
      )}
      <ContentBox>
        <ProfileContainer>
          <SellerInfo>
            <Profile>
              <ProfileImage src="https://media.istockphoto.com/id/1289947104/ko/%EB%B2%A1%ED%84%B0/%ED%8E%AD%EA%B7%84-%EB%B2%A1%ED%84%B0-%ED%9D%91%EB%B0%B1-%EA%B7%B8%EB%A6%BC%EC%9E%85%EB%8B%88%EB%8B%A4.jpg?s=1024x1024&w=is&k=20&c=OFS74evp9im4PgUjJKyYxisbGCzCUSIxXQCsfEdU3-I=" />
              <IconContainer>
                <IconImage src="/img/trust.png" />
                <IconImage src="/img/excellence.png" />
              </IconContainer>
              <BottomThim>{getResellDetail?.data?.user?.name}</BottomThim>
            </Profile>
            <ProductInfo>
              <ProductName>밀크웨이 맨투맨</ProductName>
              <BrandName>밀크웨이</BrandName>
              <Price>{withCommas(8000)}원</Price>
            </ProductInfo>
          </SellerInfo>
          <ButtonContainer>
            {/* <Label
              color={themeApp.colors.yellow[3]}
              height={'26'}
              text="글 수정"
              width={'50'}
              onClick={() => {
                navigate(`/resell-market/resell-update/${params?.resellId || 0}`);
              }}
              center={true}
              bold={true}
            /> */}
            <Label
              color={themeApp.colors.green[300]}
              height={'26'}
              text={salesStatus === 'SALE' ? '판매중' : '판매완료'}
              width={'60'}
              onClick={() => {
                if (salesStatus === saleStatus.SALE) setSalesStatus(saleStatus.DONE);
                if (salesStatus === saleStatus.DONE) setSalesStatus(saleStatus.SALE);
              }}
              center={true}
              bold={true}
            />
          </ButtonContainer>
        </ProfileContainer>
        <Line />
        <PostUpdateDate>{formattedDate(new Date(), '-')}</PostUpdateDate>
        <PostDescription>{getResellDetail?.data?.description}</PostDescription>
        <ChatingButtonBox>
          <Label
            color={themeApp.colors.green[300]}
            height={'30'}
            text="채팅하기"
            width={'60'}
            onClick={() => {
              alert('해당 기능은 준비중 입니다.');
            }}
            center={true}
            bold={true}
          />
        </ChatingButtonBox>
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
  width: 100%;
`;
const SellerInfo = styled.div`
  display: flex;
  align-items: flex-end;
`;
const CardBox = styled.div`
  padding-bottom: 40px;
`;
const ProfileContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: flex-end;
`;
const PostUpdateDate = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 8px;
  color: ${({ theme }) => theme.colors.neutral[3]};
  margin-top: 5px;
`;
const PostDescription = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.neutral[3]};
  width: 100%;
  margin-top: 3px;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Profile = styled.div`
  width: 15%;
  height: 15%;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;
const NoImage = styled.div<{ $imageheight: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $imageheight }) => `${$imageheight - 40}px`};
  height: ${({ $imageheight }) => `${$imageheight - 40}px`};
`;
const BottomThim = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 10px;
  bottom: 0;
  width: 100%;
  height: 30%;
  color: white;
  background-color: #000000b3;
`;

const IconImage = styled.img`
  width: 100%;
`;
const Line = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.neutral[2]};
`;
const IconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 70%;
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ProductInfo = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: flex-start;
`;

const ProductName = styled.div`
  color: black;
  font-size: 10px;
  font-weight: 600;
`;
const BrandName = styled.div`
  font-size: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral[3]};
`;
const Price = styled.div`
  color: black;
  font-size: 8px;
  font-weight: 600;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 7px;
`;

const ChatingButtonBox = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
