import styled from 'styled-components';
import { CameraIcon, SearchIcon } from '../GlobalIcon';
import { useNavigate } from 'react-router-dom';
import { DropzoneRootProps } from 'react-dropzone';
import { ChangeEvent } from 'react';

interface ISearchBoxProps {
  onClick?: () => void;
  placeholder?: string;
  isSearch?: boolean;
  isCamera?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
interface IWarpProps {
  $isclick: string;
}

const Component = ({ onClick, placeholder, isSearch = true, isCamera = true, disabled = false, onChange }: ISearchBoxProps) => {
  const navigate = useNavigate();
  return (
    <IconWrapper onClick={onClick} $isclick={onClick ? 'true' : 'false'}>
      {isSearch && (
        <LeftIconBox>
          <SearchIcon />
        </LeftIconBox>
      )}
      <SearchInput placeholder={placeholder} disabled={disabled} onChange={onChange} />
      {isCamera && (
        <RightIconBox
          onClick={(e) => {
            if (!disabled) {
              e.stopPropagation();
              navigate('photo-engine');
            }
          }}
        >
          <CameraIcon />
        </RightIconBox>
      )}
    </IconWrapper>
  );
};

export default Component;

// Styling
const IconWrapper = styled.div<IWarpProps>`
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: 5px;
  width: 100%;
  font-size: 0.9rem;
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 7px;
`;
const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const SearchInput = styled.input`
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  cursor: ${({ disabled }) => (disabled ? 'pointer' : 'auto')};
`;

const LeftIconBox = styled.div`
  margin-right: 5px;
`;
const RightIconBox = styled.div`
  border: none;
  background-color: white;
  margin: 0;
  cursor: pointer;
  padding: 0;
  margin-left: 5px;
`;
