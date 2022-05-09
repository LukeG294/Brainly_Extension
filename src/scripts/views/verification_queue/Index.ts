import { InjectReactApp } from "./InsertReact";
import {PreparePage} from "./PreparePage"

setTimeout(() => {
    PreparePage();
    InjectReactApp();
}, 150);