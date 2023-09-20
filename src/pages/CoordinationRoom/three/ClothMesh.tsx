import { useRecoilState } from 'recoil';
import { hoveredClothAtom, selectedClothAtom } from '../../../recolil/atom';
import { useEffect, useState } from 'react';

interface clothMeshProps {
  $clothId: string;
  $texture: any;
  $scale: [number, number];
  $position: [number, number, number];
  $target: any;
}

export const ClothMesh = ({ $clothId, $texture, $scale, $position, $target }: clothMeshProps) => {
  const [selectedCloth, setSelectedCloth] = useRecoilState(selectedClothAtom);
  const [hoveredCloth, setHoveredCloth] = useRecoilState(hoveredClothAtom);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [movePosition, setMovePosition] = useState<[number, number, number]>($position);
  const [dragOriginPosition, setDragOriginPosition] = useState<{
    x: number;
    y: number;
  }>({ x: $target.x, y: $target.y });

  const meshPointerDownHandler = (e: any) => {
    if (e.button === 0) {
      if (selectedCloth !== $clothId) {
        setSelectedCloth($clothId);
      } // 얘를 키면 마음대로 움직여서 오히려 불편
      e.stopPropagation();

      setDragActive(true);
    }
  };

  const meshPointerUpHandler = (e: any) => {
    if (e.button === 0 && selectedCloth === $clothId) {
      e.stopPropagation();
      setDragActive(false);
    }
  };

  const meshClickHandler = (e: any) => {
    e.stopPropagation();
    if (e.button === 0) {
      setSelectedCloth($clothId);
      setDragActive(false);
    }
  };

  const meshPointerEnterHandler = () => {
    setHoveredCloth($clothId);
  };

  const meshPointerLeaveHandler = () => {
    setHoveredCloth($clothId);
  };

  const DragTldFunc = () => {
    if ($target?.x && $target?.y) {
      let moveX = $target.x - dragOriginPosition.x;
      let moveY = $target.y - dragOriginPosition.y;

      setMovePosition([movePosition[0] + moveX, movePosition[1] + moveY, 0]);
      setDragOriginPosition({ x: $target.x, y: $target.y });
    }
  };

  useEffect(() => {
    setDragActive(false);
    return () => {
      setDragActive(false);
    };
  }, [$clothId]);

  useEffect(() => {
    if (dragActive && selectedCloth === $clothId) {
      console.log(dragActive, $target, dragOriginPosition);
      DragTldFunc();
    }
  }, [dragActive, $target]);

  return (
    <>
      <mesh
        position={movePosition}
        onPointerDown={meshPointerDownHandler}
        onPointerUp={meshPointerUpHandler}
        onClick={meshClickHandler}
        onPointerEnter={meshPointerEnterHandler}
        onPointerLeave={meshPointerLeaveHandler}
      >
        <planeGeometry args={$scale} />
        <meshBasicMaterial
          map={$texture} // 텍스처 할당
          transparent={true} // 투명 속성 활성화
          // opacity={selectedCloth === $clothId ? 0.8 : 1}
          color={selectedCloth === $clothId ? 'pink' : 'white'}
        />
      </mesh>
    </>
  );
};
//todo : 위 아래 설정
