import { InjectReactApp } from "./insertReact";
import {PreparePage} from "./prepare_page"

setTimeout(() => {
    PreparePage();
    InjectReactApp()
}, 150);