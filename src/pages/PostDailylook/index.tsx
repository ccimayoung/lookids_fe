import React, { useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { ImagePicker } from '../../components/ImagePicker';
import { Label } from '../../components/Label';
import { ToggleButton } from '../../components/ToggleButton';
import { DeleteIcon, PlusIcon, Star } from '../../components/GlobalIcon';

export interface IPurchaseInfo {
  id: number;
  tag: string;
  brand: string;
  link: string;
  [key: string]: string | number;
}

export default function PostDailylook() {
  const themeApp = useTheme();
  const [category, setCategory] = useState<number[]>([]);
  const [seasons, setSeasons] = useState<number[]>([]);

  const [images, setImages] = useState<File[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [gender, setGender] = useState<string>('남');
  const [years, setYears] = useState<string>('9세');
  const [height, setHeight] = useState<string>('120cm');
  const [weight, setWeight] = useState<string>('31kg');
  const [tag, setTag] = useState<string | undefined>();
  const [purchaseInfoList, setPurchaseInfoList] = useState<IPurchaseInfo[]>([{ id: 1, brand: '', tag: '', link: '' }]);

  const addInputField = () => {
    // 새로운 입력 필드를 추가하려면 이전 상태를 복사한 후, 새 요소를 추가합니다.
    setPurchaseInfoList([...purchaseInfoList, { id: Date.now(), brand: '', tag: '', link: '' }]);
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
              onClick={() => {}}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
              value={years}
              height={'26'}
              text="9세"
              width={'55'}
              onClick={() => {}}
              center={false}
              onChange={(e) => setYears(e.target.value)}
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
              onClick={() => {}}
              center={false}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
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
              onClick={() => {}}
              center={false}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
            color={category.includes(0) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="상의"
            width={'55'}
            onClick={() => {
              if (!category.includes(0)) setCategory([...category, 0]);
              if (category.includes(0)) setCategory(category.filter((v) => v !== 0));
            }}
            center={true}
          />
          <Label
            color={category.includes(1) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="하의"
            width={'55'}
            onClick={() => {
              if (!category.includes(1)) setCategory([...category, 1]);
              if (category.includes(1)) setCategory(category.filter((v) => v !== 1));
            }}
            center={true}
          />
          <Label
            color={category.includes(2) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="아우터"
            width={'55'}
            onClick={() => {
              if (!category.includes(2)) setCategory([...category, 2]);
              if (category.includes(2)) setCategory(category.filter((v) => v !== 2));
            }}
            center={true}
          />
          <Label
            color={category.includes(3) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="악세사리"
            width={'55'}
            onClick={() => {
              if (!category.includes(3)) setCategory([...category, 3]);
              if (category.includes(3)) setCategory(category.filter((v) => v !== 3));
            }}
            center={true}
          />
          <Label
            color={category.includes(4) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="신발"
            width={'55'}
            onClick={() => {
              if (!category.includes(4)) setCategory([...category, 4]);
              if (category.includes(4)) setCategory(category.filter((v) => v !== 4));
            }}
            center={true}
          />
          <Label
            color={category.includes(5) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="기타"
            width={'55'}
            onClick={() => {
              if (!category.includes(5)) setCategory([...category, 5]);
              if (category.includes(5)) setCategory(category.filter((v) => v !== 5));
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
            color={seasons.includes(0) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="봄"
            width={'55'}
            onClick={() => {
              if (!seasons.includes(0)) setSeasons([...seasons, 0]);
              if (seasons.includes(0)) setSeasons(seasons.filter((v) => v !== 0));
            }}
            center={true}
          />
          <Label
            color={seasons.includes(1) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="여름"
            width={'55'}
            onClick={() => {
              if (!seasons.includes(1)) setSeasons([...seasons, 1]);
              if (seasons.includes(1)) setSeasons(seasons.filter((v) => v !== 1));
            }}
            center={true}
          />
          <Label
            color={seasons.includes(2) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="가을"
            width={'55'}
            onClick={() => {
              if (!seasons.includes(2)) setSeasons([...seasons, 2]);
              if (seasons.includes(2)) setSeasons(seasons.filter((v) => v !== 2));
            }}
            center={true}
          />
          <Label
            color={seasons.includes(3) ? themeApp.colors.yellow[2] : themeApp.colors.neutral[1]}
            height={'20'}
            text="겨울"
            width={'55'}
            onClick={() => {
              if (!seasons.includes(3)) setSeasons([...seasons, 3]);
              if (seasons.includes(3)) setSeasons(seasons.filter((v) => v !== 3));
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
                  value={v.tag}
                  onChange={(e) => {
                    handleInputChange(i, 'tag', e.target.value);
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
        <Label color={themeApp.colors.green[300]} height={'30'} text="글 등록" width={'60'} onClick={() => {}} center={true} bold={true} />
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
  padding: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ChildInfoTitle = styled.div`
  font-size: 15px;
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
  font-size: 12px;
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
  font-size: 12px;
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
