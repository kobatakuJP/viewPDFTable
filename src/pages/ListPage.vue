
<template>
  <div>
    <vue-drawer-layout ref="drawer" :drawer-width="400" @mask-click="handleMaskClick">
      <div class="drawer-content" slot="drawer">
        <drawer-menu></drawer-menu>
      </div>
      <div slot="content">
        <DataTable :pdffile="pdffile"></DataTable>
      </div>
    </vue-drawer-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import DataTable from "../templates/DataTable.vue";
import DrawerMenu from "../templates/DrawerMenu.vue";

@Component({
  components: { DrawerMenu, DataTable }
})
export default class ListPage extends Vue {
  @Prop({ default: null })
  pdffile: File;
  handleMaskClick() {
    (this.$refs.drawer as any).toggle(false);
  }
}
</script>

<style>
.theme-normal {
  background-color: #f5f0e3;
  color: #f0134d;
}
</style>