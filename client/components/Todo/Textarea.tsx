import React, { TextareaHTMLAttributes, KeyboardEvent } from 'react';
import { Control, Controller } from 'react-hook-form';
import { InputTextareaContainer } from './Input';
import TextareaAutosize from 'react-textarea-autosize';

type TextareaType = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  control: Control;
  onSubmit: () => void;
};

export default function Textarea({ label, name, control, onSubmit }: TextareaType) {
  const onKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputTextareaContainer>
          <span className="label">{label}</span>
          <TextareaAutosize {...field} onKeyPress={onKeyPress} />
        </InputTextareaContainer>
      )}
    />
  );
}
