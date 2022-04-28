(function() {
  Vue.component('submit-button-with-spinner', {
    mixins: [httpMixin],
    props: ['formId', 'parsleyClass', 'objectName', 'gifUrl', 'action', 'buttonTextHandle', 'createObjectUrl', 'dataHandle', 'buttonClasses'],
    data: function() {
      return {
        MODAL_ERROR: "error",
        MODAL_ACTION: "doing-action",
        modalContent: "",
        modalErrors: null,
      }
    },
    computed: {
      uppercaseAction() {
        return this.action.charAt(0).toUpperCase() + this.action.substr(1);
      },
      computedButtonText() {
        // for our purposes, this.$parent is the controller
        return this.$parent[this.buttonTextHandle];
      }
    },
    methods: {
      handleFailure(response) {
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
      },
      getDataForPost() {
        return this.$parent[this.dataHandle]();
      },
      doCreate() {
        if (!this._validateForm(this.formId, this.parsleyClass)) {
          return false;
        }
        this.modalContent = this.MODAL_ACTION;

        // This modal should stay open while the backend is processing. Then the close button will be displayed.
        $('#modal-with-spinner').modal({backdrop: 'static', keyboard: false})

        this.post(this.createObjectUrl, this.getDataForPost()).then(function successCallback(response) {
            window.parent.location = window.viewObjectUrl || response.data.redirect_url
          }, this.handleFailure)
      },
      _validateForm() {
        var parsleyOptions = {}
        if (this.parsleyClass) {
          parsleyOptions = {
            classHandler: function (el) {
              return el.$element.closest(this.parsleyClass)
            },
            errorsContainer: function (el) {
              return el.$element.closest(this.parsleyClass)
            }
          }
        }
        var isValid = $(this.formId).parsley(parsleyOptions).validate();
        if (!isValid) {
          addAriaDescribedby();
        }
        return isValid;
      },
      closeModal() {
        $('#modal-with-spinner').modal('hide')
      }
    },
    template: `<div>
        <button v-bind:class="'btn btn-lg btn-lightgreen ' + buttonClasses" type="button" v-on:click="doCreate">
          {{ computedButtonText }}
        </button>
      
        <div id="modal-with-spinner" class="modal fade in" aria-labelledby="saveModalLabel" role="dialog" tabindex="-1">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="text-center" v-if="modalContent == null || modalContent == MODAL_ACTION" id="saveModalLabel">
                  {{ uppercaseAction }} {{ objectName }}... <img v-bind:src="gifUrl" alt="loading"/>
                </h1>
                <template v-if="modalContent === MODAL_ERROR && modalErrors">
                  <h1 class="text-center">
                    The following errors occurred while {{ action }} the {{ objectName }}:
                  </h1>
                  <ul>
                    <li v-for="error in modalErrors">
                      {% verbatim %}{{ error }}{% endverbatim %}
                    </li>
                  </ul>
                </template>
                <h1 class="text-center" v-if="modalContent === MODAL_ERROR && !modalErrors">
                  An unknown error occurred while {{ action }} the {{ objectName }}.
                </h1>
              </div>
              <div class="modal-body" v-if="modalContent == MODAL_ERROR">
                <button type="button" class="btn btn-lg btn-full btn-lightgreen save_btn" v-on:click="closeModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`
  })
})()