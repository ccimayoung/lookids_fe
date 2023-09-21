import React, { useState, useCallback, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from 'styled-components';
import { CameraIcon } from '../GlobalIcon';

interface ImagePickerProps {
  maxImages: number;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}

const Component: React.FC<ImagePickerProps> = ({ maxImages, images, setImages }) => {
  const [imageHeight, setImageHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 컴포넌트가 마운트된 후에 요소의 너비를 가져옵니다.
    const element = elementRef.current;
    const handleResize = () => {
      if (element) {
        const width = element.offsetWidth;
        console.log(width);
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
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // 이미지가 선택되었을 때 실행됩니다.
      // 최대 이미지 개수를 초과하는 경우 경고를 표시합니다.
      if (acceptedFiles.length + images.length > maxImages) {
        alert(`최대 ${maxImages}개까지 이미지를 선택할 수 있습니다.`);
      } else {
        setImages([...images, ...acceptedFiles]);
      }
    },
    [images, maxImages],
  );
  const handleDeleteImage = (image: File) => {
    setImages(
      images.filter((v) => {
        return v !== image;
      }),
    );
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <Container>
      <ImageUploadButtonBox {...getRootProps()} ref={elementRef}>
        <input {...getInputProps()} accept="image/*" />
        <UploadImageContainer>
          <ImageUploadButton height={`${imageHeight}px`}>
            <CameraIcon />
            <Count>{images?.length} / 5</Count>
          </ImageUploadButton>
        </UploadImageContainer>
      </ImageUploadButtonBox>
      {images.map((image, index) => (
        <ImageUploadView key={index} height={`${imageHeight}px`} onClick={() => handleDeleteImage(image)}>
          <UploadImage src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
        </ImageUploadView>
      ))}
    </Container>
  );
};

export default Component;

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
const ImageUploadView = styled.button<{ height: string }>`
  width: 15%;
  height: ${({ height }) => height};
  padding: 0;
  overflow: hidden;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ImageUploadButtonBox = styled.div`
  width: 15%;
  display: flex;
`;
const Container = styled.div`
  display: flex;
  gap: 3%;
`;

const Count = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.neutral[3]};
`;
const UploadImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const UploadImageContainer = styled.div`
  display: flex;
  width: 100%;
`;
