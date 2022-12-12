import { openDB } from 'idb';

const initdb = async () =>
  openDB('text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text')) {
        console.log('text database already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('text database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// dummy comment for heroku deploy
export const putDb = async (content) => {
  console.log('PUT to the database');

  const editorDb = await openDB('text', 1);

  const tx = editorDb.transaction('text', 'readwrite');

  const store = tx.objectStore('text');

  const request = store.put({ id: 1, content: content });

  const result = await request;

console.log('data put request to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log ('GET from the database');

  const editorDb = await openDB('text', 1);

  const tx = editorDb.transaction('text', 'readonly');

  const store = tx.objectStore('text');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
