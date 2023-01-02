import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'
import styles from './TodoItem.module.css'

export default function TodoItem({ item, onDelete, onUpdate }) {
  const { id, text, status } = item;
  const handleChange = (e) => {
    const status = e.target.checked ? 'completed' : 'active';
    onUpdate({ ...item, status });
  }

  const handleDelete = () => onDelete(item);

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type='checkbox'
        id={id}
        checked={status === 'completed'}
        onChange={handleChange}
      />
      {item.status === 'completed' ?
        <label
          className={styles.text}
          htmlFor={id}
          style={{ textDecoration: 'line-through' }}
        >
          {item.text}
        </label>
        : <label
          className={styles.text}
          htmlFor={id}
        >
          {item.text}
        </label>}
      <span className={styles.icon}>
        <button
          className={styles.button}
          onClick={handleDelete}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}

