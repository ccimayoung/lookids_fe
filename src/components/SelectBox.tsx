import { useEffect, useRef, useState } from 'react';
import { ReactComponent as DownToggleSvg } from '../assets/svg/downToggle.svg';
import styled from 'styled-components';
import { divProps, titleAndSelectBoxProps } from './props';

export const SelectBox = ({ $content, $list, $contentSize }: titleAndSelectBoxProps) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | number | null>($content);
  const insideRef = useRef<any>();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (insideRef.current && !insideRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [insideRef]);

  return (
    <SelectWrap
      ref={insideRef}
      $contentSize={$contentSize}
      onClick={() => {
        setDropdown(!dropdown);
      }}
    >
      {selected}
      {$list.length > 0 && (
        <DownToggleSvg
          className="propertyDownToggle"
          style={{
            transform: dropdown ? 'rotate(180deg)' : '',
          }}
        />
      )}
      {dropdown && $list.length > 0 && (
        <PropertySelectBox>
          {$list.map((data, index) => {
            return (
              <DropdownContent
                key={index}
                onClick={() => {
                  setSelected(data);
                }}
              >
                {data}
              </DropdownContent>
            );
          })}
        </PropertySelectBox>
      )}
    </SelectWrap>
  );
};

export const SelectWrap = styled.div<divProps>`
  width: ${(props) => (props.$contentSize === 's' ? '60px' : props.$contentSize === 'm' ? '80px' : '110px')};
  padding: 0 20px 0 7px;
  border: 1px solid ${({ theme }) => theme.colors.yellow[3]};
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  .propertyDownToggle {
    position: absolute;
    right: 7px;
    top: 7px;
  }
`;

export const PropertySelectBox = styled.div`
  width: 100%;
  padding: 7px;
  background-color: ${({ theme }) => theme.colors.yellow[1]};
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  position: absolute;
  top: 27px;
  left: 0px;
  border-radius: 5px;
  z-index: 20;
  max-height: 300px;
`;

export const DropdownContent = styled.div`
  width: 100%;
  height: 16px;
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
