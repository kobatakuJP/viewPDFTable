<template>
  <div>
    <div v-if="headings.length > 0" class="table-container">
      <v-client-table :columns="displayColumns" :data="records" :options="options"></v-client-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import {
  pdf_table_extractor_from_path,
  Result,
  PageTables
} from "@kobataku/pdf-table-extractor";
import { pdfDataFromFile, RoutePath } from "../main2";
import CheckBoxGroup, {
  CBItem
} from "../presentational/molecules/CheckBoxGroup.vue";

/** ヘッダ用のデータ、CheckBoxコンポーネントのI/Fに合わせる */
export interface Heading extends CBItem {}

@Component({
  components: { CheckBoxGroup }
})
/** PDFをパースし、表にして表示する。 */
export default class DataTable extends Vue {
  mounted() {
    this.updateFile();
  }
  @Prop({ default: null })
  pdffile: File;
  @Watch("pdffile")
  private async updateFile() {
    this.resetTable();
    this.pdfData = await pdfDataFromFile(this.pdffile);
    this.updateTable();
  }
  @Prop({ default: [] })
  selectedID: string[];
  @Watch("selectedID")
  onSelectedIDChanged(newID: string[], oldID: string[]) {
    this.displayColumnIDs.splice(0, this.displayColumnIDs.length, ...newID);
  }
  /** ヘッダに使用するラベルの一覧 */
  headings: Heading[] = [];
  @Watch("headings")
  onHeadingsChanged(newID: string[], oldID: string[]) {
    // リストの内容が変更されたら上位に通知する
    this.$emit("list-updated", this.headings);
  }
  pdfData: Result;
  /** 表示するレコード群 */
  records: { [key: string]: string }[] = [];
  /** 表示対象ID群 */
  displayColumnIDs: string[] = [];
  /** すべてのカラムのID */
  get columns(): string[] {
    return this.headings.map(v => v.value);
  }
  /** 表示するカラムのID */
  get displayColumns(): string[] {
    return this.columns.filter(
      v => this.displayColumnIDs.findIndex(id => v === id) > -1
    );
  }
  /** ヘッダをテーブル用のオブジェクトに変換 */
  get headingsTableObj(): { [id: string]: string } {
    const result = {};
    for (let i = 0, l = this.headings.length; i < l; i++) {
      result[this.headings[i].value] = this.headings[i].text;
    }
    return result;
  }
  /** vue-table-2に渡すoptions */
  get options() {
    return {
      filterByColumn: true,
      headings: this.headingsTableObj,
      listColumns: this.listColumns
    };
  }
  get listColumns() {
    const result = {};
    for (let i = 0, l = this.columns.length; i < l; i++) {
      const key = this.columns[i];
      let columnData = this.records.map(v => v[key]);
      // 重複排除
      columnData = columnData.filter((x, i, self) => self.indexOf(x) === i);
      result[key] = columnData.map(v => {
        return { id: v, text: v };
      });
    }
    return result;
  }
  private resetTable() {
    this.headings.splice(0);
    this.records.splice(0);
    this.displayColumnIDs.splice(0);
  }
  private updateTable() {
    this.updateColumns();
    this.updateRecords();
  }
  /** カラムをアップデート */
  private updateColumns() {
    if (this.isTableData()) {
      // データ在りの場合はヘッダを更新
      const header = this.createHeaderLabels();
      this.headings.splice(
        0,
        this.headings.length,
        ...header.map((v, i) => {
          return { value: `c${i}`, text: v };
        })
      );
      this.displayColumnIDs = this.columns.slice();
    } else {
      // データなしの場合は何もなし
      this.resetTable();
    }
  }
  /** ヘッダを作成する */
  private createHeaderLabels(): string[] {
    const tables = this.objToArray(this.pdfData.pageTables[0].tables);
    let result = this.objToArray(tables[0]); // 見つからない場合は最初を返しとくため
    /** ヘッダじゃないのに上にあるデータは消すので、その数を数えておく */
    let outDataNum = 0;
    for (let i = 0, l = tables.length; i < l; i++) {
      const c = this.objToArray(tables[i]);
      if (c.filter(v => v === "").length > c.length / 2) {
        // 半分以上空文字だとさすがにおかしいのでこれをヘッダにはしない。
        outDataNum++;
        continue;
      } else {
        // ヘッダっぽいので返す
        result = c;
        break;
      }
    }
    if (outDataNum > 0) {
      tables.splice(0, outDataNum);
      this.pdfData.pageTables[0].tables = {}; // 一回消す
      tables.map((v, i) => (this.pdfData.pageTables[0].tables[i] = v)); // mapでforEachみたいなことしとる
    }
    return result;
  }
  /** テーブルデータがあるかどうか */
  private isTableData(): boolean {
    return this.pdfData &&
      this.pdfData.pageTables &&
      this.pdfData.pageTables[0] &&
      this.pdfData.pageTables[0].tables
      ? true
      : false;
  }
  /** レコードを更新する */
  private updateRecords() {
    let table = this.getMargeTable();
    table = this.removeDeprecateHeader(this.headings.map(v => v.text), table);
    const recordsObj = table.map(v => this.arrayToRecordObj(v));
    this.records.splice(0, this.records.length, ...recordsObj);
  }
  /** テーブルをマージして配列にしたものを返す */
  private getMargeTable(): string[][] {
    let result: string[][] = [];
    for (let i = 0, l = this.pdfData.pageTables.length; i < l; i++) {
      const pageTable = this.pdfData.pageTables[i].tables;
      const arrayTable = this.objToArray(pageTable);
      const arrayRecordsTable = arrayTable.map(v => this.objToArray(v));
      result = result.concat(arrayRecordsTable);
    }
    return result;
  }
  /** 数値キーのobjectを配列に変換する(PDFJSのpabeTablesに合わせた仕様) */
  private objToArray<T>(v: { [id: number]: T }): T[] {
    const newcolumns: T[] = [];
    for (let prop in v) {
      newcolumns[prop] = v[prop];
    }
    return newcolumns;
  }
  /** データレコードの配列をvue-tables-2用のオブジェクト形に成形する */
  private arrayToRecordObj(v: string[]): { [key: string]: string } {
    // 順序性担保のため、まず配列に直す
    const tmp = this.objToArray(v);
    const result = {};
    for (let i = 0, l = this.columns.length; i < l; i++) {
      // 空文字は全角スペースに置き換える。フィルタが空文字では機能しないので、苦肉の策。
      result[this.columns[i]] = tmp[i] === "" ? "　" : tmp[i];
    }
    return result;
  }
  /** ヘッダが被ってることがあると思うので消す */
  private removeDeprecateHeader(header: string[], arr: string[][]): string[][] {
    return arr.filter(v => !this.sameArray(v, header));
  }
  /** 同じ内容の配列か検査、Tはリテラルじゃないとダメ。 */
  private sameArray<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) {
      // とりあえず長さちがきゃ違う
      return false;
    }
    for (let i = 0, l = a.length; i < l; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
}
</script>

<style scoped>
.table-container {
  margin: 20px;
}
</style>