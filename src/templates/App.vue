
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

<style>
/* 
  color from :https://colorhunt.co/palette/159679
  f0134d
  ff6f5e
  f5f0e3
  40bfc1
*/ 
.vpt-theme {
  background-color: #f5f0e3;
  color: #f0134d;
}
</style>