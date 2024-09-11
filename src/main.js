// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAgDxh32rGG8dRi1P2CZNLRm0WENiq1P8M",
//     authDomain: "week7-yuelu.firebaseapp.com",
//     projectId: "week7-yuelu",
//     storageBucket: "week7-yuelu.appspot.com",
//     messagingSenderId: "715540593062",
//     appId: "1:715540593062:web:10520b312f4588874ef767"
//   };

  // Initialize Firebase
// initializeApp(firebaseConfig);

// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')
