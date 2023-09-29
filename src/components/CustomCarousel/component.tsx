import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface IItemProps {
  $selecteditem: number;
  $itemindex: number;
}
interface IItemWrapProps {
  $itemheight: number;
}

// 스타일드 컴포넌트를 사용하여 스타일링
const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ItemWrapper = styled.div<IItemWrapProps>`
  display: flex;
  width: 100%;
  height: ${({ $itemheight }) => `${$itemheight}px`};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
const Items = styled.div<IItemProps>`
  width: ${({ $selecteditem, $itemindex }) => ($selecteditem === $itemindex ? '100%' : '70%')}; /* 다음 아이템 및 이전 아이템 크기 조절 */
  height: ${({ $selecteditem, $itemindex }) => ($selecteditem === $itemindex ? '100%' : '70%')};
  transition: height 0.3s ease-in-out;
  background-color: #d9d9d9;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  /* 다른 스타일링 속성 추가 가능 */
`;

const BestSeller = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ItemsBottom = styled.div`
  background-color: #000000b3;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  color: white;
  font-size: 10px;
  position: absolute;
  bottom: 0;
`;

const Component = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [sreenWidth, setSreenWidth] = useState(window.innerWidth);
  const [itemHeight, setItemHeight] = useState(window.innerWidth > 595 ? 595 * 0.4 : window.innerWidth * 0.4);
  const [image, setImage] = useState(['/img/thirdMedal.png', '/img/firstMedal.png', '/img/secondMedal.png']);
  const [bestImage, setBestImage] = useState([
    {
      userName: '밍밍님',
      image:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIEAtAMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EAD0QAAEDAgQDBQUGAwkBAAAAAAEAAgMEEQUSITEGIkETMlFhcQcUgZGhM0JScrHBFdHwFiMkNDVisuHxCP/EABkBAQADAQEAAAAAAAAAAAAAAAACAwQBBf/EACkRAAICAgIBBAEDBQAAAAAAAAABAhEDIRIxQQQTIjJRM2FxQlKBocH/2gAMAwEAAhEDEQA/APaggFQAN0AqAEAIAQAgBACARzmtBLnAAdSUsFCvxzC8Pbmq66GPyzXP0UXOK8klCT8EdBxHg2IOy0eJU8jvwh9iuKcX5DhJeDVBuLjUeIUyIIAQAgBACARACAEAIBoQCoBbIAQAgBACAEAIDB4t4qouGaMSVBElQ8HsoAdXeZ8AoSnxJxhyPB+KONcWxuoc+aokjj6RRuIA+Cq3LbLvr0ScJvNcJaKruWStIBdclp8VVN10WQVkZgqMJrsk8Zc0mwc2x/8AF1TTR1xo9I4U4gnjYGxTuewd6J+4+CnF0QlBM9Io6ltVC17NCRct8FoTszSjxZOukQQAgBACARACAEAiAEAqAEAIAQBfWyAEBDW1UVDRz1dS7LDCwvefIC643SFXo8I4znq8blpa73e9Q+Ts3NFzcPY17beIbqNPLzWXmm9nqS9NKOFSS6/6Pwv2cvqmskxOokZfmMcXL8NlXLK/BCOJf1HbYNwvh2Fta2liLSNyTe6pdt7LlSVIt1PC+G1zw58OV/4mmymkQbS7II+D34bOJ6J7nM6tcdfgVcoyRW5wZv4dWtpbB4ylo1bfbxCvjKjLONnRAgi42VpSCAEAIAQCIAQAgEQAgFQAgBARTTMjBBeA+2g6lRlJInGDZkRTSNldNM572seALfD9/wBFmUmnbNrimuMTbY8PYHt2dqFqTswNU6OQ9q+INw/gypc51jK9jAPxcwNvooZNxoni+1nDezhlTiLIKmrd2ggZZht4/wDWixziuWj1F6icsKxvpHoNmg6lRorska0bhKOci1TjW50VkUQk7NaEsc0N3WmLtGOaaOd40pi2k95jFns6jw81HJGi3DK2a3D07qjBKKSTv9kAfhp+ysg7iinIqkzRUyAIAQAgEQAgBAIgBAKgBACAyKoiSrBva13E26DT91mluRsx/GFFfQwQ2Jd2pzG3geY/soPomu3+xs0dvdYiNsq1Q+qMeT7M8k/+gK57Rg1C2xjcZZXNJ3dytb+rioz7o7DSZt+zmkbFwpSvZyueCXOt5lZattmu6SRYxiuwnDc8mIVTW5LFznSWy32vqo8b6RPlS2aGFVlNVQtfSyCSN4u03uF1a0zjLOJ1EVJSGSd5ZG0XJBXZHIdmfwxxHg+Iujloa1pD3FjTnPMRuLH1ClG4P5aOTqcXWzp8dhZUYPUiRudvZE2vutMtxMkNSorcI5v7P0hfe5abX8LlMf1GX7s2FMrBACAEAIBEAIBEAIBQUAICOoeWROI32CjJ0iUFctmW1jcxeRdx0JPgs9Gty8DXsAeJPvNaRfyNr/oFygnqjVpR/hYr75Bf5LTD6oyT+zOS4yw6GtxBrqmnY+DsBFJI9t8rbl2nhfxHgs3qXJU0avSqLtMfwvHAzB2wUwtFG5waPK6rg7RZkXGQ2uwPD6ntBNRxPEls929621/Fd+vR1b7JMPw6noW5KaJkbbDlYLDQW/QBR7dnX0bFfh0FVQs7VrXADQFXuPxszxm1NohwPDqeidkp6eKNm/IwC6QWyWV6NavcyOik7TuWsQrcklGNmfFFymkhlAXmI5rZQeSwtdtguYm2nZ3Kknosq0qBACAEAiAEAIBEAIAG6AVAVq77Ieqrn0WYuyhmsqrL3EbI+7ShxJmzHbI222UWstC6Mz7Oa46rRhWD1FbJGXw3jbIG7gZraefMPkqsyuLLvTyqdmbwhimFVxniwurjlyta9zG3Bbe41B22WfHFxuzVmkpVR0D2jqpNFaZReXRG7n5AXA3t9PRQpotSvotQyvmhf/e5muIOXTlt4KxW0yuUVGS0XsOdsp49FeXaLFZLTgxxVBHOdGkXv/VwrJU9MohyW4kzAGizRYBTSrRFu9irpwEAiAEAIAQAgGoBUADdAKTYXKAzKqp7STL9wbLNPJcqNMMdKyAOZqoponKx7ITKO6S3yCnxshzoc+oqKNtsmZg2Dgu8pRJRxwyP9zgfbfiEg4ewcxF4paisvM3bNZpIB+vyUm+cbRSl7c3FlX2Fxyy4XisjoxlEzLPyga5Tcf8AFQjG7JylVHosptGbWOii+ixbPE8Y4g4jwTiap/iOKTsa65gBaOzy5jZoBFtP5eS5erRvhjx7UiTCeJeJ8b4hpYcLxWR7W2MxETBHbwNm9bfqlutkcmPGqij2/DQ/KC7U9SApQvyYMjXgwmVsmKccOjgyGnw9gY+7teYZrgeZ0+CkvlNEa443Z14V5nBAIgBACAEAIAQDQgFQAgKVZODeNhNupVGSfhF+OHkz5jos7L0OwymNTOZX/ZRnQeJUsMObt9Ec0+Cpdm50t0W0xgQCLEXHmgPFPb/JWPxbAKGIH3Z0cr42A2a6W4H0Fvn5qLqicbbO29jkUzPZ9h7qiAwyPfM+xbZzgZHWJ+H0skVSOTduzosRLYJGXGkgN/XRU5WotF2G2ZNdhkFU/PI2MnbnYHA/NQS8mmGWlUlZawnD6alJEcbM7tMzWBoA8rKUaIZclrSpC8YTvouE8WqaWRsckVM9zXF2UaDa/wBFOtGdP5Kzzv2ayTYlxc2vppAGx0zYa1mfvkNOR1vmFDEtlmX6nsXRaTKKgEQAgBACAEAIBoQCoCtVz9m3I08x+gVeSdaRbjhe2ZrnLK2aKIA19TO2Bh1dufAeKilzlxRJtQjbOghjZDG2OMWa3Zb0lFUjC25O2PXThWlr4InuZI4tt1I0K606sreWKdM8s9r3CeL8WYxh9Tg80Jp6enLT2jy3I4uvceunyUJaVko5I+Gd5w5VT0eBUVNiLhNWsZlkdH3TqbWOnSylGLS2JZYt3HyUa3Fff5WvDOzYByi9yvNz5ebPUw4eCsKWsewZCA9vS/RRhkaLJY0y3DWyPdljYG33tvZWe626RW8UUrZsSU1PX0MlJWRMmp5WFkkbxcOadwVrh0YprdnIYB7NqThziiPE8Ir5202R4dSSjPa4AAD73t11B23UuOyPN8aO66KZAWyARACAEAIAQAgGoBsjxHGXnouSdKzqVujJkeXuLjuVik7dm2K4qitO8MaSoSlSJxVmhgUGWmNQ/vTai/RvRafTwqPJ+TN6idy4rwaL5GNGZzhb1WgzvRnT1zzJaF7WgOy663UtRTbKJzb+rM+siOszYzJI0HKDsfVc9PP3YqUtGf1EXG2tvwMp4X0tAJJ3ue53M5oN7eQ9FfKsk6joqxRlhw8pu78E8NOWNL2gtLjsVlzQm4OON0/yasa6m0Zk+HiCUsIBbu2w6Lz8mBw7dnuenzc4b8EscDGt5L5lXxovuy1h8bmTXNrFWY1srytUb8PcW2KPOmx+jXc3eKsIU30I9x7RrG9RqpEL3RA2pMlVLCAQGAWd0de91GMkyUotRUr/AMFoa3HUbqTRxOwXDoiAEAIAQDUBn1s2Z+Rp5W/UrNllbo04o0rKZPmqS4ysVqHhpgpgHzuHL4N8z/WqoyPwX44+WQUtJU5GtqKqaXKLDO8/ouLk+2TbgukaNMDA7Uns3aOB29Vdj5RmnypeTJ6mCywarZZgom08krmuc57zclx39F688nJL8HhYsHtSl+S1HZ8ZbJpYFQ/guVNNSI5u0bM1kbM8eQ6na6Jvl+xZ7eP2G7+XhEsLS+naZdJeqlKuWinGm4Jy7HkR5nEHmCpze4sbcFvwWJxumx/KA2wBJ8lyCbinNbJOfhMV40Y6FjQb8xIUnH8Ithk/ubJ6QuyWk0cTe3l0UpuPKkV4+VfImc4ZgNL9FyidiObZpN9TuUTd0caVFaleOttbkLitraK4Oi3GRYn6rrLUC4dBACAEAIBhvY2XH0dXZiu3Kx+TauivMJHDKx2W/wB7wVUuRZGl2MgpGQg2HM7vOOpPqUjCjsslk2UDop1RC7I5HaLjAUM7feeyc53Po3XQFacPqNe3Ixeo9LbeWL35RqN1aW/NWQy8pyjxev8AZla+H8krToHADQWXcWVZY8kTcWmRGRsVQ2I2LnbLuLBx5TvsrllUZqJHIz3XtqgXeSL5VbKfxr8HcHp7y1fY2kqDU3zAMsBYddrrrS4J/khO1mljtfF0X2d0AOAVXL50WxWhDIIwHDUm2gGyRwxc+fk7LJSJwwPLX3UrrRKr2JUSBsT817aDbdIq3QyNKNszadstQxoYcjQ45rjceCtnxgYsanlSS0l2aMYkY3I5wf8A7rW0VEbrZul3SJRsh1AgBACAEAxAQTUrJSXd1x8FXLGmWRyNEHuB/GPkoeyT94P4e78bU9oe8L/Dr96QfAJ7Jz3hzcMg++XO+il7MQ80iR1DTOhdF2TQD1G/zU4xUekVSk5dlXna50bxZ7LNv+LwKn7kXcU9oyOEm26JCSBrp5LqSS0SpvsUNYXte6xdrqu8n0hxi6k+xstrCxvfdLOSrVMU9nFEXO5W2GpRuiyEOTqKtsbGXWznunY+K4itRknUixAWll9xYKPuLlxvZZGOrLTSLaLpYJIP7t1xcImJbRl4fI9khilddwOqpyTudF0McY404qjU8FOPRWxQpHAQCFAF0AiARACAVACAVACAAgK9SxshaLC4N0pHOTWkVpXgTMY7vnZWqOrM05fNRYkk7IJ4437vOiywxRxzlK/saVjySi2l9RtXIIYu1f3bj6kfzWqEeUqRjzS9uPJ9CvYKiExuF2nw3HmqI5I5OUfw6NGOeTG1KIk0nu9NfLytFgPFaIRUnRRmyyUXKRapXAxseO68AhVTglK62aMO4qvJYu5soP3TonZLdkh7h9Fxkkc3hziJo3ON77lYVqRvdOLOh6Ba4mKXYqmRC6AEAiAEA1AKgBAKgBACAVAQytGYuG5C6VyXkgyxvIc/vC9ippuqRXxjKmxkkUUj2F4u5uxPRRryWRyOPxT0+xJGteMsozMvsfBVRlmWd19aK5RhKFS2LdojBbf4K7jVnLVJoQPYGOdILN/E5djfg43FL5dE8bmMOYN5XWXHZbGSStFmUXtZV/LkqLHTRIbBhttZdZ05SkdlbCQdlhl3Zuh1R0rDeNpWuBkmtjlMgCAEAiAEAiAUIAQAEAqAEAqAhl7w9F1EJlSfeL8ysj0yifaHv75UUJdhJ1/Ki8Cfkhw//IN+Knl+5HB+iJiP+nu/MF3F9yPqP0CcfZRfkCg/sy5fSJeH2bPRQRf4HHuH0XGdOQo/sIvVYJG6B1EX2TVrh0ZcnZIrCsEAhQAgEKA//9k=',
    },
    { userName: '링링님', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_I4MqYHErVnQON3ML-HlECQltWQLN1ko5w&usqp=CAU' },
    { userName: '루아님', image: 'https://aftertherain.kr/wp-content/uploads/2016/10/OEKBNX0.jpg' },
  ]);
  useEffect(() => {
    const handleResize = () => {
      setSreenWidth(window.innerWidth);
      setItemHeight(window.innerWidth > 595 ? 595 * 0.4 : window.innerWidth * 0.4);
    };
    // 컴포넌트가 마운트될 때 이벤트 리스너를 추가하고,
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <CarouselContainer>
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        centerMode
        centerSlidePercentage={40}
        selectedItem={selectedItem}
        width={sreenWidth > 595 ? 595 : sreenWidth}
        onChange={(index) => setSelectedItem(index)}
        onClickItem={(index) => {
          setSelectedItem(index);
        }}
      >
        {bestImage.map((img, itemIndex) => (
          <ItemWrapper key={img.userName + itemIndex} $itemheight={itemHeight}>
            <Items data-item-index={itemIndex} $selecteditem={selectedItem} $itemindex={itemIndex}>
              <BestSeller src={img.image} />
              <MedalIconBox>
                <MedalIcon src={image[itemIndex]} />
              </MedalIconBox>
              <ItemsBottom>{img.userName}</ItemsBottom>
            </Items>
          </ItemWrapper>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default Component;

const MedalIconBox = styled.div`
  position: absolute;
  width: 25%;
  height: 25%;
  top: 7px;
  left: 7px;
`;
const MedalIcon = styled.img``;
