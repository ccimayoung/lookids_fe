import styled from 'styled-components';

function Component({
  isOpen,
  onClick,
  changeTab,
  activeTab,
}: {
  isOpen: boolean;
  onClick: () => void;
  changeTab: (index: number) => void;
  activeTab: number;
}) {
  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClick} />
      <BottomSheetContainer isOpen={isOpen}>
        <Tabs>
          <Tab active={activeTab === 0} onClick={() => changeTab(0)}>
            계절
          </Tab>
          <Tab active={activeTab === 1} onClick={() => changeTab(1)}>
            성별
          </Tab>
          <Tab active={activeTab === 2} onClick={() => changeTab(2)}>
            연령대
          </Tab>
          <Tab active={activeTab === 3} onClick={() => changeTab(3)}>
            키/몸무게
          </Tab>
          <Tab active={activeTab === 4} onClick={() => changeTab(4)}>
            커뮤니티
          </Tab>
        </Tabs>
        <SheetContent>
          {/* 각 탭에 대한 내용을 추가하세요 */}
          {activeTab === 0 && <p>Tab 1 content</p>}
          {activeTab === 1 && <p>Tab 2 content</p>}
          {activeTab === 2 && <p>Tab 3 content</p>}
          {activeTab === 3 && <p>Tab 4 content</p>}
          {activeTab === 4 && <p>Tab 5 content</p>}
        </SheetContent>
      </BottomSheetContainer>
    </>
  );
}

export default Component;

// 스타일드 컴포넌트를 사용하여 바텀 시트 스타일 정의
const BottomSheetContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 500px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(${(props) => (props.isOpen ? '40%' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 999;
`;
const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 998;
`;

const SheetContent = styled.div`
  padding: 20px;
`;
const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.grey[0]};
  overflow: hidden;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  text-align: center;
  font-size: 13px;
  padding-top: 15px;
  padding-bottom: 15px;
  box-sizing: border-box;
  border-bottom: ${(props) =>
    props.active ? '4px solid black' : 'transparent'};
  color: ${(props) =>
    props.active
      ? `${props.theme.colors.grey[2]}`
      : `${props.theme.colors.grey[5]}`};
  cursor: pointer;
`;
