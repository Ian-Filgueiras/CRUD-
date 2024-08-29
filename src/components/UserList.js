import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <List>
      {users.map((user, index) => (
        <ListItem key={index} divider>
          <ListItemText
            primary={user.nome}
            secondary={`${user.email} - ${user.telefone}`}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(user)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(user.email)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;