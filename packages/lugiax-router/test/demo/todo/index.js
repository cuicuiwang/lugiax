/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import InputTask from './components/InputTask';
import List from './components/List';
import { bindTo, connect, } from '@lugia/lugiax';
import todo from './models/todo';

const TodoList = connect(
  todo,
  todo => {
    return { data: todo.get('tasks'), };
  },
  todo => {
    return { delItem: todo.delTask, };
  }
)(List);

const fieldPath = ['formData', 'task',];
const fieldName = fieldPath.join('.');

const TodoInput = bindTo(
  todo,
  {
    [fieldName]: 'value',
  },
  {
    onChange: {
      [fieldName](v) {
        return v;
      },
    },
  },
  {
    props: {
      onEnter() {
        todo.mutations.addTask();
      },
    },
  }
)(InputTask);

export default () => {
  return (
    <div>
      <TodoInput />
      <TodoList />
    </div>
  );
};
