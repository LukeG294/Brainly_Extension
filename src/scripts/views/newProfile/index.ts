import { addPreviewBut } from "./previewButs";
import {reqMD} from "scripts/common/Ryver/reqMD"
import Components from "scripts/Items/Components"

addPreviewBut()

window.onload = () => {
  reqMD({
    id: window.location.href.replace("https://brainly.com/app/profile/", "").split("/")[0],
    element: document.querySelector("div[data-testid = 'profile_page_summary'] > div:nth-child(2) .sg-flex"),
    button: Components.Button({
      size: "m",
      type: "solid",
      ClassNames: ["reqMD"],
      icon: "answer",
      iconSize:"24"
    }),
    type: "answerer",
    position: "beforeend"
  })
}