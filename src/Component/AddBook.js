import { useState, useEffect } from 'react';
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {  auth } from '../Firebase-config';
import BookService from '../Book.Service';

const AddBook = ( {id, setBookId , isAuth } ) => {

  
  const navigate = useNavigate();

  const [status, setStatus] = useState("Available"); //state for the status
  const [flag, setFlag] = useState(true);            //state for th flag disable
  const [title, setTitle] = useState("");            // state for the input title
  const [author, setAuthor] = useState("");          // state for the input author
  const [message, setMessage] = useState({ error: false, msg: "" }); // state for the msg


    //Submit functionality
    const handleSubmit = async (e)=>{
      e.preventDefault();

      if (title === "" || author === "") {
          setMessage({ error: true, msg: "All fields are mandatory!" });
          return;
      }

      const newBook = {
          title,
          author,
          status,
          USER: {name: auth.currentUser.displayName, id: auth.currentUser.uid }
        };

         try {
          if(id !== undefined && id !== ""){
              await BookService.updateBook(newBook);
              setBookId("");
              setMessage({ error: false, msg: "Updated successfully!" });
          } else{
              await BookService.addBooks(newBook);
              setMessage({ error: false, msg: "New Book added successfully!" });
          }
         } catch (err) {
          setMessage({ error: true, msg: err.message });
         }
        
              navigate('/');  
              setTitle(""); 
              setAuthor("");
              setMessage("");  
  }

      //protecting the route
      //if not authenticated redirect to login page...
      useEffect(()=>{
          if(!isAuth){
          navigate('/login')
          }
      }, []) 

      // functionality for edit btn and also getting the prev data 
      const editHandler = async () => {
        setMessage("");
        try {
          const docSnap = await BookService.getBook(id);
          console.log("the record is :", docSnap.data());
          setTitle(docSnap.data().title);
          setAuthor(docSnap.data().author);
          setStatus(docSnap.data().status);
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
      };

            //redering into the browser  
            useEffect(() => {
                //console.log("The id here is : ", id);
                if (id !== undefined && id !== "") {
                  editHandler();
                }
            }, [id]);

  return (
   <>
      <div>
    
    {message?.msg && (
           <Alert
             variant={message?.error ? "danger" : "success"}
             dismissible
             onClose={() => setMessage("")}
           >
             {message?.msg}
           </Alert>
         )}
     <h5>{status}</h5>
 
     <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="formBookTitle" >
             <InputGroup>
               <InputGroup.Text id="formBookTitle" > B </InputGroup.Text>
               <Form.Control 
               type='text' 
               placeholder='Book Title'
               value={author}
               onChange={(e) => setAuthor(e.target.value)}
               />
             </InputGroup>
         </Form.Group>
 
         <Form.Group className="mb-3" controlId="formBookTitle" >
             <InputGroup>
               <InputGroup.Text id="formBookAuthor"> A </InputGroup.Text>
               <Form.Control 
               type='text' 
               placeholder='Book Author'
               value={title}
               onChange={(e) => setTitle(e.target.value)} />
             </InputGroup>
         </Form.Group>
 
         <ButtonGroup aria-label="Basic example" className="mb-3">
             
             <Button 
             variant="success"  
             disabled={flag}
             onClick={(e)=> {
                 setStatus("Available");
                 setFlag(true);
             }}> Available </Button>
 
             <Button 
             variant="danger" 
             disabled={!flag}
             onClick={()=>{
                 setStatus("Not Available");
                 setFlag(false);
             }}> Not Available </Button>
         </ButtonGroup>
 
         <div className='d-grid gap-2'>
             <Button variant="primary" type="Submit"> Submit </Button>
         </div>
 
     </Form>
    </div>
   
   </>
  )
}

export default AddBook
