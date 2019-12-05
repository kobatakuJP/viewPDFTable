
<template>
  <div class="content-center">
    <label :for="FILE_UPLOADER_ID" class="btn-circle-3d theme-button">
      ファイル選択
      <!-- <input
        class="dummy-input"
        type="file"
        :id="FILE_UPLOADER_ID"
        accept="application/pdf"
        @change="selectFile"
      />-->
      <pdf-selector :id="FILE_UPLOADER_ID" @selected-pdf="selectFile" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import PdfSelector from "../presentational/molecules/PdfSelector.vue";

@Component({ components: { PdfSelector } })
/** PDFが選択されていないときのページ */
export default class UnselectedPage extends Vue {
  readonly FILE_UPLOADER_ID = "file_upload";
  async selectFile(e: Event) {
    const file = (document.getElementById(
      this.FILE_UPLOADER_ID
    ) as HTMLInputElement).files[0];
    this.$emit("selected", file);
  }
}
</script>

<style scoped>
.content-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
/* ↓ボタンデザインは右のサイト https://saruwakakun.com/html-css/reference/buttons */
.btn-circle-3d {
  display: inline-block;
  text-decoration: none;
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 3px #bd6565;
  transition: 0.4s;
}
.btn-circle-3d:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  border-bottom: none;
}
</style>