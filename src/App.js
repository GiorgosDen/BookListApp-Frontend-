import {useQuery} from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import "./App.css";
import { useState } from "react";

const uri = "http://localhost:3500/myBooks";

//function for post request (add new book)
function addBook(book){
    return axios.post(uri,book);
}

//function for delete request (delete a book)
function deleteBook(dbook){
  console.log(typeof dbook);
  return axios.delete(uri,{data:dbook});
}

function App() {
  
  const {data} = useQuery({queryKey:['todo'], 
    queryFn: ()=> fetch(uri).then(
      (res)=> res.json()),
    })

    //handle post request
    const mutationPOST = useMutation({
      mutationFn: addBook, 
      onSuccess: (book) => {
        // Do something on success, like showing a message or updating the cache
        console.log('Book added successfully:', book);
        window.location.reload();
      },
      onError: (error) => {
        // Handle error
        console.error('Error adding book:', error);
      },
    });

    //handle delete request
    const mutationDELETE = useMutation({
      mutationFn: deleteBook, 
      onSuccess: (dbook) => {
        // Do something on success, like showing a message or updating the cache
        console.log('Book removed successfully:', dbook);
        window.location.reload();
      },
      onError: (error) => {
        // Handle error
        console.error('Error removing book:', error);
      },
    });

    //  variable-setFuction for each form components
    const [id,setID] = useState('');
    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');

    //Example data to post
    const handleAddingBook = (event)=>{
      event.preventDefault();
      const newBook = {
        "title":title,
        "author":author
      };
      mutationPOST.mutate(newBook);
    }

    //Example data to post
    const handleDeletingBook = (event)=>{
    event.preventDefault();
    const delBook = {
      "id":id
    };
    mutationDELETE.mutate(delBook);
    }
    
    return (
    <div className="App">
      <h1>Books</h1>
      <table>
        <thead>
        <tr>
            <th>Book ID</th>
            <th>Book Title</th>
            <th>Book Author</th>
        </tr>
        </thead>
        <tbody>
        {data?(
          data?.map( (todo,i) => (
          <tr key={i}>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.author}</td>
          </tr>)
          )
        ):(
          <tr className="errMessRow" >
            <td colSpan={3}>Data not Availiable</td>
          </tr>
        )}
        </tbody>
        </table>
        
        <form name="addNewBookForm">
          <h2>Add New Book</h2>
          <h3>ID</h3>
          <input type="text" name="cBookID" value={id} onChange={(e) => { setID(e.target.value) }}></input>
          <h3>Title</h3>
          <input type="text" name="cBookTitle" value={title} onChange={(e) => { setTitle(e.target.value) }}></input>
          <h3>Author</h3>
          <input type="text" name="cBookAuthor" value={author} onChange={(e) => { setAuthor(e.target.value) }}></input>
          <br></br>
          <button onClick={handleAddingBook}>Add Book</button>
          <button onClick={handleDeletingBook}>Delete Book</button>
        </form>
    </div>
  );
}

export default App;
