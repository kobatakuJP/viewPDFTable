<template>
  <div class="back">
    <b-list-group>
      <b-list-group-item button @click="click">列チョイス</b-list-group-item>
      <b-list-group-item button>別のPDFを読み込む</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NotFound from "./404.vue";

@Component({ components: { NotFound } })
export default class DrawerMenu extends Vue {
  click(e) {
    this.$swal({
      titleText: "Hi",
      html: "<div><NotFound/>aa</div>"
    });
  }
}
</script>

<style scoped>
.back {
  background-color: aqua;
  height: 100%;
}
</style>