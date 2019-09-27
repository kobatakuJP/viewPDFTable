
<template>
  <div id="app">
    <router-link to="/select">select</router-link>
    <router-link to="/result">result</router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {
  created() {
    alert("wow");
  }
}
</script>

<style scoped>
</style>