import { useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { ImagePicker } from '../../components/ImagePicker';
import { Label } from '../../components/Label';
import { Star } from '../../components/GlobalIcon';
import { usePostResell } from '../../hooks/useResell';
import { Category, Season, Target } from '../../utils/statusFormatter/dailylookStatus';
import { useNavigate } from 'react-router-dom';
import { RemoveBackground } from '../../components/RemoveBackground';

export interface IPurchaseInfo {
  id: number;
  tag: string;
  brand: string;
  link: string;
  [key: string]: string | number;
}

export default function PostResell() {
  const themeApp = useTheme();
  const [category, setCategory] = useState<string[]>([]);
  const [target, setTarget] = useState<string[]>([]);
  const navigate = useNavigate();

  const [images, setImages] = useState<File[]>([]);
  const [product, setProduct] = useState<string | undefined>();
  const [brand, setBrand] = useState<string | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const { mutateAsync: postResell } = usePostResell();
  const handlePostResell = async () => {
    const req = {
      productImage: 'https://berrycloset.co.kr/web/product/big/202303/a5d5c4203bc553ea8049b80e444f9a89.jpg',
      productName: product || '',
      productPrice: Number(price),
      sellerNickname: brand || '',
      userId: 0,
    };
    try {
      await postResell(req);
      navigate(-1);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message.toString());
      }
    }
  };

  return (
    <Container>
      <ImagePicker maxImages={5} images={images} setImages={setImages} />
      <ImagePickerBox />
      <RemoveBackground />
      <ContentsBox>
        <ContentsTitle>
          <Tag>
            <StarBox>
              <Star />
            </StarBox>
            <ChildInfoLabel>상품명(제목)</ChildInfoLabel>
          </Tag>
        </ContentsTitle>
        <CategoryContents>
          <Label
            color={themeApp.colors.neutral[0]}
            height={'30'}
            width={'100%'}
            placeholder={'추가하고싶은 정보를 입력해주세요.'}
            center={false}
            value={product || ''}
            onChange={(e) => setProduct(e.target.value)}
          />
        </CategoryContents>
      </ContentsBox>
      {/* <ContentsBox>
        <ContentsTitle>
          <Tag>
            <StarBox>
              <Star />
            </StarBox>
            <ChildInfoLabel>브랜드</ChildInfoLabel>
          </Tag>
        </ContentsTitle>
        <CategoryContents>
          <Label
            color={themeApp.colors.neutral[0]}
            height={'26'}
            width={'100%'}
            placeholder={'추가하고싶은 정보를 입력해주세요.'}
            center={false}
            value={brand || ''}
            onChange={(e) => setBrand(e.target.value)}
          />
        </CategoryContents>
      </ContentsBox> */}
      <ContentsBox>
        <ContentsTitle>
          <Tag>
            <StarBox>
              <Star />
            </StarBox>
            <ChildInfoLabel>가격</ChildInfoLabel>
          </Tag>
        </ContentsTitle>
        <CategoryContents>
          <Label
            color={themeApp.colors.neutral[0]}
            height={'30'}
            width={'100%'}
            placeholder={'추가하고싶은 정보를 입력해주세요.'}
            center={false}
            value={price?.toString() || ''}
            onChange={(e) => {
              setPrice(Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')));
            }}
          />
        </CategoryContents>
      </ContentsBox>
      <ContentsBox>
        <ContentsTitle>
          <Tag>
            <StarBox>
              <Star />
            </StarBox>
            <ChildInfoLabel>카테고리</ChildInfoLabel>
          </Tag>
        </ContentsTitle>
        <CategoryContents>
          <Label
            color={category.includes(Category.TOP) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'25'}
            text="상의"
            width={'60'}
            onClick={() => {
              if (!category.includes(Category.TOP)) setCategory([...category, Category.TOP]);
              if (category.includes(Category.TOP)) setCategory(category.filter((v) => v !== Category.TOP));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.BOTTOM) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'25'}
            text="하의"
            width={'60'}
            onClick={() => {
              if (!category.includes(Category.BOTTOM)) setCategory([...category, Category.BOTTOM]);
              if (category.includes(Category.BOTTOM)) setCategory(category.filter((v) => v !== Category.BOTTOM));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.OUTER) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'25'}
            text="아우터"
            width={'60'}
            onClick={() => {
              if (!category.includes(Category.OUTER)) setCategory([...category, Category.OUTER]);
              if (category.includes(Category.OUTER)) setCategory(category.filter((v) => v !== Category.OUTER));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.ACCESSORY) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'25'}
            text="악세사리"
            width={'60'}
            onClick={() => {
              if (!category.includes(Category.ACCESSORY)) setCategory([...category, Category.ACCESSORY]);
              if (category.includes(Category.ACCESSORY)) setCategory(category.filter((v) => v !== Category.ACCESSORY));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.SHOES) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'25'}
            text="신발"
            width={'60'}
            onClick={() => {
              if (!category.includes(Category.SHOES)) setCategory([...category, Category.SHOES]);
              if (category.includes(Category.SHOES)) setCategory(category.filter((v) => v !== Category.SHOES));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.ETC) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'25'}
            text="기타"
            width={'60'}
            onClick={() => {
              if (!category.includes(Category.ETC)) setCategory([...category, Category.ETC]);
              if (category.includes(Category.ETC)) setCategory(category.filter((v) => v !== Category.ETC));
            }}
            center={true}
          />
        </CategoryContents>
      </ContentsBox>
      <ContentsBox>
        <ContentsTitle>
          <Tag>
            <StarBox>
              <Star />
            </StarBox>
            <ChildInfoLabel>대상</ChildInfoLabel>
          </Tag>
        </ContentsTitle>
        <CategoryContents>
          <Label
            color={target.includes(Target.BABY) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'25'}
            text="베이비"
            width={'60'}
            onClick={() => {
              if (!target.includes(Target.BABY)) setTarget([...target, Target.BABY]);
              if (target.includes(Target.BABY)) setTarget(target.filter((v) => v !== Target.BABY));
            }}
            center={true}
          />
          <Label
            color={target.includes(Target.BOY) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'25'}
            text="키즈(남)"
            width={'60'}
            onClick={() => {
              if (!target.includes(Target.BOY)) setTarget([...target, Target.BOY]);
              if (target.includes(Target.BOY)) setTarget(target.filter((v) => v !== Target.BOY));
            }}
            center={true}
          />
          <Label
            color={target.includes(Target.GIRL) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'25'}
            text="키즈(여)"
            width={'60'}
            onClick={() => {
              if (!target.includes(Target.GIRL)) setTarget([...target, Target.GIRL]);
              if (target.includes(Target.GIRL)) setTarget(target.filter((v) => v !== Target.GIRL));
            }}
            center={true}
          />
        </CategoryContents>
      </ContentsBox>
      <ContentsBox>
        <ContentsTitle>
          <Tag>
            <StarBox>
              <Star />
            </StarBox>
            <ChildInfoLabel>설명</ChildInfoLabel>
          </Tag>
        </ContentsTitle>
        <DescriptionBox placeholder="코디 설명, 구매 꿀팁 ex) 어떤 사이즈를 구매하셨나요?" />
      </ContentsBox>

      <Complate>
        <Label color={themeApp.colors.green[300]} height={'30'} text="등록" width={'60'} onClick={handlePostResell} center={true} bold={true} />
      </Complate>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ImagePickerBox = styled.div`
  margin-bottom: 20px;
`;

const ChildInfoLabel = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

const Tag = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;
const ContentsTitle = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;
const StarBox = styled.div`
  position: absolute;
  top: -15px;
  right: -8px;
`;
const CategoryContents = styled.div`
  display: flex;
  gap: 7px;
`;

const DescriptionBox = styled.textarea`
  width: 100%;
  height: 20vh;
  resize: none;
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  padding: 7px;
  font-size: 0.9rem;
  border-radius: 5px;
  outline-color: ${({ theme }) => theme.colors.yellow[3]};
`;

const Complate = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
