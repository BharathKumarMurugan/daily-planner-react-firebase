import React, { useState } from 'react';
import './todo.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, List, ListItem, ListItemText, Modal, ListItemIcon, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
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

function Todo({id, text, todoStatus}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(todoStatus)
  const [status, setStatus] = useState(todoStatus)

  const removeTodo = (e)=>{
    db.collection('todos').doc(id).delete()
  }
  const updateTodo = (e)=>{
   
    db.collection('todos').doc(id).set({
      todo: input,
      todoStatus: !status,
    }, {merge: true});
    setOpen(false);
  }
  const checkedTodo = (e) =>{
    db.collection('todos').doc(id).set({
      todo: text,
      todoStatus: !status,
    }, {merge: true});
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
          <ListItemIcon>
            <Checkbox checked={checked? true: false} onChange={(e)=> {
              setChecked(e.target.checked);
              setStatus(!status);
              checkedTodo()
            }} />
          </ListItemIcon>
          <ListItemText primary={text} secondary={status?"done":"to-do"} style={checked?{textDecoration:"line-through"}:{textDecoration:"none"}}/>
          <ListItemSecondaryAction>
            <IconButton onClick={(e)=>setOpen(true)} >
              <EditIcon/>
            </IconButton>
            <IconButton onClick={removeTodo} color="secondary">
              <DeleteForeverIcon/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  )
}

export default Todo
