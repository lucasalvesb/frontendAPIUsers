import { useEffect, useState } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './api';
import './App.css'

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  const handleAddUser = async () => {
    const newUser = { name, email, phone, cpf };
    try {
      const addedUser = await addUser(newUser);
      setUsers([...users, addedUser]);
      setName('');
      setEmail('');
      setPhone('');
      setCpf('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      await updateUser(user);
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="form-container">
      <h1>User Management</h1>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
      </div>
<ul>
  {users.length > 0 && (
  <li className="title-row">
    <span className="title">Name</span>
    <span className="title">Email</span>
    <span className="title">Phone</span>
    <span className="title">CPF</span>
  </li>
  )}
  {users.map((user) => (
    <li key={user.id}>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <span>{user.phone}</span>
      <span>{user.cpf}</span>
      <button onClick={() => handleUpdateUser(user)}>Edit</button>
      <button className="delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
  );
}