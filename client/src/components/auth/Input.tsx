import React, { forwardRef, ForwardedRef } from 'react';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';

type InputProps = {
  type: 'text' | 'email' | 'password';
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: { isError: boolean | null; message?: string | null };
};

export function Input(
  { type, label, name, placeholder, onChange, error: { isError, message } }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="input-wrapper">
      <label>
        <span className="label-text">{label}</span>
        <div className="input-box">
          <input type={type} ref={ref} name={name} onChange={onChange} placeholder={placeholder} />
          {isError !== null && (
            <span className={`validate-icon ${isError ? 'invalid' : 'valid'}`}>
              {isError ? <RiCloseCircleFill /> : <RiCheckboxCircleFill />}
            </span>
          )}
        </div>
      </label>
    </div>
  );
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
