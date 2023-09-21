import styled from 'styled-components';

interface TitleAndContentProps {
  $title?: string;
  $titleWidth?: string;
  $modify?: boolean;
  $content?: string;
  $contentSize?: string;
}

export const TitleAndContent = ({ $title, $titleWidth, $modify, $content, $contentSize }: TitleAndContentProps) => {
  return (
    <Wrap>
      <Title>{$title}</Title>
      <ContentInput></ContentInput>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  background-color: pink;
`;

const Title = styled.div`
  display: flex;
  font-family: 'NSNB';
  size: 12px;
`;

const ContentInput = styled.input<TitleAndContentProps>`
  width: ${(props) => (props.$contentSize === 's' ? '15%' : '18%')};
`;
