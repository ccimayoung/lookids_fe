import styled from 'styled-components';

export interface MenuBtnProps {
  $size?: string;
  $content?: string;
  $active?: boolean;
  $setSelectedMenu?: any;
}

export const MenuBtn = ({ $size, $content, $active, $setSelectedMenu }: MenuBtnProps) => {
  return (
    <Wrapper $size={$size} $active={$active} onClick={() => $setSelectedMenu($content)}>
      {$content}
    </Wrapper>
  );
};

const Wrapper = styled.div<MenuBtnProps>`
  width: ${(props) => (props.$size === 's' ? '15%' : props.$size === 'm' ? '30%' : '40%')};
  height: ${(props) => (props.$size === 's' ? '26px' : props.$size === 'm' ? '26px' : '40px')};
  background-color: ${(props) => (props.$active ? props.theme.colors.yellow[4] : props.theme.colors.neutral[0])};
  border: ${(props) => (props.$active ? 'none' : `1px solid ${props.theme.colors.yellow[4]}`)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
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
`;
