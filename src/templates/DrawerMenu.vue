<template>
  <div class="back">
    <b-list-group>
      <b-list-group-item button>列チョイス</b-list-group-item>
      <b-list-group-item button>別のPDFを読み込む</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class DrawerMenu extends Vue {
  click(e) {
    alert(e)
  }
}
</script>

<style scoped>
.back {
  background-color: aqua;
  height: 100%;
}
</style>