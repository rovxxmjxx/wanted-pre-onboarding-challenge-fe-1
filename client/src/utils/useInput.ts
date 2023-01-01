import { createRef, useRef, useState } from 'react';

type Input = {
  name: string;
  value: any;
  error: {
    regex?: RegExp;
    isError: boolean | null;
    message?: string | null;
  };
};
const useInput = (input: Input) => {
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<{
    isError: boolean | null;
    message?: string | null;
  }>({ isError: null, message: null });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setError({ isError: null, message: null });
      return;
    }

    const isValid = input.error.regex?.test(value);

    if (isValid) {
      setError({ isError: false });
    } else {
      setError({ isError: true, message: input.error.message });
    }
  };

  const onClear = () => {
    ref!.current!.value = '';
  };

  const onError = (value: boolean | null, message?: string) => {
    setError((prev) => ({ ...prev, isError: value, message }));
  };

  return { name: input.name, ref, onChange, onClear, error, onError };
};

export default useInput;
