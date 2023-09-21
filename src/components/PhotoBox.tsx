import styled from 'styled-components';
import { ReactComponent as TrashSvg } from '../assets/svg/trash.svg';
import { ReactComponent as WearOnSvg } from '../assets/svg/wearOn.svg';
import { ReactComponent as WearOffSvg } from '../assets/svg/wearOff.svg';
import { useRecoilState } from 'recoil';
import { wearArrayAtom, wearArrayProps } from '../recolil/atom';
import { useEffect, useState } from 'react';

export interface photoBoxProps {
  $boxSize?: string;
  $work?: string;
  $type?: string;
  $wear?: boolean;
  $img?: any;
  $clothId?: string;
  $codyId?: string;
  $size?: string;
  $color?: string;
}

export const PhotoBox = ({ $clothId, $boxSize, $type, $wear, $work, $img, $size, $color }: photoBoxProps) => {
  const [wearArray, setWearArray] = useRecoilState(wearArrayAtom);
  const [nowWear, setNowWear] = useState<boolean>(false);

  const getWearFunc = () => {
    if ($clothId && $img && $color && $size && $type) {
      let array: wearArrayProps[] = [];
      array = [...wearArray];
      let newArray: wearArrayProps[] = [];
      if (array.length > 0 && array.some((wear) => wear.clothId === $clothId)) {
        newArray = array.filter((wear) => wear.clothId !== $clothId);
      } else {
        newArray = [...array];
        newArray.push({ clothId: $clothId, position: [2, 2, 0], img: $img, scale: [2.5, 2], type: $type, size: $size, color: $color });
      } //todo : 상의면 위쪽 아니면 아래쪽
      setWearArray(newArray);
    }
  };

  const checkWearFunc = () => {
    if (wearArray.length > 0 && wearArray.some((wear) => wear.clothId === $clothId)) {
      setNowWear(true);
    } else {
      setNowWear(false);
    }
  };

  useEffect(() => {
    checkWearFunc();
  }, [wearArray]);

  return (
    <>
      {$wear ? (
        <WearWrapper $boxSize={$boxSize} onClick={() => getWearFunc()}>
          <PhotoImg src={$img} />
          <GrayCircle>
            {$work === 'cloth' && $wear && <WearOnSvg />}
            {$work === 'cloth' && !$wear && <WearOffSvg />}
          </GrayCircle>
          {nowWear && <WearingBox>착용중</WearingBox>}
        </WearWrapper>
      ) : (
        <NotWearWrapper $boxSize={$boxSize} style={{ backgroundImage: `url(${$img})` }}>
          <GrayCircle>{$type === 'cody' && <TrashSvg />}</GrayCircle>
        </NotWearWrapper>
      )}
    </>
  );
};

const WearWrapper = styled.div<photoBoxProps>`
  width: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  min-width: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  height: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  min-height: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  display: flex;
  background: linear-gradient(#f5f5f5, #9e9e9e);
  border-radius: 10px;
  justify-content: center;
  position: relative;
  padding: 5px;
`;

const NotWearWrapper = styled.div<photoBoxProps>`
  width: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  min-width: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  height: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  min-height: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  border-radius: 10px;
  justify-content: center;
  position: relative;
`;

const PhotoImg = styled.img`
  scale: 0.7;
  cursor: pointer;
`;

const GrayCircle = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid ${({ theme }) => theme.colors.neutral[1]};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`;

const WearingBox = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  z-index: 15;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral[0]};
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
`;
