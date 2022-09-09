<template>
  <div>
    <label>
      <span class="sr-only">Screening Notes</span>
      <textarea cols="25" ng-change="notesLoading = '* Save'" v-model="notesValue" rows="3"></textarea>
    </label>
    <br>
    <div v-if="notesValue && notesUpdatedValue" class="notes-updated-date">Last updated: {{ notesUpdatedValue }}</div>
    <button class="btn btn-lightgreen" @click="setNotes()" v-cloak type="button">{{ saveButtonText }}</button>
  </div>
</template>

<script>
  import httpMixin from "../mixins/http.js";

  export default {
    name: "NotesField",
    mixins: [httpMixin],
    props: [
      "id",
      "notes",
      "objIdName",
      "screeningNotesUrl",
      "notesUpdated",
    ],
    data() {
      return {
        notesValue: this.notes,
        notesUpdatedValue: this.notesUpdated,
        saveButtonText: 'Save',
      }
    },
    methods: {
      async setNotes() {
        const payload = {
          notes: this.notesValue
        }
        payload[this.objIdName] = this.id
        this.saveButtonText = 'Saving...'
        const response = await this.post(this.screeningNotesUrl, payload)
        if (response.ok) {
          this.saveButtonText = 'Saved!'
          this.notesUpdatedValue = new Date().toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short'})
        } else {
          this.saveButtonText = 'Error'
        }
      }
    }
  }
</script>