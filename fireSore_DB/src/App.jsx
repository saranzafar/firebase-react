import React from 'react'
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore"
import { app } from "./firebase"

function App() {
  const firestore = getFirestore()


  const writeData = async () => {
    const result = await addDoc(collection(firestore, "cities"), {
      name: "Tokyo",
      pinCode: 100000,
      lat: 35.6895,
      long: 139.6917
    })
    console.log("writeData: ", result);
  }

  const makeSubCollection = async () => {
    const result = await addDoc(collection(firestore, "cities/oHh9wAFzZyeaRdk8PbeZ/places"), {
      name: "Tokyo Tower",
      desc: "awsome description",
      date: Date.now()
    });
    console.log("makeSubCollection: ", result);

  }

  const getDocument = async () => {
    const ref = doc(firestore, "cities", "oHh9wAFzZyeaRdk8PbeZ");
    const snap = await getDoc(ref);
    console.log("getDocument: ", snap.data());
  }

  const getDocByQuery = async () => {
    const collectionRef = collection(firestore, "cities");
    const q = query(collectionRef, where("name", "==", "Tokyo"));
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
    })
  }

  const updateDocument = async () => {
    const docRef = doc(firestore, "cities", "oHh9wAFzZyeaRdk8PbeZ");
    const snap = await updateDoc(docRef, {
      name: "Kashmir"
    })
    console.log("updateDocument: ", snap);

  }


  return (
    <div>
      <div>App</div>
      <button onClick={writeData}>Make collection</button>
      <button onClick={makeSubCollection}>Write Sub Collection</button>
      <button onClick={getDocument}>Get Doc</button>
      <button onClick={getDocByQuery}>Get Doc By Query</button>
      <button onClick={updateDocument}>Update Doc</button>
    </div>
  )
}

export default App