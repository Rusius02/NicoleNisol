<template>
  <div>
    <v-btn @click="openAddBookDialog">Ajouter un livre</v-btn>

    <!-- Liste des livres -->
    <v-data-table :items="books" :headers="headers">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon @click="editBook(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteBook(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog pour ajouter/modifier un livre -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span v-if="!editMode">Ajouter un livre</span>
          <span v-else>Modifier le livre</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="book.title" label="Titre"></v-text-field>
          <v-text-field v-model="book.description" label="Description"></v-text-field>
          <v-text-field v-model="book.price" label="Prix" type="number"></v-text-field>
          <v-text-field v-model="book.isbn" label="ISBN"></v-text-field>
          <v-file-input label="Image de couverture" @change="handleFileUpload"></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false">Annuler</v-btn>
          <v-btn @click="saveBook">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookManagement',
  data() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Price (€)', value: 'price' },
        { text: 'ISBN', value: 'isbn' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      books: [],
      dialog: false,
      editMode: false,
      book: {}, 
      selectedFile: null, 
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('https://localhost:5001/api/Books/GetAll');
        this.books = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    openAddBookDialog() {
      this.book = {};
      this.editMode = false;
      this.selectedFile = null; 
      this.dialog = true;
    },
    editBook(book) {
      this.book = { ...book };
      this.editMode = true;
      this.dialog = true;
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0]; 
    },
    async saveBook() {
      const formData = new FormData();
      
      formData.append('Title', this.book.title);
      formData.append('Description', this.book.description);
      formData.append('Price', this.book.price);
      formData.append('ISBN', this.book.isbn);
      
      if (this.selectedFile) {
        formData.append('coverImage', this.selectedFile);
      }

      try {
        if (this.editMode) {
          await axios.put('https://localhost:5001/api/Books/updateBook', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          await axios.post('https://localhost:5001/api/Books/Create', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
        this.fetchBooks(); 
        this.dialog = false; 
      } catch (error) {
        console.error('Error saving book:', error);
      }
    },
    deleteBook(book) {
  try {
    axios
      .delete(`https://localhost:5001/api/Books/Delete`, {
        params: {
          id: book.id,  
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          console.log('Book deleted successfully');
          this.fetchBooks();
        } else {
          console.error('Failed to delete book');
        }
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
  } catch (error) {
    console.error('Error deleting book:', error);
  }
},
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
