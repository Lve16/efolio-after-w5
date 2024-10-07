<template>
    <div>
      <div v-if="jsonData">
        <pre>{{ jsonData }}</pre> 
      </div>
      <div v-else-if="error">
        <p>Error fetching books: {{ error.message }}</p> 
      </div>
      <div v-else>
        <p>Loading...</p> 
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'GetAllBookAPI',
    data() {
      return {
        jsonData: null,  
        error: null,     
      };
    },
    mounted() {
      this.fetchAllBooks();
    },
    methods: {
      async fetchAllBooks() {
        try {
          const response = await axios.get('https://getallbooks-3hworouzva-uc.a.run.app'); 
          this.jsonData = JSON.stringify(response.data, null, 2);  
          this.error = null;
        } catch (error) {
          console.error('Error fetching books:', error);
          this.error = error;
        }
      },
    },
  };
  </script>