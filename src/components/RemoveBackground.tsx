import React, { useState } from 'react';
import removeBackground from '@imgly/background-removal';

export const RemoveBackground = () => {
  const [inputImage, setInputImage] = useState<any>(null);
  const [outputImage, setOutputImage] = useState<any>(null);

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];

    // 선택한 이미지 파일을 URL로 변환
    const imageUrl = URL.createObjectURL(file);

    // URL 형태의 이미지를 처리하고 배경 제거
    try {
      const blob = await removeBackground(imageUrl);
      const blobUrl = URL.createObjectURL(blob);

      // 결과 이미지를 state에 저장
      setOutputImage(blobUrl);

      // 원본 이미지도 state에 저장
      setInputImage(imageUrl);
    } catch (error) {
      console.error('Error removing background:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {inputImage && (
        <div>
          <img src={inputImage} alt="Input" width={100} />
        </div>
      )}
      {outputImage && (
        <div>
          <img src={outputImage} alt="Output" width={100} />
        </div>
      )}
    </div>
  );
};
