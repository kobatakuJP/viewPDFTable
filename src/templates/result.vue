<template>
  <div>result</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ClientTable } from "vue-tables-2";

@Component({
  props: {
    table: Array
  }
})
export default class ResultComponent extends Vue {
  table: string[][];
  createHeaderAndRowValue(source: string[][]) {
    // 最初の1行目をヘッダとする
    const header = source[0];
  }
}
</script>

<style scoped>
</style>