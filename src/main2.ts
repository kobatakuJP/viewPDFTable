import { pdf_table_extractor_from_path } from "@kobataku/pdf-table-extractor";
import Vue from "vue";
import router from "vue-router";

Vue.use(router);

async function pdf() {
    const a = await pdf_table_extractor_from_path("./grand_kids.pdf");
    
}

pdf();