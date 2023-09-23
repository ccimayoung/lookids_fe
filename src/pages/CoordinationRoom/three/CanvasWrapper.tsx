import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Canvas, useLoader } from '@react-three/fiber';
import { ClothMesh } from './ClothMesh';
import { PersonMesh } from './PersonMesh';
import { childrenInfoAtom, getCaptureAtom, selectedClothAtom, selectedCodyAtom, showPhotoAtom, wearArrayAtom } from '../../../recolil/atom';
import dumCodyJson from '../../../data/dum_cody.json';
import html2canvas from 'html2canvas';

export const CanvasWrapper = () => {
  const themeApp = useTheme();
  const [selectedCloth, setSelectedCloth] = useRecoilState(selectedClothAtom);
  const [childrenInfo, setChildrenInfo] = useRecoilState(childrenInfoAtom);
  const [codyJsonList, setCodyJsonList] = useState<any>(dumCodyJson);
  const [selectedCody, setSelectedCody] = useRecoilState(selectedCodyAtom);
  const [getCapture, setGetCapture] = useRecoilState(getCaptureAtom);

  const getTexture = (img: any) => {
    const texture: any = useLoader(THREE.TextureLoader, img);
    return texture;
  };

  const girlTexture = useLoader(THREE.TextureLoader, 'img/여샘플.png');
  const boyTexture = useLoader(THREE.TextureLoader, 'img/남샘플.png');
  const [target, setTarget] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const [wearArray, setWearArray] = useRecoilState(wearArrayAtom);
  const [bodyTexture, setBodyTexture] = useState<any>(girlTexture);
  const [bodyScale, setBodyScale] = useState<[number, number]>([2.1, 7]);
  const canvasRef = React.useRef<any>(null);
  const [showPhoto, setShowPhoto] = useRecoilState(showPhotoAtom);

  const pointerMove = (e: any) => {
    if (e.camera && e.intersections[0]) {
      setTarget(e.intersections[0].point);
      // console.log(target);
    }
  };

  const pointerMissed = () => {
    setSelectedCloth('');
  };

  useEffect(() => {
    if (childrenInfo.gender === '여') {
      setBodyScale([(childrenInfo.weight / 24) * 2.1, (childrenInfo.height / 130) * 7]);
      if (childrenInfo.img?.name !== '') {
        console.log(childrenInfo.img);
        // const fileTexture = useLoader(THREE.TextureLoader, childrenInfo.img);
        // setBodyTexture(fileTexture);
      } else setBodyTexture(girlTexture);
    } else {
      setBodyScale([(childrenInfo.weight / 24) * 2.1, (childrenInfo.height / 130) * 7]);
      if (childrenInfo.img?.name !== '') {
        // const fileTexture = useLoader(THREE.TextureLoader, childrenInfo.img);
        // setBodyTexture(fileTexture);
      } else setBodyTexture(boyTexture);
    }
  }, [childrenInfo]);

  // useEffect(() => {
  //   if (selectedCody !== '' && codyJsonList) {
  //     codyJsonList.list.forEach((val: any) => {
  //       if (val.codyId === selectedCody) {
  //         setWearArray(val.cody);
  //         setChildrenInfo({ img: null, gender: val.gender, age: val.age, height: val.height, weight: val.weight });
  //       }
  //     });
  //   }
  // }, [codyJsonList, selectedCody]);

  const handleCapture = () => {
    if (canvasRef.current) {
      // Canvas 컴포넌트의 렌더링이 완료된 후에 스크린샷을 찍도록 비동기로 처리
      setTimeout(() => {
        const canvasToCapture = canvasRef.current;

        // Canvas 컴포넌트를 html2canvas를 사용하여 스크린샷으로 변환
        html2canvas(canvasToCapture, {
          useCORS: true, // CORS 이슈가 있는 경우 true로 설정
        }).then((canvas) => {
          // 스크린샷을 이미지로 변환
          const imageDataURL = canvas.toDataURL('image/png');
          const newArray = [...showPhoto];
          newArray.push(imageDataURL);
          setShowPhoto(newArray);
          setGetCapture(false);
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (getCapture) {
      // 캡처 버튼을 클릭할 때 실행되는 함수
      handleCapture();
    }
  }, [getCapture]);

  return (
    <Wrapper>
      <Canvas
        className="MyCanvas"
        style={{
          width: '100%',
          height: '100%',
        }}
        shadows
        ref={canvasRef}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight color={themeApp.colors.neutral[0]} intensity={0} />
        <OrbitControls enableRotate={false} enableDamping={false} minDistance={1} maxDistance={10} zoomSpeed={2} maxPolarAngle={Math.PI} />
        <mesh onPointerMove={pointerMove} onClick={() => setSelectedCloth('')}>
          <planeGeometry args={[12, 10]} />
          <meshBasicMaterial color={'#a7866a'} depthWrite={false} depthTest={false} />
          <mesh onPointerMissed={pointerMissed}>
            <PersonMesh $texture={bodyTexture} $scale={bodyScale} />
            {wearArray.map((wear) => {
              return (
                <ClothMesh
                  key={wear.clothId}
                  $clothId={wear.clothId}
                  $texture={getTexture(wear.img)}
                  $scale={wear.scale}
                  $target={target}
                  $position={wear.position}
                />
              );
            })}
          </mesh>
        </mesh>

        {/* <Plane onPointerMove={pointerMove} onClick={() => setSelectedCloth('')}>
          <mesh onPointerMissed={pointerMissed}>
            <PersonMesh $texture={bodyTexture} $scale={bodyScale} />
            {wearArray.map((wear) => {
              return (
                <ClothMesh
                  key={wear.clothId}
                  $clothId={wear.clothId}
                  $texture={getTexture(wear.img)}
                  $scale={wear.scale}
                  $target={target}
                  $position={wear.position}
                />
              );
            })}
          </mesh>
        </Plane> */}
      </Canvas>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  /* position: absolute; */
  /* z-index: 5; */
  width: calc(100% - 110px);
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* top: 60px; */
  /* left: 240px; */
  background-color: #4d321b;
  border-radius: 10px;
  overflow: hidden;
`;

//todo : 스냅샷찍기, 얼굴저장, 장바구니, 설명만들기
