<template>
  <fragment>
    <button class="btn btn-lg btn-lightgreen" :class="buttonClasses || 'btn'" type="button" @click="doCreate()">
      {{ buttonText }}
    </button>
    <div id="modal-with-spinner" class="modal fade in" aria-labelledby="saveModalLabel" role="dialog" tabindex="-1">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="text-center" v-if="modalContent == null || modalContent === MODAL_ACTION" id="saveModalLabel">
              {{ uppercaseAction }} {{ objectName }}... <img :src="gifUrl" alt="loading"/>
            </h1>
            <h1 class="text-center" v-if="modalContent === MODAL_ERROR && modalErrors">
              The following errors occurred while {{ action }} the {{ objectName }}:
            </h1>
            <ul v-if="modalErrors">
              <li v-for="(error, index) in modalErrors" :key="index">
                {{ error }}
              </li>
            </ul>
            <h1 class="text-center" v-if="modalContent === MODAL_ERROR && !modalErrors">
              An unknown error occurred while {{ action }} the {{ objectName }}.
            </h1>
          </div>
          <div class="modal-body" v-if="modalContent === MODAL_ERROR">
            <button type="button" class="btn btn-lg btn-full btn-lightgreen save_btn" @click="closeModal()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import {Fragment} from 'vue-fragment';
import ariaDescribedBy from "../mixins/aria-described-by.js";
import httpMixin from "../mixins/http.js";

export default {
  name: "SubmitButtonWithSpinner",
  components: {
    Fragment
  },
  props: [
    "createObjectUrl",
    "formId",
    "getData",
    "parsleyClass",
    "gifUrl",
    "objectName",
    "buttonText",
    "action",
    "buttonClasses"
  ],
  mixins: [ariaDescribedBy, httpMixin],
  data() {
    return {
      MODAL_ERROR: "error",
      MODAL_ACTION: "doing-action",
      modalContent: "",
      modalErrors: null
    }
  },
  computed: {
    uppercaseAction() {
      return this.action.charAt(0).toUpperCase() + this.action.substr(1);
    }
  },
  methods: {
    closeModal() {
      $('modal-with-spinner').modal('hide');
    },
    dataForPost() {
      return this.getData();
    },
    doCreate() {
      if (!this._validateForm(this.formId, this.parsleyClass)) {
        return false
      }
      this.modalContent = this.MODAL_ACTION

      // This modal should stay open while the backend is processing. Then the close button will be displayed.
      $('#modal-with-spinner').modal({backdrop: 'static', keyboard: false, showClose: false})

      this.post(this.createObjectUrl, this.dataForPost()).then(async (response) => {
        const data = await response.json()
        window.parent.location = window.viewObjectUrl || data.redirect_url
      }, (response) => {
        this.modalContent = this.MODAL_ERROR
        if (response.data instanceof Object) {
          // Display the errors returned by the backend
          // Object.values is not supported by IE, so use Object.keys
          this.modalErrors = Object.keys(response.data).reduce(function (errorsArray, errorKey) {
            var responseErrors = response.data[errorKey]
            var newErrors = responseErrors.map(function (err) {
              return err.message
            })
            return errorsArray.concat(errorKey + ": " + newErrors)
          }, [])
        } else {
          // Unknown error
          this.modalErrors = null
        }
      })
    },
    _validateForm(formId, parsleyClass) {
      // TODO Future Work: get off of parsley
      var parsleyOptions = {}
      if (parsleyClass) {
        parsleyOptions = {
          classHandler: function (el) {
            return el.$element.closest(parsleyClass)
          },
          errorsContainer: function (el) {
            return el.$element.closest(parsleyClass)
          }
        }
      }
      var isValid = $(formId).parsley(parsleyOptions).validate()
      if (!isValid) {
        this.addAriaDescribedby()
      }
      return isValid
    }
  }
}
</script>

<style scoped>

</style>