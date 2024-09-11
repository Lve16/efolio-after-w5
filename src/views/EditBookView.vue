<template>
    <div class="container">
      <h1>Edit Book by ISBN</h1>
      <form @submit.prevent="updateBookByISBN">
        <div class="form-group">
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" class="input" required />
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" class="input" required />
        </div>
        <button type="submit" class="btn">Update Book</button>
        <button type="button" class="btn btn-delete" @click="deleteBookByISBN">Delete Book</button>
      </form>   
      <AllBooks /> 
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { doc, updateDoc, deleteDoc, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
  import db from '../firebase/init.js';
  
  import AllBooks from '../components/AllBooks.vue';

  
  export default {
    components: {
      AllBooks
    },
    setup() {
      const isbn = ref('');
      const name = ref('');
  

      const updateBookByISBN = async () => {
        try {
          const q = query(collection(db, 'books'), where('isbn', '==', Number(isbn.value)), orderBy('isbn', 'asc'), limit(1));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (docSnapshot) => {
              const bookRef = doc(db, 'books', docSnapshot.id);
              await updateDoc(bookRef, {
                name: name.value
              });
              alert('Book updated successfully');
              isbn.value = '';
              name.value = '';
            });
          } else {
            alert('No book found with this ISBN');
          }
        } catch (error) {
          console.error('Error updating book:', error);
        }
      };
  
   
      const deleteBookByISBN = async () => {
        try {
          const q = query(collection(db, 'books'), where('isbn', '==', Number(isbn.value)), orderBy('isbn', 'asc'), limit(1));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (docSnapshot) => {
              const bookRef = doc(db, 'books', docSnapshot.id);
              await deleteDoc(bookRef);
              alert('Book deleted successfully');
              isbn.value = '';
              name.value = '';
            });
          } else {
            alert('No book found with this ISBN');
          }
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      };
  
      return {
        isbn,
        name,
        updateBookByISBN,
        deleteBookByISBN
      };
    }
  };
  </script>
  
  <style scoped>
 
  .container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .btn {
    padding: 10px 15px;
    background-color: #24d6c1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
    margin-bottom: 45px;
  }
  
  .btn-delete {
    background-color: rgb(212, 32, 44);
  }
  
  .btn:hover {
    background-color: #45a049;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  </style>
  
  