import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import List from './pages/List';
import Addlist from './pages/AddList';
import Edit from './pages/Edit';

function Next_page() {
    return <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path='/Add' element={<Addlist />}/>
          <Route path = '/Edit' element = { <Edit/>} /> 
        </Routes>
      </Router>
    </>
  }
  
  export default Next_page;