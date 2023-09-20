import React, { useEffect, useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { DropdownArrow } from '../GlobalIcon';

export interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  options: Option[];
  select: Option | null;
  onSelect: (option: Option | null) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allClose: () => void;
}

const Component = ({
  options,
  select,
  onSelect,
  isOpen,
  setIsOpen,
  allClose,
}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(select);
  const themeApp = useTheme();

  const toggleDropdown = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    allClose();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <DropdownContainer>
      <Label
        className={`dropdown-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption.label : '선택하세요'}
        <DropdownArrow color={themeApp.colors.yellow[3]} />
      </Label>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <SelectListText
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </SelectListText>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Component;

const Label = styled.div`
  font-size: 11px;
  white-space: nowrap;
  width: 100%;
  padding: 4px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  border-radius: 3px;
`;
const DropdownContainer = styled.div`
  background-color: transparent;
  width: 50%;
  position: relative;
`;
const DropdownList = styled.ul`
  position: absolute;
  z-index: 1;
  width: 100%;
  list-style: none;
  margin: 0;
  margin-top: 2px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  gap: 3px;
  background-color: ${({ theme }) => theme.colors.yellow[2]};
`;
const SelectListText = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 11px;
  cursor: pointer;
`;
