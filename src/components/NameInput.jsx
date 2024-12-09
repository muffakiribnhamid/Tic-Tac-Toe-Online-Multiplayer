import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const NameInput = ({ onSubmit, onBack }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <Container>
      <Title>Enter Your Name</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name..."
          maxLength={15}
          required
        />
        <ButtonContainer>
          <Button text="Back" onClick={onBack} />
          <Button text="Start Game" onClick={handleSubmit} />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h2`
  color: #956afa;
  font-size: 2rem;
  text-align: center;
  margin: 0;
  animation: float 3s ease-in-out infinite;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 300px;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #956afa;
  border-radius: 10px;
  background: rgba(149, 106, 250, 0.1);
  color: #956afa;
  font-size: 1.2rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 10px rgba(149, 106, 250, 0.3);
    background: rgba(149, 106, 250, 0.15);
  }

  &::placeholder {
    color: rgba(149, 106, 250, 0.5);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export default NameInput;
