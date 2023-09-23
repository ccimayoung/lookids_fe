// LoginModal.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Component: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log(`Email: ${email}, Password: ${password}`);
    localStorage.setItem('token', email + password);
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <ModalBackground $isopen={isOpen.toString()} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>로그인</ModalTitle>
          <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          <FormSection>
            <InputLabel>아이디</InputLabel>
            <InputBox>
              <LoginInput type="email" placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputBox>
          </FormSection>
          <FormSection>
            <InputLabel>비밀번호</InputLabel>
            <InputBox>
              <LoginInput type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            </InputBox>
          </FormSection>
        </ModalContent>
        <ModalFooter>
          <LoginButton onClick={() => alert('준비중입니다.')}>회원가입</LoginButton>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Component;
const ModalBackground = styled.div<{ $isopen: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.$isopen === 'true' ? 'block' : 'none')};
  z-index: 999;
`;

const ModalContainer = styled.div`
  max-width: 400px;
  width: 250px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.3rem;
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  gap: 15px;
`;
const InputLabel = styled.label`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.neutral[2]};
`;
const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InputBox = styled.div``;
const LoginInput = styled.input`
  width: 100%;
  font-size: 0.9rem;;
  padding: 7px;
  padding-left: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.yellow[3]}`};
  border-radius: 5px;
`;

const LoginButton = styled.button`
  color: ${({ theme }) => theme.colors.neutral[5]};
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  padding: 7px;
  background-color: ${({ theme }) => theme.colors.yellow[3]};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
`;
