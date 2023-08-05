import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from '@firebase/firestore';

function App() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, 'users');

  const createUser = async () => {
    await addDoc(userCollectionRef, { name: newName, age: newAge });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
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
          </div>
        );
      })}
    </div>
  );
}

export default App;
