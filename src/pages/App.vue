
<template>
  <div id="app" class="theme-normal height100">
    <transition name="fade">
      <div v-if="pdffile" class="height100">
        <list-page :pdffile="pdffile" />
      </div>
      <div v-else class="height100">
        <unselected-page @selected="changeFile" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import UnselectedPage from "./UnselectedPage.vue";
import ListPage from "./ListPage.vue";

@Component({ components: { UnselectedPage, ListPage } })
/** アプリケーションを表示するためのrouter-viewを置くためだけの人生 */
export default class App extends Vue {
  pdffile: File = null;
  changeFile(f: File) {
    this.pdffile = f;
  }
}
</script>

<style>
/* 
  color from :https://colorhunt.co/palette/159679
  f0134d
  ff6f5e
  f5f0e3
  40bfc1
*/
html,
body {
  height: 100%;
}
.height100 {
  height: 100%;
}
.theme-normal {
  background-color: #f5f0e3;
  color: #ff6f5e;
}
.theme-button {
  background-color: #f0134d;
  color: #fff; /*TODO 「いい白」*/
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>