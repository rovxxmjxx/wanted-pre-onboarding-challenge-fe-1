import React, { CSSProperties, SyntheticEvent } from 'react';
import styled from '@emotion/styled';

type ModalType = {
  show: boolean;
  onClose: () => void;
  style?: CSSProperties;
  children: React.ReactNode;
};

export default function Modal({ show, onClose, children, style }: ModalType) {
  if (!show) return null;

  return (
    <Screen onClick={onClose}>
      <div style={style} onClick={(e: SyntheticEvent) => e.stopPropagation()}>
        {children}
      </div>
    </Screen>
  );
}

const Screen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(245, 245, 245, 0.5);
  z-index: 100;
`;
