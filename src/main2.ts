import { pdf_table_extractor_from_path, Result } from "@kobataku/pdf-table-extractor";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import NotFound from "./templates/404.vue";
import App from "./templates/App.vue";
import ResultComponent from "./templates/result.vue";
import SelectPDF from "./templates/selectPDF.vue";

/** urlのパスにあたる文言 */
export enum RoutePath {
    ROOT = "/",
    SELECT = "/select",
    RESULT = "/result",
    NOTFOUND = "/*"
}

Vue.use(VueRouter);

window.onload = init;

/** アプリケーションの初期化 */
function init() {
    // まずアプリを載せるdomを一個作る
    const appbase = document.createElement("div");
    appbase.id = "app";
    const routerview = document.createElement("router-view");
    appbase.appendChild(routerview);
    document.body.appendChild(appbase);

    // 以下Vueコンポーネントの初期化

    /** コンポーネントのルートを設定 */
    const routes: RouteConfig[] = [
        { path: RoutePath.ROOT, component: SelectPDF },
        { path: RoutePath.SELECT, component: SelectPDF },
        { path: RoutePath.RESULT, component: ResultComponent },
        { path: RoutePath.NOTFOUND, component: NotFound },
    ]
    const router = new VueRouter({ routes });
    const app = new Vue({
        el: "#app",
        router: router,
        render: (h) => h(App)
    })
}

export async function pdfDataFromFile(f: File): Promise<Result> {
    return new Promise((res, rej) => {
        const fileleader = new FileReader();
        fileleader.onload = async function () {
            var typedarray = new Uint8Array(this.result as ArrayBuffer);
            const v = await pdf_table_extractor_from_path(typedarray as any);
            res(v);
        }
        fileleader.readAsArrayBuffer(f);
    });
}
