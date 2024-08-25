import React, { useState } from 'react';
import Form from './form';
import List from './list';

const CRUD = () => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <div>
      <Form onSubmit={addItem} />
      <List items={items} />
    </div>
  );
};

export default CRUD;
