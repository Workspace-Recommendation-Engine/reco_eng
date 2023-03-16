import logo from './logo.svg';
import './App.css';
import { BrowserRouter, MemoryRouter as Router, Route, Routes}
    from 'react-router-dom';
import Landing from './landing/landing';
import Login from './registration/login';
import Signup from './registration/signup';
import Matches from './matches/matches';




function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/matches" element={<Matches/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
