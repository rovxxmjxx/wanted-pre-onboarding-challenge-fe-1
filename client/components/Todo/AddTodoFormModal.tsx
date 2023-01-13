import React, { useState } from 'react';
import styled from '@emotion/styled';
import Input from './Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateTodo } from '../hooks/todo/TodoQuery';
import { CreateTodoResponse } from '../../lib/apis/TodoApi';
import Modal from './Modal';
import Textarea from './Textarea';
import Button from '../button';
import { useSession } from '../../contexts/SessionContext';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { QueryKeys } from '../../lib/constants/fetcher';

type FormType = {
  title: string;
  content: string;
};

type AddFormModalType = {
  show: boolean;
  onClose: () => void;
};

export default function AddFormModal({ show, onClose }: AddFormModalType) {
  const queryClient = useQueryClient();

  const schema = yup.object({
    title: yup.string(),
    content: yup.string(),
  });

  const { control, handleSubmit, reset } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: { title: '', content: '' },
  });

  const createTodoMutation = useCreateTodo();

  const onSubmit = ({ title, content }: FormType) => {
    createTodoMutation.mutateAsync(
      { title, content },
      {
        onSuccess: () => {
          reset();
          onClose();
          queryClient.invalidateQueries(QueryKeys.TODO);
        },
      }
    );
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Inner>
        <h2 className="title">할 일 작성하기</h2>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="title" label={'제목'} name={'title'} control={control} />
            <Textarea label={'내용'} name={'content'} control={control} onSubmit={handleSubmit(onSubmit)} />
            <Button type="submit" title={'저장하기'} />
          </form>
        </Container>
      </Inner>
    </Modal>
  );
}

const Inner = styled.div`
  position: absolute;
  border-top: 1px solid #dfdfdf;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  border: 1px solid #dfdfdf;
  width: 500px;
  border-radius: 6px;

  > .title {
    font-size: 20px;
    padding: 20px;
    border-bottom: 1px solid #dfdfdf;
    font-weight: 500;
  }
`;

const Container = styled.div`
  padding: 20px;
  width: 100%;

  > form {
    width: 100%;
  }
`;
