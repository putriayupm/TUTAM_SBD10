import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get(`${API_URL}/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await axios.post(`${API_URL}/todos`, { title });
    setTitle('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff0f3', display: 'flex', justifyContent: 'center', padding: '50px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 20px rgba(255,182,193,0.3)' }}>
        <h1 style={{ color: '#e8637e', marginBottom: '8px', fontSize: '28px' }}>todo list putty!!!</h1>
        <form onSubmit={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Tambah todo..."
            style={{ flex: 1, padding: '10px 14px', fontSize: '15px', border: '1px solid #f9d0dc', borderRadius: '10px', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '10px 18px', background: '#e8637e', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            Tambah
          </button>
        </form>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #fce4ec' }}>
              <span style={{ color: '#2d1a20' }}>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)} style={{ color: '#e8637e', border: '1px solid #f9d0dc', background: 'white', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer' }}>
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;