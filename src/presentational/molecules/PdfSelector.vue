
<template>
  <div>
    <input class="dummy-input" type="file" :id="id" accept="application/pdf" @change="selectFile" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
/** PDFを選択するinput要素、hiddenである。 */
export default class PdfSelector extends Vue {
  @Prop({ default: "" })
  id: string;
  selectFile(f: File) {
    this.$emit("selected-pdf", f);
  }
}
</script>

<style scoped>
/** inputを見せなくする */
.dummy-input {
  visibility: hidden;
  position: absolute;
  top: -200px;
}
</style>