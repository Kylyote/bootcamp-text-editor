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

// TODO: Add logic to a method that accepts some content and adds it to the database
//export const putDb = async (content) => console.error("putDb not implemented");
export const putDb = async (id, content) => {
  console.log("PUT to the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: id, jate: content });
  const result = await request;
  console.log(`This is the data: ${result}`);
};

// TODO: Add logic for a method that gets all the content from the database
//export const getDb = async () => console.error("getDb not implemented");
export const getDb = async () => {
  console.log("GET all from database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  // console.log(JSON.stringify(result));
  // console.dir(result);
  // result.forEach((element) => console.log(element.content));
  console.log(`Everything in the DB: ${result}`);
  // Need to add .content after result to get the array the data is stored in
  return result.content;
};

initdb();
