import React, { SyntheticEvent, useEffect } from 'react';
import useInput from '../../utils/useInput';
import { MdOutlineAddCircle } from 'react-icons/md';
import { useMutation } from 'react-query';
import { QUERYKEYS, fetcher } from '../../queryClient';
import useTextarea from '../../utils/useTextarea';
import { getToken } from '../../utils/executeToken';

export default function NewTodo() {
  const {
    ref: titleRef,
    onChange: onTitleChange,
    onClear: onTitleClear,
  } = useInput({
    name: 'todo',
    value: '',
    error: {
      isError: null,
      message: '입력된 todo가 없습니다.',
    },
  });

  const token = getToken();
  const { name: content, ref: contentRef, onChange: onContentChange, onClear: onContentClear } = useTextarea('content');
  const { mutate: createTodo } = useMutation(
    QUERYKEYS.TODOS,
    ({ title, content }: { title: string; content: string }) =>
      fetcher({ method: 'POST', path: '/todos', body: { title, content }, token: token || '' })
  );
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    //
    const title = titleRef?.current?.value;
    const content = contentRef?.current?.value || '';

    if (!title) return;

    createTodo({ title, content });

    onTitleClear();
    onContentClear();
  };

  useEffect(() => {
    titleRef?.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <div className="new-todo-form__input-wrapper">
        <button type="submit">
          <MdOutlineAddCircle />
        </button>
        <div className="inputTextarea">
          <input name={'title'} ref={titleRef} onChange={onTitleChange} placeholder="할 일을 적어보세요." />
          <textarea placeholder="할 일을 자세히 적어보세요." ref={contentRef} />
        </div>
      </div>
    </form>
  );
}
