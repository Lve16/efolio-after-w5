/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.addBookWithUppercase = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { isbn, name } = req.body;

      if (!isbn || !name) {
        return res.status(400).send("Missing required fields: isbn or name");
      }

      
      const newBook = {
        isbn: isbn, 
        name: name.toUpperCase(),
      };

      
      const booksCollection = admin.firestore().collection("books");
      await booksCollection.add(newBook);

      res.status(200).send({
        message: "New book added successfully",
        data: newBook,
      });
    } catch (error) {
      console.error("Error adding new book:", error.message);
      res.status(500).send("Error adding new book");
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      const booksArray = [];
      snapshot.forEach((doc) => {
        booksArray.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).send(booksArray);
    } catch (error) {
      console.error("Error fetching all books:", error.message);
      res.status(500).send("Error fetching books");
    }
  });
});
