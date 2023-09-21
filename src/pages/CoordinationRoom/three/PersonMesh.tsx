interface personMeshProps {
  $texture: any;
  $scale: [number, number];
}

export const PersonMesh = ({ $texture, $scale }: personMeshProps) => {
  return (
    <>
      <mesh raycast={() => null}>
        <planeGeometry args={$scale} />
        <meshBasicMaterial
          map={$texture} // 텍스처 할당
          transparent={true} // 투명 속성 활성화
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </>
  );
};
