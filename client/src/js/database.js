import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to jate database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate','readwrite');
  const store = tx.objectStore('jate');
  const req = store.put({ id: 1, content: content } );
  const res = await req;
  console.log('Posted to jate database');
  return res;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get all data from jate database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const req = store.get(1);
  const res = await req;
  console.log('res.value', res.content);
  return res.content;
};

initdb();
