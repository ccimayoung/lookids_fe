import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import removeBackground from '@imgly/background-removal';
import styled, { useTheme } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as ExplanationSvg } from '../assets/svg/상세썸네일.svg';
import { ReactComponent as YellowArrow } from '../assets/svg/yellowArrow.svg';
import { RowDiv } from '../pages/CoordinationRoom';
import { Cropper } from 'react-cropper';
import { MenuBtn } from './MenuBtn';

export const RemoveBackground = () => {
  const themeApp = useTheme();
  const [inputImage, setInputImage] = useState<any>(null);
  const [croppedOutputImage, setCroppedOutputImage] = useState<any>(null);
  const [bgOutputImage, setBgOutputImage] = useState<any>(null);
  const [finishImage, setFinishImage] = useState<any>(null);
  const imageInput = useRef<any>(null);
  const cropperRef = useRef<any>(null);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedOutputImage(cropper.getCroppedCanvas().toDataURL());
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];

    // 선택한 이미지 파일을 URL로 변환
    const imageUrl = URL.createObjectURL(file);
    setInputImage(imageUrl);
  };

  const handleRemoveImg = async (event: any) => {
    // URL 형태의 이미지를 처리하고 배경 제거
    try {
      const blob = await removeBackground(croppedOutputImage);
      const blobUrl = URL.createObjectURL(blob);

      // 결과 이미지를 state에 저장
      setBgOutputImage(blobUrl);
    } catch (error) {
      console.error('Error removing background:', error);
    }
  };

  const handleFinish = () => {
    setFinishImage(bgOutputImage);
  };

  const onCickImageUpload = () => {
    imageInput.current.click();
  };
  // onChange={handleImageUpload}
  return (
    <>
      <RowDiv $cGap="7px" style={{ justifyContent: 'left', alignItems: 'flex-start' }}>
        <ImageUploadButtonBox>
          <input type="file" accept="image/*" ref={imageInput} onChange={handleImageUpload} style={{ display: 'none' }} />
          <ImageUploadButton height="50px" onClick={onCickImageUpload}>
            <ExplanationSvg />
          </ImageUploadButton>
        </ImageUploadButtonBox>

        {finishImage ? (
          <FinishPhotoBox>
            <img src={finishImage} width={50} />
          </FinishPhotoBox>
        ) : (
          <ImgWrap>
            <RowDiv $cGap="7px">
              {inputImage && (
                <>
                  <BeforePhotoBox>
                    <Cropper src={inputImage} crop={onCrop} ref={cropperRef} scaleX={0.9} scaleY={0.9} />
                  </BeforePhotoBox>
                  <BeforePhotoBox style={{ backgroundColor: themeApp.colors.brown[2] }}>
                    <CropImage src={croppedOutputImage} />
                  </BeforePhotoBox>
                </>
              )}
            </RowDiv>
            {inputImage && (
              <>
                <ExplainP>옷에 딱 맞게 잘라주세요</ExplainP>
                <Btn onClick={handleRemoveImg}>배경제거</Btn>
              </>
            )}

            {bgOutputImage && (
              <>
                <YellowArrow className="arrow" />
                <AfterPhotoBox>
                  <img src={bgOutputImage} alt="crop" width={277} height={277} />
                </AfterPhotoBox>
                <Btn onClick={handleFinish}>완료</Btn>
              </>
            )}
          </ImgWrap>
        )}
      </RowDiv>
    </>
  );
};

const ImageUploadButton = styled.button<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  border: none;
  border-radius: 5px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BeforePhotoBox = styled.div`
  width: 135px;
  height: 135px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral[1]};
`;

const AfterPhotoBox = styled.div`
  width: 250px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.neutral[2]};
  margin-bottom: 10px;
`;

const FinishPhotoBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral[2]};
`;

const ImageUploadButtonBox = styled.div`
  width: 15%;
  display: flex;
`;

const CropImage = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
`;

const ImgWrap = styled.div`
  width: 277px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .arrow {
    margin: 10px 0;
    transform: rotate(90deg);
  }
`;

const ExplainP = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral[3]};
  font-family: 'NSNB';
`;

const Btn = styled.div`
  width: 30%;
  height: 26px;
  background-color: ${({ theme }) => theme.colors.yellow[4]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
`;
