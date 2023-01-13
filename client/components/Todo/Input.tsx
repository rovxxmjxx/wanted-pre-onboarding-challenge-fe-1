import React, { InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from '@emotion/styled';

type InputType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  control: Control;
};

export default function Input({ label, name, control, ...rest }: InputType) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputTextareaContainer>
          <span className="label">{label}</span>
          <input type="text" {...field} {...rest} />
        </InputTextareaContainer>
      )}
    />
  );
}

export const InputTextareaContainer = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  > .label {
    margin-bottom: 5px;
    font-size: 14px;
  }

  > input,
  textarea {
    padding: 10px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    font-family: inherit;
    font-size: 15px;

    &:focus {
      outline-color: #000;
    }
  }

  > textarea {
    resize: none;
    min-height: 150px;
  }
`;
