// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginpage from './pages/LoginPage';
import Next_page from './Next_page';
import VerificationPage from './pages/VerificationPage';
import { useSelector } from 'react-redux';
import VerificationRoute from './components/VerificationRoute.js'


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const loginStatus = useSelector((state) => state.user.login)

  return <>
  {loginStatus? <Next_page/> :  <VerificationRoute/>}
  
  </>
}

export default App;
