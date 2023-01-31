import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/home';
import WhatsApp from './Components/whatsapp';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from './firebase';
import Snackbar from './Components/Snackbar';

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const DEFAULT_AVATAR = 'https://saiuniversity.edu.in/wp-content/uploads/2021/02/default-img.jpg'

function App() {

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
