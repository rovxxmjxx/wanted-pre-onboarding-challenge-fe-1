import React, { InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';
import { IconType } from 'react-icons/lib';
import { FaCheckCircle } from 'react-icons/fa';

type InputType = InputHTMLAttributes<HTMLInputElement> & {
  type: 'text' | 'password';
  label: string;
  name: string;
  control: Control;
  icon: IconType;
};

export default function Input({ type, label, name, control, icon, ...rest }: InputType) {
  const Icon = icon;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { isDirty, invalid } }) => (
        <label>
          <span>{label}</span>
          <div>
            <div>{<Icon />}</div>
            <input type={type} {...field} {...rest} />
          </div>
          <div>
            {isDirty && (
              <>
                <div style={invalid ? { color: 'red' } : { color: 'blue' }}>
                  <FaCheckCircle />
                </div>
              </>
            )}
          </div>
        </label>
      )}
    />
  );
}
