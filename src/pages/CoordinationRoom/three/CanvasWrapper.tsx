import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { OrbitControls, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Canvas, useLoader } from '@react-three/fiber';
import { ClothMesh } from './ClothMesh';
import { PersonMesh } from './PersonMesh';
import { selectedClothAtom } from '../../../recolil/atom';

export const CanvasWrapper = () => {
  const themeApp = useTheme();
  const [selectedCloth, setSelectedCloth] = useRecoilState(selectedClothAtom);
  const texture = useLoader(THREE.TextureLoader, 'img/여샘플.png');
  const topTexture = useLoader(THREE.TextureLoader, 'img/top1.png');
  const top2Texture = useLoader(THREE.TextureLoader, 'img/top2.png');
  const skirtTexture = useLoader(THREE.TextureLoader, 'img/skirt1.png');
  const [target, setTarget] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  const pointerMove = (e: any) => {
    if (e.camera && e.intersections[0]) {
      setTarget(e.intersections[0].point);
      // console.log(target);
    }
  };

  const pointerMissed = () => {
    setSelectedCloth('');
  };

  return (
    <Wrapper>
      <Suspense fallback={<div>로딩중</div>}>
        <Canvas
          className="MyCanvas"
          style={{
            width: '100%',
            height: '100%',
            // backgroundColor: '#cccccc',
          }}
          shadows
        >
          <ambientLight color={themeApp.colors.neutral[0]} intensity={0} />

          <OrbitControls enableRotate={false} enableDamping={false} minDistance={1} maxDistance={10} zoomSpeed={2} maxPolarAngle={Math.PI} />

          <Plane onPointerMove={pointerMove} onClick={() => setSelectedCloth('')}>
            <mesh onPointerMissed={pointerMissed}>
              <PersonMesh $texture={texture} $scale={[2.5, 7]} />
              {/* <ClothMesh $clothId={'top2'} $texture={top2Texture} $scale={[3, 2.5]} $target={target} $position={[0.05, 1, 0.1]} /> */}
              <ClothMesh $clothId={'top1'} $texture={topTexture} $scale={[3.5, 2]} $target={target} $position={[0, 0, 0]} />
              <ClothMesh $clothId={'sk2'} $texture={skirtTexture} $scale={[2.6, 2]} $target={target} $position={[0, 0, 0]} />
            </mesh>
          </Plane>
        </Canvas>
      </Suspense>
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
  background-color: rgba(167, 134, 106, 1);
  border-radius: 10px;
`;
