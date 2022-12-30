import React, { RefObject, createRef, useState } from 'react';
import { AnyOBJ } from '../queryClient';

export type FormInput = {
  defaultValue: any;
  validator: {
    pattern: RegExp;
    message?: string;
  };
  onSubmit: {
    message: string;
  };
};

type FormInputs = {
  [name: string]: FormInput;
};

type Error = {
  exist: boolean | null;
  message?: string;
};

type ErrorStore = {
  [name: string]: Error;
};

export type Errors = {
  store: ErrorStore;
  getValue: (name: string) => Error;
  setValue: (name: string, value: Error) => void;
  setValues: (values: { [name: string]: Error }) => void;
  exist?: (name: string) => boolean | null;
  message: (name: string) => string;
};

type Format = {
  values: {
    [name: string]: {
      ref: RefObject<HTMLInputElement>;
      state: string;
      setState: React.Dispatch<React.SetStateAction<string>>;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
  };
  errors: Errors;
};

export default function useForm({ inputs }: { inputs: FormInputs }): Format {
  const [errorStore, setErrorStore] = useState<ErrorStore>({});

  const format: Format = {
    values: {},
    errors: {
      store: errorStore,
      getValue: (name) => errorStore[name],
      setValue: (name, value) =>
        setErrorStore((prev) => ({ ...prev, [name]: value })),
      setValues: (obj) => {
        Object.entries(obj).forEach(([name, value]) =>
          setErrorStore((prev) => ({ ...prev, [name]: value }))
        );
      },
      exist: (name) => errorStore[name].exist,
      message: (name) => inputs[name].validator.message || '',
    },
  };

  Object.entries(inputs).forEach(
    ([
      name,
      {
        defaultValue,
        validator: { pattern, message },
      },
    ]) => {
      const ref = createRef<HTMLInputElement>();
      const [state, setState] = useState(defaultValue);
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState(value);

        if (!value) return;

        const isValid = pattern.test(value);
        if (isValid) {
          setErrorStore((prev) => ({ ...prev, [name]: { exist: false } }));
        } else {
          setErrorStore((prev) => ({
            ...prev,
            [name]: { exist: true, message },
          }));
        }
      };

      format.values[name] = { ref, state, setState, onChange };
    }
  );

  return format;
}
