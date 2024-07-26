import { openDB } from 'idb';

export const initDatabase = async () => {
  const db = await openDB('profileDB', 1, {
    upgrade(db) {
      db.createObjectStore('profiles', { keyPath: 'id' });
      db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    },
  });
  return db;
};

export const getProfileData = async (db) => {
  const tx = db.transaction('profiles', 'readonly');
  const store = tx.objectStore('profiles');
  const profile = await store.get(1); // Assuming profile ID is 1
  await tx.done;
  return profile || {
    id: 1,
    name: '',
    surname: '',
    gender: '',
    dob: '',
    country: '',
    occupation: '',
    phoneNumber: '',
    email: '',
    interests: '',
    profileImage: ''
  }; // Return default profile if not found
};

export const upsertProfileData = async (db, data) => {
  const tx = db.transaction('profiles', 'readwrite');
  const store = tx.objectStore('profiles');
  await store.put(data);
  await tx.done;
};

export const addUser = async (db, user) => {
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  await store.add(user);
  await tx.done;
};

export const getUsers = async (db) => {
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const users = await store.getAll();
  await tx.done;
  return users;
};

