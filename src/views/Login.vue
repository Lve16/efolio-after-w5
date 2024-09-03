<template>
  <div class="login">
    <h1 class="title-font">Login</h1>
    <!-- <form @submit.prevent="loginUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="formData.username" placeholder="Username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="formData.password" placeholder="Password" required />
      </div>

      <button type="submit">Login</button>
    </form> -->
  </div>
</template>

<script>
// import { ref } from 'vue';
// import { useRouter } from 'vue-router';  

// export default {
//   setup() {
//     const formData = ref({
//       username: '',
//       password: ''
//     });

//     const givenUsername = 'vincent';
//     const givenPassword = 'qqqqqq';

//     const router = useRouter();  

//     const loginUser = () => {
//       if (formData.value.username === givenUsername && formData.value.password === givenPassword) {
//         alert('Login successfully!');
//         localStorage.setItem('loggedInUser', formData.value.username); 
//         router.push('/about');  
//       } else {
//         alert('Invalid username or password');
//       }
//     };

//     return {
//       formData,
//       loginUser
//     };
//   }
// };
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.title-font {
  font-family: 'Papyrus', fantasy; 
  font-size: 38px; 
  font-weight: bolder;
  text-align: center;
  margin-bottom: 72px; 
}

.login {
  max-width: 600px;
  margin: 60px auto;
}

label {
  display: block;
  margin-bottom: 8px;
  font-family: 'Comic Sans MS', cursive;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 22px;
}

button {
  width: 60%;
  padding: 15px;
  background-color: #2b0bc7;
  color: white;
  border: none;
  font-size: 20px; 
  font-weight: bold; 
  font-family: 'Comic Sans MS', cursive; 
  cursor: pointer; 
  margin-top: 75px;
}
</style>