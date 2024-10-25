<template>
  <div>
    <v-btn @click="openAddBookDialog">Ajouter un livre</v-btn>

    <!-- Liste des livres -->
    <v-data-table :items="books" :headers="headers">
      <template v-slot:[`item.coverImagePath`]="{ item }">
      <!-- Wrap the image in a button to trigger the dialog -->
      <v-img 
        :src="getFullImageUrl(item.coverImagePath)" 
        max-width="100" 
        eager 
        @click="openImageDialog(item.coverImagePath)" 
        class="thumbnail-image" />

      <!-- Full-size image dialog -->
      <v-dialog v-model="imageDialog" max-width="600px">
        <v-card>
          <v-card-title>Image de couverture</v-card-title>
          <v-card-text>
            <v-img :src="getFullImageUrl(selectedImage)" max-width="100%" />
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="imageDialog = false">Fermer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
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
        { text: 'Id', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Price (€)', value: 'price' },
        { text: 'ISBN', value: 'isbn' },
        { text: 'Cover', value: 'coverImagePath' }, // Added for the cover image
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      books: [],
      dialog: false,
      editMode: false,
      book: {}, 
      imageDialog: false,     // Controls the visibility of the dialog
      selectedImage: null, 
      selectedFile: null, 
      baseUrl: 'https://localhost:5001', // Add your backend base URL here
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
    openImageDialog(imagePath) {
      this.selectedImage = imagePath;
      this.imageDialog = true;
    },
    editBook(book) {
      this.book = { ...book };
      this.editMode = true;
      this.dialog = true;
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0]; 
    },
    getFullImageUrl(path) {
      return `${this.baseUrl}${path}`;
    },
    async saveBook() {
      const formData = new FormData();
      formData.append('Id', this.book.id);
      formData.append('Title', this.book.title);
      formData.append('Description', this.book.description);
      formData.append('Price', this.book.price);
      formData.append('ISBN', this.book.isbn);
      
      if (this.book.coverImagePath) {
        formData.append('CoverImagePath', this.book.coverImagePath);
      }

      // Ajouter la nouvelle image si une image est sélectionnée
      if (this.selectedFile) {
        formData.append('coverImage', this.selectedFile);
      }
      console.log("Contenu du FormData avant l'envoi :");
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
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
      if (confirm(`Voulez-vous vraiment supprimer le livre: ${book.title} ?`)) {
        axios
          .delete(`https://localhost:5001/api/Books/Delete`, {
            params: {
              id: book.id,
            },
          })
          .then((response) => {
            if (response.status === 200 && response.data) {
              this.fetchBooks();
            } else {
              console.error('Failed to delete book');
            }
          })
          .catch((error) => {
            console.error('Error deleting book:', error);
          });
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
