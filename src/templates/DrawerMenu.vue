<template>
  <div class="back">
    <b-list-group>
      <b-list-group-item button v-b-toggle.collapse-1>列チョイス</b-list-group-item>
      <b-collapse id="collapse-1" class="mt-2">
        <check-box-group
          :items="columns"
          :default-selected="defaultSelectedId"
          @update-selected="updateSelected"
        />
      </b-collapse>
      <b-list-group-item button @click="click">
        別ファイル選択
        <label :for="FILE_UPLOADER_ID" ref="selectPdf"></label>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import CheckBoxGroup from "../presentational/molecules/CheckBoxGroup.vue";
import { Heading } from "./DataTable.vue";
import { FILE_UPLOADER_ID } from "../pages/App.vue";

@Component({ components: { CheckBoxGroup } })
export default class DrawerMenu extends Vue {
  readonly FILE_UPLOADER_ID = FILE_UPLOADER_ID;
  @Prop({ default: [] })
  defaultSelectedId: string[];
  @Prop({ default: [] })
  columns: Heading[];
  updateSelected(selected: string[]) {
    this.$emit("update-selected", selected);
  }
  click(e) {
    // this.$swal({
    //   titleText: "Hi",
    //   html: "<div><NotFound/>aa</div>"
    // });
    (this.$refs.selectPdf as HTMLElement).click();
  }
}
</script>

<style scoped>
.back {
  background-color: rgba(255,255,255,0.7);
  height: 100%;
}
</style>