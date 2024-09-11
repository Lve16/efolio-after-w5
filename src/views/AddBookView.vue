<template>
    <div class="container">
        <h1>Add Book</h1>
        <form class="form" @submit.prevent="addBook">
            <div class="form-group">
                <label for="isbn">ISBN: </label>
                <input type="text" v-model="isbn" id="isbn" class="input" required />
            </div>
            <div class="form-group">
                <label for="name">Name: </label>
                <input type="text" v-model="name" id="name" class='input' required />
            </div>
            <button type="submit" class="btn">Add Book</button>
        </form>
        <BookList />
    </div>
</template>

<script>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';

import BookList from '../components/BookList.vue';

export default {
    setup() {
        const isbn = ref('');
        const name = ref('');

        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }

                await addDoc(collection(db,'books'), {
                    isbn: isbnNumber,
                    name: name.value
                });
                isbn.value = '';
                name.value = '';
                alert('Book added successfully!')
            } catch (error) {
                console.error('Error adding book: ', error);
            }
        };

        return {
            isbn,
            name,
            addBook
        };
    },
    components: {
        BookList
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
  background-color: #2819ce;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 45px;
}

.btn:hover {
  background-color: #45a049;
}


h1 {
  text-align: center;
  color: #333;
}


@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .btn {
    width: 100%;
    padding: 12px;
  }
}
</style>
