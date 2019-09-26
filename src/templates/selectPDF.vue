<template>
  <div>
    <div>
      <label for="file_upload">
        端末からPDFを選ぶ
        <input type="file" id="file_upload" />
      </label>
    </div>
    <div>
      <label for="url_upload">
        PDFのURLを記載する
        <input type="text" id="url_upload" />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class SelectPDF extends Vue {}
</script>

<style scoped>
</style>