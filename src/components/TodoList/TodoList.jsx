import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Header from '../Header/Header';
import TodoFilter from '../Header/Header';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css'

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(readTodosFromLocalStorage);

  const handleAdd = (todo) => {
    // 새로운 투두를 todos에 업데이트 해야 함
    console.log(todo)
    setTodos((prev) => [...prev, todo])
  }

  const handleDelete = (deleted) => {

    console.log(deleted);
    setTodos(todos.filter(((todo) => todo.id != deleted.id)));
  }

  const handleUpdate = (updated) => {
    console.log(updated);
    setTodos(todos.map((todo) => todo.id === updated.id ? updated : todo));
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const filtered = getFilteredItems(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {
          filtered.map(item => (
            <TodoItem key={item.id} item={item} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))
        }
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

const defaultData = [
  { id: '123', text: '장보기', status: 'active' },
  { id: '124', text: '공부하기', status: 'active' }
];

function readTodosFromLocalStorage() {
  console.log("gg");
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
  if (filter === 'all')
    return todos;
  return todos.filter(todo => todo.status === filter);
}