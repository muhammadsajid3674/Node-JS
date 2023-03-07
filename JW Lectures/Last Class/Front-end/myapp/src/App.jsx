import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState(null)
  const [todo, setTodo] = useState([])
  const [refresh, setRefresh] = useState(false)

  const submitTodo = () => {
    const objToSend = {
      todo: text,
    }
    axios.post('http://localhost:5000/api/todo', objToSend)
      .then(res => {
        if (res.data.status) {
          setRefresh(!refresh)
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err))
  }

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todo/${id}`)
      .then(res => {
        if (res.data.status) {
          setRefresh(!refresh)
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err))
  }

  const editTodo = (id) => {
    const newValue = prompt('Enter new value')
    const objToSend = {
      id: id,
      todo: newValue
    }
    axios.put(`http://localhost:5000/api/todo`, objToSend)
      .then(res => {
        if (res.data.status) {
          setRefresh(!refresh)
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/todo')
      .then(res => setTodo(res.data.todo))
      .catch(err => console.log(err))
  }, [refresh])

  return (
    <div style={{ margin: '10px' }}>
      <input type="text" placeholder='Enter Todo' onChange={(e) => setText(e.target.value)} />
      <button onClick={submitTodo}>Submit</button>
      <ul>
        {todo.length > 0 && todo.map(e =>
          <li key={e._id}>
            <span>{e.todo}</span>
            <button onClick={() => deleteTodo(e._id)}>Delete</button>
            <button onClick={() => editTodo(e._id)}>Edit</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
