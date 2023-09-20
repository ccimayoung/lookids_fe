import styled from 'styled-components';
import { ReactComponent as TrashSvg } from '../assets/svg/trash.svg';
import { ReactComponent as WearOnSvg } from '../assets/svg/wearOn.svg';
import { ReactComponent as WearOffSvg } from '../assets/svg/wearOff.svg';

export interface photoBoxProps {
  $boxSize?: string;
  $type?: string;
  $wear?: boolean;
}

export const PhotoBox = ({ $boxSize, $type, $wear }: photoBoxProps) => {
  return (
    <Wrapper $boxSize={$boxSize}>
      <GrayCircle>
        {$type === 'cloth' && $wear && <WearOnSvg />}
        {$type === 'cloth' && !$wear && <WearOffSvg />}
        {$type === 'cody' && <TrashSvg />}
      </GrayCircle>
    </Wrapper>
  );
};

const Wrapper = styled.div<photoBoxProps>`
  width: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  min-width: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  height: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  min-height: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  display: flex;
  border-radius: 10px;
  background-position: center;
  background-repeat: none;
  background-size: ${(props) => (props.$boxSize === 's' ? '100px' : '325px')};
  background-image: url('img/샘플옷.png');
  position: relative;
`;

export const GrayCircle = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid ${({ theme }) => theme.colors.neutral[1]};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: 50%;
  cursor: pointer;
`;
