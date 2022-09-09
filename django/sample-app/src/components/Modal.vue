<template>
  <div class="modal fade in" :id="id" tabindex="-1" :ref="id">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
          <div class="button-container">
            <button type="button" class="btn btn-default save_btn col-sm-3"
                    @click="closeModal()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Modal",
  props: [
      "id",
  ],
  data() {
    return {}
  },
  methods: {
    openModal() {
      $(`#${this.id}`).modal('show')
    },
    closeModal() {
      $(`#${this.id}`).modal('hide')
    }
  }
}
</script>