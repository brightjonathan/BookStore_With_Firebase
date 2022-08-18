import './App.css';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NarBar from './Pages/NarBar';
import Home from './Pages/Home'
import Login from './Pages/Login';
import Create from './Pages/Create';

const App = () => {

   //useState for checking if user is authenticated
   const [isAuth , setisAuth] = useState(localStorage.getItem('isAuth'));  //store the Auth on local storage
   const [bookId, setBookId] = useState(""); //state of the book id

   const getBookIdHandler = (id) => {
    //console.log("The ID of document to be edited: ", id);
    //window.location.pathname = "/create";
    setBookId(id);
  };


  return (
    <div>
       <Router>
        <NarBar isAuth={isAuth} setisAuth={setisAuth} />
        <Routes>
         <Route path='/' element={<Home getBookId={getBookIdHandler} isAuth={isAuth} />} />
         <Route path='/login' element={ <Login setisAuth={setisAuth} />} />
         <Route path='/create' element={<Create id={bookId} setBookId={setBookId} isAuth={isAuth} />} />
        </Routes>
    </Router>
    </div>
  )
}

export default App


