import React, { useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { ImagePicker } from '../../components/ImagePicker';
import { Label } from '../../components/Label';
import { ToggleButton } from '../../components/ToggleButton';
import { DeleteIcon, PlusIcon, Star } from '../../components/GlobalIcon';
import { usePostDailylook } from '../../hooks/useDailyLook';
import { Category, Season } from '../../utils/statusFormatter/dailylookStatus';
import { useNavigate } from 'react-router-dom';
import { genderReverseFormatted } from '../../utils/statusFormatter/dailylookFormatter';

export interface IPurchaseInfo {
  description: string;
  brand: string;
  link: string;
  [key: string]: string;
}


export default function PostDailylook() {
  const themeApp = useTheme();

  const [category, setCategory] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);

  const [images, setImages] = useState<File[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [gender, setGender] = useState<string>();
  const [years, setYears] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [tag, setTag] = useState<string>();
  const [purchaseInfoList, setPurchaseInfoList] = useState<IPurchaseInfo[]>([{ brand: '', description: '', link: '' }]);
  const { mutateAsync: postDailylook } = usePostDailylook();

  const navigate = useNavigate();
  const addInputField = () => {
    // 새로운 입력 필드를 추가하려면 이전 상태를 복사한 후, 새 요소를 추가합니다.
    setPurchaseInfoList([...purchaseInfoList, { brand: '', description: '', link: '' }]);
  };
  const handlePostDailylook = async () => {
    const req = {
      'age': years || 0,
      'category': category[0],
      'description': '테스트입니다.',
      'hashTag': tag?.split('#').slice(1).map(v => '#' + v),
      'height': height || 0,
      'imageUrls': ['https://berrycloset.co.kr/web/product/big/202303/a5d5c4203bc553ea8049b80e444f9a89.jpg', 'https://berrycloset.co.kr/web/product/extra/big/202303/17c12b5746cb6c4d3aa80e67c8b24aa0.jpg', 'https://berrycloset.co.kr/web/product/extra/big/202303/181f2bf848ae248994130cb47afaaf5b.jpg'],
      'purchaseInfos': [
        ...purchaseInfoList.map((p) => {
          return {
            brand: p.brand,
            description: p.description,
            link: p.link
          };
        })
      ],
      'season': seasons[0],
      'sex': genderReverseFormatted(gender) || '',
      'userId': 0,
      'weight': weight || 0,
    };

    try {
      await postDailylook(req);
      navigate(-1);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message.toString());
      }
    }

  };
  const handleInputChange = (index: number, name: string, value: string) => {
    const updatedList = [...purchaseInfoList];
    updatedList[index][name] = value;
    setPurchaseInfoList(updatedList);
  };

  const removeInputField = (index: number) => {
    const updatedList = [...purchaseInfoList];
    updatedList.splice(index, 1);
    setPurchaseInfoList(updatedList);
  };
  return (
    <Container>
      <ImagePicker maxImages={5} images={images} setImages={setImages} />
      <ChildInfoContainer>
        <HeaderContainer>
          <ChildInfoTitle>내 아이 정보 사용</ChildInfoTitle>
          <ToggleButton isActive={isActive} setIsActive={setIsActive} />
        </HeaderContainer>
        <ChildInfoBox>
          <ChildInfo>
            <Tag>
              <StarBox>
                <Star />
              </StarBox>
              <ChildInfoLabel>성별</ChildInfoLabel>
            </Tag>
            <Label
              color={isActive ? themeApp.colors.neutral[1] : themeApp.colors.neutral[0]}
              disabled={isActive}
              height={'26'}
              text="남"
              width={'55'}
              placeholder='남'
              onClick={() => { }}
              value={gender}
              onChange={(e) => {
                console.log(e.target.value);
                setGender(e.target.value);
              }}
              center={false}
            />
          </ChildInfo>
          <ChildInfo>
            <Tag>
              <StarBox>
                <Star />
              </StarBox>
              <ChildInfoLabel>나이</ChildInfoLabel>
            </Tag>
            <Label
              color={isActive ? themeApp.colors.neutral[1] : themeApp.colors.neutral[0]}
              disabled={isActive}
              value={years?.toString()}
              height={'26'}
              text="9세"
              width={'55'}
              placeholder='9'
              onClick={() => { }}
              center={false}
              onChange={(e) => setYears(Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')))}
            />
          </ChildInfo>
        </ChildInfoBox>
        <ChildInfoBox>
          <ChildInfo>
            <Tag>
              <StarBox>
                <Star />
              </StarBox>
              <ChildInfoLabel>키</ChildInfoLabel>
            </Tag>
            <Label
              color={isActive ? themeApp.colors.neutral[1] : themeApp.colors.neutral[0]}
              disabled={isActive}
              height={'26'}
              text="120cm"
              width={'55'}
              placeholder='120'
              onClick={() => { }}
              center={false}
              value={height?.toString()}
              onChange={(e) => setHeight(Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')))}
            />
          </ChildInfo>
          <ChildInfo>
            <Tag>
              <StarBox>
                <Star />
              </StarBox>
              <ChildInfoLabel>몸무게</ChildInfoLabel>
            </Tag>
            <Label
              color={isActive ? themeApp.colors.neutral[1] : themeApp.colors.neutral[0]}
              disabled={isActive}
              height={'26'}
              text="31kg"
              width={'55'}
              placeholder='31'
              onClick={() => { }}
              center={false}
              value={weight?.toString()}
              onChange={(e) => setWeight(Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')))}
            />
          </ChildInfo>
        </ChildInfoBox>
      </ChildInfoContainer>
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
            height={'20'}
            text="상의"
            width={'55'}
            onClick={() => {
              if (!category.includes(Category.TOP)) setCategory([...category, Category.TOP]);
              if (category.includes(Category.TOP)) setCategory(category.filter((v) => v !== Category.TOP));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.BOTTOM) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="하의"
            width={'55'}
            onClick={() => {
              if (!category.includes(Category.BOTTOM)) setCategory([...category, Category.BOTTOM]);
              if (category.includes(Category.BOTTOM)) setCategory(category.filter((v) => v !== Category.BOTTOM));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.OUTER) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="아우터"
            width={'55'}
            onClick={() => {
              if (!category.includes(Category.OUTER)) setCategory([...category, Category.OUTER]);
              if (category.includes(Category.OUTER)) setCategory(category.filter((v) => v !== Category.OUTER));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.ACCESSORY) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="악세사리"
            width={'55'}
            onClick={() => {
              if (!category.includes(Category.ACCESSORY)) setCategory([...category, Category.ACCESSORY]);
              if (category.includes(Category.ACCESSORY)) setCategory(category.filter((v) => v !== Category.ACCESSORY));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.SHOES) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="신발"
            width={'55'}
            onClick={() => {
              if (!category.includes(Category.SHOES)) setCategory([...category, Category.SHOES]);
              if (category.includes(Category.SHOES)) setCategory(category.filter((v) => v !== Category.SHOES));
            }}
            center={true}
          />
          <Label
            color={category.includes(Category.ETC) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="기타"
            width={'55'}
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
            <ChildInfoLabel>계절</ChildInfoLabel>
          </Tag>
        </ContentsTitle>
        <CategoryContents>
          <Label
            color={seasons.includes(Season.SPRING) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="봄"
            width={'55'}
            onClick={() => {
              if (!seasons.includes(Season.SPRING)) setSeasons([...seasons, Season.SPRING]);
              if (seasons.includes(Season.SPRING)) setSeasons(seasons.filter((v) => v !== Season.SPRING));
            }}
            center={true}
          />
          <Label
            color={seasons.includes(Season.SUMMER) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="여름"
            width={'55'}
            onClick={() => {
              if (!seasons.includes(Season.SUMMER)) setSeasons([...seasons, Season.SUMMER]);
              if (seasons.includes(Season.SUMMER)) setSeasons(seasons.filter((v) => v !== Season.SUMMER));
            }}
            center={true}
          />
          <Label
            color={seasons.includes(Season.AUTUMN) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="가을"
            width={'55'}
            onClick={() => {
              if (!seasons.includes(Season.AUTUMN)) setSeasons([...seasons, Season.AUTUMN]);
              if (seasons.includes(Season.AUTUMN)) setSeasons(seasons.filter((v) => v !== Season.AUTUMN));
            }}
            center={true}
          />
          <Label
            color={seasons.includes(Season.WINTER) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="겨울"
            width={'55'}
            onClick={() => {
              if (!seasons.includes(Season.WINTER)) setSeasons([...seasons, Season.WINTER]);
              if (seasons.includes(Season.WINTER)) setSeasons(seasons.filter((v) => v !== Season.WINTER));
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
      <ContentsBox2>
        <ContentsTitle>
          <Tag>
            <ChildInfoLabel>구매정보</ChildInfoLabel>
          </Tag>
        </ContentsTitle>
        {purchaseInfoList.map((v, i) => {
          return (
            <CategoryContents key={i}>
              <CategoryInputContents>
                <Label
                  color={themeApp.colors.neutral[0]}
                  height={'26'}
                  width={'25%'}
                  placeholder={'설명'}
                  center={false}
                  value={v.description}
                  onChange={(e) => {
                    handleInputChange(i, 'description', e.target.value);
                  }}
                />
                <Label
                  color={themeApp.colors.neutral[0]}
                  height={'26'}
                  width={'25%'}
                  placeholder={'브랜드'}
                  center={false}
                  value={v.brand}
                  onChange={(e) => handleInputChange(i, 'brand', e.target.value)}
                />
                <Label
                  color={themeApp.colors.neutral[0]}
                  height={'26'}
                  width={'45%'}
                  placeholder={'구매링크'}
                  center={false}
                  value={v.link}
                  onChange={(e) => handleInputChange(i, 'link', e.target.value)}
                />
              </CategoryInputContents>
              <IconButton onClick={() => removeInputField(i)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={addInputField}>
                <PlusIcon />
              </IconButton>
            </CategoryContents>
          );
        })}
      </ContentsBox2>
      <ContentsBox>
        <ContentsTitle>
          <Tag>
            <ChildInfoLabel>태그</ChildInfoLabel>
          </Tag>
        </ContentsTitle>
        <CategoryContents>
          <Label
            color={themeApp.colors.neutral[0]}
            height={'26'}
            width={'100%'}
            placeholder={'추가하고싶은 정보를 입력해주세요.'}
            center={false}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </CategoryContents>
      </ContentsBox>
      <Complate>
        <Label color={themeApp.colors.green[300]} height={'30'} text="글 등록" width={'60'} onClick={handlePostDailylook} center={true} bold={true} />
      </Complate>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ChildInfoContainer = styled.div`
display: flex;
flex-direction: column;
  padding: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  gap:10px;
`;

const ChildInfoTitle = styled.div`
  font-size: 1rem;
  display: flex;
`;
const ChildInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;
const ChildInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
`;

const HeaderContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: flex-end;
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
  margin-bottom: 20px;
`;
const ContentsBox2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
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
const CategoryInputContents = styled.div`
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

const IconButton = styled.button`
  border: none;
  background-color: white;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;
const Complate = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
