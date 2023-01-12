import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/home';
import WhatsApp from './Components/whatsapp';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from './firebase';
import { useEffect } from 'react';
import Snackbar from './Components/Snackbar';

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const DEFAULT_AVATAR = 'https://saiuniversity.edu.in/wp-content/uploads/2021/02/default-img.jpg'

function App() {
  // useEffect(() => {
  //   async function fetchUsers() {
  //     const users = await db.collection("chats").onSnapshot(
  //       async snapshot => {
  //         const updatedData = await db.collection("chats").orderBy("updatedAt")
  //         console.log(updatedData.docs)
  //         snapshot.docChanges().forEach(change => {
  //           if (change.type === "added") {
  //             console.log("New document: ", change.doc.data());
  //           }
  //           if (change.type === "modified") {
  //             console.log("Modified document: ", change.doc.data());
  //           }
  //           if (change.type === "removed") {
  //             console.log("Removed document: ", change.doc.data());
  //           }
  //         });
  //       }
  //     )
  //     // console.log(users?.data())
  //     return users
  //   }
  //   fetchUsers()
  // }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/whatsapp' element={<WhatsApp />} ></Route>
        </Routes>

      </Router>
      <Snackbar />
    </div>
  );
}

export default App;
