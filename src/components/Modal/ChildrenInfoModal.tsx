import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import QuitSvg from '../../assets/svg/quit.svg';
import { ReactComponent as PhotoUploadSvg } from '../../assets/svg/photoUpload.svg';
import {
  childrenInfoAtom,
  modalGatherAtom,
  wantKidRefreshAtom,
} from '../../recolil/atom';
import { ReactComponent as YellowArrow } from '../../assets/svg/yellowArrow.svg';
import { ReactComponent as PlusSvg } from '../../assets/svg/plus.svg';
import { ReactComponent as MinusSvg } from '../../assets/svg/minus.svg';
import { ModalBtn } from './SimplePopup';
import { TitleAndContent } from '../TitleAndContent';
import { TitleAndSelectBox } from '../TitleAndSelectBox';
import { RowDiv } from '../../pages/CoordinationRoom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { ImageUploadButton } from '../ImagePicker/component';
import fileToBlob from '../../utils/FiltetoBlob';
import { postKidInfoApi } from '../../apis/closet';
import { useMutation } from '@tanstack/react-query';

export const ChildrenInfoModal = () => {
  const [modalGather, setModalGather] = useRecoilState(modalGatherAtom);
  const firstRef = useRef<any>(null);
  const secondRef = useRef<any>(null);
  const [childrenInfo, setChildrenInfo] = useRecoilState(childrenInfoAtom);
  const cropperRef = useRef<any>(null);
  // 유저가 첨부한 이미지
  const [inputImage, setInputImage] = useState<any>(null);
  // 유저가 선택한 영역만큼 크롭된 이미지
  const [croppedImage, setCroppedImage] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [wantKidRefresh, setWantKidRefresh] =
    useRecoilState(wantKidRefreshAtom);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  const [images, setImages] = useState<any[]>([]);
  const canvasRef = useRef<any>(null);
  const [faceScale, setFaceScale] = useState<number>(0.5);

  const handleImageUpload = () => {
    const acceptedFiles = [croppedImage, 'img/여샘플.png'];
    console.log(acceptedFiles);
    // 이미지를 업로드하고 images 상태에 추가
    setImages([...images, ...acceptedFiles]);
  };

  const [baseImg, setBaseImg] = useState<any>(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const imageInput = useRef<any>(null);
  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const mergeImages = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Public 폴더에서 가져온 이미지 그리기 (원형으로 클리핑하지 않음)
    const publicImg = new Image();
    publicImg.src =
      childrenInfo.gender === '여' ? 'img/여샘플.png' : 'img/남샘플.png';

    publicImg.onload = () => {
      // Public 이미지를 그림 (원형 클리핑 밖에 그림)
      ctx.drawImage(publicImg, 0, 0, canvas.width, canvas.height);

      // Base64로 제공되는 이미지 그리기 (원형으로 클리핑)
      const base64Img = new Image();
      setBaseImg(base64Img);
      base64Img.src = images[0];

      // Base64 이미지의 onload 이벤트 핸들러 설정
      base64Img.onload = () => {
        // 원형 클리핑하기 위한 경로 생성
        ctx.beginPath();
        // ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);

        childrenInfo.gender === '여'
          ? ctx.ellipse(93, 45, 30, 26, 0, 0, Math.PI * 2)
          : ctx.ellipse(95, 45, 23, 26, 0, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Base64 이미지를 원형 클리핑된 상태로 그림
        ctx.drawImage(
          base64Img,
          offset.x,
          offset.y,
          base64Img.width * faceScale,
          base64Img.height * faceScale,
        );

        // 클리핑 해제
        ctx.restore();
      };
    };
  };

  const move = (base64Img: any) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Public 폴더에서 가져온 이미지 그리기
    const publicImg = new Image();
    publicImg.src =
      childrenInfo.gender === '여' ? 'img/여샘플.png' : 'img/남샘플.png';
    // ctx.drawImage(publicImg, childrenInfo.gender === '여' ? 40 : 40, 3, publicImg.width / 2.5, publicImg.height / 2.5);

    // 원형 클리핑하기 위한 경로 생성
    ctx.beginPath();
    // ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
    childrenInfo.gender === '여'
      ? ctx.ellipse(93, 45, 30, 26, 0, 0, Math.PI * 2)
      : ctx.ellipse(95, 45, 23, 26, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Base64 이미지를 원형 클리핑된 상태로 그림
    ctx.drawImage(
      base64Img,
      offset.x,
      offset.y,
      base64Img.width * faceScale,
      base64Img.height * faceScale,
    );

    // 클리핑 해제
    ctx.restore();
  };

  const handleMouseDown = (e: any) => {
    setDragging(true);
    setPosition({ x: e.clientX - 45, y: e.clientY });
  };

  const handleMouseMove = (e: any) => {
    if (dragging) {
      setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
      move(baseImg);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const getInfoFunc = () => {
    setChildrenInfo({
      img: null,
      gender: firstRef.current.children[0].children[1].innerText,
      age: firstRef.current.children[1].children[1].defaultValue,
      height: secondRef.current.children[0].children[1].defaultValue,
      weight: secondRef.current.children[1].children[1].defaultValue,
    });
    setTimeout(() => {
      setPage(2);
      handleImageUpload();
    }, 100);
  };

  function b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
    const image_data = atob(b64Data.split(',')[1]); // data:image/gif;base64 필요없으니 떼주고, base64 인코딩을 풀어준다
    const arraybuffer = new ArrayBuffer(image_data.length);
    const view = new Uint8Array(arraybuffer);
    for (let i = 0; i < image_data.length; i++) {
      view[i] = image_data.charCodeAt(i) & 0xff;
      // charCodeAt() 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환
      // 비트연산자 & 와 0xff(255) 값은 숫자를 양수로 표현하기 위한 설정
    }
    return new Blob([arraybuffer], { type: contentType });
  }

  // const finishFunc = () => {
  //   setTimeout(() => {
  //     const canvas = canvasRef.current;
  //     const dataURL = canvas.toDataURL('image/png');
  //     const a = document.createElement('a');
  //     a.href = dataURL;
  //     a.download = 'merged_image.png';
  //     a.click();
  //     setModalGather({
  //       ...modalGather,
  //       closetBody: false,
  //     });
  //   }, 100);
  // };

  const CreateKidInfoCumm = useMutation(
    (params: FormData) => postKidInfoApi(params),
    {
      onSuccess: (res: any) => {},
      onError: (err: any) => {},
    },
  );

  const CreateKidInfo = async () => {
    const formData = new FormData();
    try {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      const contentType = 'image/png';
      const blob = b64toBlob(dataURL, contentType); // base64 -> blob
      formData.append('img', blob);
    } catch (error) {
      console.error('변환 중 오류 발생:', error);
    }
    const req = {
      age: childrenInfo.age,
      sex: childrenInfo.gender === '남' ? 'BOY' : 'GIRL',
      height: childrenInfo.height,
      weight: childrenInfo.weight,
    };
    const json = JSON.stringify(req);
    formData.append('req', json);
    try {
      await CreateKidInfoCumm.mutate(formData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message.toString());
      }
    }
    setWantKidRefresh(true);
    setTimeout(() => {
      setModalGather({
        ...modalGather,
        closetBody: false,
      });
    }, 100);
  };

  useEffect(() => {
    if (baseImg && faceScale) {
      move(baseImg);
    }
  }, [faceScale]);

  useEffect(() => {
    if (images.length > 1) {
      mergeImages();
    }
  }, [images]);

  useEffect(() => {
    setInputImage(null);
    setImages([]);
    setCroppedImage(null);
    setBaseImg(null);
    setPage(1);
    return () => {
      setInputImage(null);
      setImages([]);
      setCroppedImage(null);
      setBaseImg(null);
      setPage(1);
    };
  }, [modalGather.closetBody]);

  return (
    <>
      {modalGather.closetBody && (
        <Wrap>
          <ModalBox>
            <QuitImg
              src={QuitSvg}
              onClick={() => {
                setModalGather({
                  ...modalGather,
                  closetBody: false,
                });
              }}
            />

            {page === 1 ? (
              <>
                <RowDiv $cGap="15px" style={{ marginTop: '10px' }}>
                  {inputImage ? (
                    <PhotoBox>
                      <Cropper
                        src={inputImage}
                        crop={onCrop}
                        ref={cropperRef}
                        width="100px"
                        height={'100px'}
                      />
                    </PhotoBox>
                  ) : (
                    <PhotoBox>
                      <ImageUploadButton
                        height="50px"
                        onClick={onCickImageUpload}
                      >
                        <PhotoUploadSvg />
                      </ImageUploadButton>
                      <input
                        type="file"
                        accept="image/*"
                        ref={imageInput}
                        style={{ display: 'none' }}
                        onChange={(e: any) =>
                          setInputImage(URL.createObjectURL(e.target.files[0]))
                        }
                      />
                    </PhotoBox>
                  )}
                  <YellowArrow />
                  <PhotoBox>
                    <CropImage src={croppedImage} />
                  </PhotoBox>
                </RowDiv>
                <RowDiv $cGap="10px" ref={firstRef}>
                  <TitleAndSelectBox
                    $title="성별"
                    $titleWidth="35px"
                    $content={childrenInfo.gender}
                    $list={['남', '여']}
                    $contentSize="s"
                  />
                  <TitleAndContent
                    $writeAble={true}
                    $title="나이"
                    $content={childrenInfo.age}
                    $contentSize="s"
                  />
                </RowDiv>
                <RowDiv
                  $cGap="10px"
                  style={{ marginTop: '10px' }}
                  ref={secondRef}
                >
                  <TitleAndContent
                    $writeAble={true}
                    $title="키"
                    $titleWidth="35px"
                    $content={childrenInfo.height}
                    $contentSize="s"
                    $unit="cm"
                  />
                  <TitleAndContent
                    $writeAble={true}
                    $title="몸무게"
                    $content={childrenInfo.weight}
                    $contentSize="s"
                  />
                </RowDiv>
                <ModalBtn onClick={getInfoFunc}>모델 생성</ModalBtn>
              </>
            ) : (
              <>
                <canvas
                  ref={canvasRef}
                  width={180} // 캔버스 크기를 조절하세요
                  height={400}
                  style={{ border: '1px solid black' }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                />
                <RowDiv
                  $cGap="5px"
                  style={{ width: '170px', marginTop: '15px' }}
                >
                  얼굴 크기 조절
                  <GrayCircle onClick={() => setFaceScale(faceScale * 1.1)}>
                    <PlusSvg />
                  </GrayCircle>
                  <GrayCircle onClick={() => setFaceScale(faceScale * 0.9)}>
                    <MinusSvg />
                  </GrayCircle>
                </RowDiv>
                <RowDiv
                  $cGap="20px"
                  style={{ width: '180px', marginTop: '-15px' }}
                >
                  <ModalBtn
                    style={{ width: '80px' }}
                    className="secondBtn"
                    onClick={() => {
                      setPage(1);
                    }}
                  >
                    이전
                  </ModalBtn>
                  <ModalBtn
                    style={{ width: '80px' }}
                    className="secondBtn"
                    onClick={CreateKidInfo}
                  >
                    저장
                  </ModalBtn>
                </RowDiv>
              </>
            )}
          </ModalBox>
        </Wrap>
      )}
    </>
  );
};
const Wrap = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  min-height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;

  .secondBtn {
    width: 100px;
  }
`;

const ModalBox = styled.div`
  position: relative;
  width: 300px;
  height: 520px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border: 2px solid ${({ theme }) => theme.colors.yellow[3]};
  z-index: 40;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 25px;
  flex-direction: column;
`;

export const QuitImg = styled.img`
  width: 24px;
  height: 24px;
  top: 10px;
  right: 10px;
  position: absolute;
  cursor: pointer;
  z-index: 30;
`;

const PhotoBox = styled.div`
  margin: 15px auto 25px auto;
  overflow: hidden;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral[1]};
  cursor: pointer;
`;

const CropImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const GrayCircle = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid ${({ theme }) => theme.colors.neutral[2]};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`;
