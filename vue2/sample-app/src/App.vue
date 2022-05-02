<template>
  <div id="app">
    <h1>JSON Forms Vue 2</h1>
    <h2>Change Form Type</h2>
    <div class="btn-group mb-2">
      <button
          v-for="formType in formTypes"
          :key="formType.name"
          @click="() => handleFormTypeChanged(formType)"
          :class="{'selected': formType.name === selectedFormType.name, 'btn': true}"
      >
        {{ formType.name }}
      </button>
    </div>
    <h2>Change Form Component</h2>
    <div class="btn-group mb-2">
      <button :class="{'selected': showSilicaForm, 'btn': true}" @click="showSilicaForm = true">View Silica Form
      </button>
      <button :class="{'selected': !showSilicaForm, 'btn': true}" @click="showSilicaForm = false">View JSONForms Form
      </button>
    </div>
    <div class="row mt-2">
      <div class="col-xs-6 well">
        <div class="myform">
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">
                {{ showSilicaForm ? "Django-Silica Form" : "Default JsonForms Form" }}
              </h2>
            </div>
            <div class="card-body">
              <silica-django-form
                  v-show="showSilicaForm"
                  id="test-form"
                  :dataProp="formData"
                  :schemaProp="schema"
                  :uischemaProp="uischema"
                  :onChange="onChange"
                  :styles="styles"
                  :custom-renderers="customRenderers"
              />
              <json-forms
                  v-show="!showSilicaForm"
                  :data="formData"
                  :renderers="renderers"
                  :schema="schema"
                  :uischema="uischema"
                  @change="onChange"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">
              Info
            </h2>
            <div class="card-body">
              <p>Schema</p>
              <json-viewer
                  :value="schema"
                  :expand-depth="2"
                  sort
                  boxed
                  expanded
              />
              <p>UISchema</p>
              <json-viewer
                  :value="uischema"
                  :expand-depth="2"
                  sort
                  boxed
                  expanded
              />
              <p>Form Data</p>
              <json-viewer
                  :value="formData"
                  :expand-depth="2"
                  sort
                  boxed
                  expanded
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "@vue/composition-api";
import {JsonForms} from "@jsonforms/vue2";
import {bootstrap4Styles, silicaRenderers} from "silica-vue";
import "@jsonforms/vue2-vanilla/vanilla.css";
import "./styles/bootstrap.css";
import {formTypes} from "./example-forms";
import {customRenderers} from "@/components/renderers";
import {CustomTextRenderer} from "@/components/index";
import JsonViewer from 'vue-json-viewer';

const styles = bootstrap4Styles;

const renderers = [
  ...silicaRenderers
];

export default defineComponent({
  name: "DevServe",
  components: {
    JsonForms,
    CustomTextRenderer,
    JsonViewer
  },
  data() {
    return {
      // freeze renderers for performance gains
      renderers: Object.freeze(renderers),
      customRenderers: Object.freeze(customRenderers),
      showSilicaForm: true,
      formData: formTypes[0].data,
      schema: formTypes[0].schema,
      uischema: formTypes[0].uischema,
      styles,
      formTypes,
      selectedFormType: formTypes[0]
    };
  },
  methods: {
    onChange(event) {
      this.formData = event.data;
    },
    handleFormTypeChanged(formType) {
      this.selectedFormType = formType;
      this.formData = formType.data;
      this.schema = formType.schema;
      this.uischema = formType.uischema;
    }
  },
  provide: {
    styles
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  flex: 0 1 auto;
}

.mylabel {
  color: darkslategrey;
}

.vertical-layout {
  margin-left: 10px;
  margin-right: 10px;
}

.myform {
  width: 640px;
  margin: 0 auto;
}

.text-area {
  min-height: 80px;
}

.control > .wrapper > input[type="checkbox"] {
  flex: 0;
}

button.selected {
  background-color: green;
}

.well {
  border: lightgray 1px solid;
  padding: 10px;
  border-radius: 5px;
}

</style>
