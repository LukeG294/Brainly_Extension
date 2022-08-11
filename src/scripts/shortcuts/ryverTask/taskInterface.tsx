import react from "react"
import Ryver from "scripts/common/Ryver/Ryver"
import ReactDOM from "react-dom/client"
import App from "./App"
import Status from "scripts/common/Notifications/Status"

export default async function TaskInterface(){
    let taskS = new Status("task");
    taskS.Show("Loading menu...", "blue", true, false)
    let modRep = await Ryver.getBoardTasks("1197733");
    let modGen = await Ryver.getBoardTasks("1197697");
    taskS.Close()

    document.body.insertAdjacentHTML("beforeend", `<div id="app"></div>`)
    ReactDOM.createRoot(document.querySelector("#app")).render(
        //@ts-ignore
        <App modRep = {modRep.d.categories} modGen = {modGen.d.categories} />
    )
}