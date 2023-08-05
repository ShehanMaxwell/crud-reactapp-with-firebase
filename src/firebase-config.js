import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB-lHEuyYi6LN0jEuSZzZHRy7hVzOlKHwc',
  authDomain: 'crud-reactapp-firebase.firebaseapp.com',
  projectId: 'crud-reactapp-firebase',
  storageBucket: 'crud-reactapp-firebase.appspot.com',
  messagingSenderId: '516265640524',
  appId: '1:516265640524:web:51eed4fc26a7b131dcaae9',
  measurementId: 'G-THE9J0CM95',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
