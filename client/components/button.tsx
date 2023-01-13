import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

type ButtonType = {
  type: 'button' | 'submit';
  title: string;
  style?: CSSProperties;
};

export default function Button({ type, title, style }: ButtonType) {
  return (
    <Container type={type} style={style}>
      {title}
    </Container>
  );
}

const Container = styled.button`
  padding: 10px;
  width: 100%;
`;
