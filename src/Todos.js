import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import db from './config/firebase';
import firebase from 'firebase';
import Todo from './Todo';


function Todos() {
  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id ,todo: doc.data().todo})))
    })
  }, [])
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('');

  const addTodo = (e) =>{
    e.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // status:'todo'
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
          Add Todo
        </Button>
      </form>


      <ul>
        
        {todos.map(todo => {
          return <Todo key={todo.id} id={todo.id} text={todo.todo} timestamp={"Temp deadline..."} />
        })}
      </ul>
    </div>
  )
}

export default Todos
