import { db } from './Firebase-config'
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

 //creating a collection in firestore
 const collectionRef = collection(db, 'BOOKSTORE' );

  class BookDataService {

     //adding a new post or book
     addBooks = (newBook) => {
         return addDoc(collectionRef, newBook);
     };

     //getting all the data or books in the database
     getAllBooks = () => {
         return getDocs(collectionRef);
     };

       //for deleting a bookList 
       deleteBook = (id) => {
         const bookDoc = doc(db, 'BOOKSTORE', id);
         return deleteDoc(bookDoc);
       };

       getBook = (id) => {
         const bookDoc = doc(db, 'BOOKSTORE', id);
         return getDoc(bookDoc);
       };

       updateBook = (id, updatedBook) => {
         const bookDoc = doc(db, "BOOKSTORE", id);
         return updateDoc(bookDoc, updatedBook);
       };
       
  }

  export default new BookDataService();

