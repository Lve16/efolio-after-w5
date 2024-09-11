<template>
    <div>
      <h2>Books List</h2>
      <ul>
        <li v-for="book in books" :key="book.id">
          ISBN: {{ book.isbn }} - Name: {{ book.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
  import db from '../firebase/init.js';
  
  export default {
    setup() {
      const books = ref([]);
  
      const fetchBooks = () => {
        
          const booksColl = query(
          collection(db, 'books'),
          orderBy('isbn', 'asc'));

          onSnapshot(booksColl, (snapshot) => {
            books.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
          });
        };
  
      onMounted(fetchBooks);
  
      return {
        books
      };
    }
  };
  </script>
  