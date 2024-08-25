import React from 'react';
import { List as MUIList, ListItem, ListItemText } from '@mui/material';

const List = ({ items }) => {
  return (
    <MUIList>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item.nome} secondary={item.email} />
        </ListItem>
      ))}
    </MUIList>
  );
};

export default List;
