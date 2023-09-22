import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { divProps, titleAndSelectBoxProps } from './props';
import { SelectBox } from './SelectBox';

export const TitleAndSelectBox = ({ $title, $titleWidth, $content, $list, $contentSize }: titleAndSelectBoxProps) => {
  return (
    <Wrap>
      <Title $titleWidth={$titleWidth}>{$title}</Title>
      <SelectBox $contentSize={$contentSize} $content={$content} $list={$list} />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: pink; */
  height: 26px;
`;

const Title = styled.div<divProps>`
  display: flex;
  align-items: center;
  font-family: 'NSNB';
  font-size: 0.9rem;
  width: ${(props) => (props.$titleWidth ? props.$titleWidth : '45px')};
`;
