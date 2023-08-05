import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from '@firebase/firestore';
import { async } from '@firebase/util';

function App() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, 'users');

  const createUser = async () => {
    await addDoc(userCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    };

    getUsers();
  }, []);

  return (
    <div className='App'>
      <input
        placeholder='Name...'
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type='number'
        placeholder='Age...'
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      <div>
        <h1 style={{ color: 'blue', fontStyle: 'italic' }}>
          After each create/update/delete operations, Reload the webpage to see
          changes!
        </h1>
      </div>
      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {' '}
              Delete User{' '}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
