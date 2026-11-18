<template>
  <div>
    <v-btn @click="openAddBookDialog">Ajouter un livre</v-btn>
    <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>

    <!-- Liste des livres -->
    <v-data-table :items="books" :headers="headers" item-value="id">
      <template v-slot:[`item.coverImagePath`]="{ item }">
      <!-- Wrap the image in a button to trigger the dialog -->
      <v-img 
        :src="getFullImageUrl(item.raw.coverImagePath)"
        max-width="100" 
        eager 
        @click="openImageDialog(item.raw.coverImagePath)"
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
        <v-btn icon="mdi-pencil" variant="text" aria-label="Modifier le livre" @click="editBook(item.raw)">
        </v-btn>
        <v-btn icon="mdi-delete" variant="text" aria-label="Supprimer le livre" @click="deleteBook(item.raw)">
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog pour ajouter/modifier un livre -->
    <v-dialog v-model="dialog" max-width="500px"  @close="resetForm">
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
          <div v-if="previewImage" class="preview-container">
            <v-img :src="previewImage" max-width="100" class="image-preview" />
          </div>
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
import { bookService } from '@/services/bookService';

const localBookImages = import.meta.glob('../assets/img/*', {
  eager: true,
  import: 'default',
  query: '?url'
});

export default {
  name: 'BookManagement',
  data() {
    return {
      headers: [
        { title: 'Id', key: 'id' },
        { title: 'Titre', key: 'title' },
        { title: 'Description', key: 'description' },
        { title: 'Prix (€)', key: 'price' },
        { title: 'ISBN', key: 'isbn' },
        { title: 'Couverture', key: 'coverImagePath' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      books: [],
      dialog: false,
      editMode: false,
      book: {}, 
      imageDialog: false,     // Controls the visibility of the dialog
      selectedImage: null, 
      previewImage: null, 
      selectedFile: null, 
      errorMessage: '',
    };
  },
  watch: {
    book(newBook) {
      if (this.editMode && newBook.coverImagePath) {
        this.previewImage = this.getFullImageUrl(newBook.coverImagePath);
      }
    },
    dialog(newValue) {
      // Reset the form only when dialog is closed
      if (!newValue) {
        this.resetForm();
      }
    },
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        this.books = await bookService.getAll();
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = error.message || 'Impossible de charger les livres.';
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
    resetForm() {
      if (this.previewImage && this.previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(this.previewImage);
      }
      this.book = {};
      this.selectedFile = null;
      this.previewImage = null;  
      this.editMode = false;
    },
    handleFileUpload(event) {
      this.selectedFile = (event && event.target && event.target.files)
        ? event.target.files[0]
        : (Array.isArray(event) ? event[0] : event);
      if (this.selectedFile) {
        if (this.previewImage && this.previewImage.startsWith('blob:')) {
          URL.revokeObjectURL(this.previewImage);
        }
        this.previewImage = URL.createObjectURL(this.selectedFile); 
      }
    },
    getFullImageUrl(path) {
      if (!path || /^https?:\/\//i.test(path)) return path;
      const fileName = path.split(/[\\/]/).pop();
      const image = Object.entries(localBookImages)
        .find(([assetPath]) => assetPath.endsWith(`/${fileName}`));
      return image ? image[1] : '';
    },
    async saveBook() {
      try {
        const bookData = {
          ...this.book,
          title: (this.book.title || '').trim(),
          price: Number(this.book.price),
        };
        if (!bookData.title) throw new Error('Le titre du livre est obligatoire.');
        if (!Number.isFinite(bookData.price) || bookData.price <= 0) {
          throw new Error('Le prix doit être un nombre positif.');
        }
        if (this.editMode) {
          await bookService.update(bookData.id, bookData, this.selectedFile);
        } else {
          await bookService.create(bookData, this.selectedFile);
        }
        this.errorMessage = '';
        await this.fetchBooks();
        this.dialog = false;
      } catch (error) {
        this.errorMessage = error.message || 'Impossible d’enregistrer le livre.';
        console.error('Error saving book:', error);
      }
    },
    deleteBook(book) {
      if (confirm(`Voulez-vous vraiment supprimer le livre: ${book.title} ?`)) {
        bookService.delete(book.id)
          .then(() => this.fetchBooks())
          .catch((error) => {
            this.errorMessage = error.message || 'Impossible de supprimer le livre.';
            console.error('Error deleting book:', error);
          });
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
.preview-container {
  margin-bottom: 10px;
}
.image-preview {
  cursor: pointer;
}
</style>
