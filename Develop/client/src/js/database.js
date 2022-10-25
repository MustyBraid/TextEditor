import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("Put to the database");

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log("data saved to the database", result);
};

export const getDb = async () => {
  console.log("GET from database");

  const contactDb = await openDB("jate", 1);

  const tx = contactDb.transaction("jate", "readonly");

  const store = tx.objectStore("jate");

  const request = store.getAll();

  const result = await request;
  console.log("result.value", result);
  //This part was tricky, had to look at editor.js to see that it couldn't handle ALL of result
  return result.value;
};

initdb();
