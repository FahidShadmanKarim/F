
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from "./components/Signin";
import Login from './components/Login'
import Home from "./components/Home";
import Logout from "./components/Logout";
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import UpdateNotes from './components/UpdateNotes';
import Notes from './components/Notes';
function App() {
  


  return (
   <BrowserRouter>
   
     <div className="App"> 
            <Routes>
              <Route exact path="/" element={<Home/>}></Route>
              <Route exact path="/dashboard" element={<Dashboard/>}></Route>
              <Route exact path="/login" element={<Login/>}></Route>
              <Route exact path="/notes" element={<Notes/>}></Route>
              <Route exact path="/update-notes" element={<UpdateNotes/>}></Route>
              <Route exact path="/logout" element={<Logout/>}></Route>
            </Routes>
      </div>
  </BrowserRouter>
  )
}

export default App
