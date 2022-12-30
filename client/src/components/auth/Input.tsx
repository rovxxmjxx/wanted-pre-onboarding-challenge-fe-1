import React, {
  forwardRef,
  ForwardedRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';

import { ErrorType } from '../../pages/login';

type InputProps = {
  type: 'text' | 'email' | 'password';
  label: string;
  name: string;
  placeholder: string;
  validate: {
    regex: RegExp;
    error: ErrorType;
    setError: Dispatch<SetStateAction<ErrorType>>;
  };
};

export function Input(
  { type, label, name, placeholder, validate }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      validate.setError((prev) => ({
        ...prev,
        submit: null,
        [name]: null,
      }));
      return;
    }

    const isValid = validate?.regex.test(value);

    if (isValid) {
      validate.setError((prev) => ({
        ...prev,
        submit: null,
        [name]: { isError: false },
      }));
    } else {
      validate.setError((prev) => ({
        ...prev,
        submit: null,
        [name]: { isError: true },
      }));
    }
  };

  return (
    <div className="input-wrapper">
      <label>
        <span className="label-text">{label}</span>
        <div className="input-box">
          <input
            type={type}
            ref={ref}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
          />
          {validate.error[name] !== null && (
            <span
              className={`validate-icon ${
                validate.error[name]?.isError ? 'invalid' : 'valid'
              }`}
            >
              {validate.error[name]?.isError ? (
                <RiCloseCircleFill />
              ) : (
                <RiCheckboxCircleFill />
              )}
            </span>
          )}
        </div>
      </label>
    </div>
  );
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
