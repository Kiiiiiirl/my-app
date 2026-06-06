import { useState, useRef, useEffect} from 'react'


import { db,auth } from ".././firebase";

import '.././styles/App.css'
import {doc,setDoc,updateDoc/*,collection,addDoc,getDoc, updateDoc*/ } from "firebase/firestore";

import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const userRef = doc(db, "users", "user123");

  async function login() {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("LOGGED IIIN")
      alert("Logged in");
      //loadData();
    } catch (err) {
      console.error(err.message);
    }
  }

  async function saveData() {
    try {
      /*
      await setDoc(doc(db, "users", auth.currentUser.uid),{
        favoriteColor: "pink",
        score: 100
      });
      */
      //var key = document.getElementById("keyD").value;
      //var value = document.getElementById("valD").value;

      //console.log(key);console.log(value);

      //let dict = {}
      //dict[key]= value;

    await updateDoc(
      doc(db, "users", auth.currentUser.uid), 
      {
      hobbies: ["drawing", "gaming", "coding", "music",{ test: "Object" },['test', 'array'],]
      }
    );
      console.log("DATA SAVED"); 
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
    <input
      type="email"
      placeholder="Email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={() => login()}>
      Login
    </button>
    <button onClick={saveData}>Save Data</button>
    </>
  );
}




