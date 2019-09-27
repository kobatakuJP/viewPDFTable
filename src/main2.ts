import { pdf_table_extractor_from_path } from "@kobataku/pdf-table-extractor";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import NotFound from "./templates/404.vue";
import App from "./templates/App.vue";
import Result from "./templates/result.vue";
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
        { path: RoutePath.RESULT, component: Result },
        { path: RoutePath.NOTFOUND, component: NotFound },
    ]
    const router = new VueRouter({ routes });
    const app = new Vue({
        el: "#app",
        router: router,
        render: (h) => h(App)
    })
}

async function pdf() {
    const a = await pdf_table_extractor_from_path("./grand_kids.pdf");
}
