import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/home';
import WhatsApp from './Components/whatsapp';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route exact path='/whatsapp' element={ <WhatsApp /> } ></Route>
        </Routes>
        
      </Router>
        
    </div>
  );
}

export default App;
