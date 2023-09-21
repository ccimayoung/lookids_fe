import { useCallback, useEffect, useRef, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { SearchBox } from '../../components/SearchBox';
import { AddIcon, CameraIcon } from '../../components/GlobalIcon';
import { FloatingButton } from '../../components/FloatingButton';
import { useNavigate } from 'react-router';
import { ResellItemCard } from './components/ResellItemCard';
import { useDropzone } from 'react-dropzone';

export interface IAppProps {}

export default function ResellMarketPhotoEngine() {
  const contentsRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const themeApp = useTheme();
  const navigate = useNavigate();
  const [imageHeight, setImageHeight] = useState(0);
  const [imageFile, setImageFile] = useState<File[] | undefined>();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // 이미지가 선택되었을 때 실행됩니다.
      // 최대 이미지 개수를 초과하는 경우 경고를 표시합니다.
      if (acceptedFiles.length > 1) {
        alert(`최대 ${1}개까지 이미지를 선택할 수 있습니다.`);
      } else {
        setImageFile(acceptedFiles);
      }
    },
    [imageFile],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    console.log('현재 스크롤 위치:', scrollTop);
    // 원하는 작업을 수행하거나 스크롤 위치를 설정하세요.
  };
  return (
    <Container onScroll={handleScroll}>
      <ContentContainer>
        <CategoryContainer>
          <Content ref={contentsRef}>
            <TransButton {...getRootProps()}></TransButton>
            <SearchBox placeholder="다른 이미지 검색하기" disabled={true} isSearch={false} />
          </Content>
        </CategoryContainer>
        <AITitle>룩키즈 AI Look</AITitle>
        {!imageFile ? (
          <SearchImageBox {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            <CameraButton>
              <CameraIcon width="30" height="30" />
              <CameraText>사진 업로드</CameraText>
            </CameraButton>
          </SearchImageBox>
        ) : (
          <SearchImageBox>
            <ImageDeleteBox
              onClick={(e) => {
                e.stopPropagation();
                setImageFile(undefined);
              }}
            >
              <SearchImage src={URL.createObjectURL(imageFile[0])} />
            </ImageDeleteBox>
          </SearchImageBox>
        )}
        <Line />
        <SubTitle>찾는 이미지와 비슷한 상품 149개</SubTitle>
        <ProductContainer>
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://ae01.alicdn.com/kf/Sdd4c439b63744832b6115c365eca76a46/-.jpg_220x220.jpg_.webp'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://ae01.alicdn.com/kf/Sdd4c439b63744832b6115c365eca76a46/-.jpg_220x220.jpg_.webp'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://m.cooingkids.com/web/product/big/20200313/38849db602ae21192a82938c26241542.jpg'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
          <ResellItemCard
            brandName="맘맘님"
            productName="밀크웨이 맨투맨"
            price={8000}
            imgUrl={'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4848639433/B.jpg?730000000'}
          />
        </ProductContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: 'auto';
`;
const Content = styled.div`
  width: 100%;
  background-color: white;
  position: sticky;
  top: 0;
`;
const ContentContainer = styled.div`
  width: 100%;
`;
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 18px;
  margin-top: 10px;
`;
const AITitle = styled.div`
  font-size: 18px;
  color: black;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: white;
  position: sticky;
  justify-content: center;
  gap: 10px;
  top: 0;
  z-index: 2;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;
const SearchImageBox = styled.div`
  display: flex;
  width: 100%;
  height: 30vh;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  overflow: hidden;
`;
const SearchImage = styled.img`
  object-fit: cover;
  border-radius: 10px;
  width: 30vh;
  height: 100%;
`;
const TransButton = styled.button`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral[2]};
`;
const SubTitle = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;
const CameraButton = styled.button`
  border: none;
  width: 30vh;
  height: 30vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  gap: 7px;
`;
const CameraText = styled.div`
  font-size: 10px;
`;
const ImageDeleteBox = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
`;
