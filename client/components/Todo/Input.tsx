import React, { InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';

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
      render={({ field, fieldState: { isDirty, invalid } }) => (
        <label>
          <div>
            <input type="text" {...field} {...rest} />
          </div>
        </label>
      )}
    />
  );
}
