/* eslint-disable max-len */
import styled, { useTheme } from 'styled-components';
import { LikeHeart } from '../../../../components/GlobalIcon';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Component = () => {
  const themeApp = useTheme();
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 컴포넌트가 마운트된 후에 요소의 너비를 가져옵니다.
    const element = elementRef.current;
    const handleResize = () => {
      if (element) {
        const width = element.offsetWidth;
        setImageHeight(width);
      }
    };
    if (imageHeight === 0) {
      handleResize();
    }
    // 컴포넌트가 마운트될 때 이벤트 리스너를 추가하고,
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Wrap imageheight={imageHeight} ref={elementRef}>
      <LikeButton
        onClick={(event) => {
          event.stopPropagation();
          setIsLike(!isLike);
        }}
      >
        <LikeHeart
          color={isLike ? themeApp.colors.pink[300] : themeApp.colors.grey[0]}
        />
      </LikeButton>
      <ImageBox>
        <DailyLookImage
          alt="데일리룩 이미지"
          loading="lazy"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/
        2wCEAAoHCBYWFRgVFRYYGBgaGhgYGBoaGhgYGhgYGBgZGRgYGBgcIS4lHB4rIR
        gYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHjQhISE0NDQ0NDQ0NDQ0N
        DQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDE0MTQxMf/AABEIALEBH
        AMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EADUQAAIBAg
        MFBwMDBAMBAAAAAAABAgMRBCExBRJBUWEGInGBkbHwE6HBMtHhFBVC8VJysiP/xA
        AZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAQEAAgIDAQEBAAAAAAAAAQIR
        AxIhMQRBUSJhE//aAAwDAQACEQMRAD8A42wkOMJucewkOyQVhxCAEIZBXAGEIQA6Qc
        abfAubOwm87NHSYbZcEu8rme/NnP20zi6cthsLKT0NOnsZ8Tp8NgYrOMUS/QZy6/K/
        jXPh/rm1sZO9yWjsJbyzyNLENxuRYfFd6xnPPppfDOIV2cWf2KuN2M4qTSzf2zX8n
        WQnkNJp3K/99M/R59PZM00raq/h0LNPYkrXfzI7KUFyI3Yd/J0c8McbPZMr6aZv9i
        lUwzVsuGfud5OmrFepgoS4IrP5P9F8P8cLKjLl8RG4M7xbOhy6FXG7DhLTJmmfyc37
        Z3xWOMaGNLFbOnD/AB6FaOHfHhqdE1Ky4rCJ5UnyZEo8FqV0cMwbBgsRBEOxigQhCQ
        AQgUwgFCxCYgBxXGESBXEmMOgAhCEAMyShTu/wRo19hYVSnd6LMW9TObVZnbxubNwa
        hFSas2jUw2bzKWKrW0IsPiszyt6ur13YxyOljFLNEFaskndozv7jYz605zT5dSOdVn
        P9WsVWUvYgwuH7135EeGovVl2L9R84q39RchMdVCvCTE5iqOJpTA3iv9Qkjdgrg5yG
        UyOQ6eQxxLGZNBlXeJITEVi46MZLNIysZs6m28rGhCZRx0msy871PpnMS35ZOJ2OrX
        g+Gn8mLicK4J5O/XkdbRmgq+GjNWaXQ3x+RZ8aRvw/xwbRGzosfsfcTkzAqRsduNzU
        7HNrNn2jEKwmaJIQhgB0EAPcBSYhwZSAHCQMRyQQ4hMAdBMBMe4A8VfI6rZWDUIb2d
        2jB2RT3qkVwvn5HWV9Mjl/I3yerfwZ7eqWKncowlLRX8i1VfAmjeMMmn5L3OWO3vFZ
        STynJrw18y1Gusox068SnDDOT7y4/LmlRopINchWjg2SxkNYfcuZ0C3hIjlCwcGBj3
        USwRCpB72YFTzQkshlmw20BIJZZv0EpksolepGzuBrMag2ISkivGZJGdwTUNCkW7EL
        lu66E0aqtdE6X3p501OO7I4fa+GcJta9TtlUVzG7QqPJaHV+NqzXHN5s/HXJDElRq+
        SI5TPQchMEFyBcigkuK5HvDpgKmkyIObAYAcWEmBEMkDGaEhwALCYUgbAGv2emlO3E
        6CvLmc1sOVqnPI6aGHcn0OL8if6dXgvIpTpOTyLVPBv/AC0NOnSihpx5M5rpv7dVow
        SyHVuA84v4wd0npjSHbAl4eY1uen3XJgot5BuRC55/MwXVtn6efQOBLv5/Odhb1s+J
        FKovD/eYovNZ6XuPgWU7Lm/moUSpGqpfi2n8hKfAVhcWVIinASdskGqgBVnG2iHhPr
        90TzjfgRKLv+n7jhJm4tWdvcp1KjhlquBbhbw8yhtODtdXfPIcnfgS8PDF3Zj9o8XF
        TSfItYe9+JxfaPGSnVk72SyXlyOr8Xx90x8+v8p54yPMhnjEYzbCSPS9I42n/VoX9V
        czbE1EVzAvqbZPTpuwOHL0HkZ2nYrtgsjeIRHPFRHyktwZImZqxyFLaKH60NLeHUjI
        e0gZbSD1obEpAb65mLPaDZC8XIqeOh3XZyovqpZN5ncKnZHB9gtn1HNVZq0bO1+p6M
        4HmflT/Tfx6+FSNPO4NZdC7uWK9eBy1tL2qLRHu3CnO2QMZg1DNWXuBFrW5K2iGq1H
        P9vtkCgTn58uD9PQjnUyssny/cgnW626W+w3023eOd9Vfh7IuZCda5XWWb1t8zChDV
        J/vzs/UBrLklrw58h4Sjeyi7LjfXXR88kgB9NbX/gKM7c3w/0JK+dvNNWXLrcD4r8+
        tl9xBYhbj6X/AAHez09it9RLVPx19skSwm9dejXtYXAnjN8fcOcGwKduWfRe5PGfQS
        ajjHmNOnkTLxJN264D6isGaUVJ8r6/uebbQq705PjdnpnaG1OjOeuXueV1q2872PS/
        Dz96c/m1+gJBIFMJSO5gceLGTE0INHDVi/CpkYEJtF2hVdjO5O1m1JPefi/cBtl+jh
        022+b9wcTQsa+07wlG46i2JI1dn0FIetcgZbi0SYXDynJRjqbtTZLnojT7O7DlGd2j
        LXmkz39nwWyuxO+k5tnRYbsTTi13TqtmUFFLIvOSucOvNq37VyKtLBRpwUYpIJIsy7
        xFBGG/lWaFxKuIRdkinXjrmY1rlj4mmVnUs7WsXMTO2iMerWk3ll1DM66I0JVLLh5/
        Myhi8Xk88+SH+m3nJ/chnOnDV38Fc0zhN1Ix6tSd3JviaWGxKilva6pfllatioTaSX
        G2eWZI6UZLLLp0Nbn4+YJrq3HFZPdeb4Xul4L8DYevvN9eaXO/8mS4NXtfl6FvDPca
        vp9+r6k3MPrYjLRWu1lz8yeKy5PjbkU44qOST1te/rl9vQszxUdU+H5+5lZR0NSPO3
        iv3C3HzyIJ1k2rO3TKwdOpbX14fwLlV1ZhPyaDjPn89CJ5/wC/lxlFX+exPAswl81+
        5cpq5Rw5p0o3QmerxzPbyuo4ZxvnJpWPLY0zte2mJdStuK+7D0b5mDDCnrfj/wCMSf
        1x7vazY4dkscIzXp4XoXaeFNL5anjChgmWYbP6G5DDdCzTw3Qzvkp8YdPZfQsf2tG7
        DDvkPVpPlwIvktKxx+HwzuWZ7OckXadSKLMMVFci7rXTkYsNgNm1szYe6Sw2hBcUTx
        2zBcUTrW6Phu4PZsFyNbD4SK0RyuG24pSUIZyeiR2ezsPJRTnqzn3LPtXf4s0oeRYh
        SiBYZsy9ofKsbi4FW1mx/qAOpcLewScKbKdZ8EW5u40aaMdNc3jLlhb5shls9X0NxU
        0VqtJphFTVecdr3OEklJpZteV/2OR+rKf66s0vOV81luprhd+R6j2h2aqkbpd5Xt58
        LHm+K2PVg2t2/J3s/NM9P8bWPXn7Z+Wa6q4Kq4yUbtq/vl+F9zdeL3ZLelZLK/kZ+G
        wcaS362vCKf/pkmBnN71Tdvd/LL5oaeTl+T8fY3qqTXPLho/S48INq/X7aFOdfeeUJ
        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"
        />
      </ImageBox>
      <BottomContent>
        <TagBox>
          <Tag>#강쥐</Tag>
          <Tag>#댕댕이</Tag>
          <Tag>#귀엽다</Tag>
        </TagBox>
        <Writer>장경태</Writer>
      </BottomContent>
    </Wrap>
  );
};

// Styling
const Wrap = styled.article<{ imageheight: number }>`
  display: flex;
  position: relative;
  height: ${({ imageheight }) => (imageheight ? `${imageheight}px` : '335px')};
  max-height: max-content;
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.grey[5]}`};
  border-radius: 10px;
  overflow: hidden;
`;

const DailyLookImage = styled.img`
  object-fit: fill;
  width: 100%;
`;
const ImageBox = styled.div`
  display: flex;
  width: 100%;
`;
const Tag = styled.article`
  font-size: 12px;
  color: white;
`;
const BottomContent = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 8px;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  height: 12%;
  background-color: #000000b3;
`;
const TagBox = styled.div`
  display: flex;
  gap: 10px;
`;
const Writer = styled.div`
  color: white;
  font-size: 13px;
`;
const LikeButton = styled.button`
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
export default Component;
