import logo from './logo.svg';
import './App.css';
import { BrowserRouter, MemoryRouter as Router, Route, Routes}
    from 'react-router-dom';
import Landing from './landing/landing';
import Login from './registration/login';
import Signup from './registration/signup';
import Matches from './matches/matches';
import AboutUs from './AboutUs/aboutUs';
import HowItWorks from './howItWorks/howItWorks';
import SignUp2 from './registration/signup2';
import SignUp3 from './registration/signup3';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/matches" element={<Matches/>}/>
        <Route path="/aboutUs" element={<AboutUs/>}/>
        <Route path="/howItWorks" element={<HowItWorks/>}/>
        <Route path="/signup2" element={<SignUp2/>}/>
        <Route path="/signup3" element={<SignUp3/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
