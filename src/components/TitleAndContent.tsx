import { useState } from 'react';
import styled from 'styled-components';
import { divProps } from './props';

interface titleAndContentProps {
  $title?: string;
  $titleWidth?: string;
  $writeAble?: boolean;
  $content?: string | number;
  $contentSize?: string;
  $placeHolder?: string;
  $unit?: string;
}

export const TitleAndContent = ({ $title, $titleWidth, $writeAble, $content, $contentSize, $placeHolder, $unit }: titleAndContentProps) => {
  const [newValue, setNewValue] = useState<any>($content);

  const inputHandler = (e: any) => {
    setNewValue(e.target.value);
  };

  return (
    <Wrap>
      <Title $titleWidth={$titleWidth}>{$title}</Title>
      {$writeAble ? (
        <ContentInput placeholder={$placeHolder} type={'text'} value={newValue ? newValue : ''} onChange={inputHandler} $contentSize={$contentSize} />
      ) : (
        <ContentBox placeholder={$placeHolder} $unit={$unit}>
          {$content}
        </ContentBox>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: pink; */
`;

const Title = styled.div<divProps>`
  display: flex;
  align-items: center;
  font-family: 'NSNB';
  font-size: 12px;
  width: ${(props) => (props.$titleWidth ? props.$titleWidth : '45px')};
`;

const ContentInput = styled.input<titleAndContentProps>`
  width: ${(props) => (props.$contentSize === 's' ? '60px' : '80px')};
  height: 26px;
  font-size: 12px;
  padding: 0 7px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.yellow[3]};
  border-radius: 5px;
  resize: none;
  outline: none;

  &::placeholder {
    font-size: 30px;
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.yellow[1]};
  }
`;

export const ContentBox = styled.div<titleAndContentProps>`
  width: ${(props) => (props.$contentSize === 's' ? '55px' : '80px')};
  padding: 0 7px;
  height: 26px;
  font-size: 12px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.yellow[3]};
`;
