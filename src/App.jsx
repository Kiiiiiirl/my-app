import { useState, useEffect} from 'react'
import { db,auth } from "./firebase";

import './App.css'

import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import {collection,addDoc,getDocs,doc, setDoc,updateDoc } from "firebase/firestore";


function App() {
  // ================LOGIN AND LOGOUT===============================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signup() {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created");
    } catch (err) {
      console.error(err.message);
    }
  }

  async function login() {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Logged in");
    } catch (err) {
      console.error(err.message);
    }
  }

  async function logout() {
    await signOut(auth);
  }



  // ================GET AND ADD DOCS===============================
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const snapshot = await getDocs(collection(db, "users"));

    snapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  }

  async function saveData() {
    try {
      /*
      await setDoc(doc(db, "users", auth.currentUser.uid),{
        favoriteColor: "pink",
        score: 100
      });
      */
      var key = document.getElementById("keyD").value;
      var value = document.getElementById("valD").value;

      console.log(key);console.log(value);

      let dict = {}
      dict[key]= value;

      await updateDoc(
        doc(db, "users", auth.currentUser.uid),dict
      );
      

      console.log("Saved!");
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <div>

        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>
          Login
        </button>

        <button onClick={logout}>
          Logout
        </button>

      </div>
      <br />

      <div>
        <input type="text" id='keyD' size={4} placeholder='key'/>
        <input type="text" id='valD' size={15} placeholder='value'/>
      </div>

      <br />

      <div>
        <button onClick={saveData}>
          Save Dataaa
        </button>
      </div>
    </>
  );
}

export default App;