
<template>
  <div>
    <vue-drawer-layout ref="drawer" :drawer-width="400" @mask-click="handleMaskClick">
      <div class="drawer-content" slot="drawer">
        <drawer-menu></drawer-menu>
      </div>
      <div slot="content">
        <SelectPDF></SelectPDF>
      </div>
    </vue-drawer-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SelectPDF from "../templates/selectPDF.vue";
import DrawerMenu from "../templates/DrawerMenu.vue";

@Component({ components: { DrawerMenu, SelectPDF } })
export default class MainPage extends Vue {
  handleMaskClick() {
    (this.$refs.drawer as any).toggle(false);
  }
}
</script>

<style>
.vpt-theme {
  background-color: #f5f0e3;
  color: #f0134d;
}
</style>