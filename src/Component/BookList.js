import {useEffect, useState} from 'react'
import { Table, Button } from "react-bootstrap";
import BookService from '../Book.Service';
import { auth } from '../Firebase-config';

const BookList = ({getBookId, isAuth }) => {

  //storing the data in an array 
  const [postList, setpostList] = useState([]);

  const getposts = async ()=>{
   const data = await BookService.getAllBooks();
   setpostList(data.docs.map((doc) => ({...doc.data(), id: doc.id }))) //mapping the data to target our values needed...
   //console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
 }
 
   //rendering it to the browser
   useEffect(()=>{
     getposts();
   }, [])

 //delete functionality btn
 const deleteHandler = async (id) =>{
   if(window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS ITEM ?")){
      await BookService.deleteBook(id);
      getposts();
   }
 }



  return (
   <>
    <div className="mb-2" >
      <Button variant="dark edit" onClick={getposts} > Refresh List </Button>
    </div>

    <Table striped  hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Book Author</th>
                <th>Status</th>
                <th>Login user</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
          {postList.map((doc, index)=>{
            return(
              <tr key={index} >
              <td>{index + 1}</td>
              <td>{doc.title}</td>
              <td>{doc.author}</td>
              <td>{doc.status}</td>
              <td>@{doc.USER.name}</td>
              {
                isAuth && doc.USER.id === auth.currentUser.uid && (
                  <>
                   <td> <Button variant="secondary" className="edit" onClick={(e)=>{getBookId(doc.id)}}> Edit </Button> </td>
                   <td> <Button  variant="danger" className="delete" onClick={(e)=>{deleteHandler(doc.id)}} > Delete </Button> </td>
                  </>
                )
              }
          </tr>
            )
          })}
            
        </tbody>
    </Table>
   
   
   </>
  )
}

export default BookList
