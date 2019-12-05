import { pdf_table_extractor_from_path, Result } from "@kobataku/pdf-table-extractor";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vue from "vue";
import { DrawerLayout } from 'vue-drawer-layout';
import VueRouter, { RouteConfig } from "vue-router";
import VueSweetalert2 from 'vue-sweetalert2';
import { ClientTable } from 'vue-tables-2';
import App from "./pages/App.vue";
import ListPage from "./pages/ListPage.vue";
import NotFound from "./templates/404.vue";
import DataTable from "./templates/DataTable.vue";

/** urlのパスにあたる文言 */
export enum RoutePath {
    ROOT = "/",
    SELECT = "/select",
    RESULT = "/result",
    NOTFOUND = "/*"
}

Vue.use(VueRouter);
Vue.use(ClientTable);
Vue.use(BootstrapVue);
Vue.component(DrawerLayout.name, DrawerLayout)
Vue.use(VueSweetalert2);

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
        { path: RoutePath.ROOT, component: ListPage },
        { path: RoutePath.SELECT, component: DataTable },
        // { path: RoutePath.RESULT, component: ResultComponent },
        { path: RoutePath.NOTFOUND, component: NotFound },
    ]
    const router = new VueRouter({ routes });
    const app = new Vue({
        el: "#app",
        router: router,
        render: h => h(App)
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
