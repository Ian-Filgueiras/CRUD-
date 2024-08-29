import React, { useState } from 'react';
import Form from './Form';
import UserList from './UserList';

const Crud = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user.email === updatedUser.email ? updatedUser : user)));
    setCurrentUser(null); 
  };

  const deleteUser = (email) => {
    setUsers(users.filter(user => user.email !== email));
  };

  const handleEdit = (user) => {
    setCurrentUser(user); 
  };

  const handleFormSubmit = (user) => {
    if (currentUser) {
      updateUser(user); 
    } else {
      addUser(user);
    }
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit} user={currentUser} />
      <UserList users={users} onEdit={handleEdit} onDelete={deleteUser} />
    </div>
  );
};

export default Crud;
