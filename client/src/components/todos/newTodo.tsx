import React, { SyntheticEvent } from 'react';
import useInput from '../../utils/useInput';
import { MdOutlineAddCircle } from 'react-icons/md';
// name: string;
// value: any;
// error: {
//   regex: RegExp;
//   isError: boolean | null;
//   message?: string | null;
// };
export default function NewTodo() {
  const { name, ref, onChange, onClear } = useInput({
    name: 'todo',
    value: '',
    error: {
      isError: null,
      message: '입력된 todo가 없습니다.',
    },
  });
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <div className="new-todo-form__input-wrapper">
        <button type="submit">
          <MdOutlineAddCircle />
        </button>
        <input name={name} ref={ref} onChange={onChange} />
      </div>
    </form>
  );
}
