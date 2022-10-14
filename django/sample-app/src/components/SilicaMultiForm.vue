<template>
  <div class="well">
    <tabs>
      <tab v-for="(formInformation, idx) in forms" :key="idx" :name="formInformation.title">
          <silica-django-form
              :id="id"
              :data="formInformation.data"
              :schema="formInformation.schema"
              :uischema="formInformation.uischema"
              :handleSubmit="(ev) => {
                ev.preventDefault()
                this.submitForm(ev)
              }"
              :action="formInformation.submitURL"
              method="POST"
          />
      </tab>
    </tabs>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { SilicaDjangoForm } from "silica-vue";

const SilicaMultiForm = defineComponent({
  name: "SilicaMultiForm",
  components: {
    SilicaDjangoForm,
  },
  // takes in an array of SilicaFormInformation objects
  // SilicaFormInformation = {
  //  title: string,
  //  data: Object,
  //  id: Object,
  //  uischema: Object,
  //  schema: Object,
  //  submitURL: string,
  //  errors: Object,
  // }
  //
  props: {
    forms: {
      type: Array,
      default: () => [],
    }
  },
  beforeMount() {
    this.$set('formInstances', this.forms)
  },
  data() {
    return {
      formInstances: []
    }
  },
  methods: {
    submitForm(event) {
      // send request to target url
      const data = new FormData();
      for (const field of event.target.elements) {
        data.set(field.name, field.value)
      }
      const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
      fetch(event.target.action, config)
    },
  }
})


export default SilicaMultiForm
</script>

<style scoped>

</style>