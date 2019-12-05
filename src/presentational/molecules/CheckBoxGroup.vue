<template>
  <div>
    <b-form-group>
      <template v-slot:label>
        <b-form-checkbox
          :indeterminate="indeterminate"
          aria-describedby="checkbox-group"
          aria-controls="checkbox-group"
          @change="toggleAll"
        >{{ allSelected ? 'Un-select All' : 'Select All' }}</b-form-checkbox>
      </template>

      <b-form-checkbox-group
        id="checkbox-group"
        v-model="mySelected"
        :options="items"
        name="checkbox-group"
        class="ml-4"
        aria-label="Individual flavours"
        stacked
      ></b-form-checkbox-group>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

export interface CBItem {
  value: string;
  text: string;
}

@Component({})
export default class CheckBoxGroup extends Vue {
  // 参考：https://bootstrap-vue.js.org/docs/components/form-checkbox/#indeterminate-tri-state-support
  mySelected: string[] = [];
  @Prop({ default: [] })
  items: CBItem[];
  @Prop({ default: [] })
  defaultSelected: string[];
  @Watch("defaultSelected")
  updateDefaultSelected() {
    this.mySelected.splice(0, this.mySelected.length, ...this.defaultSelected);
  }
  @Watch("mySelected")
  updateMySelected() {
    this.$emit("update-selected", this.mySelected);
  }
  get allSelected(): boolean {
    return this.items.length === this.mySelected.length;
  }
  get indeterminate(): boolean {
    return !this.allSelected && this.mySelected.length > 0;
  }
  toggleAll(checked) {
    this.mySelected = checked ? this.items.slice().map(v => v.value) : [];
  }
}
</script>

<style scoped>
</style>