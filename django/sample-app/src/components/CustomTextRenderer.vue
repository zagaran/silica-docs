<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <textarea
      :id="control.id + '-input'"
      :name="control.path"
      :class="styles.control.textarea"
      :value="control.data"
      :disabled="!control.enabled || control.schema.readOnly"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      style="border: darkblue 1px solid;"
    />
  </control-wrapper>
</template>

<script>
import { customSilicaRendererTester, SilicaControlWrapper as ControlWrapper, silicaDefaultControlProps } from "silica-vue";
import { defineComponent } from "@vue/composition-api";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";

const controlRenderer = defineComponent({
  name: "silica-custom-text-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useVanillaControl(useJsonFormsControl(props));
  }
});
export default controlRenderer;
export const entry = {
  renderer: controlRenderer,
  tester: customSilicaRendererTester("CustomTextRenderer")
};
</script>