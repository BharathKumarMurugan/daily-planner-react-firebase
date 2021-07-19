import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import db from './config/firebase';
import firebase from 'firebase';
import Todo from './Todo';


function Todos() {
  useEffect(() => {
    db.collection('todos').orderBy('createdAt','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, status: doc.data().todoStatus})))
    })
  }, [])
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('');

  const addTodo = (e) =>{
    e.preventDefault();

    db.collection('todos').add({
      todo: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      todoStatus: false,
    })
    setInput('');
  }

  return (
    <div>
      <form>
        <FormControl>
          <InputLabel htmlFor="todo-input">Write your todo</InputLabel>
          <Input id="todo-input" value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add
        </Button>
      </form>


      <ul>
        
        {todos.map(todo => {
          return <Todo key={todo.id} id={todo.id} text={todo.todo} todoStatus={todo.status}/>
        })}
      </ul>
    </div>
  )
}

export default Todos
