import React, { useState } from 'react';
import './todo.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, List, ListItem, ListItemText, Modal } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';
import db from './config/firebase'


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo({id, text, timestamp}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const removeTodo = (e)=>{
    db.collection('todos').doc(id).delete()
  }
  const updateTodo = (e)=>{
    db.collection('todos').doc(id).set({
      todo: input,
    }, {merge: true});
    setOpen(false);
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={e=>setOpen(false)}
      >
        <div className={classes.paper}>
          <h3>This is a Modal</h3>
          <Input placeholder={text} value={input} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={updateTodo}>Update</Button>
          <Button onClick={e=>setOpen(false)}><CloseIcon /></Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemText primary={text} secondary={timestamp} />
        </ListItem>
        <Button onClick={(e)=>setOpen(true)} >Edit</Button>
        <Button onClick={removeTodo}>
          <DeleteForeverIcon fontSize="small" />
        </Button>
        
      </List>
    </div>
  )
}

export default Todo
