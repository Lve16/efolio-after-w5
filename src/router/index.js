// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
// import Login from '../views/Login.vue'
// import FirebaseSignin from '../views/FirebaseSignin.vue'
// import FirebaseRegiter from '../views/FirebaseRegiter.vue'
// import Admin from '../views/Admin.vue'
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: AboutView,
//     meta: { requiresAuth: true } 
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   },
//   {
//     path: '/FireLogin',
//     name: 'FireLogin',
//     component: FirebaseSignin
//   },
//   {
//     path: '/FireRegister',
//     name: 'FireRegister',
//     component: FirebaseRegiter
//   },
//   {
//     path: '/admin',
//     name: 'Admin',
//     component: Admin,
//     meta: { requiresAuth: true, requiresAdmin: true } 
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// router.beforeEach((to, from, next) => {
//   const auth = getAuth();
//   const db = getFirestore();

//   onAuthStateChanged(auth, async (user) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//       if (!user) {
//         console.log("User not logged in, redirecting to login page.");
//         next('/FireLogin');
//       } else {
//         if (to.matched.some(record => record.meta.requiresAdmin)) {
//           const docRef = doc(db, "users", user.uid);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             const userRole = docSnap.data().role;
//             console.log(`User role is ${userRole}`);
//             if (userRole === 'admin') {
//               next(); 
//             } else {
//               console.log("User is not admin, redirecting to home page.");
//               next('/'); 
//             }
//           } else {
//             console.log("No user role found, redirecting to home page.");
//             next('/'); 
//           }
//         } else {
//           next(); 
//         }
//       }
//     } else {
//       next(); 
//     }
//   });
// });

// export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Login from '../views/Login.vue'
import FirebaseSignin from '../views/FirebaseSignin.vue'
import FirebaseRegiter from '../views/FirebaseRegister.vue'
import Admin from '../views/Admin.vue'
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSignin
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegiter
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      console.log("User status: not logged in -> redirecting to login page.");
      alert("Please login first!")
      return next('/FireLogin');
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userRole = docSnap.data().role;
            console.log(`User role is ${userRole}`);
            if (userRole === 'admin') {
              return next(); 
            } else {
              console.log("User role is not admin, redirecting to home page.");
              return next('/'); 
            }
          } else {
            console.log("No user role found, redirecting to home page.");
            return next('/'); 
          }
        } catch (error) {
          console.error("Error fetching user role: ", error);
          return next('/'); 
        }
      } else {
        return next(); 
      }
    }
  } else {
    return next(); 
  }
});

export default router;
