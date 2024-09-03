<template>
    <div class="admin">
      <h1 class="admin-title">Admin Dashboard</h1>
      <div class="admin-content">
        <p>The admin dashboard allow admin to check user's status, whether they are online or offline.
          also, this page allow admin to see the number of users and types of users.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  // No script needed for now
  </script>
  
  
  <style scoped>
  .admin { 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  padding: 20px; /* Add padding to the container */
  }
  
  .admin-title {
  font-family: 'Papyrus', fantasy;  
  font-size: 2.5rem; /* Adjust size */
  margin-bottom: 24px;
  font-weight: bolder;
  color: #060315fd; 
  }
  
  .admin-content {
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.2rem;
  line-height: 1.6; 
  max-width: 800px; /* Limit the width of the content */
  color: #333; 
  text-indent: 2em;
  }
  </style>