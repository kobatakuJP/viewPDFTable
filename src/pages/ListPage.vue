
<template>
  <div>
    <vue-drawer-layout
      ref="drawer"
      :drawer-width="400"
      @mask-click="handleMaskClick"
      :backdrop="true"
    >
      <div class="drawer-content main-content" slot="drawer">
        <drawer-menu
          :columns="columns"
          :default-selected-id="allClumnsId"
          @update-selected="updateSelected"
        />
      </div>
      <div slot="content" class="main-content">
        <data-table :pdffile="pdffile" :selectedID="selectedID" @list-updated="listUpdated" />
      </div>
    </vue-drawer-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import DataTable, { Heading } from "../templates/DataTable.vue";
import DrawerMenu from "../templates/DrawerMenu.vue";
import { CBItem } from "../presentational/molecules/CheckBoxGroup.vue";

@Component({
  components: { DrawerMenu, DataTable }
})
export default class ListPage extends Vue {
  @Prop({ default: null })
  pdffile: File;
  selectedID: string[] = [];
  columns: CBItem[] = [];
  handleMaskClick() {
    (this.$refs.drawer as any).toggle(false);
  }
  listUpdated(h: Heading[]) {
    this.columns.splice(0, this.columns.length, ...h);
  }
  /** デフォルトの選択済みIDは、カラムすべて */
  get allClumnsId() {
    return this.columns.map(v => v.value);
  }
  updateSelected(selected: string[]) {
    this.selectedID.splice(0, this.selectedID.length, ...selected);
  }
}
</script>

<style scoped>
.main-content {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>