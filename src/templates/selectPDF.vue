<template>
  <div>
    <div>
      <label for="file_upload">
        端末からPDFを選ぶ
        <input
          type="file"
          :id="FILE_UPLOADER_ID"
          accept="application/pdf"
          @change="updateFile"
        />
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
import { pdf_table_extractor_from_path } from "@kobataku/pdf-table-extractor";
import { pdfDataFromFile, RoutePath } from "../main2";

@Component({})
export default class SelectPDF extends Vue {
  readonly FILE_UPLOADER_ID = "file_upload";
  async updateFile(e: Event) {
    const file = (document.getElementById(
      this.FILE_UPLOADER_ID
    ) as HTMLInputElement).files[0];
    const pdfData = await pdfDataFromFile(file);
    this.$router.push(RoutePath.RESULT);
  }
}
</script>

<style scoped>
</style>