<!-- <template>
    <h1>Create an Acccount</h1>
    <p><input type="text" placeholder="Email" v-model = "email"/></p>
    <p><input type="password" placeholder="Password" v-model = "password"/></p>
    <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { useRouter } from "vue-router";
const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("Firebase Register Successful!")
        router.push("/FireLogin")
    }).catch((error) => {
        console.log(error.code)
    })
};
</script> -->
<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password"/></p>
    
    <p>
      <select v-model="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </p>
  
    <p><button @click="register">Save to Firebase</button></p>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { getFirestore, doc, setDoc } from "firebase/firestore"; 
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const role = ref("user");  // set default role as "user"
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();  // initialise Firestore
  
  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
  
      // store user infomation on firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email.value,
        role: role.value
      });

      await auth.signOut();

      alert("Successfully register!")
      console.log("Firebase Register Successful!");
      router.push("/FireLogin");
    } catch (error) {
      console.log(error.code);
      console.log("An error occurred:", error);
      console.log("Error message:", error.message);
    }
  };
  </script>