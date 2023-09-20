import { ReactNode } from 'react';
import styled from 'styled-components';
import { CameraIcon, SearchIcon } from '../GlobalIcon';

interface ISearchBoxProps {
  onClick?: () => void;
  placeholder?: string;
  isSearch?: boolean;
  isCamera?: boolean;
}
interface IWarpProps {
  isclick: string;
}

const Component = ({ onClick, placeholder, isSearch = true, isCamera = true }: ISearchBoxProps) => {
  return (
    <IconWrapper onClick={onClick} isclick={onClick ? 'true' : 'false'}>
      {isSearch && (
        <LeftIconBox>
          <SearchIcon />
        </LeftIconBox>
      )}
      <SearchInput placeholder={placeholder} />
      {isCamera && (
        <RightIconBox>
          <CameraIcon />
        </RightIconBox>
      )}
    </IconWrapper>
  );
};

export default Component;

// Styling
const IconWrapper = styled.button<IWarpProps>`
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: 5px;
  width: 100%;
  font-size: 12px;
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 7px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
`;

const LeftIconBox = styled.div`
  margin-right: 5px;
`;
const TextBox = styled.div`
  width: 100%;
  display: flex;
`;
const RightIconBox = styled.div`
  margin-left: 5px;
`;
