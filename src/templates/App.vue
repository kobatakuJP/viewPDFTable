
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
/** アプリケーションを表示するためのrouter-viewを置くためだけの人生 */
export default class App extends Vue {}
</script>

<style scoped>
</style>