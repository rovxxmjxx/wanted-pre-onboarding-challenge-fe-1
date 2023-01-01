import React, { useRef } from 'react';

export default function useTextarea(name: string) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
  };

  const onClear = () => {
    ref.current!.value = '';
  };

  return { name, value: ref?.current?.value, ref, onChange, onClear };
}
