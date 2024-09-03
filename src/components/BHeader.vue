<!-- <template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">
            Firebase Register
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>

<script>
</script> -->

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn">
          <router-link to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn">
          <router-link to="/FireRegister" class="nav-link" active-class="active">
            Firebase Register
          </router-link>
        </li>
        <li class="nav-item" v-if="loggedIn && isAdmin">
          <router-link to="/admin" class="nav-link" active-class="active">
            Admin
          </router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <button @click="logout" class="nav-link btn btn-link">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
// import { getAuth } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";

// export default {
//   data() {
//     return {
//       loggedIn: false,
//       isAdmin: false
//     };
//   },
//   async created() {
//     const auth = getAuth();
//     const db = getFirestore();
    
//     auth.onAuthStateChanged(async user => {
//       if (user) {
//         this.loggedIn = true;
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           this.isAdmin = docSnap.data().role === "admin";
//         } else {
//           console.log("No such document!");
//         }
//       } else {
//         this.loggedIn = false;
//         this.isAdmin = false;
//       }
//     });
//   },
//   methods: {
//     logout() {
//       const auth = getAuth();
//       auth.signOut().then(() => {
//         this.$router.push('/');
//       });
//     }
//   }
// };
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      loggedIn: false,
      isAdmin: false,
      currentUser: null, // store current user information
    };
  },
  async created() {
    const auth = getAuth();
    const db = getFirestore();
    
    auth.onAuthStateChanged(async user => {
      if (user) {
        this.loggedIn = true;
        this.currentUser = user; 
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.isAdmin = docSnap.data().role === "admin";
        } else {
          console.log("No such document!");
        }
      } else {
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = null; // clear current user information
      }
    });
  },
  methods: {
    logout() {
      if (this.currentUser) {
        console.log("Current User before logout:", this.currentUser.email);
      } else {
        console.log("No user is currently logged in.");
      }

      const auth = getAuth();
      auth.signOut().then(() => {
        this.$router.push('/');
        console.log("User has been logged out.");
        this.currentUser = null; // clear current user information
      });
    }
  }
};

</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
